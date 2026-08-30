// CASH BACK — theme + navigation + separate customer views
(function(){
  const SUPABASE_URL='https://pgvbynefhqmyzjtccttl.supabase.co';
  const SUPABASE_KEY='sb_publishable_RMNG3j5xrijQx3HcbfEkbQ_wZkoJGrY';
  const themeKey='cashback-theme';

  function setupTheme(){
    const saved=localStorage.getItem(themeKey)||localStorage.getItem('app_theme');
    document.documentElement.classList.toggle('dark-mode',saved==='dark');
    const button=document.getElementById('theme-toggle');
    if(!button||button.dataset.themeBound)return;
    const icon=document.getElementById('theme-icon');
    const sync=()=>{const dark=document.documentElement.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',dark);if(icon)icon.textContent=dark?'☀️':'🌙';};
    sync();button.dataset.themeBound='1';
    button.addEventListener('click',()=>{const dark=!document.documentElement.classList.contains('dark-mode');document.documentElement.classList.toggle('dark-mode',dark);document.body.classList.toggle('dark-mode',dark);localStorage.setItem(themeKey,dark?'dark':'light');localStorage.setItem('app_theme',dark?'dark':'light');sync();});
  }

  function setupNavigation(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const raw=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();
      const text=(a.textContent||'').trim();
      if(raw==='packages.html'){
        a.setAttribute('href','invoices.html');
        const span=a.querySelector('span');
        if(span)span.textContent='الفواتير';
        else if(/الباقات/.test(text))a.textContent=text.replace('الباقات','الفواتير');
      }
      if(raw==='admin.html'&&/الإدارة|الرئيسية|home|admin/i.test(text))a.setAttribute('href','customers.html');
    });
  }

  function setupPrint(){
    if(document.getElementById('cashback-thermal-print-style'))return;
    const s=document.createElement('style');s.id='cashback-thermal-print-style';
    s.textContent='@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;margin:0!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';
    document.head.appendChild(s);
    document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.invoice-print');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const o=document.getElementById('invoiceOverlay');if(o){o.classList.add('show');window.print();}},true);
  }

  function addStat(id,label,icon){
    const stats=document.querySelector('.stats');if(!stats)return null;
    let card=document.getElementById(id);if(card)return card;
    card=document.createElement('div');card.id=id;card.className='stat cb-nav-stat';
    card.innerHTML='<div class="st">'+label+'<span class="ico">'+icon+'</span></div><div class="num" id="'+id+'Num">0</div><div class="label">اضغط لفتح الصفحة</div>';
    stats.appendChild(card);return card;
  }

  function styleStats(){
    if(document.getElementById('cb-nav-style'))return;
    const s=document.createElement('style');s.id='cb-nav-style';s.textContent='.cb-nav-stat{cursor:pointer;position:relative;transition:.18s}.cb-nav-stat:hover{transform:translateY(-2px)}.cb-nav-stat:after{content:"‹";position:absolute;left:17px;top:50%;transform:translateY(-50%);font-size:28px;color:#8b5cf6;font-weight:900}.cb-nav-stat .label{font-size:12px}';document.head.appendChild(s);
  }

  async function refreshCounts(){
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/customers?select=renewal_day,next_renewal_date,deleted_at&deleted_at=is.null',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
      if(!r.ok)return;const rows=await r.json();
      const d1=document.getElementById('cbDay1StatNum'),d16=document.getElementById('cbDay16StatNum'),soon=document.getElementById('soon');
      const count1=rows.filter(x=>Number(x.renewal_day)===1).length,count16=rows.filter(x=>Number(x.renewal_day)===16).length;
      if(d1)d1.textContent=count1;if(d16)d16.textContent=count16;
      if(soon){const now=new Date();now.setHours(0,0,0,0);const n=rows.filter(x=>{if(!x.next_renewal_date)return false;const d=Math.ceil((new Date(x.next_renewal_date+'T00:00:00')-now)/86400000);return d>=0&&d<=7}).length;soon.textContent=n;}
    }catch(e){}
  }

  function setupCustomers(){
    if(!/customers\.html$/i.test(location.pathname))return;
    styleStats();
    const stats=document.querySelector('.stats');if(!stats)return;
    const cards=Array.from(stats.querySelectorAll('.stat'));
    const find=t=>cards.find(c=>new RegExp(t).test(c.textContent||''));
    const total=find('إجمالي\\s*العملاء')||cards[0];
    const soonCard=find('تجديد\\s*قريب');
    const day1=addStat('cbDay1Stat','تجديد يوم 1','1️⃣');
    const day16=addStat('cbDay16Stat','تجديد يوم 16','1️⃣6️⃣');
    const newOrders=addStat('cbNewOrdersStat','طلبات جديدة','🆕');
    const go=(filter)=>{location.href='customers-list.html'+(filter?'?filter='+encodeURIComponent(filter):'');};
    if(total&&!total.dataset.cbBound){total.dataset.cbBound='1';total.classList.add('cb-nav-stat');total.style.cursor='pointer';total.addEventListener('click',()=>go('all'));}
    if(soonCard&&!soonCard.dataset.cbBound){soonCard.dataset.cbBound='1';soonCard.classList.add('cb-nav-stat');soonCard.style.cursor='pointer';soonCard.addEventListener('click',()=>go('soon'));}
    if(day1&&!day1.dataset.cbBound){day1.dataset.cbBound='1';day1.addEventListener('click',()=>go('day1'));}
    if(day16&&!day16.dataset.cbBound){day16.dataset.cbBound='1';day16.addEventListener('click',()=>go('day16'));}
    if(newOrders&&!newOrders.dataset.cbBound){newOrders.dataset.cbBound='1';newOrders.addEventListener('click',()=>{location.href='new-orders.html';});}
    refreshCounts();
  }

  function init(){setupTheme();setupNavigation();setupPrint();setupCustomers();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
