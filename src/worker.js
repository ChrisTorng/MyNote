import { DurableObject } from 'cloudflare:workers';
import { HTML } from './ui.js';
import { PNG_BASE64 } from './icon-data.js';

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

const mainManifest=JSON.stringify({
  id:'/',name:'MyNote',short_name:'MyNote',description:'Private offline-first notes',lang:'en',
  start_url:'/',scope:'/',display:'standalone',display_override:['standalone'],
  background_color:'#1c548c',theme_color:'#111a27',
  icons:[
    {src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},
    {src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}
  ],
  shortcuts:[{
    name:'Quick add note',short_name:'New note',description:'Create a new note immediately',
    url:'/#/new',icons:[{src:'/quick-192.png',sizes:'192x192',type:'image/png'}]
  }]
});
const quickManifest=JSON.stringify({
  id:'/quick-add',name:'MyNote Quick Add',short_name:'Quick Note',description:'Start writing a note instantly',
  lang:'en',start_url:'/quick-add#/new',scope:'/quick-add',display:'standalone',
  background_color:'#075961',theme_color:'#075961',
  icons:[
    {src:'/quick-192.png',sizes:'192x192',type:'image/png',purpose:'any'},
    {src:'/quick-512.png',sizes:'512x512',type:'image/png',purpose:'any'}
  ]
});
function svgIcon(quick=false){
 const bg=quick?'#075961':'#1c548c',accent=quick?'#25b99e':'#ffbd55';
 const center=quick?
   '<path d="M138 122v30M123 137h30" stroke="white" stroke-width="9" stroke-linecap="round"/>':
   '<path d="m124 149 4-15 17-17 10 10-17 17-14 5Z" fill="white"/>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">'+
  '<rect width="192" height="192" rx="37" fill="'+bg+'"/>'+
  '<path d="M58 28h56l31 31v93a12 12 0 0 1-12 12H58a12 12 0 0 1-12-12V40a12 12 0 0 1 12-12Z" fill="#f8fcff"/>'+
  '<path d="M114 28v22a9 9 0 0 0 9 9h22" fill="#bad8ec"/>'+
  '<path d="M66 82h50M66 104h50M66 126h34" stroke="#4b819f" stroke-width="8" stroke-linecap="round"/>'+
  '<circle cx="138" cy="136" r="30" fill="'+bg+'"/><circle cx="138" cy="136" r="24" fill="'+accent+'"/>'+center+'</svg>';
}
function pngResponse(name){
 const binary=atob(PNG_BASE64[name]);
 const data=Uint8Array.from(binary,c=>c.charCodeAt(0));
 return new Response(data,{headers:{'content-type':'image/png','cache-control':'public,max-age=86400','x-content-type-options':'nosniff'}});
}
const sw = "const CACHE='mynote-shell-v3';\nconst FILES=['/','/quick-add','/manifest.webmanifest','/quick.webmanifest','/icon.svg','/quick-icon.svg','/icon-192.png','/icon-512.png','/quick-192.png','/quick-512.png'];\nself.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mynote-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',e=>{\n if(e.request.method!=='GET')return;\n const url=new URL(e.request.url);\n if(url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;\n if(e.request.mode==='navigate'){\n  e.respondWith(fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match(url.pathname)||caches.match('/'))));return;\n }\n if(FILES.includes(url.pathname)){\n  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));return;\n }\n});";
async function forward(stub, path, method = 'GET', body, headers = {}) {
  const init = { method, headers };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
    init.headers = { ...headers, 'content-type': 'application/json' };
  }
  return stub.fetch(new Request('https://mynote.internal' + path, init));
}
function safeName(input) { return String(input || '').trim().slice(0, 50) || 'My device'; }

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      if (request.method === 'GET' && (path === '/' || path === '/index.html' || path === '/quick-add')) {
        const nonce = randomToken();
        let html=HTML.replace('__NONCE__', nonce);
        if(path==='/quick-add')html=html
          .replace('href="/manifest.webmanifest"','href="/quick.webmanifest"')
          .replace('href="/icon.svg"','href="/quick-icon.svg"')
          .replace('href="/icon-192.png"','href="/quick-192.png"')
          .replace('<title>MyNote</title>','<title>MyNote - Quick Add</title>');
        return new Response(html, {
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
      if (request.method === 'GET' && (path === '/manifest.webmanifest' || path==='/quick.webmanifest')) {
        return new Response(path==='/quick.webmanifest'?quickManifest:mainManifest, { headers: { 'content-type': 'application/manifest+json', 'cache-control':'no-cache' } });
      }
      if (request.method === 'GET' && (path === '/icon.svg' || path === '/quick-icon.svg')) {
        return new Response(svgIcon(path==='/quick-icon.svg'), { headers: { 'content-type': 'image/svg+xml', 'cache-control':'no-cache' } });
      }
      const iconKey={
        '/icon-192.png':'main-192','/icon-512.png':'main-512',
        '/quick-192.png':'quick-192','/quick-512.png':'quick-512'
      }[path];
      if(request.method==='GET'&&iconKey)return pngResponse(iconKey);
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
        if (!env.SETUP_CODE_HASH) return fail('Access code is not configured', 503);
        const body = await request.json();
        const valid = equalHex(await sha256(String(body.code || '')), env.SETUP_CODE_HASH);
        if (!valid) return fail('Invalid access code', 401);
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
      if (!sessionReply.ok) return fail('Session expired. Sign in again', 401);
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
      } else if (path === '/api/archive' && method === 'PATCH') {
        internal = '/internal/archive'; body = { ...await request.json(), device };
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
      return fail('Unable to process request', 500);
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
    sql.exec("INSERT OR IGNORE INTO categories(id,name,created_at,updated_at,sort_order) VALUES ('inbox','Inbox',0,0,0)");
    sql.exec("UPDATE categories SET name='Inbox' WHERE id='inbox' AND name='隨手記'");
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
          if (!name || !/^[\w-]{4,80}$/.test(id)) return fail('Invalid category');
          const now=Date.now();
          sql.exec('INSERT OR IGNORE INTO categories(id,name,created_at,updated_at,sort_order) VALUES(?,?,?,?,?)',id,name,now,now,now);
        } else if (method === 'PATCH') {
          if (!name || id === 'inbox' && !name) return fail('Category name required');
          sql.exec('UPDATE categories SET name=?,updated_at=? WHERE id=?',name,Date.now(),id);
        } else if (method === 'DELETE') {
          if (id === 'inbox') return fail('Cannot delete the default category');
          this.ctx.storage.transactionSync(() => {
            sql.exec("UPDATE notes SET category_id='inbox' WHERE category_id=?",id);
            sql.exec('DELETE FROM categories WHERE id=?',id);
          });
        } else return fail('Method not allowed',405);
        this.changed();
        return json({ ok:true,version:this.version() });
      }
      if (path === '/internal/archive' && method === 'PATCH') {
        const id = String(body.id || '');
        if (!/^[\w-]{8,80}$/.test(id) || typeof body.archived !== 'boolean') return fail('Invalid archive request');
        const record = sql.exec('SELECT archived_at AS archivedAt FROM notes WHERE id=?', id).toArray()[0];
        if (!record) return fail('Note not found', 404);
        const oldArchived = record.archivedAt != null;
        if (oldArchived === body.archived) return json({ ok:true, archivedAt:record.archivedAt, version:this.version() });
        const archivedAt = body.archived ? Date.now() : null;
        sql.exec('UPDATE notes SET archived_at=? WHERE id=?', archivedAt, id);
        this.changed();
        return json({ ok:true, archivedAt, version:this.version() });
      }
      if (path === '/internal/note' && method === 'PUT') {
        const device = body.device;
        const id = String(body.id || '');
        const content = String(body.content ?? '');
        const revision = Number(body.revision);
        if (!/^[\w-]{8,80}$/.test(id) || content.length>200000 || !Number.isSafeInteger(revision) || revision<1)
          return fail('Invalid note');
        const existing = sql.exec('SELECT origin_device_id AS owner, revision, content FROM notes WHERE id=?',id).toArray()[0];
        if (existing && existing.owner !== device.deviceId) return fail('Only the creating device may edit this note',403);
        if (existing && revision <= existing.revision) {
          if (revision === existing.revision && existing.content === content) return json({ ok:true,revision:existing.revision,version:this.version() });
          return fail('Note has a newer revision; local copy was kept',409);
        }
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
          sql.exec('UPDATE notes SET category_id=?,content=?,updated_at=MAX(updated_at,?),revision=? WHERE id=?',
            categoryId,content,updatedAt,revision,id);
        }
        this.changed();
        return json({ ok:true,revision,version:this.version() });
      }
      return fail('Not found',404);
    } catch(e) {
      return fail('Storage error',500);
    }
  }
}
