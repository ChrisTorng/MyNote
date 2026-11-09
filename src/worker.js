import { DurableObject } from 'cloudflare:workers';
import { HTML } from './ui.js';

const DAY = 86400000;
const SESSION_DAYS = 180;
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers }
  });
}
function fail(message, status = 400) { return json({ error: message }, status); }
function hashHex(bytes) { return [...new Uint8Array(bytes)].map(n => n.toString(16).padStart(2, '0')).join(''); }
async function sha256(text) {
  return hashHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
}
function equalHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== 64 || b.length !== 64) return false;
  let diff = 0;
  for (let i = 0; i < 64; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
function cookieValue(request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)mynote_session=([A-Za-z0-9_-]{40,100})/);
  return match ? match[1] : null;
}
function sessionCookie(token) {
  return 'mynote_session=' + token + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=' + (SESSION_DAYS * 86400);
}
function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
const icon = JSON.stringify({ name: 'MyNote', short_name: 'MyNote', start_url: '/', display: 'standalone', background_color: '#10151d', theme_color: '#111a27', icons: [{src:'/icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}] });
const sw = "const CACHE='mynote-shell-v1';self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/manifest.webmanifest'])));self.skipWaiting()});self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).pathname.startsWith('/api/'))return;const path=new URL(e.request.url).pathname;if(e.request.mode==='navigate'||path==='/manifest.webmanifest'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request)))}})";
async function forward(stub, path, method = 'GET', body, headers = {}) {
  const init = { method, headers };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
    init.headers = { ...headers, 'content-type': 'application/json' };
  }
  return stub.fetch(new Request('https://mynote.internal' + path, init));
}
function safeName(input) { return String(input || '').trim().slice(0, 50) || '我的裝置'; }

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      if (request.method === 'GET' && (path === '/' || path === '/index.html')) {
        const nonce = randomToken();
        return new Response(HTML.replace('__NONCE__', nonce), {
          headers: {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-cache',
            'x-content-type-options': 'nosniff',
            'referrer-policy': 'no-referrer',
            'x-frame-options': 'DENY',
            'content-security-policy': "default-src 'none'; script-src 'nonce-" + nonce + "'; style-src 'unsafe-inline'; worker-src 'self'; connect-src 'self' wss:; img-src 'self' data:; manifest-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
          }
        });
      }
      if (request.method === 'GET' && path === '/manifest.webmanifest') {
        return new Response(icon, { headers: { 'content-type': 'application/manifest+json' } });
      }
      if (request.method === 'GET' && path === '/icon.svg') {
        return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="34" fill="#173959"/><path d="M42 133V59l54 57 54-57v74" fill="none" stroke="#f3f7fc" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/></svg>', { headers: { 'content-type': 'image/svg+xml', 'cache-control':'public,max-age=86400' } });
      }
      if (request.method === 'GET' && path === '/sw.js') {
        return new Response(sw, { headers: { 'content-type': 'text/javascript', 'cache-control': 'no-cache' } });
      }
      if (!path.startsWith('/api/')) return fail('Not found', 404);
      if (!env.STORE) return fail('Storage not configured', 503);
      if (!['GET','POST','PUT','PATCH','DELETE'].includes(request.method)) return fail('Method not allowed', 405);
      if (request.method !== 'GET') {
        const origin = request.headers.get('origin');
        if (!origin || origin !== url.origin) return fail('Invalid origin', 403);
      }
      const stub = env.STORE.get(env.STORE.idFromName('private-single-user'));
      if (path === '/api/login' && request.method === 'POST') {
        if (!env.SETUP_CODE_HASH) return fail('登入尚未完成設定', 503);
        const body = await request.json();
        const valid = equalHex(await sha256(String(body.code || '')), env.SETUP_CODE_HASH);
        if (!valid) return fail('登入碼不正確', 401);
        const token = randomToken();
        const tokenHash = await sha256(token);
        const reply = await forward(stub, '/internal/login', 'POST', {
          tokenHash, knownDeviceId: String(body.knownDeviceId || '').slice(0, 80),
          name: safeName(body.name)
        });
        if (!reply.ok) return reply;
        const device = await reply.json();
        return json(device, 200, { 'set-cookie': sessionCookie(token) });
      }
      const token = cookieValue(request);
      if (!token) return fail('Unauthorized', 401);
      const tokenHash = await sha256(token);
      const sessionReply = await forward(stub, '/internal/verify', 'POST', { tokenHash });
      if (!sessionReply.ok) return fail('登入已失效，請重新登入', 401);
      const session = await sessionReply.json();
      const device = session.device;
      if (path === '/api/me' && request.method === 'GET') {
        return json({ ...device, expiresAt: session.expiresAt }, 200, { 'set-cookie': sessionCookie(token) });
      }
      if (path === '/api/logout' && request.method === 'POST') {
        await forward(stub, '/internal/logout', 'POST', { tokenHash });
        return json({ ok:true }, 200, { 'set-cookie': 'mynote_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0' });
      }
      if (path === '/api/stream' && request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
        if (request.headers.get('origin') !== url.origin) return fail('Invalid origin', 403);
        return stub.fetch(new Request('https://mynote.internal/internal/stream', { headers: { Upgrade: 'websocket' } }));
      }
      let internal, method = request.method, body;
      if (path === '/api/state' && method === 'GET') {
        internal = '/internal/state?version=' + encodeURIComponent(url.searchParams.get('version') || '0');
      } else if (path === '/api/note' && method === 'PUT') {
        internal = '/internal/note'; body = { ...await request.json(), device };
      } else if (path === '/api/category' && ['POST','PATCH','DELETE'].includes(method)) {
        internal = '/internal/category'; body = { ...await request.json(), device };
      } else if (path === '/api/device' && method === 'PATCH') {
        internal = '/internal/device'; body = { ...await request.json(), tokenHash, device };
      } else {
        return fail('Not found', 404);
      }
      const response = await forward(stub, internal, method, body);
      const h = new Headers(response.headers);
      h.set('cache-control', 'no-store');
      h.set('set-cookie', sessionCookie(token));
      return new Response(response.body, { status: response.status, headers: h });
    } catch (e) {
      return fail('服務暫時無法處理請求', 500);
    }
  }
};

