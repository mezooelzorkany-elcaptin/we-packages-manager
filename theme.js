// CASH BACK — theme + navigation
(function(){
const U='https://pgvbynefhqmyzjtccttl.supabase.co',K='sb_publishable_RMNG3j5xrijQx3HcbfEkbQ_wZkoJGrY',ADMIN='mezooelzorkany@gmail.com',themeKey='cashback-theme',ordersResetKey='cashback-orders-reset-at';
function setupTheme(){
const saved=localStorage.getItem(themeKey)||localStorage.getItem('app_theme')||'dark';
document.documentElement.classList.toggle('dark-mode',saved==='dark');
if(saved==='dark')document.body.classList.add('dark-mode');
const b=document.getElementById('theme-toggle');
const i=document.getElementById('theme-icon');
const sync=()=>{const d=document.documentElement.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',d);if(i)i.textContent=d?'☀️':'🌙';if(b)b.setAttribute('aria-label',d?'تفعيل الوضع الفاتح':'تفعيل الوضع الداكن')};
sync();
if(b&&!b.dataset.themeBound){b.dataset.themeBound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const d=!document.documentElement.classList.contains('dark-mode');document.documentElement.classList.toggle('dark-mode',d);document.body.classList.toggle('dark-mode',d);localStorage.setItem(themeKey,d?'dark':'light');localStorage.setItem('app_theme',d?'dark':'light');sync()},true)}
}
function setupNavigation(){document.querySelectorAll('a[href]').forEach(a=>a.removeAttribute('data-cb-navigation-hijack'))}
function styleAdminNavigation(){if(document.getElementById('cashback-admin-nav-responsive-style'))return;const s=document.createElement('style');s.id='cashback-admin-nav-responsive-style';s.textContent=`
/* CASH BACK navigation: stable on laptop and smaller screens */
@media(min-width:651px){
  .side{display:flex;flex-direction:column;overflow:hidden}
  .side .logo{flex:0 0 145px;height:145px}
  .side .nav{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:10px 12px 82px}
  .side .nav a{gap:10px;padding:11px 12px;margin:4px 0;min-height:42px;line-height:1.25}
  .side .nav a span{min-width:0;overflow-wrap:anywhere}
}
@media(max-height:760px) and (min-width:651px){
  .side .logo{flex-basis:112px;height:112px}
  .side .nav{padding-top:7px}
  .side .nav a{padding:8px 10px;margin:3px 0;min-height:37px;font-size:14px}
}
#adminBottomNav{box-sizing:border-box;gap:clamp(3px,.65vw,10px);padding-left:clamp(5px,1vw,18px);padding-right:clamp(5px,1vw,18px)}
#adminBottomNav a{flex:1 1 0;min-width:0;max-width:none;padding:3px;text-align:center}
#adminBottomNav .navText{white-space:normal;overflow-wrap:anywhere;text-align:center;line-height:1.2}
@media(min-width:651px) and (max-width:1100px){
  #adminBottomNav{min-height:88px;height:88px}
  #adminBottomNav a{height:72px;gap:3px}
  #adminBottomNav .navIcon{width:35px;height:35px;font-size:23px}
  #adminBottomNav .navText{font-size:10px}
}
@media(max-width:650px){
  #adminBottomNav{justify-content:flex-start;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}
  #adminBottomNav a{flex:0 0 86px}
  #adminBottomNav .navText{font-size:10px}
}`;document.head.appendChild(s)}
/* Strong, consistent black-and-gold palette across admin pages */
function setupConsistentInnerPages(){
const page=(location.pathname.split('/').pop()||'').toLowerCase();
if(!/^(renewal-whatsapp|whatsapp-import|numbers|invoices|finances|admin)\.html$/.test(page))return;
if(!document.getElementById('cashback-inner-pages-fix')){
const s=document.createElement('style');s.id='cashback-inner-pages-fix';
s.textContent=`
html,body{background:#090a0d!important;color:#f3f0e8!important;color-scheme:dark!important}
body{min-height:100vh!important;padding-bottom:105px!important}
body .wrap,body .container{background:transparent!important;color:#f3f0e8!important}
body .header,body .topbar,body .hero,body .balance,body .panel,body .card,body .glass,body .section,body .group,body .group-header,body .tablewrap,body .stats .stat,body .toolbar,body .filters,body .form-box,body .edit-box,body .list>div{background:#17181c!important;color:#f3f0e8!important;border-color:#303136!important;box-shadow:0 10px 28px #0003!important}
body .hero,body .balance,body .header,body .topbar{background:linear-gradient(135deg,#17181c,#101114)!important;border:1px solid #39332a!important}
body h1,body h2,body h3,body h4,body .title,body .brand,body .header h1,body .topbar h2,body .group-title{color:#e9bd55!important}
body p,body small,body label,body .sub,body .muted,body .description,body .hint,body .header p{color:#b8b2a5!important}
body input,body select,body textarea,body .field,body .search,body .toolbar input,body .toolbar select{background:#101115!important;color:#f4f0e8!important;border:1px solid #45403a!important}
body input::placeholder,body textarea::placeholder{color:#918b7f!important}
body button,body .btn,body .back,body .back-btn,body .secondary,body .tab{border-color:#494034!important}
body .btn:not(.secondary),body .add-btn,body .save-edit,body .add-number-btn,body .primary,body button.primary{background:linear-gradient(135deg,#f0c35b,#b77a1b)!important;color:#17120a!important;border-color:#d5a441!important}
body .secondary,body .back,body .back-btn,body .tab,body .top-action,body .refresh-btn{background:#202126!important;color:#e6bd5a!important;border:1px solid #38352f!important}
body .active,body .tab.active{background:linear-gradient(135deg,#f0c35b,#b77a1b)!important;color:#17120a!important}
body table{color:#f3f0e8!important;background:#17181c!important}
body th{background:#222328!important;color:#e9bd55!important}
body td{background:#17181c!important;color:#f3f0e8!important;border-color:#303136!important}
body tr:nth-child(even) td{background:#1b1c20!important}
body .message,body .status,body .notice,body .alert{background:#202126!important;color:#e8d8a8!important;border-color:#39352d!important}
body .count,body .stat strong,body .value,body .balance-value{color:#f5d27a!important}
#cashback-inner-theme-toggle{position:fixed;z-index:10001;top:14px;left:14px;width:44px;height:44px;border-radius:50%;background:#17181c;color:#efc45c;border:1px solid #6b5228;box-shadow:0 5px 18px #0006;cursor:pointer;font-size:20px}
#adminBottomNav{background:rgba(15,16,19,.98)!important;border-top:1px solid rgba(219,173,69,.4)!important}
#adminBottomNav a{background:linear-gradient(145deg,#1a1b1f,#121316)!important;color:#d7d2c6!important;border:1px solid #2d2d31!important}
#adminBottomNav a.active{background:linear-gradient(135deg,#f2c75f,#b77a1b)!important;color:#17120a!important;border-color:#edc45a!important}
@media(max-width:650px){body{padding-bottom:95px!important}}
`;document.head.appendChild(s);
}
// Convert leftover hard-coded white surfaces from each legacy page into the same charcoal palette.
const darkenWhiteSurfaces=()=>{
document.querySelectorAll('body *').forEach(el=>{
if(el.closest('#adminBottomNav')||el.id==='cashback-inner-theme-toggle'||el.tagName==='OPTION')return;
const bg=getComputedStyle(el).backgroundColor;
const m=bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
if(!m)return;
const r=+m[1],g=+m[2],bl=+m[3],a=m[4]===undefined?1:+m[4];
if(a>.25&&r>205&&g>205&&bl>195){
el.style.setProperty('background-color','#17181c','important');
el.style.setProperty('background-image','none','important');
const fg=getComputedStyle(el).color.match(/\d+/g);
if(fg&&+fg[0]>95&&+fg[1]>95&&+fg[2]>95)el.style.setProperty('color','#f3f0e8','important');
el.style.setProperty('border-color','#303136','important');
}
});
};
darkenWhiteSurfaces();
if(!window.__cashbackDarkSurfaceObserver){
window.__cashbackDarkSurfaceObserver=new MutationObserver(()=>darkenWhiteSurfaces());
window.__cashbackDarkSurfaceObserver.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
}
let b=document.getElementById('cashback-inner-theme-toggle');
if(!b){b=document.createElement('button');b.id='cashback-inner-theme-toggle';b.type='button';b.title='تبديل الوضع';b.setAttribute('aria-label','تبديل الوضع الداكن');document.body.appendChild(b)}
const sync=()=>{const dark=document.documentElement.classList.contains('dark-mode');b.textContent=dark?'☀️':'🌙'};
sync();
if(!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',()=>{const dark=!document.documentElement.classList.contains('dark-mode');document.documentElement.classList.toggle('dark-mode',dark);document.body.classList.toggle('dark-mode',dark);localStorage.setItem(themeKey,dark?'dark':'light');localStorage.setItem('app_theme',dark?'dark':'light');sync()})}
}
function setupCashbackPalette(){
if(document.getElementById('cashback-global-gold-palette'))return;
const s=document.createElement('style');s.id='cashback-global-gold-palette';
s.textContent=`
:root{color-scheme:dark;--bg-main:#0a0b0e;--bg-card:#17181c;--text-main:#f4f1e9;--text-muted:#aaa69b;--border:#303136;--input:#111216;--soft:#202126;--purple:#d9a83f}
html,body{background:#090a0d!important;color:#f3f0e8!important}
body,body *{scrollbar-color:#5a4824 #111216}
body header,body .header,body .topbar,body .navbar,body .panel,body .card,body .stat,body .box,body .glass,body .container>section,body .container>.section,body .summary,body .stat-card,body .table-container,body .table-wrap,body .form-card{background-color:#17181c!important;color:#f3f0e8!important;border-color:#303136!important;box-shadow:0 8px 28px rgba(0,0,0,.24)}
body .container,body .main,body .main-content,body .content,body .wrap{background:transparent!important;color:#f3f0e8!important}
body h1,body h2,body h3,body h4,body p,body label,body td,body th,body small,body .muted,body .label,body .title,body .subtitle,body span{color:inherit}
body input,body select,body textarea{background:#101115!important;color:#f6f2e8!important;border:1px solid #45403a!important}
body input::placeholder,body textarea::placeholder{color:#938d80!important}
body button:not(.theme-toggle),body .btn,body .button{border-color:#9f7627}
body .btn-primary,body .primary,body button.primary{background:linear-gradient(135deg,#f1c55d,#b67a19)!important;color:#17120a!important}
body a{color:#e7bd5b}
body table th{background:#202126!important;color:#e7bd5b!important}
body table td{border-color:#303136!important}
body .side,body .sidebar,body .admin-sidebar,body #sidebar{display:none!important}
#adminBottomNav{background:rgba(15,16,19,.97)!important;border-top:1px solid rgba(219,173,69,.4)!important;box-shadow:0 -8px 28px #0008!important;backdrop-filter:blur(18px)}
#adminBottomNav a{color:#d7d2c6!important}
#adminBottomNav a.active{background:linear-gradient(135deg,#f2c75f,#b77a1b)!important;color:#17120a!important;box-shadow:0 3px 14px #c99a3833}
#cashbackCenteredBrand{background:transparent!important}
#cashbackCenteredBrand img{mix-blend-mode:screen;opacity:.98}
@media(prefers-color-scheme:light){html,body{color-scheme:dark}}
`;document.head.appendChild(s);
}
function setupFinalDashboardStyle(){
if(document.getElementById('cashback-final-dashboard-style'))return;
const s=document.createElement('style');s.id='cashback-final-dashboard-style';
s.textContent=`
:root{color-scheme:dark;--bg-main:#090a0d;--bg-card:#17181c;--text-main:#f4f1e9;--text-muted:#aaa69b;--border:#303136;--input:#111216;--soft:#202126;--purple:#d9a83f}
html,body{min-height:100%;background:#090a0d!important;color:#f3f0e8!important}
body{margin:0!important;padding:0 0 94px!important;overflow-x:hidden}
#app{min-height:100vh;background:radial-gradient(ellipse at 50% 12%,rgba(171,119,24,.10),transparent 42%),#090a0d!important;position:relative;isolation:isolate}
#app:before{content:"";position:absolute;z-index:-1;pointer-events:none;left:-5%;right:-5%;top:95px;height:230px;opacity:.8;background:radial-gradient(ellipse at 12% 70%,transparent 47%,rgba(196,145,43,.0) 48%,rgba(213,164,57,.72) 48.3%,rgba(213,164,57,.18) 48.7%,transparent 50%),radial-gradient(ellipse at 83% 5%,transparent 49%,rgba(195,143,38,.0) 49.3%,rgba(195,143,38,.6) 49.7%,rgba(195,143,38,.15) 50%,transparent 52%);filter:blur(.3px)}
.side,.sidebar,.admin-sidebar,#sidebar{display:none!important}
.main{margin:0!important;width:100%!important;min-height:100vh;background:transparent!important;position:relative;z-index:1}
.top{height:auto!important;min-height:70px;padding:14px clamp(16px,4vw,52px)!important;background:transparent!important;border:0!important;display:flex;align-items:center;justify-content:space-between;gap:16px}
.top>div:first-child{order:2;background:rgba(28,28,31,.86);border:1px solid #343238;border-radius:30px;padding:12px 20px;text-align:right;box-shadow:0 8px 28px #0003}
.top>div:last-child{order:0;gap:12px}
.top b{font-size:16px;color:#f4f0e7!important}
.top small{color:#b9b2a2!important}
.avatar{background:linear-gradient(135deg,#2a2418,#111)!important;border:1px solid #8c6726;color:#efc55d}
.theme-btn{width:46px;height:46px;margin:0!important;border-radius:50%!important;border:1px solid #554323!important;background:#17181c!important;color:#edc35d!important}
#cashbackCenteredBrand{width:100%;display:flex;justify-content:center;align-items:center;min-height:132px;padding:4px 20px 0;position:relative;isolation:isolate;background:transparent!important}
#cashbackCenteredBrand:before{content:"";position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse at center,rgba(214,166,57,.13),transparent 68%)}
#cashbackCenteredBrand img{display:block;width:190px;height:122px;object-fit:contain;mix-blend-mode:screen;opacity:.98;filter:drop-shadow(0 5px 18px rgba(219,164,48,.25));background:transparent!important;border:0!important;box-shadow:none!important}
.content{width:100%!important;max-width:1500px!important;margin:0 auto!important;padding:14px clamp(16px,3.4vw,52px) 125px!important;position:relative}
.heading{display:flex;justify-content:space-between;align-items:center;gap:16px;margin:0 0 24px!important}
.heading h1{color:#f2c45b!important;font-size:clamp(23px,2.4vw,32px);margin:0}
.heading p{color:#aaa69b!important}
.heading .btn:not(.purple){display:none!important}
.btn.purple{background:linear-gradient(135deg,#f0c35b,#b87a19)!important;color:#17120a!important;border:1px solid #d7a33b!important}
.stats{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:18px!important;margin:0 0 24px!important}
.stat{background:linear-gradient(145deg,#1a1b1f,#131417)!important;border:1px solid #303136!important;border-radius:20px!important;padding:20px!important;box-shadow:0 12px 28px #0003!important;color:#f3f0e8!important;min-width:0}
.stat:nth-child(n){background:linear-gradient(145deg,#1a1b1f,#131417)!important}
.st{color:#f0ede5!important;gap:10px}
.ico{background:linear-gradient(135deg,#302616,#171511)!important;border:1px solid #77571f!important;color:#edbd50!important}
.num{color:#fff!important;font-size:clamp(28px,3vw,38px)!important}
.label{color:#aaa69b!important}
.cb-nav-stat:after{color:#e4b54e!important}
.panel,.card,.modalbox,.invoice-modal,.box,.loading,.empty,.error{background:#17181c!important;color:#f3f0e8!important;border-color:#303136!important}
.pt{color:#e8bc56!important}
input,select,textarea,.search,.select{background:#101115!important;color:#f4f0e8!important;border-color:#45403a!important}
#adminBottomNav{position:fixed!important;z-index:9999!important;left:0!important;right:0!important;bottom:0!important;display:flex!important;align-items:stretch!important;justify-content:space-around!important;gap:8px!important;min-height:86px!important;height:auto!important;padding:8px clamp(8px,2vw,28px) calc(8px + env(safe-area-inset-bottom))!important;background:rgba(15,16,19,.97)!important;border-top:1px solid rgba(219,173,69,.4)!important;box-shadow:0 -8px 28px #0008!important;backdrop-filter:blur(18px)!important;direction:rtl}
#adminBottomNav a{flex:1 1 0!important;min-width:0!important;max-width:none!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:7px!important;padding:6px 3px!important;border:1px solid #2d2d31!important;border-radius:15px!important;text-decoration:none!important;color:#d7d2c6!important;background:linear-gradient(145deg,#1a1b1f,#121316)!important}
#adminBottomNav .navIcon{display:grid;place-items:center;width:34px;height:34px;font-size:23px!important;background:transparent!important}
#adminBottomNav .navText{font-size:clamp(9px,.8vw,12px)!important;white-space:normal!important;line-height:1.25!important;text-align:center!important;color:inherit!important}
#adminBottomNav a.active{background:linear-gradient(135deg,#f2c75f,#b77a1b)!important;color:#17120a!important;border-color:#edc45a!important;box-shadow:0 3px 16px #c99a3833!important}
body.dark-mode,html.dark-mode body{background:#090a0d!important;color:#f3f0e8!important}
body.dark-mode .top,html.dark-mode .top{background:transparent!important}
body.dark-mode .top b{color:#f4f0e7!important}
body.dark-mode .top small{color:#b9b2a2!important}
body.dark-mode .stat,html.dark-mode .stat{background:linear-gradient(145deg,#1a1b1f,#131417)!important;color:#f3f0e8!important;border-color:#303136!important}
body.dark-mode .stat .st,body.dark-mode .stat .num,body.dark-mode .stat .label{color:inherit!important}
body.dark-mode .panel,body.dark-mode .card,body.dark-mode .box,body.dark-mode .modalbox{background:#17181c!important;color:#f3f0e8!important;border-color:#303136!important}
body.dark-mode input,body.dark-mode select,body.dark-mode textarea{background:#101115!important;color:#f4f0e8!important;border-color:#45403a!important}
@media(min-width:1000px){.content{padding-top:10px!important}.stats{gap:20px!important}.stat{min-height:138px}}
@media(max-width:900px){.stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}.stat{padding:15px!important}.top{padding:10px 14px!important}#cashbackCenteredBrand{min-height:105px}#cashbackCenteredBrand img{width:155px;height:98px}#adminBottomNav{gap:3px!important;padding-left:4px!important;padding-right:4px!important}#adminBottomNav .navText{font-size:9px!important}}
@media(max-width:520px){.heading{align-items:flex-start}.heading h1{font-size:22px}.heading p{font-size:12px}.stats{gap:9px!important}.stat{border-radius:15px!important;padding:12px!important}.st{font-size:12px}.ico{width:35px;height:35px}.num{font-size:28px!important}#adminBottomNav{overflow-x:auto;justify-content:flex-start!important}#adminBottomNav a{flex:0 0 78px!important}}
@media print{#cashbackCenteredBrand,#adminBottomNav{display:none!important}}
`;document.head.appendChild(s);
const app=document.getElementById('app');
if(app&&!document.getElementById('cashbackCenteredBrand')){
const logo=document.querySelector('.side .logo img')||document.querySelector('img[alt="CASH BACK"]');
if(logo){const wrap=document.createElement('div');wrap.id='cashbackCenteredBrand';const clone=logo.cloneNode(true);clone.removeAttribute('id');wrap.appendChild(clone);app.insertBefore(wrap,app.firstElementChild)}
}
}
function hidePackagesOnCustomersPage(){if(!/customers\.html$/i.test(location.pathname))return;document.querySelectorAll('a[href]').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();if(href==='packages.html')a.style.display='none'})}
function ensureAdminBottomNav(){
const allowed=/^(customers|inbox|renewal-whatsapp|whatsapp-import|numbers|invoices|finances|admin|package-stats)\.html$/i;
const page=(location.pathname.split('/').pop()||'').toLowerCase();
if(!allowed.test(page))return;
let nav=document.getElementById('adminBottomNav');
if(!nav){nav=document.createElement('nav');nav.id='adminBottomNav';nav.setAttribute('aria-label','التنقل الإداري');document.body.appendChild(nav)}
const items=[
['customers.html','👥','العملاء'],
['numbers.html','📱','الأرقام الأساسية'],
['package-stats.html','📊','إحصائية الباقات'],
['inbox.html','💬','التواصل والمتابعة'],
['invoices.html','🧾','الفواتير'],
['finances.html','💰','الماليات'],
['admin.html','🔢','الأكواد'],
['client.html','📝','تسجيل عميل']
];
nav.innerHTML='';
items.forEach(([href,icon,label])=>{const a=document.createElement('a');a.href=href;a.setAttribute('data-page',href);a.innerHTML='<span class="navIcon">'+icon+'</span><span class="navText">'+label+'</span>';if(page===href)a.classList.add('active');nav.appendChild(a)});
if(!document.getElementById('cashback-gold-theme')){const t=document.createElement('style');t.id='cashback-gold-theme';t.textContent="\n/* CASH BACK brand palette: black, charcoal and gold */\nhtml.dark-mode{\n --bg-main:#0b0c0f!important;--bg-card:#15171c!important;--text-main:#f7f3e8!important;\n --text-muted:#b4b0a5!important;--border:#34302a!important;--input:#101115!important;--soft:#1d1a14!important;\n}\nhtml.dark-mode body{background:#0b0c0f!important;color:#f7f3e8!important}\nhtml.dark-mode .main,html.dark-mode .top,html.dark-mode .side,html.dark-mode .stat,\nhtml.dark-mode .panel,html.dark-mode .card,html.dark-mode .modalbox,html.dark-mode .invoice-modal,\nhtml.dark-mode #adminBottomNav{background:#15171c!important;color:#f7f3e8!important;border-color:#34302a!important}\nhtml.dark-mode .nav a.active,html.dark-mode .purple,html.dark-mode .loginbox button,\nhtml.dark-mode .action.edit{background:linear-gradient(135deg,#f0d27a,#b88627)!important;color:#17130a!important}\nhtml.dark-mode .pt,html.dark-mode .heading h1,html.dark-mode .internal{color:#eac45e!important}\nhtml.dark-mode .box,html.dark-mode .promo{background:#292318!important;color:#f7f3e8!important}\nhtml.dark-mode .search,html.dark-mode .select,html.dark-mode textarea,html.dark-mode input,html.dark-mode select{\n background:#101115!important;color:#f7f3e8!important;border-color:#39352d!important}\nhtml.dark-mode #adminBottomNav a.active{background:#3a2e15!important;color:#f0d27a!important}\nhtml.dark-mode #adminBottomNav .navIcon{background:#292318!important;color:#f0d27a!important}\n";document.head.appendChild(t)}
if(!document.getElementById('cashback-toolbar-outlines')){const o=document.createElement('style');o.id='cashback-toolbar-outlines';o.textContent="\n/* Defined outlines for admin tiles; preserve each page's existing colors */\n#adminBottomNav a{\n  border:1px solid var(--border,#45404f)!important;\n  box-shadow:inset 0 0 0 1px rgba(255,255,255,.025),0 2px 7px rgba(0,0,0,.08);\n  transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease;\n}\n#adminBottomNav a.active{\n  border-color:rgba(234,196,94,.72)!important;\n  box-shadow:inset 0 0 0 1px rgba(234,196,94,.14),0 3px 12px rgba(0,0,0,.12);\n}\n#adminBottomNav a:hover{border-color:rgba(234,196,94,.55)!important}\n";document.head.appendChild(o)}
if(!document.getElementById('cashback-admin-bottom-nav-base-style')){const s=document.createElement('style');s.id='cashback-admin-bottom-nav-base-style';s.textContent='#adminBottomNav{position:fixed;z-index:9999;inset:auto 0 0 0;display:flex;align-items:center;justify-content:space-around;min-height:82px;height:auto;background:var(--card,#fff);border-top:1px solid var(--border,#ddd);box-shadow:0 -5px 22px #00000010;padding:7px 8px calc(7px + env(safe-area-inset-bottom));direction:rtl}#adminBottomNav a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;text-decoration:none;color:var(--text,#222);border-radius:12px;min-height:60px}#adminBottomNav a.active{background:#dbeafe;color:#1d4ed8;font-weight:700}#adminBottomNav .navIcon{font-size:24px;line-height:1}#adminBottomNav .navText{font-size:11px}body{padding-bottom:100px!important}@media(max-width:650px){#adminBottomNav{min-height:70px;padding-bottom:calc(5px + env(safe-area-inset-bottom))}#adminBottomNav a{flex-basis:84px;flex-shrink:0;min-height:54px}body{padding-bottom:90px!important}}@media print{#adminBottomNav{display:none!important}body{padding-bottom:0!important}}';document.head.appendChild(s)}
}
function ensureRegistrationNav(){const bottom=document.getElementById('adminBottomNav');if(bottom){let a=bottom.querySelector('a[data-page="client.html"],a[href^="client.html"]');if(!a){a=document.createElement('a');a.href='client.html';a.innerHTML='<span class="navIcon">📝</span><span class="navText">تسجيل بيانات عميل</span>';bottom.insertBefore(a,bottom.firstElementChild)}a.setAttribute('data-page','client.html');a.title='تسجيل بيانات عميل'}const side=document.querySelector('.side .nav');if(side){let a=side.querySelector('a[data-page="client.html"],a[href^="client.html"]');if(!a){a=document.createElement('a');a.href='client.html';a.innerHTML='<i>📝</i><span>تسجيل بيانات عميل</span>';side.appendChild(a)}a.setAttribute('data-page','client.html');a.title='تسجيل بيانات عميل'}}
function setupPrint(){if(/invoices\.html$/i.test(location.pathname))return;if(document.getElementById('cashback-thermal-print-style'))return;const s=document.createElement('style');s.id='cashback-thermal-print-style';s.textContent='@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';document.head.appendChild(s);document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.invoice-print');if(!b)return;const o=document.getElementById('invoiceOverlay');if(!o||!b.closest('#invoiceOverlay'))return;e.preventDefault();e.stopImmediatePropagation();o.classList.add('show');window.print()},true)}
function addStat(id,label,icon){const stats=document.querySelector('.stats');if(!stats)return null;let c=document.getElementById(id);if(c)return c;c=document.createElement('div');c.id=id;c.className='stat cb-nav-stat';c.innerHTML='<div class="st">'+label+'<span class="ico">'+icon+'</span></div><div class="num" id="'+id+'Num">0</div><div class="label">اضغط لفتح الصفحة</div>';stats.appendChild(c);return c}
function styleStats(){if(document.getElementById('cb-nav-style'))return;const s=document.createElement('style');s.id='cb-nav-style';s.textContent='.cb-nav-stat{cursor:pointer;position:relative;transition:.18s}.cb-nav-stat:hover{transform:translateY(-2px)}.cb-nav-stat:after{content:"‹";position:absolute;left:17px;top:50%;transform:translateY(-50%);font-size:28px;color:#8b5cf6;font-weight:900}.cb-nav-stat .label{font-size:12px}.customers-main-list-hidden{display:none!important}.cb-old-order-hidden{display:none!important}';document.head.appendChild(s)}
async function getAdminClient(){try{if(!window.supabase?.createClient)return null;return window.supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}})}catch(e){return null}}
async function refreshCounts(){try{const c=await getAdminClient();if(!c)return;const s=await c.auth.getSession(),u=s.data.session?.user;if(!u||String(u.email||'').toLowerCase()!==ADMIN.toLowerCase())return;let resetAt=localStorage.getItem(ordersResetKey);if(!resetAt){resetAt=new Date().toISOString();localStorage.setItem(ordersResetKey,resetAt)}const {data,error}=await c.from('orders').select('order_number,status,created_at').in('status',['pending','payment_submitted']);if(error)return;const fresh=(data||[]).filter(x=>x.created_at&&new Date(x.created_at)>=new Date(resetAt));const n=document.getElementById('cbNewOrdersStatNum');if(n)n.textContent=fresh.length}catch(e){}}
async function refreshCustomerCounts(){try{const c=await getAdminClient();if(!c)return;const s=await c.auth.getSession();const u=s.data.session?.user;if(!u||String(u.email||'').toLowerCase()!==ADMIN.toLowerCase())return;const {data,error}=await c.from('customers').select('renewal_day,next_renewal_date,deleted_at,skip_renewal_month').is('deleted_at',null);if(error||!Array.isArray(data))return;const rows=data;const month=new Date().toISOString().slice(0,7);const renewing=rows.filter(x=>String(x.skip_renewal_month||'').slice(0,7)!==month);const d1=document.getElementById('cbDay1StatNum'),d16=document.getElementById('cbDay16StatNum'),soon=document.getElementById('soon');if(d1)d1.textContent=renewing.filter(x=>Number(x.renewal_day)===1).length;if(d16)d16.textContent=renewing.filter(x=>Number(x.renewal_day)===16).length;if(soon){const now=new Date();now.setHours(0,0,0,0);soon.textContent=renewing.filter(x=>{if(!x.next_renewal_date)return false;const d=Math.ceil((new Date(String(x.next_renewal_date).slice(0,10)+'T00:00:00')-now)/86400000);return d>=0&&d<=7}).length}}catch(e){}}
function hideCustomerList(){if(!/customers\.html$/i.test(location.pathname))return;const list=document.getElementById('list');if(!list)return;list.classList.add('customers-main-list-hidden');const searchPanel=list.previousElementSibling;if(searchPanel&&searchPanel.classList.contains('panel'))searchPanel.classList.add('customers-main-list-hidden');const heading=document.querySelector('.heading');if(heading){const add=heading.querySelector('.btn');if(add)add.style.display='none'}}
function setupCustomerEditRoute(){if(!/customers\.html$/i.test(location.pathname))return;const id=new URLSearchParams(location.search).get('edit');if(!id)return;let tries=0;const timer=setInterval(()=>{tries++;const modal=document.getElementById('modal');const listReady=Array.isArray(window.customers)&&window.customers.some(x=>Number(x.id)===Number(id));if(typeof window.openEdit==='function'&&modal&&listReady){window.openEdit(Number(id));if(modal.classList.contains('show')){clearInterval(timer);return}}if(tries>150)clearInterval(timer)},200)}
function setupCustomers(){if(!/customers\.html$/i.test(location.pathname))return;styleStats();hideCustomerList();hidePackagesOnCustomersPage();ensureAdminBottomNav();ensureRegistrationNav();setTimeout(ensureRegistrationNav,300);setTimeout(ensureRegistrationNav,1200);setupCustomerEditRoute();const stats=document.querySelector('.stats');if(!stats)return;const cards=Array.from(stats.querySelectorAll('.stat'));const find=t=>cards.find(c=>new RegExp(t).test(c.textContent||''));const total=find('إجمالي\\s*العملاء')||cards[0],soonCard=find('تجديد\\s*قريب'),skipCard=find('مش\\s*هيجدد'),day1=addStat('cbDay1Stat','تجديد يوم 1','1️⃣'),day16=addStat('cbDay16Stat','تجديد يوم 16','1️⃣6️⃣'),newOrders=addStat('cbNewOrdersStat','طلبات جديدة','🆕');const go=f=>{location.href='customers-list.html'+(f?'?filter='+encodeURIComponent(f):'')};if(total&&!total.dataset.cbBound){total.dataset.cbBound='1';total.classList.add('cb-nav-stat');total.addEventListener('click',()=>go('all'))}if(soonCard&&!soonCard.dataset.cbBound){soonCard.dataset.cbBound='1';soonCard.classList.add('cb-nav-stat');soonCard.addEventListener('click',()=>go('soon'))}if(skipCard&&!skipCard.dataset.cbBound){skipCard.dataset.cbBound='1';skipCard.classList.add('cb-nav-stat');skipCard.addEventListener('click',()=>go('skip_month'))}if(day1&&!day1.dataset.cbBound){day1.dataset.cbBound='1';day1.addEventListener('click',()=>go('1'))}if(day16&&!day16.dataset.cbBound){day16.dataset.cbBound='1';day16.addEventListener('click',()=>go('16'))}if(newOrders&&!newOrders.dataset.cbBound){newOrders.dataset.cbBound='1';newOrders.addEventListener('click',()=>location.href='new-orders.html')}refreshCustomerCounts();refreshCounts();setTimeout(refreshCustomerCounts,1000);setInterval(refreshCounts,15000);setInterval(refreshCustomerCounts,15000)}
async function setupNewOrdersReset(){if(!/new-orders\.html$/i.test(location.pathname))return;styleStats();let resetAt=localStorage.getItem(ordersResetKey);if(!resetAt){resetAt=new Date().toISOString();localStorage.setItem(ordersResetKey,resetAt)}const c=await getAdminClient();if(!c)return;async function apply(){try{const s=await c.auth.getSession(),u=s.data.session?.user;if(!u||String(u.email||'').toLowerCase()!==ADMIN.toLowerCase())return;const {data,error}=await c.from('orders').select('order_number,created_at,status').in('status',['pending','payment_submitted']);if(error)return;const fresh=(data||[]).filter(x=>x.created_at&&new Date(x.created_at)>=new Date(resetAt));const allowed=new Set(fresh.map(x=>String(x.order_number)));document.querySelectorAll('.order').forEach(card=>card.classList.toggle('cb-old-order-hidden',!allowed.has(String(card.dataset.order||''))));const visible=[...document.querySelectorAll('.order')].filter(x=>!x.classList.contains('cb-old-order-hidden')).length;const count=document.getElementById('count');if(count)count.textContent=visible+' طلب جديد';if(!visible&&document.getElementById('list')){const any=[...document.querySelectorAll('.order')].length;if(any)document.getElementById('list').insertAdjacentHTML('beforeend','<div class="empty cb-reset-empty">لا توجد طلبات جديدة حاليًا ✅</div>')}document.querySelectorAll('.cb-reset-empty').forEach(x=>x.style.display=visible?'none':'')}catch(e){}}await apply();setInterval(apply,15000)}
function setupUnifiedBottomNav(){if(document.getElementById('cashback-unified-bottom-nav-style'))return;const s=document.createElement('style');s.id='cashback-unified-bottom-nav-style';s.textContent=`
/* One consistent bottom navigation layout across all admin pages */
#adminBottomNav{box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(8,minmax(0,1fr))!important;align-items:stretch!important;justify-content:initial!important;gap:8px!important;width:100%!important;min-height:86px!important;height:auto!important;padding:8px 12px calc(8px + env(safe-area-inset-bottom))!important;overflow:visible!important;direction:rtl!important}
#adminBottomNav a{box-sizing:border-box!important;display:flex!important;flex:initial!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:7px!important;width:100%!important;min-width:0!important;max-width:none!important;height:70px!important;min-height:70px!important;margin:0!important;padding:6px 4px!important;border-radius:14px!important;overflow:hidden!important}
#adminBottomNav .navIcon{display:grid!important;place-items:center!important;width:30px!important;height:30px!important;min-width:30px!important;font-size:22px!important;line-height:1!important;flex:0 0 30px!important}
#adminBottomNav .navText{display:block!important;width:100%!important;max-width:100%!important;margin:0!important;font-size:clamp(9px,.82vw,12px)!important;line-height:1.2!important;text-align:center!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important}
@media(min-width:651px) and (max-width:1100px){#adminBottomNav{gap:5px!important;padding-left:7px!important;padding-right:7px!important}#adminBottomNav a{height:70px!important;min-height:70px!important;padding:5px 2px!important}#adminBottomNav .navIcon{width:28px!important;height:28px!important;min-width:28px!important;flex-basis:28px!important;font-size:21px!important}#adminBottomNav .navText{font-size:10px!important}}
@media(max-width:650px){#adminBottomNav{display:flex!important;justify-content:flex-start!important;gap:6px!important;overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:thin!important;min-height:76px!important;padding:6px 7px calc(6px + env(safe-area-inset-bottom))!important}#adminBottomNav a{flex:0 0 84px!important;width:84px!important;min-width:84px!important;max-width:84px!important;height:62px!important;min-height:62px!important;padding:4px 3px!important}#adminBottomNav .navIcon{width:26px!important;height:26px!important;min-width:26px!important;flex-basis:26px!important;font-size:20px!important}#adminBottomNav .navText{font-size:10px!important;line-height:1.15!important}}
@media print{#adminBottomNav{display:none!important}}
`;document.head.appendChild(s)}
function init(){setupTheme();setupNavigation();styleAdminNavigation();setupCashbackPalette();setupFinalDashboardStyle();setupConsistentInnerPages();ensureAdminBottomNav();setupUnifiedBottomNav();setupPrint();setupCustomers();setupNewOrdersReset()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();