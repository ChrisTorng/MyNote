export const HTML = String.raw`<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#111a27">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="referrer" content="no-referrer">
<link rel="manifest" href="/manifest.webmanifest"><link rel="icon" href="/icon.svg" type="image/svg+xml">
<title>MyNote · 私人筆記</title>
<style>
:root{color-scheme:light dark;--bg:#f7f8fa;--paper:#fff;--ink:#1c2737;--muted:#6b7582;--line:#e4e8ed;--primary:#2867a7;--tint:#edf5ff;--danger:#b43333;--shadow:0 1px 4px #15243b0a}
@media(prefers-color-scheme:dark){:root{--bg:#10151c;--paper:#1a2330;--ink:#edf1f6;--muted:#aab6c5;--line:#334152;--primary:#86bafa;--tint:#213a56;--danger:#fb8f91;--shadow:0 2px 8px #0002}}
*{box-sizing:border-box}html{font-family:system-ui,-apple-system,"Microsoft JhengHei",sans-serif}body{margin:0;background:var(--bg);color:var(--ink);min-height:100vh}button,input,textarea{font:inherit}button{cursor:pointer}button:disabled{opacity:.5;cursor:not-allowed}
.wrap{max-width:780px;padding:14px 14px 70px;margin:auto}.top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:15px}.brand{font-size:21px;font-weight:760;letter-spacing:-.3px}.sub{font-size:12px;color:var(--muted)}.right{display:flex;gap:8px;align-items:center}.pill,.btn,.chip{border:1px solid var(--line);border-radius:11px;background:var(--paper);color:var(--ink);padding:9px 12px}.btn.primary,.chip.selected{background:var(--tint);border-color:var(--primary);color:var(--primary)}.btn.small{font-size:12px;padding:7px 9px}.btn.danger{color:var(--danger)}.btn.ghost{background:transparent;border:0}.muted{color:var(--muted)}.hidden{display:none!important}
.card{border:1px solid var(--line);border-radius:14px;background:var(--paper);box-shadow:var(--shadow)}.section{margin-bottom:15px}.smallhead{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;font-size:12px;color:var(--muted)}
.categories{display:flex;gap:8px;overflow:auto;padding-bottom:3px;scrollbar-width:thin}.chip{white-space:nowrap;font-size:14px;padding:9px 13px;flex-shrink:0}.chip.add{font-weight:bold;font-size:19px;min-width:40px;padding:5px 10px}.category-tools{display:flex;gap:3px}
.compose{padding:0}.collapsed{width:100%;border:0;background:none;color:var(--muted);text-align:left;padding:13px 15px;min-height:51px}.collapsed:focus-visible{outline:2px solid var(--primary)}
.editor{padding:12px}.editor textarea{width:100%;min-height:170px;resize:vertical;line-height:1.55;padding:4px 2px;border:0;outline:none;background:transparent;color:var(--ink);font-size:16px}.editor .actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:space-between;border-top:1px solid var(--line);padding-top:9px}.editor .left,.editor .right{display:flex;gap:6px;align-items:center}.editor-meta{font-size:12px;color:var(--muted);margin-bottom:8px}
.search{display:flex;gap:8px;align-items:center;background:var(--paper);border:1px solid var(--line);border-radius:11px;padding:0 11px;margin-bottom:13px}.search input{border:0;outline:none;flex:1;width:100%;padding:12px 0;background:transparent;color:var(--ink);font-size:15px}
.list-head{display:flex;justify-content:space-between;align-items:center;margin:13px 0 8px}.tabs{display:flex;gap:5px}.tab{border:0;background:none;color:var(--muted);padding:7px 11px;border-radius:9px}.tab.active{background:var(--tint);color:var(--primary);font-weight:700}.count{font-size:12px;color:var(--muted)}
.notes{display:flex;flex-direction:column;gap:8px}.note{display:block;position:relative;width:100%;text-align:left;border:1px solid var(--line);background:var(--paper);border-radius:12px;padding:12px 14px;box-shadow:var(--shadow);color:var(--ink)}.note:active{background:var(--tint)}.note-title{font-weight:650;white-space:nowrap;overflow:hidden;mask-image:linear-gradient(to right,#000 88%,transparent);-webkit-mask-image:linear-gradient(to right,#000 88%,transparent)}.note-second{font-size:13px;margin-top:5px;color:var(--muted);white-space:nowrap;overflow:hidden;mask-image:linear-gradient(to right,#000 88%,transparent);-webkit-mask-image:linear-gradient(to right,#000 88%,transparent);height:20px}.note-meta{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:8px;color:var(--muted);font-size:11px}.origin{border:1px solid var(--line);border-radius:5px;padding:1px 5px}.tag{color:var(--primary)}
.empty{padding:42px 12px;text-align:center;color:var(--muted);font-size:14px}.save-indicator{font-size:12px;color:var(--muted);white-space:nowrap}.alert{color:var(--danger)!important}
.login-page{display:grid;place-items:center;min-height:100vh;padding:22px}.login{width:min(100%,390px);padding:26px}.login h1{margin:0 0 7px;font-size:27px}.login p{color:var(--muted);font-size:13px;line-height:1.6}.field{display:block;margin:18px 0 5px;font-size:13px;font-weight:650}.text-input{width:100%;padding:12px;border:1px solid var(--line);border-radius:9px;background:var(--bg);color:var(--ink);outline-color:var(--primary)}.login button{width:100%;margin-top:20px;padding:12px}.error{font-size:12px;color:var(--danger);margin-top:10px;min-height:18px}
@media(max-width:430px){.wrap{padding:12px 10px 60px}.brand{font-size:20px}.right .btn{padding:6px 8px;font-size:12px}.note{padding:11px 12px}.note-meta{gap:5px 9px;font-size:10px}}
</style>
</head>
<body>
<section id="loginPage" class="login-page hidden">
 <form id="loginForm" class="login card">
  <h1>MyNote</h1>
  <p>私人筆記 · 只需在每台裝置首次登入，後續可直接記錄。</p>
  <label class="field" for="deviceName">這台裝置的名稱</label>
  <input id="deviceName" class="text-input" maxlength="50" placeholder="例如：Android 手機" required autocomplete="nickname">
  <label class="field" for="loginCode">私人登入碼</label>
  <input id="loginCode" class="text-input" type="password" placeholder="輸入首次設定的登入碼" required autocomplete="off">
  <div id="loginError" class="error" role="alert"></div>
  <button id="loginButton" class="btn primary" type="submit">登入此裝置</button>
  <p>登入成功後會在本裝置保留長期授權。請勿在共用裝置上登入。</p>
 </form>
</section>
<section id="app" class="wrap hidden">
 <header class="top">
  <div><div class="brand">MyNote</div><div id="saveStatus" class="save-indicator" aria-live="polite">連線中…</div></div>
  <div class="right">
   <button class="btn small" id="deviceButton" title="修改裝置名稱">我的裝置</button>
   <button class="btn small ghost" id="logoutButton">登出</button>
  </div>
 </header>
 <div class="section">
  <div class="smallhead">
   <span>分類</span>
   <span class="category-tools">
    <button id="renameCategory" class="btn small ghost">重新命名</button>
    <button id="deleteCategory" class="btn small ghost danger">刪除</button>
   </span>
  </div>
  <nav class="categories" id="categoryNav" aria-label="筆記分類"></nav>
 </div>
 <div class="section card compose">
  <button id="collapsedComposer" class="collapsed">＋ 快速新增筆記…</button>
  <div id="expandedComposer" class="editor hidden">
   <div class="editor-meta" id="editorMeta"></div>
   <textarea id="noteText" spellcheck="true" placeholder="第一行就是標題，接下來直接輸入內容。每次修改自動儲存。"></textarea>
   <div class="actions">
    <div class="left">
     <span class="save-indicator" id="editorStatus">自動儲存</span>
    </div>
    <div class="right">
     <button class="btn small" id="archiveButton">封存</button>
     <button class="btn small primary" id="doneButton">完成</button>
    </div>
   </div>
  </div>
 </div>
 <div class="search"><span aria-hidden="true">⌕</span><input id="searchInput" type="search" placeholder="搜尋所有筆記內容…" autocomplete="off"></div>
 <div class="list-head"><div class="tabs"><button id="activeTab" class="tab active">目前筆記</button><button id="archiveTab" class="tab">已封存</button></div><span id="listCount" class="count"></span></div>
 <div id="noteList" class="notes"></div>
 <p class="sub" style="text-align:center;margin-top:22px">純文字 · 來源裝置專屬編輯 · 跨裝置唯讀同步</p>
</section>
<script nonce="__NONCE__">
(function () {
'use strict';
const $ = id => document.getElementById(id);
const storeName='mynote-local-v1';
let db, device, categories=[{id:'inbox',name:'隨手記'}], notes=new Map(), remoteVersion=0, selected='inbox', archivedView=false, editId=null, activeEditing=false, persistChain=Promise.resolve(), syncing=false, pulling=false, socket=null, reconnectTimer=null, initialized=false;
function setStatus(s,bad=false){$('saveStatus').textContent=s;$('saveStatus').classList.toggle('alert',bad);$('editorStatus').textContent=s;$('editorStatus').classList.toggle('alert',bad)}
function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(storeName,1);r.onupgradeneeded=()=>{const d=r.result;d.createObjectStore('notes',{keyPath:'id'});d.createObjectStore('outbox',{keyPath:'id'});d.createObjectStore('settings',{keyPath:'key'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function req(r){return new Promise((resolve,reject)=>{r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function done(t){return new Promise((resolve,reject)=>{t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||new Error('Transaction aborted'))})}
function tx(names,mode='readonly'){try{return db.transaction(names,mode,{durability:'strict'})}catch{return db.transaction(names,mode)}}
async function getAll(name){return req(tx([name]).objectStore(name).getAll())}
async function setting(key){return (await req(tx(['settings']).objectStore('settings').get(key)))?.value}
async function saveSetting(key,value){const t=tx(['settings'],'readwrite');t.objectStore('settings').put({key,value});await done(t)}
async function api(path,method='GET',data){const res=await fetch('/api'+path,{method,credentials:'same-origin',headers:data?{'content-type':'application/json'}:{},body:data?JSON.stringify(data):undefined,cache:'no-store'});let value={};try{value=await res.json()}catch{};if(!res.ok){const e=new Error(value.error||'連線失敗');e.status=res.status;throw e}return value}
function date(t){if(!t)return '—';return new Date(t).toLocaleString('zh-TW',{year:'2-digit',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false})}
function lines(content){const a=content.replace(/\r/g,'').split('\n');return [a[0]||'(無標題)',a.slice(1).find(x=>x.trim())||'　']}
function renderCategories(){
 const nav=$('categoryNav');nav.replaceChildren();
 categories.forEach(c=>{const b=document.createElement('button');b.className='chip'+(c.id===selected?' selected':'');b.textContent=c.name;b.onclick=()=>{selected=c.id;renderCategories();renderList();if(editId===null)closeEditor()};nav.append(b)});
 const plus=document.createElement('button');plus.className='chip add';plus.textContent='＋';plus.title='新增分類';plus.onclick=addCategory;nav.append(plus);
 $('deleteCategory').disabled=selected==='inbox';$('renameCategory').disabled=!categories.find(x=>x.id===selected);
}
function renderList(){
 const keyword=$('searchInput').value.trim().toLocaleLowerCase();
 const list=[...notes.values()].filter(n=>(!!n.archivedAt)===archivedView && (keyword?n.content.toLocaleLowerCase().includes(keyword):n.categoryId===selected)).sort((a,b)=>b.updatedAt-a.updatedAt);
 $('listCount').textContent=list.length+' 筆';
 $('activeTab').classList.toggle('active',!archivedView);$('archiveTab').classList.toggle('active',archivedView);
 const root=$('noteList');root.replaceChildren();
 if(!list.length){const e=document.createElement('div');e.className='empty card';e.textContent=keyword?'找不到符合的筆記':archivedView?'尚無封存筆記':'這個分類還沒有筆記';root.append(e);return}
 list.forEach(n=>{
  const el=document.createElement('button');el.className='note';el.type='button';el.onclick=()=>openEditor(n.id);
  const title=document.createElement('div');title.className='note-title';const pair=lines(n.content);title.textContent=pair[0];
  const second=document.createElement('div');second.className='note-second';second.textContent=pair[1];
  const meta=document.createElement('div');meta.className='note-meta';
  const origin=document.createElement('span');origin.className='origin';origin.textContent=n.originDeviceName||'未知裝置';
  const created=document.createElement('span');created.textContent='建立 '+date(n.createdAt);
  const updated=document.createElement('span');updated.textContent='修改 '+date(n.updatedAt);
  meta.append(origin,created,updated);
  if(n.originDeviceId!==device.deviceId){const only=document.createElement('span');only.className='tag';only.textContent='唯讀';meta.append(only)}
  if(keyword){const c=categories.find(c=>c.id===n.categoryId);if(c){const cat=document.createElement('span');cat.textContent=c.name;meta.append(cat)}}
  el.append(title,second,meta);root.append(el);
 });
}
function closeEditor(){editId=null;activeEditing=false;$('collapsedComposer').classList.remove('hidden');$('expandedComposer').classList.add('hidden');$('noteText').value='';$('noteText').readOnly=false}
function openEditor(id=null){
 editId=id;activeEditing=true;const n=id?notes.get(id):null;
 $('collapsedComposer').classList.add('hidden');$('expandedComposer').classList.remove('hidden');
 const locked=!!n&&n.originDeviceId!==device.deviceId;
 $('noteText').value=n?.content||'';$('noteText').readOnly=locked;
 $('editorMeta').textContent=locked?'來源：'+n.originDeviceName+' · 此裝置只能閱讀':n?'建立 '+date(n.createdAt)+' · 修改 '+date(n.updatedAt):'新增於「'+(categories.find(c=>c.id===selected)?.name||'隨手記')+'」';
 $('archiveButton').classList.toggle('hidden',!n||locked);
 $('archiveButton').textContent=n?.archivedAt?'取消封存':'封存';
 $('editorStatus').textContent=locked?'唯讀':'自動儲存';
 if(!locked)$('noteText').focus();
 else $('noteText').focus();
}
function onText(){
 if(!device)return;
 const content=$('noteText').value;
 let n=editId?notes.get(editId):null;
 if(n&&n.originDeviceId!==device.deviceId)return;
 if(!n){
  if(!content)return;
  editId=crypto.randomUUID();const now=Date.now();
  n={id:editId,categoryId:selected,content:'',originDeviceId:device.deviceId,originDeviceName:device.name,createdAt:now,updatedAt:now,archivedAt:null,revision:0};
 }
 n={...n,content,updatedAt:Date.now(),revision:n.revision+1};
 notes.set(n.id,n);
 $('archiveButton').classList.remove('hidden');
 renderList();saveLocal(n);
}
function saveLocal(note){
 const snapshot={...note};
 setStatus('儲存本機中…');
 persistChain=persistChain.catch(()=>{}).then(async()=>{
   const t=tx(['notes','outbox'],'readwrite');
   t.objectStore('notes').put(snapshot);
   t.objectStore('outbox').put({id:snapshot.id,note:snapshot,revision:snapshot.revision});
   await done(t);
   setStatus(navigator.onLine?'已存本機 · 待同步':'已存本機 · 離線');
 }).catch(e=>setStatus('本機儲存失敗：'+e.message,true));
 persistChain.then(()=>scheduleSync());
}
let syncTimer;
function scheduleSync(){clearTimeout(syncTimer);syncTimer=setTimeout(flush,550)}
async function flush(){
 if(syncing||!device||!navigator.onLine)return;
 syncing=true;
 try{
  await persistChain;
  const out=await getAll('outbox');
  for(const item of out.sort((a,b)=>a.note.updatedAt-b.note.updatedAt)){
   const result=await api('/note','PUT',item.note);
   const t=tx(['outbox'],'readwrite');
   const saved=await req(t.objectStore('outbox').get(item.id));
   if(saved&&saved.revision===item.revision)t.objectStore('outbox').delete(item.id);
   await done(t);
   remoteVersion=Math.max(remoteVersion,result.version||0);
  }
  if(out.length)await pull(true);
  if((await getAll('outbox')).length===0)setStatus('已同步雲端');
  else setStatus('已存本機 · 待同步')
 }catch(e){setStatus(e.status===401?'登入已過期，筆記已保存在本機':'已存本機 · 等待同步',e.status===401)}
 finally{syncing=false}
}
async function pull(force=false){
 if(pulling||!device||!navigator.onLine)return;
 pulling=true;
 try{
   const data=await api('/state?version='+(force?0:remoteVersion));
   if(data.unchanged)return;
   await persistChain;
   const pending=new Set((await getAll('outbox')).map(x=>x.id));
   categories=data.categories;
   await saveSetting('categories',categories);
   const t=tx(['notes'],'readwrite');
   data.notes.forEach(n=>{const local=notes.get(n.id);if(!pending.has(n.id)&&!(local&&local.originDeviceId===device.deviceId&&local.revision>n.revision)){notes.set(n.id,n);t.objectStore('notes').put(n)}});
   await done(t);
   remoteVersion=data.version;
   renderCategories();renderList();
 }catch(e){if(e.status===401)setStatus('登入已過期，仍可保留本機筆記',true);else setStatus('離線 · 可繼續記錄')}
 finally{pulling=false}
}
function connectSocket(){
 if(!device||!navigator.onLine)return;
 if(socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(socket.readyState))return;
 try{
  socket=new WebSocket(location.origin.replace(/^http/,'ws')+'/api/stream');
  socket.onmessage=()=>{pull(true)};
  socket.onclose=()=>{socket=null;clearTimeout(reconnectTimer);reconnectTimer=setTimeout(connectSocket,6000)};
  socket.onerror=()=>{try{socket.close()}catch{}};
 }catch{}
}
async function addCategory(){
 const name=prompt('新增分類名稱');if(!name?.trim())return;
 try{await api('/category','POST',{id:crypto.randomUUID(),name:name.trim()});await pull(true)}
 catch(e){alert('無法新增分類：'+e.message)}
}
async function renameCategory(){
 const c=categories.find(x=>x.id===selected);if(!c)return;
 const name=prompt('修改分類名稱',c.name);if(!name?.trim()||name.trim()===c.name)return;
 try{await api('/category','PATCH',{id:c.id,name:name.trim()});await pull(true)}
 catch(e){alert('無法修改分類：'+e.message)}
}
async function deleteCategory(){
 const c=categories.find(x=>x.id===selected);if(!c||c.id==='inbox')return;
 if(!confirm('確定刪除「'+c.name+'」？其中筆記將移至「隨手記」，不會刪除內容。'))return;
 try{await api('/category','DELETE',{id:c.id});selected='inbox';await pull(true)}
 catch(e){alert('無法刪除分類：'+e.message)}
}
async function archiveNote(){
 const n=editId?notes.get(editId):null;
 if(!n||n.originDeviceId!==device.deviceId)return;
 const next={...n,archivedAt:n.archivedAt?null:Date.now(),updatedAt:Date.now(),revision:n.revision+1};
 notes.set(next.id,next);saveLocal(next);closeEditor();renderList();
}
async function boot(){
 if(!db)db=await openDB();
 try{await navigator.storage?.persist?.()}catch{}
 const cachedDevice=await setting('device');
 let me;
 try{me=await api('/me')}catch(e){
  if(!navigator.onLine&&cachedDevice)me=cachedDevice;
  else {showLogin();return}
 }
 device=me;await saveSetting('device',device);
 $('loginPage').classList.add('hidden');$('app').classList.remove('hidden');$('deviceButton').textContent=device.name;
 const cachedCategories=await setting('categories');if(cachedCategories?.length)categories=cachedCategories;
 notes=new Map((await getAll('notes')).map(n=>[n.id,n]));
 renderCategories();renderList();setStatus('讀取本機資料完成');initialized=true;
 await pull(true);await flush();connectSocket();
 if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
function showLogin(){
 $('app').classList.add('hidden');$('loginPage').classList.remove('hidden');
 $('deviceName').value=localStorage.getItem('mynote-device-label')||(/Android/i.test(navigator.userAgent)?'Android 手機':'Windows 電腦');
}
$('loginForm').onsubmit=async e=>{
 e.preventDefault();$('loginButton').disabled=true;$('loginError').textContent='';
 try{
  if(!db)db=await openDB();
  const cached=await setting('device');
  const name=$('deviceName').value.trim()||'我的裝置';
  const result=await api('/login','POST',{code:$('loginCode').value,name,knownDeviceId:cached?.deviceId});
  $('loginCode').value='';
  localStorage.setItem('mynote-device-label',name);
  device=result;
  await saveSetting('device',result);
  await boot();
 }catch(e){$('loginError').textContent=e.message}
 finally{$('loginButton').disabled=false}
};
$('collapsedComposer').onclick=()=>openEditor();
$('noteText').addEventListener('input',onText);
$('doneButton').onclick=()=>{closeEditor();renderList();flush()};
$('archiveButton').onclick=archiveNote;
$('searchInput').oninput=renderList;
$('activeTab').onclick=()=>{archivedView=false;renderList()};
$('archiveTab').onclick=()=>{archivedView=true;renderList()};
$('renameCategory').onclick=renameCategory;
$('deleteCategory').onclick=deleteCategory;
$('deviceButton').onclick=async()=>{
 if(!device)return;
 const name=prompt('這台裝置名稱',device.name);if(!name?.trim()||name.trim()===device.name)return;
 try{const r=await api('/device','PATCH',{name:name.trim()});device.name=r.name;$('deviceButton').textContent=r.name;await saveSetting('device',device);await pull(true)}
 catch(e){alert('修改裝置名稱失敗：'+e.message)}
};
$('logoutButton').onclick=async()=>{
 if(!confirm('登出此裝置？尚未同步的筆記會保存在本機。'))return;
 try{await api('/logout','POST')}catch{}
 try{socket?.close()}catch{}
 device=null;showLogin();
};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){flush();pull(false);connectSocket()}else{persistChain.then(()=>flush())}});
window.addEventListener('online',()=>{setStatus('重新連線中…');flush();pull(true);connectSocket()});
window.addEventListener('offline',()=>setStatus('離線 · 已保存在本機'));
setInterval(()=>{if(document.visibilityState==='visible'){flush();pull(false)}},8000);
boot().catch(e=>{showLogin();$('loginError').textContent='初始化失敗：'+e.message});
})();
</script>
</body></html>`;