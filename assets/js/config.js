/* Editable site configuration. Replace placeholders with real data. */
window.FK_CONFIG = {
  siteName: "Focus Khulna (Demo)",
  contact: {
    // WhatsApp number in international format without +, e.g. "8801XXXXXXXXX".
    // Leave empty while in demo mode. DO NOT add unverified contact details here.
    whatsappNumber: "",
    email: "",
    // Leave address empty until a verified location is provided.
    address: "",
  },
  map: {
    // Provide embedUrl (iframe src) for a verified location. Until then leave empty to show a placeholder.
    embedUrl: "",
    // lat/lng removed to avoid displaying an unverified location
  },
  courses: [
    // Use placeholders. Replace titles/descriptions and remove placeholders only after verification.
    { id: "sample_1", title_en: "Sample Course 1", title_bn: "নমুনা কোর্স ১", description_en: "Course details to be configured.", description_bn: "কোর্সের বিবরণ কনফিগার করুন.", fee: "To be confirmed", schedule: "To be confirmed" },
    { id: "sample_2", title_en: "Sample Course 2", title_bn: "নমুনা কোর্স ২", description_en: "Course details to be configured.", description_bn: "কোর্সের বিবরণ কনফিগার করুন.", fee: "To be confirmed", schedule: "To be confirmed" }
  ],
  admission: {
    // Use clearly labelled placeholders. Remove when verified.
    intro_en: "Admission details are placeholders in this demo. Configure verified admissions information in assets/js/config.js.",
    intro_bn: "এই ডেমোতে ভর্তি তথ্য স্থানধারী। যাচাই সিদ্ধান্তের পরে এখানে কনফিগার করুন।",
    items: []
  },
  results: {
    // Keep empty or placeholders. Do not include personal data in the demo.
    items: []
  },
  faq: [
    {q_en: "How do I apply?", q_bn: "কিভাবে আবেদন করব?", a_en: "Use the enquiry form and select your preferred contact method.", a_bn: "এনকোয়ারি ফরম পূরণ করুন এবং পছন্দের যোগাযোগ মাধ্যম নির্বাচন করুন।"},
    {q_en: "Are trial classes available?", q_bn: "ট্রায়াল ক্লাস আছে?", a_en: "Trial arrangements depend on course configuration and availability.", a_bn: "ট্রায়াল ব্যবস্থা কোর্স কনফিগারেশন ও উপলব্ধতার উপর নির্ভর করে।"}
  ],
  meta: {
    demoNote: "This site is an independent concept demonstration. Do not treat as official." 
  }
};
