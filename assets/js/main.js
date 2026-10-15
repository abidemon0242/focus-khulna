/* Main interactive behavior for Focus Khulna demo (Bengali default) */
(function(){
  const cfg = window.FK_CONFIG || {};
  const i18n = {
    en: {
      home: "Home", courses: "Courses", admission: "Admission", results: "Results", faq: "FAQ", contact: "Contact",
      headline: "Professional Admission Coaching — Focus Khulna (Demo)", subhead: "A responsive, bilingual concept demo. Replace config in assets/js/config.js with real contact details.", browse: "Browse Courses", enquire: "WhatsApp Enquiry",
      admission_intro: "Admission details are placeholders in this demo. Configure verified admissions information in assets/js/config.js.", results_note: "Placeholder for student results. Do not list real students or claims in this demo.", visit: "Visit / Map", whatsapp: "Online Enquiry",
      name:"Name", phone:"Phone", message:"Message", send:"Send", clear:"Clear", other:"Other Contacts",
      course:"Preferred course", contact_method:"Preferred contact method", consent: "I consent to sharing my contact details (data consent)",
      validation_name_required: "Name is required.",
      validation_phone_required: "Phone number is required.",
      validation_phone_format: "Enter a valid Bangladeshi mobile number (01XXXXXXXXX or +8801XXXXXXXXX).",
      validation_consent_required: "You must consent to share your contact details.",
      wa_not_configured: "WhatsApp number is not configured. The site admin should set assets/js/config.js.",
      wa_opening: "Opening WhatsApp...",
      form_sent_notice: "Opening WhatsApp in a new tab..."
    },
    bn: {
      home: "হোম", courses: "কোর্সসমূহ", admission: "ভর্তি", results: "ফলাফল", faq: "প্রশ্নোত্তর", contact: "যোগাযোগ",
      headline: "প্রফেশনাল এডমিশন কোচিং — ফোকাস খুলনা (ডেমো)", subhead: "একটি রেসপনসিভ, দ্বিভাষিক কনসেপ্ট ডেমো। বাস্তব তথ্য assets/js/config.js এ আপডেট করুন।", browse: "কোর্স দেখুন", enquire: "অফলাইন/অনলাইন এনকোয়ারি",
      admission_intro: "এই ডেমো সাইটে ভর্তি সংক্রান্ত বিবরণ স্থানধারী হিসেবে দেখানো হচ্ছে। প্রকৃত তথ্য assets/js/config.js-এ কনফিগার করুন।",
      results_note: "ফলাফল প্লেসহোল্ডার — কোনো ব্যক্তিগত তথ্য দেখানো হচ্ছে না।", visit: "ভিজিট / মানচিত্র", whatsapp: "অনলাইনে যোগাযোগ",
      name:"নাম", phone:"ফোন", message:"বার্তা", send:"প্রেরণ", clear:"পরিষ্কার", other:"অন্যান্য যোগাযোগ",
      course:"পছন্দের কোর্স", contact_method:"পছন্দের যোগাযোগ মাধ্যম", consent: "আমি তথ্য শেয়ার করতে সম্মত (ডেটা কনসেন্ট)",
      validation_name_required: "নাম আবশ্যক।",
      validation_phone_required: "ফোন নম্বর আবশ্যক।",
      validation_phone_format: "বৈধ বাংলাদেশের মোবাইল নম্বর দিন (01XXXXXXXXX বা +8801XXXXXXXXX)।",
      validation_consent_required: "আপনাকে কনসেন্ট দিতে হবে।",
      wa_not_configured: "হোয়��টসঅ্যাপ নম্বর কনফিগার করা নেই। অ্যাডমিন assets/js/config.js আপডেট করুন।",
      wa_opening: "হোয়াটসঅ্যাপে খোলা হচ্ছে...",
      form_sent_notice: "নতুন ট্যাবে হোয়াটসঅ্যাপ খোলা হবে..."
    }
  };

  // Short helper
  function t(key){ return (window.currentLang && i18n[window.currentLang] && i18n[window.currentLang][key]) || i18n['bn'][key] || key }

  // Language switching (default Bengali)
  window.currentLang = 'bn';
  const langEnBtn = document.getElementById('langEn');
  const langBnBtn = document.getElementById('langBn');
  function setLang(lang){ window.currentLang = lang; document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); el.textContent = (i18n[lang] && i18n[lang][k]) || i18n['bn'][k] || el.textContent });
    // update dynamic text
    renderCourses(); renderAdmission(); renderFAQ(); renderContacts(); renderResults(); populateCourseSelect();
    // Update form labels/options
    document.querySelectorAll('#waForm label span[data-i18n]').forEach(()=>{});
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
      const meta = document.createElement('p'); meta.className='note'; meta.textContent = (c.fee ? ((window.currentLang==='bn'? 'শুল্ক: ':'Fee: ')+c.fee+' • '):'') + (c.schedule||t('to_be_confirmed')||'');
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
    document.getElementById('addressLine').textContent = cfg.contact && cfg.contact.address ? cfg.contact.address : (window.currentLang==='bn' ? 'ঠিকানা কনফিগার করা হয়নি।' : 'Address not configured.');
    const other = document.getElementById('otherContacts'); other.innerHTML='';
    if(cfg.contact && cfg.contact.email){ const li=document.createElement('li'); li.textContent = (window.currentLang==='bn' ? 'ই-মেইল: ' : 'Email: ')+cfg.contact.email; other.appendChild(li);}    
  }

  // Populate course select
  function populateCourseSelect(){
    const sel = document.getElementById('courseSelect'); if(!sel) return; sel.innerHTML = '<option value="">--</option>';
    (cfg.courses||[]).forEach(c=>{
      const opt = document.createElement('option'); opt.value = c.id; opt.textContent = (window.currentLang==='bn' && c.title_bn) ? c.title_bn : c.title_en; sel.appendChild(opt);
    })
  }

  // Map
  function renderMap(){
    const wrap = document.getElementById('mapWrap'); wrap.innerHTML='';
    if(cfg.map && cfg.map.embedUrl){
      const iframe = document.createElement('iframe'); iframe.src = cfg.map.embedUrl; iframe.style.width='100%'; iframe.style.height='240px'; iframe.loading='lazy'; iframe.referrerPolicy='no-referrer-when-downgrade'; iframe.setAttribute('title','Map'); wrap.appendChild(iframe);
    } else {
      // Placeholder when no verified location is configured
      const ph = document.createElement('div'); ph.className='note'; ph.style.padding='1rem'; ph.textContent = window.currentLang==='bn' ? 'মানচিত্র কনফিগার করা নেই। যাচাইকৃত লোকেশন যুক্ত করুন।' : 'Map not configured. Add a verified embed URL in assets/js/config.js.'; wrap.appendChild(ph);
    }
  }

  // WhatsApp form handling with Bangladeshi phone validation
  const waForm = document.getElementById('waForm');
  const waNotice = document.getElementById('waNotice');
  function isValidBDNumber(phone){
    // Accept formats: 01XXXXXXXXX or +8801XXXXXXXXX or 8801XXXXXXXXX
    return /^(?:\+?8801|01)\d{9}$/.test(phone);
  }

  waForm.addEventListener('submit', function(e){
    e.preventDefault(); waNotice.textContent='';
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const course = document.getElementById('courseSelect').value || '';
    const contactMethod = document.getElementById('contactMethod').value || '';
    const consent = document.getElementById('consent').checked;

    if(!name){ waNotice.textContent = t('validation_name_required'); return; }
    if(!phone){ waNotice.textContent = t('validation_phone_required'); return; }
    if(!isValidBDNumber(phone)){ waNotice.textContent = t('validation_phone_format'); return; }
    if(!consent){ waNotice.textContent = t('validation_consent_required'); return; }

    const waNumber = (cfg.contact && cfg.contact.whatsappNumber) || '';
    if(!waNumber){ waNotice.textContent = t('wa_not_configured'); return; }

    // Build message
    const courseLabel = (cfg.courses||[]).find(c=>c.id===course);
    const courseText = courseLabel ? ((window.currentLang==='bn' && courseLabel.title_bn) ? courseLabel.title_bn : courseLabel.title_en) : (window.currentLang==='bn' ? 'পছন্দ করা হয়নি' : 'Not selected');
    const textParts = [];
    textParts.push((window.currentLang==='bn' ? 'নাম: ' : 'Name: ')+name);
    textParts.push((window.currentLang==='bn' ? 'ফোন: ' : 'Phone: ')+phone);
    textParts.push((window.currentLang==='bn' ? 'কোর্স: ' : 'Course: ')+courseText);
    textParts.push((window.currentLang==='bn' ? 'পছন্দের যোগাযোগ: ' : 'Preferred contact: ')+contactMethod);
    if(message) textParts.push((window.currentLang==='bn' ? 'বার্তা: ' : 'Message: ')+message);
    textParts.push((window.currentLang==='bn' ? 'আমি ডেটা শেয়ার করতে সম্মত।' : 'I consent to share my contact details.'));

    const text = encodeURIComponent(textParts.join('\n'));
    const url = 'https://wa.me/'+waNumber+'?text='+text;
    waNotice.textContent = t('form_sent_notice');
    window.open(url,'_blank');
  });

  document.getElementById('clearBtn').addEventListener('click', ()=>{ waForm.reset(); waNotice.textContent=''; });

  // Initial render
  setLang('bn'); renderMap();

  // expose for debugging
  window.FK_RENDER = { renderCourses, renderAdmission, renderFAQ, renderResults, renderMap, populateCourseSelect };
})();
