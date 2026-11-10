export const HTML = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#111a27">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="referrer" content="no-referrer">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<title>MyNote</title>
<style>
:root{color-scheme:light dark;--bg:#f5f7fa;--paper:#fff;--ink:#202833;--muted:#687585;--line:#e0e5ec;--primary:#2768aa;--tint:#eaf3fe;--danger:#ae3b3b}
@media(prefers-color-scheme:dark){:root{--bg:#10151c;--paper:#1b2531;--ink:#e9eff6;--muted:#a6b2c0;--line:#364453;--primary:#91c4ff;--tint:#233d59;--danger:#fd9292}}
*{box-sizing:border-box}html{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:14px}body{margin:0;background:var(--bg);color:var(--ink)}button,input,textarea{font:inherit;color:inherit}button{cursor:pointer}button:disabled{opacity:.45;cursor:default}.hidden{display:none!important}
.app-wrap{max-width:1800px;margin:auto;padding:0 12px}.top{height:46px;display:flex;gap:9px;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}
.brand{font-size:17px;font-weight:750;letter-spacing:-.3px}.top-right,.top-left{display:flex;align-items:center;gap:10px}.top-right{gap:6px}.status{font-size:11px;color:var(--muted)}.status.error{color:var(--danger)}
.btn,.chip,.tab,.icon-btn{border:1px solid var(--line);border-radius:8px;background:var(--paper);padding:5px 9px;line-height:1.3}.btn:hover,.chip:hover,.tab:hover,.icon-btn:hover{border-color:var(--primary)}.btn.primary,.chip.selected,.tab.active{background:var(--tint);border-color:var(--primary);color:var(--primary)}
.btn.danger{color:var(--danger)}.btn.flat,.icon-btn.flat{background:transparent;border-color:transparent}.icon-btn{width:27px;height:26px;display:grid;place-items:center;padding:0;font-size:16px}.btn:focus-visible,.chip:focus-visible,.note-head:focus-visible,.icon-btn:focus-visible{outline:2px solid var(--primary)}
.workspace{--left:185px;--right:375px;display:grid;grid-template-columns:var(--left) 5px minmax(190px,1fr) 5px var(--right);height:calc(100dvh - 46px);min-height:400px}
.sidebar,.middle,.detail{min-width:0;min-height:0;overflow-y:auto;scrollbar-width:thin}.sidebar{padding:9px 8px 8px 0}.middle{padding:9px 10px}.detail{padding:9px 0 8px 10px;border-left:1px solid var(--line)}
.splitter{width:5px;cursor:col-resize;position:relative;background:transparent;touch-action:none}.splitter:hover,.splitter.dragging{background:var(--tint)}.splitter:after{content:"";position:absolute;left:2px;top:5px;bottom:5px;width:1px;background:var(--line)}
.cat-header{height:28px;display:flex;align-items:center;justify-content:space-between;gap:4px}.minor-title{font-size:11px;letter-spacing:.04em;color:var(--muted);font-weight:650;text-transform:uppercase}
.cat-actions{display:flex;gap:1px}.categories{display:flex;flex-direction:column;gap:4px;padding:4px 0}.chip{width:100%;display:flex;align-items:center;justify-content:space-between;gap:5px;text-align:left;min-height:30px;font-size:13px}.chip .name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chip-count{font-size:11px;color:var(--muted);flex-shrink:0}.chip.selected .chip-count{color:var(--primary)}.chip.add{justify-content:center;font-size:17px;border-style:dashed}
.quick-wrap{margin-top:6px}.quick-add{width:100%;min-height:33px;text-align:left;border:1px solid var(--line);border-radius:9px;background:var(--paper);color:var(--muted);padding:7px 10px}.quick-add:hover{border-color:var(--primary)}.quick-add .symbol{color:var(--primary);font-size:18px;font-weight:500;line-height:12px;margin-right:5px}
.toolbar{display:flex;align-items:center;gap:5px;justify-content:space-between;margin-bottom:6px}.tabs{display:flex;gap:3px}.tab{display:flex;align-items:center;gap:6px;background:transparent;border-color:transparent;font-size:13px;padding:5px 8px}.tab.active{border-color:var(--line)}.tab-count{font-size:11px;opacity:.8}.tool-right{display:flex;gap:5px}.search-toggle{height:30px;width:30px}
.search-row{height:0;opacity:0;overflow:hidden;transition:height .2s ease,opacity .2s ease;margin-bottom:0}.search-row.open{height:40px;opacity:1;margin-bottom:7px}.search-input{width:100%;border:1px solid var(--line);border-radius:8px;padding:7px 10px;background:var(--paper);outline-color:var(--primary);height:34px}
.notes{display:flex;flex-direction:column;gap:5px}.note{background:var(--paper);border:1px solid var(--line);border-radius:9px;min-width:0;overflow:hidden}.note.expanded{border-color:var(--primary)}.note-head{padding:8px 9px;cursor:pointer;outline:0}.note-line{display:flex;align-items:center;gap:5px;min-width:0}.note-title{font-weight:650;min-width:0;flex:1;white-space:nowrap;overflow:hidden;mask-image:linear-gradient(to right,#000 93%,transparent);-webkit-mask-image:linear-gradient(to right,#000 93%,transparent)}.note-excerpt{margin-top:2px;color:var(--muted);font-size:12px;line-height:17px;height:17px;white-space:nowrap;overflow:hidden;mask-image:linear-gradient(to right,#000 92%,transparent);-webkit-mask-image:linear-gradient(to right,#000 92%,transparent)}.note-meta{display:flex;align-items:center;flex-wrap:wrap;gap:2px 8px;color:var(--muted);font-size:10.5px;margin-top:4px;line-height:14px}.note-meta .origin{white-space:nowrap;max-width:45%;overflow:hidden;text-overflow:ellipsis;color:var(--primary)}.note-meta .read-only{font-size:10px}.note-tools{display:flex;gap:1px;flex-shrink:0}.note.expanded .note-excerpt{display:none}
.inline-slot{padding:0 9px 9px}.empty{padding:35px 9px;text-align:center;border:1px dashed var(--line);border-radius:9px;color:var(--muted)}.editor{min-width:0;background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:9px}.inline-slot .editor{border:0;border-top:1px solid var(--line);border-radius:0;padding:9px 0 0}
.editor textarea{width:100%;min-height:180px;resize:vertical;line-height:1.5;padding:4px 1px;border:0;outline:none;background:transparent;color:var(--ink);font-size:14px}.editor pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;line-height:1.5;max-height:none;margin:4px 0 10px}.editor-top{display:flex;gap:6px;justify-content:space-between;align-items:center;color:var(--muted);font-size:11px;margin-bottom:5px}.editor-actions{display:flex;justify-content:flex-end;align-items:center;gap:6px;margin-top:7px;padding-top:7px;border-top:1px solid var(--line)}.editor-status{margin-right:auto;color:var(--muted);font-size:11px}
.detail-empty{color:var(--muted);text-align:center;padding:45px 8px;font-size:12px}.new-editor-host{margin-bottom:6px}.desktop-editor-host{min-width:0}
.login-page{display:grid;min-height:100dvh;place-items:center;padding:18px}.login{width:min(100%,360px);padding:21px;background:var(--paper);border:1px solid var(--line);border-radius:12px}.login h1{font-size:24px;margin:0 0 5px}.login p{font-size:12px;color:var(--muted)}.login label{display:block;margin-top:13px;margin-bottom:5px;font-size:12px}.text-input{width:100%;background:var(--bg);border:1px solid var(--line);padding:10px;border-radius:8px}.login .primary{width:100%;padding:10px;margin-top:18px}.error-text{font-size:12px;color:var(--danger);margin-top:8px}
@media(max-width:960px){
 .app-wrap{padding:0 8px}.top{height:42px}.top-right .btn{padding:4px 6px;font-size:11px}.brand{font-size:16px}.status{font-size:10px}
 .workspace{display:block;height:auto;min-height:0}.splitter,.detail{display:none}
 .sidebar{position:sticky;top:0;z-index:20;overflow:visible;height:111px;padding:5px 0 3px;background:var(--bg);border-bottom:1px solid var(--line);transition:height .22s ease}
 .cat-header{height:25px;transition:height .2s ease,opacity .2s ease}.categories{height:38px;flex-direction:row;overflow-x:auto;overflow-y:hidden;gap:5px;white-space:nowrap;padding:3px 0 2px;scrollbar-width:none;transition:padding-right .2s ease}.categories::-webkit-scrollbar{display:none}
 .chip{width:auto;flex-shrink:0;min-height:29px;height:29px;padding:4px 10px;gap:8px}.chip.add{min-width:33px;padding:4px 8px}
 .quick-wrap{height:37px;margin:0;transition:height .22s ease}
 .quick-add{position:absolute;top:70px;left:0;right:0;width:100%;height:33px;min-height:33px;white-space:nowrap;overflow:hidden;transition:top .22s ease,left .22s ease,right .22s ease,width .22s ease,background .2s ease}
 .sidebar.compact{height:43px;padding-top:4px}.sidebar.compact .cat-header{height:0;opacity:0;overflow:hidden}.sidebar.compact .categories{padding-right:44px}.sidebar.compact .chip.add{display:none}
 .sidebar.compact .quick-wrap{height:0}.sidebar.compact .quick-add{top:6px;left:calc(100% - 37px);right:0;width:37px;text-align:center;padding:5px 0;background:var(--tint);border-color:var(--primary)}
 .sidebar.compact .quick-add .quick-label{display:none}.sidebar.compact .quick-add .symbol{margin:0;font-size:22px;line-height:20px}
 .middle{overflow:visible;padding:6px 0 10px}.toolbar{margin-bottom:5px}.note-head{padding:7px 9px}.editor textarea{min-height:160px;font-size:16px}.search-row.open{height:40px}
}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{transition:none!important;animation:none!important}}

/* Stable panels: never detach or resize the scrolling sticky container during scroll. */
.pencil-glyph{display:inline-block;transform:scaleX(-1)}
.cat-row{position:relative;display:flex;min-width:0;align-items:center}
.cat-row>.chip{flex:1;min-width:0}
.cat-item-actions{display:none;position:absolute;right:2px;top:2px;bottom:2px;gap:1px;align-items:center;background:var(--paper);border-radius:6px}
.cat-row:hover .cat-item-actions,.cat-row:focus-within .cat-item-actions{display:flex}
.cat-item-actions .icon-btn{width:24px;height:24px;font-size:14px}
.cat-row:hover .chip-count,.cat-row:focus-within .chip-count{visibility:hidden}
@media(hover:none){.cat-item-actions{display:none!important}}
.detail-bar{height:40px;display:flex;align-items:center;position:sticky;top:-9px;z-index:3;background:var(--bg);padding:3px 0 7px}
.detail-bar>.btn{width:100%;text-align:left}
.desktop-editor-host .editor{margin-top:4px}
.note-head{display:grid;grid-template-columns:minmax(0,1fr) max-content;gap:7px;align-items:center}
.note-main{min-width:0}
.note-dates{min-width:120px;display:flex;flex-direction:column;gap:2px;text-align:right;font-size:10.5px;color:var(--muted);line-height:1.4}
.note-dates>div:empty{display:none}
.note-meta .mobile-times{display:none}
.note.expanded .note-excerpt{display:block}
.note-head:focus-visible{outline-offset:-2px}
.editor pre{overflow-wrap:anywhere;white-space:pre-wrap}
@media(min-width:961px){
 .sidebar .cat-header .cat-actions{display:none}
 .sidebar .quick-wrap{display:none}
 .search-row{height:34px;opacity:1;overflow:visible;transition:none;margin-bottom:7px}
 .search-row.open{height:34px}
 .search-toggle{display:none}
 .note-head .note-meta{margin-top:5px}
 .note-head{min-height:55px}
 .detail .editor textarea{min-height:220px}
}
@media(max-width:960px){
 .sidebar,.sidebar.compact{height:108px;top:-66px;transition:none;padding:5px 0 3px;overflow:visible}
 .sidebar .cat-header,.sidebar.compact .cat-header{height:25px;opacity:1;overflow:visible;transition:none}
 .sidebar .categories,.sidebar.compact .categories{height:38px;transform:translateY(0);transition:transform .23s ease}
 .sidebar.compact .categories{transform:translateY(36px);padding-right:45px}
 .sidebar .quick-wrap,.sidebar.compact .quick-wrap{height:37px;margin:0;transition:none}
 .sidebar .quick-add,.sidebar.compact .quick-add{top:70px;height:33px;min-height:33px}
 .sidebar.compact .quick-add{left:calc(100% - 37px);width:37px;right:0;top:70px}
 .sidebar.compact .cat-header{pointer-events:none}
 .sidebar .cat-item-actions{display:none!important}
 .sidebar .cat-row{flex-shrink:0}
 .sidebar .cat-row>.chip{flex-shrink:0}
 .note-head{display:block}
 .note-dates{display:none}
 .note-meta .mobile-times{display:inline}
 .note.expanded>.note-head{display:none}
 .note.expanded>.inline-slot{padding:0 9px 8px}
 .note.expanded .inline-slot .editor{border-top:0;padding-top:7px}
 .note.expanded .note-excerpt{display:none}
 .search-row{height:0}
 .search-row.open{height:40px}
}

/* Remove empty preview rows and keep mobile cards dense. */
.note-excerpt:empty{display:none}
@media(max-width:960px){
 .notes{gap:4px}
 .note-head{padding:6px 8px}
 .note-excerpt{margin-top:1px;height:auto;line-height:16px}
 .note-meta{margin-top:3px}
 .inline-slot{padding:0 8px 7px}
}
</style>
</head>
<body>
<section id="loginPage" class="login-page hidden">
<form id="loginForm" class="login">
<h1>MyNote</h1><p>Private notes</p>
<label for="deviceName">Device name</label><input id="deviceName" class="text-input" maxlength="50" placeholder="Android phone" autocomplete="nickname" required>
<label for="loginCode">Access code</label><input id="loginCode" class="text-input" type="password" autocomplete="off" required>
<div id="loginError" class="error-text" role="alert"></div><button id="loginButton" class="btn primary" type="submit">Sign in</button>
</form>
</section>
<div id="app" class="app-wrap hidden">
<header class="top">
<div class="top-left"><strong class="brand">MyNote</strong><span id="saveStatus" class="status" aria-live="polite"></span></div>
<div class="top-right"><button id="deviceButton" class="btn flat">Device</button><button id="logoutButton" class="btn flat">Sign out</button></div>
</header>
<main class="workspace" id="workspace">
<aside class="sidebar" id="sidebar">
 <div class="cat-header"><span class="minor-title">Categories</span><div class="cat-actions"><button id="renameCategory" class="icon-btn flat" title="Rename category (Alt+R)" aria-label="Rename category"><span class="pencil-glyph">✎</span></button><button id="deleteCategory" class="icon-btn flat" title="Delete category (Alt+Delete)" aria-label="Delete category">×</button></div></div>
 <nav id="categoryNav" class="categories" aria-label="Categories"></nav>
 <div class="quick-wrap"><button id="quickAdd" class="quick-add" title="New note (Alt+N)"><span class="symbol">+</span><span class="quick-label">New note</span></button></div>
</aside>
<div id="splitLeft" class="splitter" title="Drag to resize"></div>
<section class="middle">
<div class="toolbar">
<div class="tabs"><button id="activeTab" class="tab active" title="Current notes (Alt+1)">Current <span id="activeCount" class="tab-count">0</span></button><button id="archiveTab" class="tab" title="Archived notes (Alt+2)">Archive <span id="archiveCount" class="tab-count">0</span></button></div>
<div class="tool-right"><button id="searchToggle" class="icon-btn search-toggle" title="Search (Ctrl+K)" aria-label="Search">⌕</button></div>
</div>
<div id="searchRow" class="search-row"><input id="searchInput" class="search-input" type="search" placeholder="Search text or date" autocomplete="off"></div>
<div id="newEditorHost" class="new-editor-host"></div>
<div id="noteList" class="notes"></div>
</section>
<div id="splitRight" class="splitter" title="Drag to resize"></div>
<aside id="detail" class="detail"><div class="detail-bar"><button id="desktopNew" class="btn primary" title="New note (Alt+N)">+ New note</button></div><div id="desktopEditorHost" class="desktop-editor-host"></div><div id="detailEmpty" class="detail-empty"></div></aside>
</main>
<div id="expandedEditor" class="editor hidden">
<div class="editor-top"><span id="editorMeta"></span><span id="editorType"></span></div>
<textarea id="noteText" placeholder="Type here…"></textarea>
<pre id="readOnlyFull" class="hidden"></pre>
<div class="editor-actions"><span id="editorStatus" class="editor-status"></span><button id="archiveButton" class="btn hidden">Archive</button><button id="doneButton" class="btn primary" title="Close (Esc / Ctrl+Enter)">Close</button></div>
</div>
</div>
<script nonce="__NONCE__">
(function(){
'use strict';
const $=id=>document.getElementById(id);
const isDesktop=()=>window.matchMedia('(min-width:961px)').matches;
const dayMs=86400000;
let db=null,device=null,categories=[{id:'inbox',name:'Inbox'}],notes=new Map(),remoteVersion=0,selected='inbox',archivedView=false,editId=null,editing=false,editingDraft=false,persistChain=Promise.resolve(),syncing=false,pulling=false,socket=null,reconnectTimer,searchOpen=false,ready=false;
let syncTimer, resendNeeded=false, localSaveError=null;
const WEEK=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function status(message,error=false){$('saveStatus').textContent=message;$('saveStatus').title=message;$('saveStatus').classList.toggle('error',error);$('editorStatus').textContent=editing&&editId&&notes.get(editId)?.originDeviceId===device?.deviceId?message:'';}
function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open('mynote-local-v1',2);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('notes'))d.createObjectStore('notes',{keyPath:'id'});if(!d.objectStoreNames.contains('outbox'))d.createObjectStore('outbox',{keyPath:'id'});if(!d.objectStoreNames.contains('settings'))d.createObjectStore('settings',{keyPath:'key'});if(!d.objectStoreNames.contains('archiveOutbox'))d.createObjectStore('archiveOutbox',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function req(r){return new Promise((resolve,reject)=>{r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function done(t){return new Promise((resolve,reject)=>{t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||Error('Transaction aborted'))})}
function tx(names,mode='readonly'){try{return db.transaction(names,mode,{durability:'strict'})}catch{return db.transaction(names,mode)}}
async function getAll(name){return req(tx([name]).objectStore(name).getAll())}
async function setting(key){return (await req(tx(['settings']).objectStore('settings').get(key)))?.value}
async function saveSetting(key,value){const t=tx(['settings'],'readwrite');t.objectStore('settings').put({key,value});await done(t)}
async function api(path,method='GET',body){const r=await fetch('/api'+path,{method,credentials:'same-origin',headers:body?{'content-type':'application/json'}:{},body:body?JSON.stringify(body):undefined,cache:'no-store'});let j={};try{j=await r.json()}catch{};if(!r.ok){const e=Error(j.error||'Request failed');e.status=r.status;throw e}return j}
function sameDay(a,b){return new Date(a).toDateString()===new Date(b).toDateString()}
function sameMinute(a,b){return Math.floor(a/60000)===Math.floor(b/60000)}
function stamp(ts,withDate=true){
 if(!ts)return '';
 const d=new Date(ts),time=d.getHours()+':'+d.getMinutes();
 if(!withDate)return time;
 const year=d.getFullYear()!==new Date().getFullYear()?d.getFullYear()+'/':'';
 return year+(d.getMonth()+1)+'/'+d.getDate()+'('+WEEK[d.getDay()]+') '+time;
}
function metaText(n){let s='Created '+stamp(n.createdAt);if(!sameMinute(n.createdAt,n.updatedAt))s+=' · Edited '+stamp(n.updatedAt,!sameDay(n.createdAt,n.updatedAt));return s}
function dateTokens(ts){
 if(!ts)return '';
 const d=new Date(ts),y=d.getFullYear(),m=d.getMonth()+1,day=d.getDate(),w=WEEK[d.getDay()];
 const mm=String(m).padStart(2,'0'),dd=String(day).padStart(2,'0');
 return [stamp(ts),y+'/'+m+'/'+day,y+'/'+mm+'/'+dd,y+'-'+mm+'-'+dd,m+'/'+day,mm+'/'+dd,m+'/'+dd,mm+'/'+day,m+'-'+day,m+'.'+day,y+'年'+m+'月'+day+'日',w,d.getHours()+':'+d.getMinutes()].join(' ').toLowerCase();
}
function searchMatches(n,q){if(!q)return true;return (n.content+' '+n.originDeviceName+' '+dateTokens(n.createdAt)+' '+dateTokens(n.updatedAt)).toLowerCase().includes(q)}
function firstLines(value){const a=String(value||'').replace(/\r/g,'').split('\n');return [a[0]||'(Untitled)',a[1]||'']}
function counts(){
 const q=$('searchInput').value.trim().toLowerCase();
 const filtered=[...notes.values()].filter(n=>searchMatches(n,q)&&(q||n.categoryId===selected));
 return {current:filtered.filter(n=>!n.archivedAt).length,archive:filtered.filter(n=>!!n.archivedAt).length};
}
function renderCategories(){
 const nav=$('categoryNav');
 const scrollLeft=nav.scrollLeft;
 nav.replaceChildren();
 for(const c of categories){
  const row=document.createElement('div');
  row.className='cat-row';
  const b=document.createElement('button');
  b.type='button';b.className='chip'+(c.id===selected?' selected':'');
  b.title='Select '+c.name;b.setAttribute('aria-label','Category '+c.name);
  const name=document.createElement('span');name.className='name';name.textContent=c.name;
  const count=document.createElement('span');count.className='chip-count';
  count.textContent=[...notes.values()].filter(n=>n.categoryId===c.id&&!n.archivedAt).length;
  b.append(name,count);
  b.onclick=()=>{if(selected!==c.id){if(editing)closeEditor();selected=c.id;renderCategories();renderList(true)}};
  row.append(b);
  const tools=document.createElement('div');tools.className='cat-item-actions';
  const edit=document.createElement('button');edit.type='button';edit.className='icon-btn flat';edit.title='Rename '+c.name+' (Alt+R)';
  edit.innerHTML='<span class="pencil-glyph">✎</span>';
  edit.setAttribute('aria-label','Rename '+c.name);
  edit.onclick=e=>{e.stopPropagation();renameCategory(c.id)};
  const del=document.createElement('button');del.type='button';del.className='icon-btn flat';
  del.title='Delete '+c.name+' (Alt+Delete)';del.setAttribute('aria-label','Delete '+c.name);
  del.textContent='×';del.disabled=c.id==='inbox';
  del.onclick=e=>{e.stopPropagation();deleteCategory(c.id)};
  tools.append(edit,del);row.append(tools);nav.append(row);
 }
 const plus=document.createElement('button');plus.className='chip add';plus.textContent='+';
 plus.type='button';plus.title='Add category (Alt+C)';plus.setAttribute('aria-label','Add category');
 plus.onclick=addCategory;nav.append(plus);
 nav.scrollLeft=scrollLeft;
 $('deleteCategory').disabled=selected==='inbox';
 $('renameCategory').disabled=!categories.some(c=>c.id===selected);
}
function renderList(force=false){
 const q=$('searchInput').value.trim().toLowerCase(),c=counts();
 $('activeCount').textContent=c.current;$('archiveCount').textContent=c.archive;
 $('activeTab').classList.toggle('active',!archivedView);$('archiveTab').classList.toggle('active',archivedView);
 // Preserve the editor and keyboard across autosaves, WebSocket events, and polling.
 if(editing&&!force){
  if(editId){const n=notes.get(editId);if(n)updateVisibleNote(n)}
  return;
 }
 const list=[...notes.values()].filter(n=>(!!n.archivedAt)===archivedView&&(q?searchMatches(n,q):n.categoryId===selected)).sort((a,b)=>b.updatedAt-a.updatedAt);
 const root=$('noteList');
 // Only opening/closing notes or changing views may rebuild the list.
 if(!isDesktop()&&$('expandedEditor').parentElement?.classList.contains('inline-slot')){
  $('expandedEditor').classList.add('hidden');
  $('newEditorHost').append($('expandedEditor'));
 }
 root.replaceChildren();
 if(!list.length){
  const empty=document.createElement('div');empty.className='empty';
  empty.textContent=q?'No results':archivedView?'No archived notes':'No notes';
  root.append(empty);
 }
 for(const n of list){
  const article=document.createElement('article');
  article.className='note'+(editId===n.id&&editing?' expanded':'');article.dataset.id=n.id;
  const head=document.createElement('div');head.className='note-head';head.tabIndex=0;head.setAttribute('role','button');
  head.setAttribute('aria-expanded',String(editId===n.id&&editing));
  head.title='Open note (Enter)';
  head.onclick=()=>{if(editing&&editId===n.id){closeEditor();return}openEditor(n.id)};
  head.onkeydown=e=>{if(e.target!==head)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();head.click()}};
  const main=document.createElement('div');main.className='note-main';
  const line=document.createElement('div');line.className='note-line';
  const title=document.createElement('div');title.className='note-title';title.textContent=firstLines(n.content)[0];
  const tools=document.createElement('div');tools.className='note-tools';
  const archive=document.createElement('button');archive.className='icon-btn flat';archive.type='button';
  archive.title=(n.archivedAt?'Restore':'Archive')+' (Alt+A)';
  archive.setAttribute('aria-label',n.archivedAt?'Restore note':'Archive note');
  archive.textContent=n.archivedAt?'↶':'▣';
  archive.onclick=e=>{e.stopPropagation();archiveNote(n.id)};tools.append(archive);
  line.append(title,tools);
  const excerpt=document.createElement('div');excerpt.className='note-excerpt';excerpt.textContent=firstLines(n.content)[1];
  const metadata=document.createElement('div');metadata.className='note-meta';
  const origin=document.createElement('span');origin.className='origin';origin.textContent=n.originDeviceName||'Unknown';
  const mobileTimes=document.createElement('span');mobileTimes.className='mobile-times';mobileTimes.textContent=metaText(n);
  metadata.append(origin,mobileTimes);
  if(n.originDeviceId!==device.deviceId){
   const ro=document.createElement('span');ro.className='read-only';ro.textContent='Read only';metadata.append(ro);
  }
  if(q){const cat=categories.find(x=>x.id===n.categoryId);if(cat){
   const catName=document.createElement('span');catName.textContent=cat.name;metadata.append(catName);
  }}
  main.append(line,excerpt,metadata);
  const dates=document.createElement('div');dates.className='note-dates';
  const created=document.createElement('div');created.className='date-created';created.textContent='Created '+stamp(n.createdAt);
  const edited=document.createElement('div');edited.className='date-edited';
  edited.textContent=sameMinute(n.createdAt,n.updatedAt)?'':'Edited '+stamp(n.updatedAt,!sameDay(n.createdAt,n.updatedAt));
  dates.append(created,edited);
  head.append(main,dates);article.append(head);
  const slot=document.createElement('div');slot.className='inline-slot';slot.id='slot-'+n.id;
  article.append(slot);root.append(article);
 }
 positionEditor();
}
function positionEditor(){
 const editor=$('expandedEditor');
 if(!editing){
  editor.classList.add('hidden');
  $('detailEmpty').classList.remove('hidden');
  return;
 }
 let host;
 if(isDesktop())host=$('desktopEditorHost');
 else if(editId)host=document.getElementById('slot-'+editId)||$('newEditorHost');
 else host=$('newEditorHost');
 // append() on an existing focused textarea can dismiss Android's keyboard.
 if(editor.parentElement!==host)host.append(editor);
 editor.classList.remove('hidden');
 $('detailEmpty').classList.add('hidden');
}
function closeEditor(){
 editing=false;editId=null;editingDraft=false;
 $('expandedEditor').classList.add('hidden');
 // Detach before rebuilding notes, never during text input.
 if(!isDesktop()&&$('expandedEditor').parentElement?.classList.contains('inline-slot')){
  $('newEditorHost').append($('expandedEditor'));
 }
 renderList(true);
 if(isDesktop())openEditor(null,false);
 else positionEditor();
 flush();
}
function openEditor(id=null,focus=true){
 if(editing&&editId===id)return;
 editing=true;editId=id;editingDraft=!id;
 const n=id?notes.get(id):null;
 const readOnly=!!n&&n.originDeviceId!==device.deviceId;
 $('noteText').value=n?.content||'';
 $('noteText').classList.toggle('hidden',readOnly);
 $('readOnlyFull').classList.toggle('hidden',!readOnly);
 $('readOnlyFull').textContent=n?.content||'';
 $('editorMeta').textContent=n?metaText(n):'New note';
 $('editorType').textContent=readOnly?'Read only':'';
 $('archiveButton').classList.toggle('hidden',!n);
 $('archiveButton').textContent=n?.archivedAt?'Restore':'Archive';
 $('editorStatus').textContent=readOnly?'':'Autosave';
 renderList(true);
 if(!readOnly&&focus){
  if(!isDesktop()&&!id)$('newEditorHost').scrollIntoView({block:'nearest'});
  $('noteText').focus({preventScroll:true});
 }
}
function updateVisibleNote(n){
 const el=[...document.querySelectorAll('.note')].find(x=>x.dataset.id===n.id);
 if(!el)return;
 const first=firstLines(n.content);
 const title=el.querySelector('.note-title'),excerpt=el.querySelector('.note-excerpt');
 if(title)title.textContent=first[0];
 if(excerpt)excerpt.textContent=first[1];
 const mobile=el.querySelector('.mobile-times');if(mobile)mobile.textContent=metaText(n);
 const created=el.querySelector('.date-created');if(created)created.textContent='Created '+stamp(n.createdAt);
 const edited=el.querySelector('.date-edited');
 if(edited)edited.textContent=sameMinute(n.createdAt,n.updatedAt)?'':'Edited '+stamp(n.updatedAt,!sameDay(n.createdAt,n.updatedAt));
}
function persistNote(note,archive=false){
 const snapshot={...note};
 status('Saving locally…');
 persistChain=persistChain.catch(()=>{}).then(async()=>{
  const stores=archive?['notes','archiveOutbox']:['notes','outbox'];
  const t=tx(stores,'readwrite');
  t.objectStore('notes').put(snapshot);
  if(archive)t.objectStore('archiveOutbox').put({id:snapshot.id,archived:!!snapshot.archivedAt});
  else t.objectStore('outbox').put({id:snapshot.id,note:snapshot,revision:snapshot.revision});
  await done(t);localSaveError=null;status(navigator.onLine?'Saved locally · Sync pending':'Saved locally · Offline');scheduleSync();
 }).catch(e=>{localSaveError=e;status('Local save failed: '+e.message,true)});
}
function onText(){
 if(!device||!editing)return;
 const content=$('noteText').value;
 let n=editId?notes.get(editId):null;
 if(n&&n.originDeviceId!==device.deviceId)return;
 const isNew=!n;
 if(isNew){
  if(!content)return;
  const now=Date.now();editId=crypto.randomUUID();
  n={id:editId,categoryId:selected,content:'',originDeviceId:device.deviceId,originDeviceName:device.name,createdAt:now,updatedAt:now,archivedAt:null,revision:0};
  editingDraft=false;
 }
 n={...n,content,updatedAt:Date.now(),revision:n.revision+1};
 notes.set(n.id,n);
 persistNote(n);
 $('archiveButton').classList.remove('hidden');
 $('editorMeta').textContent=metaText(n);
 updateVisibleNote(n);
 // Update numbers without recreating the navigation or active editor.
 if(isNew){
  renderCategories();
  const countsNow=counts();$('activeCount').textContent=countsNow.current;$('archiveCount').textContent=countsNow.archive;
 }
}
function scheduleSync(){clearTimeout(syncTimer);syncTimer=setTimeout(flush,500)}
async function flush(){
 if(syncing){resendNeeded=true;return}
 if(!device||!navigator.onLine)return;
 syncing=true;
 try{
  await persistChain;
  if(localSaveError)return;
  const out=await getAll('outbox');
  for(const item of out.sort((a,b)=>a.note.updatedAt-b.note.updatedAt)){
   await api('/note','PUT',item.note);
   const t=tx(['outbox'],'readwrite'),os=t.objectStore('outbox');
   const latest=await req(os.get(item.id));
   if(latest&&latest.revision===item.revision)os.delete(item.id);
   await done(t);
  }
  const archived=await getAll('archiveOutbox');
  for(const item of archived){
   const result=await api('/archive','PATCH',{id:item.id,archived:item.archived});
   const t=tx(['archiveOutbox','notes'],'readwrite'),os=t.objectStore('archiveOutbox');
   const latest=await req(os.get(item.id));
   if(latest&&latest.archived===item.archived){
    os.delete(item.id);
    const local=await req(t.objectStore('notes').get(item.id));
    if(local&&!!local.archivedAt===item.archived){
     local.archivedAt=result.archivedAt;
     t.objectStore('notes').put(local);
     if(notes.has(item.id))notes.set(item.id,local);
    }
   }
   await done(t);
  }
  if(out.length||archived.length)await pull(true);
  const still=(await getAll('outbox')).length+(await getAll('archiveOutbox')).length;
  status(still?'Saved locally · Sync pending':'Synced');
 }catch(e){const m=e.status?'Sync '+e.status+': '+e.message:'Sync error: '+e.message;status(m,true);}
 finally{syncing=false;if(resendNeeded){resendNeeded=false;clearTimeout(syncTimer);syncTimer=setTimeout(flush,350)}}
}
async function pull(force=false){
 if(pulling||!device||!navigator.onLine)return;
 pulling=true;
 try{
  const data=await api('/state?version='+(force?0:remoteVersion));
  if(data.unchanged)return;
  await persistChain;
  const contentPending=new Set((await getAll('outbox')).map(x=>x.id));
  const archivePending=new Map((await getAll('archiveOutbox')).map(x=>[x.id,x.archived]));
  categories=data.categories||categories;
  await saveSetting('categories',categories);
  const t=tx(['notes'],'readwrite');
  for(const remote of data.notes||[]){
   const local=notes.get(remote.id);
   let n=remote;
   if(local&&contentPending.has(remote.id))n={...remote,...local,archivedAt:remote.archivedAt};
   if(local&&archivePending.has(remote.id))n={...n,archivedAt:local.archivedAt};
   if(local&&local.originDeviceId===device.deviceId&&local.revision>remote.revision)n={...remote,...local,archivedAt:archivePending.has(remote.id)?local.archivedAt:remote.archivedAt};
   notes.set(n.id,n);t.objectStore('notes').put(n);
  }
  await done(t);remoteVersion=data.version;
  renderCategories();
  if(editing&&editId&&!contentPending.has(editId)){
   const n=notes.get(editId);
   if(n){if(n.originDeviceId!==device.deviceId){$('readOnlyFull').textContent=n.content;$('editorMeta').textContent=metaText(n)}$('archiveButton').textContent=n.archivedAt?'Restore':'Archive'}
  }
  renderList();
 }catch(e){status(e.status?'Refresh '+e.status+': '+e.message:'Offline',!!e.status)}
 finally{pulling=false}
}
async function archiveNote(id){
 const n=notes.get(id);if(!n)return;
 const next={...n,archivedAt:n.archivedAt?null:Date.now()};
 notes.set(id,next);persistNote(next,true);
 if(editing&&editId===id)closeEditor();
 renderCategories();renderList();
}
async function addCategory(){
 const name=prompt('Category name');if(!name?.trim())return;
 try{await api('/category','POST',{id:crypto.randomUUID(),name:name.trim()});await pull(true)}catch(e){alert(e.message)}
}
async function renameCategory(id=selected){
 const c=categories.find(c=>c.id===id);if(!c)return;
 const name=prompt('Rename category',c.name);if(!name?.trim()||name.trim()===c.name)return;
 try{await api('/category','PATCH',{id:c.id,name:name.trim()});await pull(true)}catch(e){alert(e.message)}
}
async function deleteCategory(id=selected){
 const c=categories.find(c=>c.id===id);if(!c||c.id==='inbox')return;
 if(!confirm('Delete '+c.name+'? Notes will move to Inbox.'))return;
 try{await api('/category','DELETE',{id:c.id});if(selected===c.id)selected='inbox';await pull(true)}catch(e){alert(e.message)}
}
function connectSocket(){
 if(!device||!navigator.onLine)return;
 if(socket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(socket.readyState))return;
 try{
  socket=new WebSocket(location.origin.replace(/^http/,'ws')+'/api/stream');
  socket.onmessage=()=>pull(true);
  socket.onclose=()=>{socket=null;clearTimeout(reconnectTimer);reconnectTimer=setTimeout(connectSocket,6000)};
  socket.onerror=()=>{try{socket.close()}catch{}};
 }catch{}
}
function setSearchOpen(value){
 if(isDesktop()){searchOpen=true;$('searchRow').classList.add('open');$('searchInput').focus();return}
 searchOpen=value;$('searchRow').classList.toggle('open',searchOpen);$('searchToggle').textContent=searchOpen?'×':'⌕';$('searchToggle').title=searchOpen?'Close search':'Search';
 if(searchOpen)$('searchInput').focus();else{$('searchInput').value='';renderList()}
}
function updateSticky(){
 if(isDesktop()){
  $('sidebar').classList.remove('compact');
  return;
 }
 // Hysteresis + constant sidebar dimensions prevent scroll-position oscillation.
 const compact=$('sidebar').classList.contains('compact');
 if(!compact&&window.scrollY>105)$('sidebar').classList.add('compact');
 else if(compact&&window.scrollY<55)$('sidebar').classList.remove('compact');
}
function initSplitter(id,side){
 const el=$(id);let start=0,startVal=0;
 el.addEventListener('pointerdown',e=>{if(!isDesktop())return;e.preventDefault();el.setPointerCapture(e.pointerId);el.classList.add('dragging');start=e.clientX;startVal=parseInt(getComputedStyle($('workspace')).getPropertyValue(side==='left'?'--left':'--right'))|| (side==='left'?185:375);document.body.style.userSelect='none'});
 el.addEventListener('pointermove',e=>{if(!el.hasPointerCapture(e.pointerId))return;const w=$('workspace').clientWidth;const other=parseInt(getComputedStyle($('workspace')).getPropertyValue(side==='left'?'--right':'--left'))|| (side==='left'?375:185);const delta=e.clientX-start;const next=Math.min(Math.max(side==='left'?140:230,startVal+(side==='left'?delta:-delta)),Math.max(side==='left'?140:230,w-other-280));$('workspace').style.setProperty(side==='left'?'--left':'--right',next+'px')});
 function finish(e){if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);el.classList.remove('dragging');document.body.style.userSelect='';const value=getComputedStyle($('workspace')).getPropertyValue(side==='left'?'--left':'--right').trim();if(value)localStorage.setItem('mynote-pane-'+side,value)}
 el.addEventListener('pointerup',finish);el.addEventListener('pointercancel',finish);
}
function restorePanes(){for(const side of ['left','right']){const val=localStorage.getItem('mynote-pane-'+side);if(/^\d{2,4}px$/.test(val||''))$('workspace').style.setProperty('--'+side,val)}}
function showLogin(){
 $('app').classList.add('hidden');$('loginPage').classList.remove('hidden');$('deviceName').value=localStorage.getItem('mynote-device-label')||(/Android/i.test(navigator.userAgent)?'Android phone':'Windows PC');
}
async function boot(){
 if(!db)db=await openDB();
 try{await navigator.storage?.persist?.()}catch{}
 const cached=await setting('device');
 let me;
 try{me=await api('/me')}catch(e){if(!navigator.onLine&&cached)me=cached;else{showLogin();return}}
 device=me;await saveSetting('device',device);
 $('loginPage').classList.add('hidden');$('app').classList.remove('hidden');$('deviceButton').textContent=device.name;
 const savedCategories=await setting('categories');if(savedCategories?.length)categories=savedCategories;
 notes=new Map((await getAll('notes')).map(n=>[n.id,n]));
 renderCategories();renderList();status('Local ready');ready=true;
 await pull(true);await flush();connectSocket();if(isDesktop())openEditor(null,false);
 if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
$('loginForm').onsubmit=async e=>{
 e.preventDefault();$('loginButton').disabled=true;$('loginError').textContent='';
 try{
  if(!db)db=await openDB();
  const cached=await setting('device'),name=$('deviceName').value.trim()||'My device';
  const result=await api('/login','POST',{code:$('loginCode').value,name,knownDeviceId:cached?.deviceId});
  $('loginCode').value='';localStorage.setItem('mynote-device-label',name);
  device=result;await saveSetting('device',result);await boot();
 }catch(e){$('loginError').textContent=e.message}finally{$('loginButton').disabled=false}
};
$('quickAdd').onclick=()=>openEditor(null);
$('desktopNew').onclick=()=>openEditor(null);
$('noteText').addEventListener('input',onText);
$('archiveButton').onclick=()=>{if(editId)archiveNote(editId)};
$('archiveButton').title='Archive / restore (Alt+A)';
$('doneButton').onclick=closeEditor;
$('renameCategory').onclick=()=>renameCategory();
$('deleteCategory').onclick=()=>deleteCategory();
$('searchToggle').onclick=()=>setSearchOpen(!searchOpen);
$('searchInput').oninput=()=>{if(editing)closeEditor();renderList(true)};
$('searchInput').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();if(isDesktop()){$('searchInput').blur()}else setSearchOpen(false)}});
$('activeTab').onclick=()=>{if(editing)closeEditor();archivedView=false;renderList(true)};
$('archiveTab').onclick=()=>{if(editing)closeEditor();archivedView=true;renderList(true)};
$('deviceButton').onclick=async()=>{
 if(!device)return;
 const name=prompt('Device name',device.name);if(!name?.trim()||name.trim()===device.name)return;
 try{const r=await api('/device','PATCH',{name:name.trim()});device.name=r.name;$('deviceButton').textContent=r.name;await saveSetting('device',device);await pull(true)}catch(e){alert(e.message)}
};
$('logoutButton').onclick=async()=>{if(!confirm('Sign out? Unsynced data stays on this device.'))return;try{await api('/logout','POST')}catch{};try{socket?.close()}catch{};device=null;showLogin()};
function moveNote(delta,activate){
 const heads=[...document.querySelectorAll('.note-head')];
 if(!heads.length)return;
 const ids=heads.map(h=>h.closest('.note')?.dataset.id);
 let index=ids.indexOf(editId);
 if(index<0)index=heads.findIndex(h=>h===document.activeElement);
 const next=(index+delta+heads.length)%heads.length;
 if(activate)openEditor(ids[next]);
 else heads[next].focus();
}
document.addEventListener('keydown',e=>{
 if(!ready||!isDesktop()||e.isComposing)return;
 const key=e.key.toLowerCase();
 const target=e.target;
 const isText=target instanceof HTMLElement&&!!target.closest('input,textarea,[contenteditable="true"]');
 if((e.ctrlKey||e.metaKey)&&!e.altKey&&key==='k'){
  e.preventDefault();setSearchOpen(true);return;
 }
 if((e.ctrlKey||e.metaKey)&&!e.altKey&&key==='s'){
  e.preventDefault();flush();return;
 }
 if((e.ctrlKey||e.metaKey)&&key==='enter'&&editing){
  e.preventDefault();closeEditor();return;
 }
 if(e.key==='Escape'){
  if(target===$('searchInput')){$('searchInput').blur();return}
  if(editing){e.preventDefault();closeEditor()}return;
 }
 if(e.altKey&&!e.ctrlKey&&!e.metaKey){
  let handled=true;
  switch(key){
   case 'n':openEditor(null);break;
   case '1':$('activeTab').click();break;
   case '2':$('archiveTab').click();break;
   case 'c':addCategory();break;
   case 'r':renameCategory();break;
   case 'delete':deleteCategory();break;
   case 'a':if(editId)archiveNote(editId);else handled=false;break;
   case 'arrowdown':moveNote(1,true);break;
   case 'arrowup':moveNote(-1,true);break;
   default:handled=false;
  }
  if(handled){e.preventDefault();return}
 }
 if(!isText&&!e.ctrlKey&&!e.altKey&&!e.metaKey){
  if(key==='/'||key==='f'){e.preventDefault();setSearchOpen(true)}
  if((key==='arrowdown'||key==='arrowup')&&target.classList?.contains('note-head')){
   e.preventDefault();moveNote(key==='arrowdown'?1:-1,false);
  }
 }
});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){flush();pull(false);connectSocket()}else persistChain.then(()=>flush())});
window.addEventListener('online',()=>{status('Connecting…');flush();pull(true);connectSocket()});
window.addEventListener('offline',()=>status('Offline · Saved locally'));
window.addEventListener('scroll',updateSticky,{passive:true});
window.addEventListener('resize',()=>{updateSticky();if(isDesktop()&&!editing)openEditor(null,false);else positionEditor()});
setInterval(()=>{if(document.visibilityState==='visible'){flush();pull(false)}},8000);
restorePanes();initSplitter('splitLeft','left');initSplitter('splitRight','right');updateSticky();
boot().catch(e=>{showLogin();$('loginError').textContent='Initialization failed: '+e.message});
})();
</script>
</body></html>`;
