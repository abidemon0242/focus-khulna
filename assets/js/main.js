/* Main interactive behavior for Focus Khulna demo */
(function(){
  const cfg = window.FK_CONFIG || {};
  const i18n = {
    en: {
      home: "Home", courses: "Courses", admission: "Admission", results: "Results", faq: "FAQ", contact: "Contact",
      headline: "Professional Admission Coaching — Focus Khulna (Demo)", subhead: "A responsive, bilingual concept demo. Replace config in assets/js/config.js with real contact details.", browse: "Browse Courses", enquire: "WhatsApp Enquiry",
      admission_intro: "Admission details, eligibility, deadlines, and schedule are shown here. Update content in config.js.", results_note: "Placeholder for student results. Do not list real students or claims in this demo.", visit: "Visit / Map", whatsapp: "WhatsApp Enquiry",
      name:"Name", phone:"Phone", message:"Message", send:"Send to WhatsApp", clear:"Clear", other:"Other Contacts"
    },
    bn: {
      home: "হোম", courses: "কোর্সসমূহ", admission: "ভর্তি", results: "ফলাফল", faq: "প্রশ্নোত্তর", contact: "যোগাযোগ",
      headline: "প্রফেশনাল এডমিশন কোচিং — ফোকাস খুলনা (ডেমো)", subhead: "একটি রেসপনসিভ, দ্বিভাষিক কনসেপ্ট ডেমো। বাস্তব তথ্য assets/js/config.js এ আপডেট করুন।", browse: "কোর্স দেখুন", enquire: "হোয়াটসঅ্যাপ এনকোয়ারি",
      admission_intro: "ভর্তি সংক্রান্ত বিবরণ এখানে দেখানো হবে।",
      results_note: "ফলাফল স্থানধারী। বাস্তব ছাত্রের তথ্য এখানে থাকবে না।",
      visit: "ভিজিট / মানচিত্র", whatsapp: "হোয়াটসঅ্যাপ এনকোয়ারি",
      name:"নাম", phone:"ফোন", message:"বার্তা", send:"সেন্ড করুন", clear:"পরিষ্কার করুন", other:"অন্যান্য যোগাযোগ"
    }
  };

  // Short helper
  function t(key){ return (window.currentLang && i18n[window.currentLang] && i18n[window.currentLang][key]) || i18n['en'][key] || key }

  // Language switching
  window.currentLang = 'en';
  const langEnBtn = document.getElementById('langEn');
  const langBnBtn = document.getElementById('langBn');
  function setLang(lang){ window.currentLang = lang; document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); el.textContent = (i18n[lang] && i18n[lang][k]) || i18n['en'][k] || el.textContent });
    // update dynamic text
    renderCourses(); renderAdmission(); renderFAQ(); renderContacts(); renderResults();
    langEnBtn.classList.toggle('active',lang==='en'); langBnBtn.classList.toggle('active',lang==='bn');
  }
  langEnBtn.addEventListener('click',()=>setLang('en'));
  langBnBtn.addEventListener('click',()=>setLang('bn'));

  // Responsive nav toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  navToggle.addEventListener('click', ()=> navList.classList.toggle('show'));

  // Render courses from config
  function renderCourses(){
    const grid = document.getElementById('coursesGrid'); grid.innerHTML='';
    (cfg.courses||[]).forEach(c=>{
      const card = document.createElement('article'); card.className='card';
      const title = document.createElement('h3'); title.textContent = (window.currentLang==='bn' && c.title_bn) ? c.title_bn : c.title_en;
      const p = document.createElement('p'); p.textContent = (window.currentLang==='bn' && c.description_bn) ? c.description_bn : c.description_en;
      const meta = document.createElement('p'); meta.className='note'; meta.textContent = (c.fee ? ('Fee: '+c.fee+' • '):'') + (c.schedule||'');
      card.appendChild(title); card.appendChild(p); card.appendChild(meta);
      grid.appendChild(card);
    })
  }

  function renderAdmission(){
    document.getElementById('admissionList').innerHTML = '';
    document.getElementById('admissionContent').querySelector('p').textContent = (window.currentLang==='bn' ? (cfg.admission && cfg.admission.intro_bn) : (cfg.admission && cfg.admission.intro_en)) || t('admission_intro');
    (cfg.admission && cfg.admission.items || []).forEach(it=>{
      const li = document.createElement('li'); li.textContent = it; document.getElementById('admissionList').appendChild(li);
    })
  }

  function renderFAQ(){
    const list = document.getElementById('faqList'); list.innerHTML='';
    (cfg.faq||[]).forEach(item=>{
      const q = document.createElement('details'); q.className='card';
      const sum = document.createElement('summary'); sum.textContent = window.currentLang==='bn' ? item.q_bn : item.q_en;
      const ans = document.createElement('div'); ans.innerHTML = '<p>'+(window.currentLang==='bn' ? item.a_bn : item.a_en)+'</p>';
      q.appendChild(sum); q.appendChild(ans); list.appendChild(q);
    })
  }

  function renderResults(){
    const grid = document.getElementById('resultsGrid'); grid.innerHTML='';
    (cfg.results && cfg.results.items || []).forEach(r=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = '<h4>'+ (r.title || 'Result') +'</h4><p class="note">'+(r.note||'')+'</p>';
      grid.appendChild(card);
    })
  }

  function renderContacts(){
    document.getElementById('addressLine').textContent = cfg.contact && cfg.contact.address ? cfg.contact.address : '';
    const other = document.getElementById('otherContacts'); other.innerHTML='';
    if(cfg.contact && cfg.contact.email){ const li=document.createElement('li'); li.textContent = 'Email: '+cfg.contact.email; other.appendChild(li);}    
  }

  // Map
  function renderMap(){
    const wrap = document.getElementById('mapWrap'); wrap.innerHTML='';
    if(cfg.map && cfg.map.embedUrl){
      const iframe = document.createElement('iframe'); iframe.src = cfg.map.embedUrl; iframe.style.width='100%'; iframe.style.height='240px'; iframe.loading='lazy'; iframe.referrerPolicy='no-referrer-when-downgrade'; iframe.setAttribute('title','Map'); wrap.appendChild(iframe);
    } else if(cfg.map && cfg.map.lat && cfg.map.lng){
      const src = 'https://www.openstreetmap.org/export/embed.html?bbox='+(cfg.map.lng-0.02)+'%2C'+(cfg.map.lat-0.01)+'%2C'+(cfg.map.lng+0.02)+'%2C'+(cfg.map.lat+0.01)+'&layer=mapnik&marker='+cfg.map.lat+'%2C'+cfg.map.lng;
      const iframe = document.createElement('iframe'); iframe.src = src; iframe.style.width='100%'; iframe.style.height='240px'; iframe.loading='lazy'; iframe.setAttribute('title','Map'); wrap.appendChild(iframe);
    } else {
      wrap.innerHTML = '<div class="note">Map not configured. Set FK_CONFIG.map.embedUrl or lat/lng in assets/js/config.js</div>';
    }
  }

  // WhatsApp form handling
  const waForm = document.getElementById('waForm');
  const waNotice = document.getElementById('waNotice');
  waForm.addEventListener('submit', function(e){
    e.preventDefault(); waNotice.textContent='';
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !phone){ waNotice.textContent = 'Name and phone are required.'; return; }
    // Basic phone validation: digits and optional leading +
    if(!/^\+?\d{7,15}$/.test(phone)){ waNotice.textContent='Enter a valid phone number (digits, 7-15 chars). Example: 8801XXXXXXXXX'; return; }
    const waNumber = (cfg.contact && cfg.contact.whatsappNumber) || '';
    if(!waNumber){ waNotice.textContent='WhatsApp number not configured. Please update assets/js/config.js with your number.'; return; }
    const text = encodeURIComponent('Name: '+name+'\nPhone: '+phone+'\nMessage: '+message);
    const url = 'https://wa.me/'+waNumber+'?text='+text;
    window.open(url,'_blank');
  });
  document.getElementById('clearBtn').addEventListener('click', ()=>{ waForm.reset(); waNotice.textContent=''; });

  // Initial render
  setLang('en'); renderMap();

  // expose for debugging
  window.FK_RENDER = { renderCourses, renderAdmission, renderFAQ, renderResults, renderMap };
})();