export class MyNoteStore extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const sql = this.ctx.storage.sql;
    sql.exec("CREATE TABLE IF NOT EXISTS sessions (session_hash TEXT PRIMARY KEY, device_id TEXT NOT NULL, name TEXT NOT NULL, created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL)");
    sql.exec("CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, sort_order INTEGER NOT NULL)");
    sql.exec("CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, category_id TEXT NOT NULL, content TEXT NOT NULL, origin_device_id TEXT NOT NULL, origin_device_name TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, archived_at INTEGER, revision INTEGER NOT NULL)");
    sql.exec("CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value INTEGER NOT NULL)");
    sql.exec("INSERT OR IGNORE INTO meta(key,value) VALUES ('version',1)");
    sql.exec("INSERT OR IGNORE INTO categories(id,name,created_at,updated_at,sort_order) VALUES ('inbox','隨手記',0,0,0)");
  }
  version() {
    return this.ctx.storage.sql.exec("SELECT value FROM meta WHERE key='version'").one().value;
  }
  changed() {
    this.ctx.storage.sql.exec("UPDATE meta SET value=value+1 WHERE key='version'");
    for (const ws of this.ctx.getWebSockets()) {
      try { ws.send(JSON.stringify({ type: 'changed', version: this.version() })); } catch { }
    }
  }
  webSocketMessage() {}
  webSocketClose(ws) { try { ws.close(1000, 'closed'); } catch {} }
  async fetch(request) {
    try {
      const path = new URL(request.url).pathname;
      const method = request.method;
      const sql = this.ctx.storage.sql;
      if (path === '/internal/stream' && request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        this.ctx.acceptWebSocket(server);
        return new Response(null, { status: 101, webSocket: client });
      }
      const body = method === 'GET' ? {} : await request.json();
      if (path === '/internal/login' && method === 'POST') {
        const now = Date.now();
        const ids = sql.exec("SELECT device_id FROM sessions WHERE device_id=? LIMIT 1", body.knownDeviceId || '').toArray();
        const oldNotes = body.knownDeviceId && sql.exec("SELECT id FROM notes WHERE origin_device_id=? LIMIT 1", body.knownDeviceId).toArray().length;
        const deviceId = (ids.length || oldNotes) ? body.knownDeviceId : crypto.randomUUID();
        const name = safeName(body.name);
        sql.exec('INSERT INTO sessions(session_hash,device_id,name,created_at,expires_at) VALUES(?,?,?,?,?)', body.tokenHash, deviceId, name, now, now + SESSION_DAYS*DAY);
        sql.exec('UPDATE notes SET origin_device_name=? WHERE origin_device_id=?', name, deviceId);
        this.changed();
        return json({ deviceId, name });
      }
      if (path === '/internal/verify' && method === 'POST') {
        const row = sql.exec('SELECT device_id,name,expires_at FROM sessions WHERE session_hash=?',body.tokenHash).toArray()[0];
        if (!row || row.expires_at < Date.now()) return fail('Unauthorized',401);
        let expiry = row.expires_at;
        if (expiry - Date.now() < 90*DAY) {
          expiry = Date.now() + SESSION_DAYS*DAY;
          sql.exec('UPDATE sessions SET expires_at=? WHERE session_hash=?', expiry, body.tokenHash);
        }
        return json({ device: { deviceId: row.device_id, name: row.name }, expiresAt:expiry });
      }
      if (path === '/internal/logout' && method === 'POST') {
        sql.exec('DELETE FROM sessions WHERE session_hash=?', body.tokenHash);
        return json({ ok:true });
      }
      if (path === '/internal/state' && method === 'GET') {
        const v = this.version();
        const asked = Number(new URL(request.url).searchParams.get('version') || 0);
        if (asked === v) return json({ unchanged: true, version:v });
        return json({
          version:v,
          categories:sql.exec('SELECT id,name,created_at AS createdAt,updated_at AS updatedAt FROM categories ORDER BY sort_order,created_at').toArray(),
          notes:sql.exec('SELECT id,category_id AS categoryId,content,origin_device_id AS originDeviceId,origin_device_name AS originDeviceName,created_at AS createdAt,updated_at AS updatedAt,archived_at AS archivedAt,revision FROM notes ORDER BY updated_at DESC').toArray()
        });
      }
      if (path === '/internal/device' && method === 'PATCH') {
        const name = safeName(body.name);
        sql.exec('UPDATE sessions SET name=? WHERE session_hash=?',name,body.tokenHash);
        sql.exec('UPDATE notes SET origin_device_name=? WHERE origin_device_id=?',name,body.device.deviceId);
        this.changed();
        return json({ name });
      }
      if (path === '/internal/category') {
        const id = String(body.id || '');
        const name = String(body.name || '').trim().slice(0,60);
        if (method === 'POST') {
          if (!name || !/^[\w-]{4,80}$/.test(id)) return fail('分類資料不正確');
          const now=Date.now();
          sql.exec('INSERT OR IGNORE INTO categories(id,name,created_at,updated_at,sort_order) VALUES(?,?,?,?,?)',id,name,now,now,now);
        } else if (method === 'PATCH') {
          if (!name || id === 'inbox' && !name) return fail('請輸入分類名稱');
          sql.exec('UPDATE categories SET name=?,updated_at=? WHERE id=?',name,Date.now(),id);
        } else if (method === 'DELETE') {
          if (id === 'inbox') return fail('預設分類不能刪除');
          this.ctx.storage.transactionSync(() => {
            sql.exec("UPDATE notes SET category_id='inbox' WHERE category_id=?",id);
            sql.exec('DELETE FROM categories WHERE id=?',id);
          });
        } else return fail('Method not allowed',405);
        this.changed();
        return json({ ok:true,version:this.version() });
      }
      if (path === '/internal/note' && method === 'PUT') {
        const device = body.device;
        const id = String(body.id || '');
        const content = String(body.content ?? '');
        const revision = Number(body.revision);
        if (!/^[\w-]{8,80}$/.test(id) || content.length>200000 || !Number.isSafeInteger(revision) || revision<1)
          return fail('筆記資料不正確');
        const existing = sql.exec('SELECT origin_device_id AS owner, revision FROM notes WHERE id=?',id).toArray()[0];
        if (existing && existing.owner !== device.deviceId) return fail('這筆筆記只能由建立裝置修改',403);
        if (existing && revision <= existing.revision) return json({ ok:true,revision:existing.revision,version:this.version() });
        const now=Date.now();
        const createdAt = Number(body.createdAt) || now;
        const updatedAt = Number(body.updatedAt) || now;
        const archivedAt = body.archivedAt == null ? null : Number(body.archivedAt) || now;
        const cat = String(body.categoryId || 'inbox');
        const categoryId = sql.exec('SELECT id FROM categories WHERE id=?',cat).toArray().length ? cat : 'inbox';
        if (!existing) {
          sql.exec('INSERT INTO notes(id,category_id,content,origin_device_id,origin_device_name,created_at,updated_at,archived_at,revision) VALUES(?,?,?,?,?,?,?,?,?)',
            id,categoryId,content,device.deviceId,device.name,createdAt,updatedAt,archivedAt,revision);
        } else {
          sql.exec('UPDATE notes SET category_id=?,content=?,updated_at=?,archived_at=?,revision=? WHERE id=?',
            categoryId,content,updatedAt,archivedAt,revision,id);
        }
        this.changed();
        return json({ ok:true,revision,version:this.version() });
      }
      return fail('Not found',404);
    } catch(e) {
      return fail('資料庫操作失敗',500);
    }
  }
}
