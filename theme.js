// CASH BACK — unified admin theme + navigation
(function(){
  const key='cashback-theme';
  const saved=localStorage.getItem(key)||localStorage.getItem('app_theme');
  const dark=saved==='dark';
  document.documentElement.classList.toggle('dark-mode',dark);

  function setupTheme(){
    let button=document.getElementById('theme-toggle');
    if(!button){
      button=document.createElement('button');
      button.id='theme-toggle';
      button.type='button';
      button.setAttribute('aria-label','تغيير المظهر');
      button.className='theme-btn';
      button.innerHTML='<span id="theme-icon">🌙</span>';
      document.body.appendChild(button);
    }
    const icon=document.getElementById('theme-icon');
    function sync(){
      const isDark=document.documentElement.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode',isDark);
      if(icon)icon.textContent=isDark?'☀️':'🌙';
    }
    sync();
    if(!button.dataset.themeBound){
      button.dataset.themeBound='1';
      button.addEventListener('click',function(){
        const isDark=!document.documentElement.classList.contains('dark-mode');
        document.documentElement.classList.toggle('dark-mode',isDark);
        document.body.classList.toggle('dark-mode',isDark);
        localStorage.setItem(key,isDark?'dark':'light');
        localStorage.setItem('app_theme',isDark?'dark':'light');
        sync();
      });
    }
  }

  function setupNavigation(){
    document.querySelectorAll('a[href]').forEach(function(a){
      const raw=a.getAttribute('href')||'';
      const clean=raw.split('?')[0].split('#')[0].toLowerCase();
      const text=(a.textContent||'').trim();
      if(clean==='packages.html'){
        a.setAttribute('href','invoices.html');
        const span=a.querySelector('span');
        if(span)span.textContent='الفواتير';
        else if(/الباقات/.test(text))a.textContent=text.replace('الباقات','الفواتير');
      }
      if(clean==='admin.html'&&/الإدارة|الرئيسية|home|admin/i.test(text))a.setAttribute('href','customers.html');
    });
  }

  function init(){setupTheme();setupNavigation();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

// CASH BACK — thermal invoice printing without opening a new window
(function(){
  function addPrintStyle(){
    if(document.getElementById('cashback-thermal-print-style'))return;
    const s=document.createElement('style');
    s.id='cashback-thermal-print-style';
    s.textContent='@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;margin:0!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';
    document.head.appendChild(s);
  }
  document.addEventListener('click',function(e){
    const button=e.target.closest&&e.target.closest('.invoice-print');
    if(!button)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    addPrintStyle();
    const overlay=document.getElementById('invoiceOverlay');
    if(overlay){overlay.classList.add('show');window.print();}
  },true);
})();

// CASH BACK — customers UI: total card opens compact customer list
(function(){
  if(!/customers\.html$/i.test(location.pathname))return;

  const STYLE_ID='cashback-customers-accordion-style';

  function installStyle(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .cb-total-customers{cursor:pointer;position:relative;transition:.2s ease}
      .cb-total-customers:hover{transform:translateY(-2px)}
      .cb-total-customers::after{content:'‹';position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:30px;color:#8b5cf6;font-weight:900;transition:.2s}
      .cb-total-customers.open::after{transform:translateY(-50%) rotate(-90deg)}
      .cb-customer-area{display:none!important;margin-top:22px}
      .cb-customer-area.cb-open{display:block!important}
      .cb-customer-area .cb-search-panel{display:block}
      .cb-customer-area .list{gap:9px!important}
      .cb-customer-area .card{padding:0!important;overflow:hidden;border-radius:16px!important;box-shadow:none!important}
      .cb-customer-area .card .ch{min-height:64px;padding:12px 16px 12px 52px!important;align-items:center!important;cursor:pointer;position:relative}
      .cb-customer-area .card .ch::after{content:'⌄';position:absolute;left:15px;top:50%;transform:translateY(-50%);width:27px;height:27px;display:grid;place-items:center;border-radius:50%;background:#eee4ff;color:#5420b8;font-size:18px;font-weight:900;transition:.2s}
      .cb-customer-area .card.cb-expanded .ch::after{transform:translateY(-50%) rotate(180deg);background:#5420b8;color:#fff}
      .cb-customer-area .card .name{font-size:17px!important}
      .cb-customer-area .card .phone{font-size:13px!important;margin-top:3px!important}
      .cb-customer-area .card .internal{font-size:11px!important;margin-top:3px!important}
      .cb-customer-area .card .badge{font-size:10px!important;padding:6px 9px!important}
      .cb-customer-area .card .grid{display:none;margin:0!important;padding:12px 16px 15px!important;grid-template-columns:repeat(2,1fr)!important;border-top:1px solid var(--border)!important}
      .cb-customer-area .card.cb-expanded .grid{display:grid!important}
      .cb-customer-area .card .actions{display:none}
      .cb-customer-area .card.cb-expanded .actions{display:flex!important;padding:0 16px 15px!important}
      @media(max-width:650px){
        .cb-customer-area .card .ch{min-height:62px;padding-left:48px!important}
        .cb-customer-area .card .grid{grid-template-columns:1fr 1fr!important}
      }
    `;
    document.head.appendChild(style);
  }

  function getElements(){
    const stats=document.querySelector('.stats');
    const list=document.getElementById('list');
    if(!stats||!list)return null;
    const total=Array.from(stats.querySelectorAll('.stat')).find(c=>/إجمالي\s*العملاء/.test(c.textContent||''))||stats.querySelector('.stat');
    if(!total)return null;
    const searchPanel=Array.from(document.querySelectorAll('.panel')).find(p=>p.querySelector('#search'))||null;
    return {stats,total,list,searchPanel};
  }

  function setup(){
    const el=getElements();
    if(!el)return;
    installStyle();

    const {total,list,searchPanel}=el;
    total.classList.add('cb-total-customers');
    total.setAttribute('role','button');
    total.setAttribute('tabindex','0');
    total.setAttribute('aria-expanded','false');
    total.setAttribute('aria-controls','cbCustomerArea');
    total.title='اضغط لعرض العملاء';

    if(document.getElementById('cbCustomerArea'))return;

    const area=document.createElement('div');
    area.id='cbCustomerArea';
    area.className='cb-customer-area';

    if(searchPanel){
      searchPanel.classList.add('cb-search-panel');
      area.appendChild(searchPanel);
    }
    area.appendChild(list);
    total.parentElement.insertAdjacentElement('afterend',area);

    function toggle(){
      const open=area.classList.toggle('cb-open');
      total.classList.toggle('open',open);
      total.setAttribute('aria-expanded',String(open));
      if(open)setTimeout(()=>area.scrollIntoView({behavior:'smooth',block:'start'}),60);
    }

    total.addEventListener('click',function(e){e.preventDefault();toggle();});
    total.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}
    });

    function bindCards(){
      area.querySelectorAll('#list .card').forEach(card=>{
        if(card.dataset.cbAccordion==='1')return;
        const header=card.querySelector('.ch');
        if(!header)return;
        card.dataset.cbAccordion='1';
        header.addEventListener('click',function(e){
          if(e.target.closest('button,a,input,select'))return;
          const was=card.classList.contains('cb-expanded');
          area.querySelectorAll('#list .card.cb-expanded').forEach(x=>{if(x!==card)x.classList.remove('cb-expanded');});
          card.classList.toggle('cb-expanded',!was);
        });
      });
    }

    bindCards();
    new MutationObserver(bindCards).observe(list,{childList:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
  let tries=0;
  const timer=setInterval(function(){
    setup();
    if(document.getElementById('cbCustomerArea')||++tries>40)clearInterval(timer);
  },250);
})();

// CASH BACK — dashboard stat cards: compact filtered views
(function(){
  if(!/customers\.html$/i.test(location.pathname))return;

  const STYLE_ID='cashback-stat-filter-style';
  function installStyle(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .cb-filter-stat{cursor:pointer;position:relative;transition:transform .18s ease,box-shadow .18s ease}
      .cb-filter-stat:hover{transform:translateY(-2px)}
      .cb-filter-stat.cb-selected{outline:2px solid #8b5cf6;outline-offset:2px}
      .cb-filter-stat::after{content:'‹';position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:28px;color:#8b5cf6;font-weight:900;transition:.2s}
      .cb-filter-stat.cb-selected::after{transform:translateY(-50%) rotate(-90deg)}
      #cbCustomerArea.cb-filtered-area .panel:first-child{margin-bottom:12px}
      #cbCustomerArea .cb-filter-title{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;font-weight:900;color:#5420b8}
      #cbCustomerArea .cb-filter-clear{border:0;background:#eee4ff;color:#5420b8;border-radius:10px;padding:7px 12px;font-weight:bold;cursor:pointer}
      .cb-extra-stat{min-width:0}
      .cb-extra-stat .label{white-space:nowrap}
      #cbOrdersArea{display:none;margin-top:22px}
      #cbOrdersArea.cb-open{display:block}
      #cbOrdersArea .cb-orders-box{background:var(--bg-card);border:1px solid var(--border);border-radius:22px;box-shadow:0 5px 22px #00000008;padding:18px}
      #cbOrdersArea .cb-orders-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
      #cbOrdersArea .cb-orders-title{font-size:20px;font-weight:900;color:#5420b8}
      #cbOrdersArea .cb-orders-clear{border:0;background:#eee4ff;color:#5420b8;border-radius:10px;padding:8px 12px;font-weight:bold;cursor:pointer}
      #cbOrdersArea .cb-order-row{border:1px solid var(--border);border-radius:15px;margin:8px 0;overflow:hidden;background:var(--soft)}
      #cbOrdersArea .cb-order-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 14px;cursor:pointer;position:relative;padding-left:45px}
      #cbOrdersArea .cb-order-head::after{content:'⌄';position:absolute;left:13px;top:50%;transform:translateY(-50%);width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:#eee4ff;color:#5420b8;font-weight:900}
      #cbOrdersArea .cb-order-row.open .cb-order-head::after{transform:translateY(-50%) rotate(180deg);background:#5420b8;color:#fff}
      #cbOrdersArea .cb-order-name{font-weight:900}
      #cbOrdersArea .cb-order-meta{font-size:12px;color:var(--text-muted);margin-top:3px}
      #cbOrdersArea .cb-order-details{display:none;padding:12px 14px;border-top:1px solid var(--border);line-height:1.9;font-size:13px}
      #cbOrdersArea .cb-order-row.open .cb-order-details{display:block}
      @media(max-width:650px){.cb-extra-stat .num{font-size:25px}.cb-extra-stat .label{font-size:11px}#cbOrdersArea .cb-order-head{padding-right:12px}}
    `;
    document.head.appendChild(s);
  }

  function getStats(){
    const stats=document.querySelector('.stats');
    if(!stats)return null;
    const cards=Array.from(stats.querySelectorAll('.stat'));
    return {
      stats,
      cards,
      total:cards.find(c=>/إجمالي\s*العملاء/.test(c.textContent||'')),
      soon:cards.find(c=>/تجديد\s*قريب/.test(c.textContent||''))
    };
  }

  function addStat(stats,label,icon,id,number){
    let card=document.getElementById(id);
    if(card)return card;
    card=document.createElement('div');
    card.className='stat cb-filter-stat cb-extra-stat';
    card.id=id;
    card.innerHTML='<div class="st">'+icon+'<span class="ico">'+icon+'</span></div><div class="num" id="'+id+'Num">'+(number??0)+'</div><div class="label">'+label+'</div>';
    stats.appendChild(card);
    return card;
  }

  function setCustomerFilter(type,titleText){
    const area=document.getElementById('cbCustomerArea');
    const list=document.getElementById('list');
    const search=document.getElementById('search');
    const renewal=document.getElementById('renewalFilter');
    const status=document.getElementById('statusFilter');
    if(!area||!list)return;
    if(search)search.value='';
    if(type==='day1'||type==='day16'){
      if(renewal)renewal.value=type==='day1'?'1':'16';
      if(status)status.value='all';
    }else if(type==='soon'){
      if(renewal)renewal.value='all';
      if(status)status.value='soon';
    }else{
      if(renewal)renewal.value='all';
      if(status)status.value='all';
    }
    area.classList.add('cb-open','cb-filtered-area');
    const total=document.querySelector('.cb-total-customers');
    if(total)total.setAttribute('aria-expanded','true');
    const title=area.querySelector('#cbFilterTitleText');
    if(title)title.textContent=titleText;
    if(typeof window.render==='function')window.render();
    setTimeout(()=>area.scrollIntoView({behavior:'smooth',block:'start'}),60);
  }

  function setupOrdersArea(){
    if(document.getElementById('cbOrdersArea'))return;
    const stats=getStats();
    if(!stats)return;
    const ordersArea=document.createElement('div');
    ordersArea.id='cbOrdersArea';
    ordersArea.innerHTML='<div class="cb-orders-box"><div class="cb-orders-head"><div class="cb-orders-title">🆕 طلبات الباقات الجديدة</div><button type="button" class="cb-orders-clear">إغلاق</button></div><div id="cbOrdersList"><div class="loading">⏳ جاري تحميل الطلبات...</div></div></div>';
    stats.stats.insertAdjacentElement('afterend',ordersArea);
    ordersArea.querySelector('.cb-orders-clear').addEventListener('click',()=>ordersArea.classList.remove('cb-open'));
  }

  async function loadNewOrders(){
    const box=document.getElementById('cbOrdersList');
    if(!box)return;
    try{
      const url='https://pgvbynefhqmyzjtccttl.supabase.co';
      const key='sb_publishable_RMNG3j5xrijQx3HcbfEkbQ_wZkoJGrY';
      let token=key;
      try{
        if(window.supabase){
          const client=window.__cashbackThemeDb||(window.__cashbackThemeDb=window.supabase.createClient(url,key));
          const session=await client.auth.getSession();
          token=session?.data?.session?.access_token||key;
        }
      }catch(e){}
      const r=await fetch(url+'/rest/v1/orders?select=*&status=in.(pending,payment_submitted)&order=order_number.desc',{headers:{apikey:key,Authorization:'Bearer '+token}});
      if(!r.ok)throw new Error('تعذر تحميل الطلبات الجديدة');
      const rows=await r.json();
      const list=Array.isArray(rows)?rows:[];
      const num=document.getElementById('cbNewOrdersNum');
      if(num)num.textContent=list.length;
      if(!list.length){box.innerHTML='<div class="empty">لا توجد طلبات جديدة حاليًا ✅</div>';return;}
      box.innerHTML=list.map(o=>{
        const status=o.status==='payment_submitted'?'💳 تم إرسال الدفع':'⏳ في انتظار الدفع';
        return '<div class="cb-order-row"><div class="cb-order-head"><div><div class="cb-order-name">'+esc(o.subscriber_name||'بدون اسم')+'</div><div class="cb-order-meta">#'+esc(o.order_number||'-')+' · '+esc(o.package_name||((o.package_gb||'-')+' جيجا'))+' · '+status+'</div></div><strong>'+money(o.final_price||o.original_price||0)+' ج</strong></div><div class="cb-order-details">📱 الرقم: <b>'+esc(o.phone||'-')+'</b><br>📦 الباقة: <b>'+esc(o.package_name||((o.package_gb||'-')+' جيجا'))+'</b><br>💰 السعر: <b>'+money(o.final_price||o.original_price||0)+' جنيه</b><br>🎁 الكود: <b>'+esc(o.promo_code||'لا يوجد')+'</b><br>🕒 الحالة: <b>'+status+'</b></div></div>';
      }).join('');
      box.querySelectorAll('.cb-order-head').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')));
    }catch(e){box.innerHTML='<div class="error">❌ '+esc(e.message||'تعذر تحميل الطلبات')+'</div>';}
  }

  function setup(){
    const s=getStats();
    if(!s)return;
    installStyle();
    const day1=addStat(s.stats,'تجديد يوم 1','1️⃣','cbDay1Stat',0);
    const day16=addStat(s.stats,'تجديد يوم 16','1️⃣6️⃣','cbDay16Stat',0);
    const newOrders=addStat(s.stats,'طلبات جديدة','🆕','cbNewOrdersStat',0);

    function countDay(day){
      const rows=window.__cashbackCustomers||[];
      return rows.filter(c=>Number(c.renewal_day)===day).length;
    }

    function refreshCounts(){
      const rows=window.__cashbackCustomers||[];
      const a=document.getElementById('cbDay1StatNum');
      const b=document.getElementById('cbDay16StatNum');
      if(a)a.textContent=rows.filter(c=>Number(c.renewal_day)===1).length;
      if(b)b.textContent=rows.filter(c=>Number(c.renewal_day)===16).length;
    }

    // Capture customers loaded by the existing customers page without changing its data logic.
    if(!window.__cashbackCustomersHooked){
      window.__cashbackCustomersHooked=true;
      const originalFetch=window.fetch;
      window.fetch=async function(...args){
        const response=await originalFetch.apply(this,args);
        try{
          const url=String(args[0]?.url||args[0]||'');
          if(url.includes('/rest/v1/customers?')||url.includes('/rest/v1/customers')){
            const clone=response.clone();
            const data=await clone.json();
            if(Array.isArray(data)){window.__cashbackCustomers=data;setTimeout(refreshCounts,0);}
          }
        }catch(e){}
        return response;
      };
    }

    day1.title='عرض عملاء تجديد يوم 1';
    day16.title='عرض عملاء تجديد يوم 16';
    newOrders.title='عرض الطلبات الجديدة من موقع الباقات';

    if(!day1.dataset.bound){
      day1.dataset.bound='1';
      day1.addEventListener('click',()=>setCustomerFilter('day1','📅 تجديد يوم 1'));
      day16.addEventListener('click',()=>setCustomerFilter('day16','📅 تجديد يوم 16'));
      const soon=s.soon;
      if(soon&&!soon.dataset.cbSoonUnified){
        soon.dataset.cbSoonUnified='1';
        soon.classList.add('cb-filter-stat');
        soon.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setCustomerFilter('soon','🕐 التجديدات القريبة — خلال 7 أيام');});
      }
      newOrders.addEventListener('click',async()=>{setupOrdersArea();const area=document.getElementById('cbOrdersArea');if(area){area.classList.add('cb-open');setTimeout(()=>area.scrollIntoView({behavior:'smooth',block:'start'}),60);await loadNewOrders();}});
    }

    setupOrdersArea();
    refreshCounts();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
  let tries=0;
  const timer=setInterval(function(){
    setup();
    if(document.getElementById('cbNewOrdersStat')||++tries>50)clearInterval(timer);
  },300);
})();
