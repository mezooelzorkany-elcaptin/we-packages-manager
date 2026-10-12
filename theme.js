// CASH BACK — theme + navigation
(function(){
const U='https://pgvbynefhqmyzjtccttl.supabase.co',K='sb_publishable_RMNG3j5xrijQx3HcbfEkbQ_wZkoJGrY',ADMIN='mezooelzorkany@gmail.com',themeKey='cashback-theme',ordersResetKey='cashback-orders-reset-at';
function setupTheme(){const saved=localStorage.getItem(themeKey)||localStorage.getItem('app_theme');document.documentElement.classList.toggle('dark-mode',saved==='dark');const b=document.getElementById('theme-toggle');if(!b||b.dataset.themeBound)return;const i=document.getElementById('theme-icon'),sync=()=>{const d=document.documentElement.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',d);if(i)i.textContent=d?'☀️':'🌙'};sync();b.dataset.themeBound='1';b.addEventListener('click',()=>{const d=!document.documentElement.classList.contains('dark-mode');document.documentElement.classList.toggle('dark-mode',d);document.body.classList.toggle('dark-mode',d);localStorage.setItem(themeKey,d?'dark':'light');localStorage.setItem('app_theme',d?'dark':'light');sync()})}
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
function setupFinalDashboardStyle(){
if(document.getElementById('cashback-final-dashboard-style'))return;
const s=document.createElement('style');s.id='cashback-final-dashboard-style';
s.textContent=`
/* CASH BACK final centered brand + sidebar-free dashboard */
.side,.sidebar,.admin-sidebar,#sidebar{display:none!important}
body{margin:0!important;padding-bottom:98px!important}
.main,.main-content,.content,.dashboard,.container,.wrap{max-width:none}
#cashbackCenteredBrand{width:100%;display:flex;justify-content:center;align-items:center;min-height:126px;padding:12px 20px 4px;position:relative;isolation:isolate}
#cashbackCenteredBrand:before{content:"";position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse at center,rgba(202,150,44,.13),transparent 68%)}
#cashbackCenteredBrand img{display:block;width:170px;height:108px;object-fit:contain;mix-blend-mode:screen;opacity:.97;filter:drop-shadow(0 5px 18px rgba(219,164,48,.22));background:transparent!important;border:0!important;box-shadow:none!important}
body.dark-mode,#app.dark-mode{background:#090a0d!important;color:#f4f1e9!important}
body.dark-mode header,body.dark-mode .header,body.dark-mode .topbar,body.dark-mode .navbar,body.dark-mode .panel,body.dark-mode .card,body.dark-mode .stat,body.dark-mode .box,body.dark-mode .table-wrap,body.dark-mode .modal-content,body.dark-mode .wrap>div:not(#cashbackCenteredBrand){border-color:#2a2b30}
body.dark-mode header,body.dark-mode .header,body.dark-mode .topbar,body.dark-mode .navbar,body.dark-mode .panel,body.dark-mode .card,body.dark-mode .stat,body.dark-mode .box,body.dark-mode .modal-content{background:rgba(23,24,28,.94)!important;color:#f4f1e9!important}
body.dark-mode h1,body.dark-mode h2,body.dark-mode h3,body.dark-mode p,body.dark-mode label,body.dark-mode td,body.dark-mode th,body.dark-mode .muted,body.dark-mode .label,body.dark-mode .title,body.dark-mode span{color:inherit}
body.dark-mode input,body.dark-mode select,body.dark-mode textarea{background:#111216!important;color:#f5f5f5!important;border-color:#393a41!important}
body.dark-mode table th{background:#1c1d22!important;color:#e8c36c!important}
body.dark-mode table td{border-color:#303138!important}
body.dark-mode a{color:inherit}
body.dark-mode #adminBottomNav{background:rgba(16,17,20,.97)!important;border-color:#34343a!important}
body.dark-mode #adminBottomNav a{color:#eee!important}
body.dark-mode #adminBottomNav a.active{background:linear-gradient(135deg,#f0c15a,#a96b12)!important;color:#17120a!important}
#adminBottomNav{background:rgba(18,18,21,.96)!important;border-top:1px solid rgba(210,162,58,.3)!important;backdrop-filter:blur(16px)}
#adminBottomNav a{color:#eee!important}
#adminBottomNav a.active{background:linear-gradient(135deg,#f3c55d,#b67a19)!important;color:#1a1407!important}
#adminBottomNav .navText{font-weight:600}
@media(max-width:650px){#cashbackCenteredBrand{min-height:95px}#cashbackCenteredBrand img{width:135px;height:82px}}
@media print{#cashbackCenteredBrand,#adminBottomNav{display:none!important}}
`;document.head.appendChild(s);
let logo=document.querySelector('.side .logo img,.sidebar .logo img,.side img[alt*="CASH"],.sidebar img[alt*="CASH"],img[alt*="CASH BACK"]');
if(logo){const wrap=document.createElement('div');wrap.id='cashbackCenteredBrand';const clone=logo.cloneNode(true);clone.removeAttribute('width');clone.removeAttribute('height');wrap.appendChild(clone);const first=document.body.firstElementChild;if(first)document.body.insertBefore(wrap,first);else document.body.appendChild(wrap)}
}
function hidePackagesOnCustomersPage(){if(!/customers\.html$/i.test(location.pathname))return;document.querySelectorAll('a[href]').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();if(href==='packages.html')a.style.display='none'})}
function ensureAdminBottomNav(){
const allowed=/^(customers|renewal-whatsapp|whatsapp-import|numbers|invoices|finances|admin)\.html$/i;
const page=(location.pathname.split('/').pop()||'').toLowerCase();
if(!allowed.test(page))return;
let nav=document.getElementById('adminBottomNav');
if(!nav){nav=document.createElement('nav');nav.id='adminBottomNav';nav.setAttribute('aria-label','التنقل الإداري');document.body.appendChild(nav)}
const items=[
['customers.html','👥','العملاء'],
['renewal-whatsapp.html','📲','تجديدات واتساب'],
['whatsapp-import.html','📥','استيراد أرقام واتساب'],
['numbers.html','📱','الأرقام الأساسية'],
['invoices.html','🧾','الفواتير'],
['finances.html','💰','الماليات'],
['admin.html','🔢','الأكواد'],
['client.html','📝','تسجيل عميل']
];
nav.innerHTML='';
items.forEach(([href,icon,label])=>{const a=document.createElement('a');a.href=href;a.setAttribute('data-page',href);a.innerHTML='<span class="navIcon">'+icon+'</span><span class="navText">'+label+'</span>';if(page===href)a.classList.add('active');nav.appendChild(a)});
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
function init(){setupTheme();setupNavigation();styleAdminNavigation();setupFinalDashboardStyle();ensureAdminBottomNav();setupPrint();setupCustomers();setupNewOrdersReset()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();