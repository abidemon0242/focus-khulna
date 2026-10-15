/* Editable site configuration. Replace placeholders with real data. */
window.FK_CONFIG = {
  siteName: "Focus Khulna (Demo)",
  contact: {
    // WhatsApp number in international format without +, e.g. "8801XXXXXXXXX". Leave empty to disable sending.
    whatsappNumber: "",
    email: "", // leave blank or example@domain.tld
    address: "Khulna, Bangladesh (Demo)",
  },
  map: {
    // Provide embedUrl (iframe src) or set lat/lng (map will use OpenStreetMap iframe).
    embedUrl: "", // e.g. "https://www.google.com/maps/embed?pb=..." (no API key required for public embed)
    lat: 22.8456,
    lng: 89.5403,
    zoom: 14
  },
  courses: [
    { id: "ssc_coaching", title_en: "SSC Subject Coaching", title_bn: "এসএসসি বিষয়গত কোচিং", description_en: "Focused subject coaching for SSC students.", description_bn: "এসএসসি শিক্ষার্থীদের জন্য বিষয়ভিত্তিক কোচিং.", fee: "Negotiable", schedule: "Weekdays & Weekend batches" },
    { id: "univ_prep", title_en: "University Admission Prep", title_bn: "বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি", description_en: "Targeted admission test practice and mentoring.", description_bn: "ভর্তি পরীক্ষার লক্ষ্যভিত্তিক প্রস্তুতি ও মেন্টরিং.", fee: "Negotiable", schedule: "Evening batches" }
  ],
  admission: {
    intro_en: "Admissions open. Contact for batch start dates and seat availability.",
    intro_bn: "ভর্তি চলছে। ব্যাচ শুরুর তারিখ ও আসনavailabilty জানতে যোগাযোগ করুন।",
    items: ["Registration form & ID copy", "Entrance assessment (if required)", "Seat confirmation after fee submission"]
  },
  results: {
    // Keep empty or placeholders. Do not include personal data here in the demo.
    items: []
  },
  faq: [
    {q_en: "How do I apply?", q_bn: "কিভাবে আবেদন করব?", a_en: "Fill the enquiry form or contact via WhatsApp.", a_bn: "এনকোয়ারি ফরম পূরণ করুন বা হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করুন।"},
    {q_en: "Are there trial classes?", q_bn: "ট্রায়াল ক্লাস আছে?", a_en: "Trial arrangements depend on the course and availability.", a_bn: "ট্রায়াল ব্যবস্থা কোর্স ও সময়সীমার উপর নির্ভর করে।"}
  ],
  meta: {
    demoNote: "This site is an independent concept demonstration. Do not treat as official." 
  }
};
