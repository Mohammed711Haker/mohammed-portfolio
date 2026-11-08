export type Lang = "en" | "ar";

export const EMAIL = "hmydt5026@gmail.com";
export const GITHUB = "https://github.com/Mohammed711Haker";
export const GITHUB_USER = "Mohammed711Haker";

type L = { en: string; ar: string };

export const t = {
  nav: {
    about: { en: "About", ar: "نبذة" },
    skills: { en: "Skills", ar: "المهارات" },
    resume: { en: "Journey", ar: "المسيرة" },
    projects: { en: "Projects", ar: "المشاريع" },
    github: { en: "GitHub", ar: "جيت هب" },
    gallery: { en: "Gallery", ar: "المعرض" },
    contact: { en: "Contact", ar: "تواصل" },
  },
  hero: {
    hi: { en: "Hi, I'm", ar: "مرحباً، أنا" },
    name: { en: "Mohammed", ar: "محمد" },
    intro: {
      en: "A Yemeni Information Technology undergraduate at Universitas Islam Negeri Salatiga, Indonesia — building software, exploring AI, IoT and cybersecurity, and turning ideas into practical solutions.",
      ar: "طالب تكنولوجيا معلومات يمني في جامعة UIN سالاتيغا بإندونيسيا — أبني البرمجيات، وأستكشف الذكاء الاصطناعي وإنترنت الأشياء والأمن السيبراني، وأحوّل الأفكار إلى حلول عملية.",
    },
    cta1: { en: "Discover My Work", ar: "اكتشف أعمالي" },
    cta2: { en: "Get In Touch", ar: "تواصل معي" },
    cta3: { en: "Open Terminal", ar: "افتح التيرمنال" },
    roles: {
      en: ["IT Student", "Full-Stack Developer", "IoT Explorer", "Cybersecurity Learner", "Entrepreneur"],
      ar: ["طالب تكنولوجيا معلومات", "مطوّر Full-Stack", "مستكشف إنترنت الأشياء", "متعلّم أمن سيبراني", "رائد أعمال"],
    },
    scroll: { en: "scroll", ar: "مرّر" },
    hint: { en: "Press Ctrl + K for the command palette", ar: "اضغط Ctrl + K للوحة الأوامر" },
  },
  stats: [
    { v: 2024, label: { en: "Started B.IT", ar: "بدأت البكالوريوس" }, plain: true },
    { v: 8, label: { en: "GitHub repos", ar: "مستودع على جيت هب" } },
    { v: 7, label: { en: "Languages & stacks", ar: "لغات وتقنيات" } },
    { v: 2, label: { en: "Countries lived", ar: "بلدان عشت فيها" } },
  ] as { v: number; label: L; plain?: boolean }[],
  about: {
    title: { en: "Professional Profile", ar: "الملف المهني" },
    sub: { en: "// who_am_i.md", ar: "// who_am_i.md" },
    p1: {
      en: "I'm interested in software development, artificial intelligence, machine learning, computer vision, cybersecurity and Internet of Things (IoT). Alongside my studies I explore practical projects in web development, image processing, cloud computing and connected systems.",
      ar: "أهتم بتطوير البرمجيات والذكاء الاصطناعي وتعلّم الآلة والرؤية الحاسوبية والأمن السيبراني وإنترنت الأشياء. وبجانب دراستي أعمل على مشاريع عملية في تطوير الويب ومعالجة الصور والحوسبة السحابية والأنظمة المتصلة.",
    },
    p2a: { en: "I'm also the founder of", ar: "وأنا أيضاً مؤسس" },
    p2b: {
      en: ", a service business focused on travel services and educational guidance for students who want to study abroad.",
      ar: "، مبادرة خدمية تقدّم خدمات السفر والإرشاد التعليمي للطلاب الراغبين في الدراسة بالخارج.",
    },
    p3: {
      en: "My background includes administrative management, educational support and team leadership. My goal is to sharpen my technical skills through hands-on projects, research and international learning — and to help improve the tech field in Yemen.",
      ar: "تشمل خبرتي الإدارة والدعم التعليمي وقيادة الفرق. هدفي تطوير مهاراتي التقنية عبر المشاريع العملية والبحث والتعلّم الدولي — والمساهمة في تطوير قطاع التقنية في اليمن.",
    },
    goal: { en: "Goal", ar: "الهدف" },
    goalV: { en: "Cybersecurity specialist", ar: "متخصص أمن سيبراني" },
    focus: { en: "Now focusing on", ar: "أركّز حالياً على" },
    focusV: { en: "Flutter UI · Python backend", ar: "واجهات Flutter · Python باك إند" },
    base: { en: "Based in", ar: "مقيم في" },
    baseV: { en: "Salatiga, Indonesia", ar: "سالاتيغا، إندونيسيا" },
    from: { en: "From", ar: "من" },
    fromV: { en: "Yemen 🇾🇪", ar: "اليمن 🇾🇪" },
  },
  skills: {
    title: { en: "Tech Stack", ar: "الحزمة التقنية" },
    sub: {
      en: "Click a category, then hover or tap a skill to see how I use it.",
      ar: "اختر فئة ثم مرّر أو اضغط على المهارة لمعرفة كيف أستخدمها.",
    },
    cats: [
      {
        id: "web",
        icon: "🌐",
        name: { en: "Web", ar: "الويب" },
        items: [
          { n: "Next.js", d: { en: "This portfolio is built with Next.js 16 + React 19.", ar: "هذا البورتفوليو مبني بـ Next.js 16 و React 19." } },
          { n: "TypeScript", d: { en: "Typed, safer front-end code.", ar: "كود واجهات أمامية مكتوب بأنواع آمنة." } },
          { n: "Laravel", d: { en: "PHP framework for full-stack web apps.", ar: "إطار PHP لتطبيقات الويب المتكاملة." } },
          { n: "Supabase", d: { en: "Postgres, auth and realtime backend.", ar: "قاعدة بيانات Postgres ومصادقة وباك إند لحظي." } },
          { n: "HTML / CSS / JS", d: { en: "The foundations of every web page.", ar: "أساس كل صفحة ويب." } },
          { n: "Tailwind CSS", d: { en: "Utility-first styling.", ar: "تنسيق سريع بالـ Utility classes." } },
        ],
      },
      {
        id: "mobile",
        icon: "📱",
        name: { en: "Mobile & Apps", ar: "الموبايل والتطبيقات" },
        items: [
          { n: "Flutter", d: { en: "Cross-platform UI — my current focus.", ar: "واجهات متعددة المنصات — تركيزي الحالي." } },
          { n: "Dart", d: { en: "Language behind Flutter (e.g. fruit_scan_app).", ar: "لغة Flutter (مثل fruit_scan_app)." } },
          { n: "C++", d: { en: "Console apps: Coffee shop, Users manager, App store.", ar: "تطبيقات كونسول: متجر قهوة، إدارة مستخدمين، متجر تطبيقات." } },
        ],
      },
      {
        id: "ai",
        icon: "🧠",
        name: { en: "AI & Python", ar: "الذكاء الاصطناعي وبايثون" },
        items: [
          { n: "Python", d: { en: "Scripting, automation and backend (python-tools).", ar: "سكربتات وأتمتة وباك إند (python-tools)." } },
          { n: "Computer Vision", d: { en: "VisionCheck AI — visual acuity screening concept.", ar: "VisionCheck AI — فكرة فحص حدة البصر." } },
          { n: "Machine Learning", d: { en: "Learning the fundamentals through projects.", ar: "أتعلّم الأساسيات عبر المشاريع." } },
          { n: "Image Processing", d: { en: "Working with image data and pipelines.", ar: "العمل على بيانات الصور ومعالجتها." } },
        ],
      },
      {
        id: "sys",
        icon: "🖥️",
        name: { en: "Systems & Cloud", ar: "الأنظمة والسحابة" },
        items: [
          { n: "Debian Linux", d: { en: "Server setup in a virtual environment.", ar: "إعداد خادم في بيئة افتراضية." } },
          { n: "Nginx", d: { en: "Web server & reverse proxy.", ar: "خادم ويب و Reverse proxy." } },
          { n: "PHP-FPM", d: { en: "Fast PHP process manager paired with Nginx.", ar: "مدير عمليات PHP سريع مع Nginx." } },
          { n: "Git & GitHub", d: { en: "Version control and collaboration.", ar: "التحكم بالإصدارات والتعاون." } },
          { n: "Vercel", d: { en: "Deploying this site.", ar: "نشر هذا الموقع." } },
        ],
      },
      {
        id: "iot",
        icon: "📡",
        name: { en: "IoT & Security", ar: "IoT والأمن" },
        items: [
          { n: "ESP32", d: { en: "Wi-Fi microcontroller for the Smart Parking concept.", ar: "متحكم Wi-Fi لفكرة المواقف الذكية." } },
          { n: "Ultrasonic sensors", d: { en: "Distance sensing to detect cars.", ar: "استشعار المسافة لاكتشاف السيارات." } },
          { n: "Cybersecurity", d: { en: "Exploring — my long-term career goal.", ar: "أستكشفه — هدفي المهني بعيد المدى." } },
        ],
      },
    ],
    tip: { en: "Tap a skill", ar: "اضغط على مهارة" },
  },
  resume: {
    title: { en: "Journey", ar: "المسيرة" },
    items: [
      {
        when: { en: "2024 – Present", ar: "2024 – الآن" },
        title: { en: "Bachelor of Information Technology", ar: "بكالوريوس تكنولوجيا المعلومات" },
        org: { en: "Universitas Islam Negeri Salatiga — Indonesia", ar: "جامعة UIN سالاتيغا — إندونيسيا" },
        desc: {
          en: "Focusing on software engineering, web application development and modern technologies. Active in international programs and student organizations.",
          ar: "أركّز على هندسة البرمجيات وتطوير تطبيقات الويب والتقنيات الحديثة. نشط في البرامج الدولية والمنظمات الطلابية.",
        },
        tags: ["Software Eng.", "Web", "IoT", "Cloud"],
        icon: "🎓",
      },
      {
        when: { en: "Ongoing", ar: "مستمر" },
        title: { en: "Founder & Manager — Abu Hilal Sky", ar: "المؤسس والمدير — Abu Hilal Sky" },
        org: { en: "Travel & study-abroad guidance", ar: "خدمات السفر والإرشاد للدراسة بالخارج" },
        desc: {
          en: "Established an initiative providing travel services, visa-procedure assistance and educational consultancy for international students.",
          ar: "أسّستُ مبادرة تقدّم خدمات السفر والمساعدة في إجراءات التأشيرة والاستشارات التعليمية للطلاب الدوليين.",
        },
        tags: ["Leadership", "Management", "Consulting"],
        icon: "🚀",
      },
      {
        when: { en: "Beyond class", ar: "خارج القاعة" },
        title: { en: "Global Engagement", ar: "المشاركة العالمية" },
        org: { en: "Conferences · public speaking · cultural exchange", ar: "مؤتمرات · إلقاء · تبادل ثقافي" },
        desc: {
          en: "Representing Yemeni culture and speaking at international events across Indonesia.",
          ar: "تمثيل الثقافة اليمنية والتحدث في فعاليات دولية داخل إندونيسيا.",
        },
        tags: ["Speaking", "Teamwork", "Culture"],
        icon: "🌍",
      },
    ],
  },
  projects: {
    title: { en: "Technical Projects & Research", ar: "المشاريع التقنية والبحثية" },
    sub: { en: "Filter by topic, tilt the cards, open one for details.", ar: "صفّ حسب الموضوع، حرّك البطاقات، وافتح أي مشروع للتفاصيل." },
    filters: [
      { id: "all", label: { en: "All", ar: "الكل" } },
      { id: "ai", label: { en: "AI", ar: "ذكاء اصطناعي" } },
      { id: "iot", label: { en: "IoT", ar: "IoT" } },
      { id: "cloud", label: { en: "Cloud", ar: "سحابة" } },
    ],
    open: { en: "Open details", ar: "افتح التفاصيل" },
    close: { en: "Close", ar: "إغلاق" },
    stack: { en: "Tech stack", ar: "التقنيات" },
    how: { en: "How it works", ar: "كيف يعمل" },
    items: [
      {
        id: "vision",
        cat: "ai",
        icon: "👁️",
        title: "VisionCheck AI",
        short: {
          en: "A conceptual research project for a mobile app that screens visual acuity using computer vision and AI.",
          ar: "مشروع بحثي مفاهيمي لتطبيق موبايل يفحص حدة البصر مبدئياً باستخدام الرؤية الحاسوبية والذكاء الاصطناعي.",
        },
        long: {
          en: "The idea: let anyone run a quick first-pass visual acuity screening from a phone. The camera captures the user and the screen, computer vision checks distance and readability, and a model estimates whether a professional exam is recommended. It is a research concept, not a medical device.",
          ar: "الفكرة: تمكين أي شخص من إجراء فحص أولي سريع لحدة البصر من هاتفه. تلتقط الكاميرا المستخدم والشاشة، وتتحقق الرؤية الحاسوبية من المسافة ووضوح القراءة، ثم يقدّر نموذج ما إذا كان يُنصح بفحص متخصص. هو مفهوم بحثي وليس جهازاً طبياً.",
        },
        steps: {
          en: ["Capture face & screen distance", "Show optotype letters of varying size", "Detect user answers (voice / tap)", "Estimate acuity score", "Recommend next step"],
          ar: ["التقاط الوجه ومسافة الشاشة", "عرض حروف اختبار بأحجام مختلفة", "التعرّف على إجابات المستخدم (صوت / لمس)", "تقدير درجة الحدة", "اقتراح الخطوة التالية"],
        },
        tags: ["Computer Vision", "AI", "Mobile", "Research"],
      },
      {
        id: "parking",
        cat: "iot",
        icon: "🅿️",
        title: "Smart Parking System",
        short: {
          en: "An academic concept using ultrasonic sensors, ESP32 and Wi-Fi to report free parking spaces on a dashboard.",
          ar: "فكرة أكاديمية تستخدم حساسات فوق صوتية و ESP32 و Wi-Fi لإظهار المواقف الفارغة على لوحة تحكم.",
        },
        long: {
          en: "Each parking slot has an ultrasonic sensor wired to an ESP32. When a car is closer than a threshold, the slot is marked occupied and the status is sent over Wi-Fi to a dashboard. Try the live simulator below — click a slot to park or free a car.",
          ar: "لكل موقف حساس فوق صوتي متصل بـ ESP32. عندما تقترب سيارة أقل من حدّ معيّن يُعلَّم الموقف مشغولاً وتُرسل الحالة عبر Wi-Fi إلى لوحة التحكم. جرّب المحاكي الحي أدناه — اضغط على موقف لإيقاف أو إخراج سيارة.",
        },
        steps: {
          en: ["Ultrasonic sensor measures distance", "ESP32 compares to threshold", "Status sent over Wi-Fi", "Dashboard updates in real time"],
          ar: ["الحساس يقيس المسافة", "ESP32 يقارنها بالحدّ", "إرسال الحالة عبر Wi-Fi", "تحديث لوحة التحكم لحظياً"],
        },
        tags: ["ESP32", "Ultrasonic", "Wi-Fi", "Dashboard"],
      },
      {
        id: "cloud",
        cat: "cloud",
        icon: "☁️",
        title: "Cloud Computing & Linux",
        short: {
          en: "Configured a web server on Debian Linux with Nginx and PHP-FPM inside a virtual environment.",
          ar: "إعداد خادم ويب على Debian Linux باستخدام Nginx و PHP-FPM داخل بيئة افتراضية.",
        },
        long: {
          en: "A hands-on lab: provision a Debian VM, install Nginx and PHP-FPM, wire them through a FastCGI socket, and serve a PHP page. Below is the flow as an interactive terminal — press Run to replay it.",
          ar: "مختبر عملي: تجهيز آلة Debian افتراضية، تثبيت Nginx و PHP-FPM، ربطهما عبر FastCGI، وتشغيل صفحة PHP. أدناه التسلسل كتيرمنال تفاعلي — اضغط تشغيل لإعادته.",
        },
        steps: {
          en: ["Provision Debian VM", "Install Nginx + PHP-FPM", "Configure server block & FastCGI", "Test & manage resources"],
          ar: ["تجهيز آلة Debian", "تثبيت Nginx + PHP-FPM", "ضبط server block و FastCGI", "الاختبار وإدارة الموارد"],
        },
        tags: ["Debian", "Nginx", "PHP-FPM", "Virtualization"],
      },
    ],
  },
  gh: {
    title: { en: "Live from GitHub", ar: "مباشر من GitHub" },
    sub: { en: "Fetched in real time from my public profile.", ar: "تُجلب لحظياً من حسابي العام." },
    loading: { en: "Fetching repositories…", ar: "جارٍ جلب المستودعات…" },
    fail: { en: "Couldn't reach GitHub right now — showing a snapshot.", ar: "تعذّر الوصول إلى GitHub الآن — نعرض نسخة محفوظة." },
    view: { en: "View on GitHub", ar: "عرض على GitHub" },
    updated: { en: "Updated", ar: "آخر تحديث" },
    profile: { en: "Open full profile", ar: "افتح الملف الكامل" },
    langs: { en: "Language mix", ar: "توزيع اللغات" },
  },
  gallery: {
    title: { en: "Global Engagement", ar: "المشاركة العالمية" },
    sub: {
      en: "Conferences, public speaking and cultural exchange. Click a photo to open it — use ← → or swipe.",
      ar: "مؤتمرات وإلقاء وتبادل ثقافي. اضغط على صورة لفتحها — استخدم ← → أو اسحب.",
    },
    caps: [
      { en: "Speaking at a conference", ar: "إلقاء كلمة في مؤتمر" },
      { en: "On stage with the mic", ar: "على المسرح مع الميكروفون" },
      { en: "Yemen booth — International Day", ar: "ركن اليمن — اليوم الدولي" },
      { en: "Cultural celebration", ar: "احتفال ثقافي" },
      { en: "Portrait", ar: "بورتريه" },
      { en: "Exploring the city", ar: "استكشاف المدينة" },
      { en: "Campus moments", ar: "لحظات في الجامعة" },
    ] as L[],
    cats: ["talk", "talk", "culture", "culture", "life", "life", "life"],
    filters: [
      { id: "all", label: { en: "All", ar: "الكل" } },
      { id: "talk", label: { en: "Speaking", ar: "الإلقاء" } },
      { id: "culture", label: { en: "Culture", ar: "الثقافة" } },
      { id: "life", label: { en: "Life", ar: "الحياة" } },
    ],
  },
  contact: {
    title: { en: "Let's Connect", ar: "لنتواصل" },
    sub: {
      en: "Have a project, an internship or just want to say hi? Send a message — it opens in your email app.",
      ar: "لديك مشروع أو فرصة تدريب أو تريد فقط إلقاء التحية؟ أرسل رسالة — ستفتح في تطبيق البريد لديك.",
    },
    name: { en: "Your name", ar: "اسمك" },
    mail: { en: "Your email", ar: "بريدك" },
    msg: { en: "Message", ar: "الرسالة" },
    send: { en: "Send message", ar: "إرسال الرسالة" },
    copy: { en: "Copy email", ar: "نسخ البريد" },
    copied: { en: "Copied!", ar: "تم النسخ!" },
    required: { en: "Please fill all fields.", ar: "يرجى تعبئة جميع الحقول." },
    invalid: { en: "Enter a valid email.", ar: "أدخل بريداً صحيحاً." },
    opened: { en: "Opening your email app…", ar: "جارٍ فتح تطبيق البريد…" },
    rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  },
  ui: {
    cmdPlaceholder: { en: "Type a command or search…", ar: "اكتب أمراً أو ابحث…" },
    cmdNone: { en: "No results", ar: "لا نتائج" },
    top: { en: "Back to top", ar: "للأعلى" },
    theme: { en: "Toggle theme", ar: "تبديل المظهر" },
    lang: { en: "Switch language", ar: "تبديل اللغة" },
  },
};


export const FALLBACK_REPOS = [
  { name: "fruit_scan_app", language: "Dart", description: null },
  { name: "Coffee-shop-project", language: "C++", description: null },
  { name: "Users-Manager-", language: "C++", description: null },
  { name: "app_store", language: "C++", description: null },
  { name: "flutter-app", language: null, description: null },
  { name: "python-tools", language: null, description: null },
];

export const LANG_COLORS: Record<string, string> = {
  "C++": "#f34b7d",
  Dart: "#00b4ab",
  Python: "#3572a5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4f5d95",
};
