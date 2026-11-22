export type Lang = "en" | "ar";

export const EMAIL = "hmydt5026@gmail.com";
export const GITHUB = "https://github.com/Mohammed711Haker";
export const GITHUB_USER = "Mohammed711Haker";

export type L = { en: string; ar: string };
type LL = { en: string[]; ar: string[] };

/** Countries the owner has lived in — the "Countries lived" stat is derived from this list. */
export const COUNTRIES: L[] = [
  { en: "Yemen", ar: "اليمن" },
  { en: "Indonesia", ar: "إندونيسيا" },
];

/* ------------------------------------------------------------------ */
/* projects (case studies)                                             */
/* ------------------------------------------------------------------ */
export type ProjectStatus = "built" | "dev" | "lab" | "hardware" | "concept" | "idea";
export type DemoId = "parking" | "cloud" | "vision" | "temp" | "fruit";

export type Project = {
  id: string;
  /** filter categories */
  cats: string[];
  icon: string;
  title: L;
  status: ProjectStatus;
  short: L;
  /** case study: the problem */
  problem: L;
  /** case study: what I built / the idea */
  long: L;
  steps?: LL;
  tags: string[];
  repos?: string[];
  demo?: DemoId;
  /** honest label shown above the demo */
  demoNote?: L;
  /** true → shows a "details coming soon" note (owner still has to confirm details) */
  pending?: boolean;
  /** true → shows a "screenshots coming soon" slot */
  shotsPending?: boolean;
};

export const STATUS: Record<ProjectStatus, { label: L; tone: "ok" | "a1" | "warn" | "muted" }> = {
  built: { label: { en: "Built · repo on GitHub", ar: "مُنجز · المستودع على GitHub" }, tone: "ok" },
  dev: { label: { en: "In development", ar: "قيد التطوير" }, tone: "a1" },
  lab: { label: { en: "Lab completed", ar: "مختبر مُنجز" }, tone: "ok" },
  hardware: { label: { en: "Hardware project · no public repo", ar: "مشروع عتاد · بلا مستودع عام" }, tone: "a1" },
  concept: { label: { en: "Concept / research", ar: "فكرة بحثية" }, tone: "warn" },
  idea: { label: { en: "Idea · not started", ar: "فكرة · لم يبدأ التنفيذ" }, tone: "muted" },
};

const PROJECTS: Project[] = [
  {
    id: "fruitscan",
    cats: ["mobile", "ai"],
    icon: "🍎",
    title: { en: "FruitScan", ar: "FruitScan" },
    status: "built",
    short: {
      en: "A Flutter app that recognises 20 types of fruit on the device with TensorFlow Lite, shows nutrition info and keeps a scan history.",
      ar: "تطبيق Flutter يتعرّف على 20 نوعاً من الفاكهة على الجهاز نفسه باستخدام TensorFlow Lite، ويعرض القيم الغذائية ويحفظ سجل الفحوصات.",
    },
    problem: {
      en: "Knowing what a fruit is and what it contains should take one photo — with the model running right on the phone.",
      ar: "معرفة نوع الفاكهة ومحتواها الغذائي يجب أن تحتاج صورة واحدة فقط — مع تشغيل النموذج على الهاتف نفسه.",
    },
    long: {
      en: "I built a Flutter app that classifies 20 fruit types with an on-device TensorFlow Lite model, then shows nutrition information for the result and saves it to a scan history. On the web, where TensorFlow Lite isn't available, the app falls back to TensorFlow.js.",
      ar: "بنيتُ تطبيق Flutter يصنّف 20 نوعاً من الفاكهة بنموذج TensorFlow Lite يعمل على الجهاز، ثم يعرض المعلومات الغذائية للنتيجة ويحفظها في سجل الفحوصات. وعلى الويب، حيث لا يتوفر TensorFlow Lite، يستخدم التطبيق TensorFlow.js بديلاً.",
    },
    steps: {
      en: ["Take or pick a fruit photo", "Classify it on the device (TFLite)", "Show the fruit and its nutrition info", "Save the result to scan history", "Web build: same flow with TensorFlow.js"],
      ar: ["التقاط صورة فاكهة أو اختيارها", "تصنيفها على الجهاز (TFLite)", "عرض نوع الفاكهة وقيمها الغذائية", "حفظ النتيجة في سجل الفحوصات", "نسخة الويب: نفس التسلسل عبر TensorFlow.js"],
    },
    tags: ["Flutter", "Dart", "TensorFlow Lite", "TensorFlow.js", "On-device ML"],
    repos: ["fruit_scan_app"],
    demo: "fruit",
    demoNote: { en: "Architecture view — switch the platform to see which ML engine runs.", ar: "عرض للبنية — بدّل المنصّة لترى أي محرّك تعلّم آلة يعمل." },
    // TODO(owner): add 2–3 screenshots of FruitScan to public/projects/ and list them here.
    shotsPending: true,
  },
  {
    id: "unitask",
    cats: ["mobile"],
    icon: "✅",
    title: { en: "UniTask", ar: "UniTask" },
    status: "dev",
    short: {
      en: "A student task app in Flutter, linked to my Systems Integration course. Currently in development.",
      ar: "تطبيق مهام للطلاب بـ Flutter، مرتبط بمقرر تكامل الأنظمة. قيد التطوير حالياً.",
    },
    problem: {
      en: "Students juggle tasks and deadlines across many courses; UniTask is my attempt to keep them in one place.",
      ar: "يتعامل الطلاب مع مهام ومواعيد تسليم في مقررات كثيرة؛ UniTask محاولتي لجمعها في مكان واحد.",
    },
    long: {
      en: "A Flutter app for managing student tasks, developed as part of the Systems Integration course. It is still in development, so features and screenshots will be added here as it grows.",
      ar: "تطبيق Flutter لإدارة مهام الطلاب، أطوّره ضمن مقرر تكامل الأنظمة. ما يزال قيد التطوير، وستُضاف الميزات والصور هنا مع تقدّمه.",
    },
    tags: ["Flutter", "Dart", "Systems Integration"],
    // TODO(owner): list UniTask's features, backend/integration and repo link when ready.
    pending: true,
    shotsPending: true,
  },
  {
    id: "facedoor",
    cats: ["iot", "ai"],
    icon: "🚪",
    title: { en: "Face-verification Door", ar: "باب بالتحقق من الوجه" },
    status: "hardware",
    short: {
      en: "An electronic door that opens only after verifying the user's face.",
      ar: "باب إلكتروني لا يُفتح إلا بعد التحقق من وجه المستخدم.",
    },
    problem: {
      en: "Keys and cards can be lost or shared; a face is harder to borrow.",
      ar: "المفاتيح والبطاقات قد تضيع أو تُعار؛ أما الوجه فيصعب استعارته.",
    },
    long: {
      en: "An electronic door lock that uses face verification: the camera captures the person in front of the door and the lock opens only when the face is verified.",
      ar: "قفل باب إلكتروني يعتمد على التحقق من الوجه: تلتقط الكاميرا الشخص أمام الباب ولا يُفتح القفل إلا عند التحقق من الوجه.",
    },
    steps: {
      en: ["Camera captures the face", "Face is verified", "Door opens"],
      ar: ["الكاميرا تلتقط الوجه", "التحقق من الوجه", "فتح الباب"],
    },
    tags: ["Computer Vision", "Face verification", "Electronics"],
    // TODO(owner): confirm board, camera, library/model used, course and date; add a photo or video.
    pending: true,
  },
  {
    id: "tempalarm",
    cats: ["iot"],
    icon: "🌡️",
    title: { en: "Temperature Alarm", ar: "منبّه الحرارة" },
    status: "hardware",
    short: {
      en: "A temperature alarm: a buzzer sounds when the temperature reaches 30 °C.",
      ar: "منبّه حرارة: يعمل الجرس (Buzzer) عندما تصل الحرارة إلى 30 درجة مئوية.",
    },
    problem: {
      en: "Some rooms and devices need a warning before they get too hot.",
      ar: "بعض الغرف والأجهزة تحتاج إلى تنبيه قبل أن ترتفع حرارتها كثيراً.",
    },
    long: {
      en: "A temperature sensor is read continuously; when the reading reaches the 30 °C threshold, a buzzer sounds. Try the logic below with the slider.",
      ar: "تُقرأ درجة الحرارة باستمرار من حساس؛ وعندما تصل القراءة إلى حدّ 30 درجة يعمل الجرس. جرّب المنطق أدناه بشريط التمرير.",
    },
    steps: {
      en: ["Read the temperature sensor", "Compare with 30 °C", "Sound the buzzer at 30 °C or above"],
      ar: ["قراءة حساس الحرارة", "المقارنة مع 30 درجة", "تشغيل الجرس عند 30 درجة أو أكثر"],
    },
    tags: ["Sensors", "Buzzer", "Embedded"],
    demo: "temp",
    demoNote: { en: "Logic demo of the 30 °C threshold (simulated, not live hardware).", ar: "عرض لمنطق حدّ 30 درجة (محاكاة، وليس العتاد الحقيقي)." },
    // TODO(owner): confirm microcontroller and sensor model; add a photo.
    pending: true,
  },
  {
    id: "cloud",
    cats: ["cloud"],
    icon: "☁️",
    title: { en: "Cloud Computing & Linux", ar: "الحوسبة السحابية و Linux" },
    status: "lab",
    short: {
      en: "Configured a web server on Debian Linux with Nginx and PHP-FPM inside a virtual environment.",
      ar: "إعداد خادم ويب على Debian Linux باستخدام Nginx و PHP-FPM داخل بيئة افتراضية.",
    },
    problem: {
      en: "Understanding how a real web server is set up — from an empty VM to a page served over HTTP.",
      ar: "فهم كيف يُجهَّز خادم ويب حقيقي — من آلة افتراضية فارغة حتى صفحة تُخدَم عبر HTTP.",
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
    demo: "cloud",
  },
  {
    id: "cpp",
    cats: ["cpp"],
    icon: "⌨️",
    title: { en: "C++ Console Apps", ar: "تطبيقات كونسول بـ C++" },
    status: "built",
    short: {
      en: "Three console applications in C++: Coffee-shop-project, Users-Manager and app_store.",
      ar: "ثلاثة تطبيقات كونسول بلغة C++: Coffee-shop-project و Users-Manager و app_store.",
    },
    problem: {
      en: "Learning programming fundamentals by building complete small programs, not just exercises.",
      ar: "تعلّم أساسيات البرمجة ببناء برامج صغيرة كاملة، لا مجرد تمارين.",
    },
    long: {
      en: "Three console programs written in C++ — a coffee-shop program, a users manager and an app store. The source code is public on GitHub.",
      ar: "ثلاثة برامج كونسول مكتوبة بـ C++ — برنامج لمتجر قهوة، ومدير للمستخدمين، ومتجر تطبيقات. الكود المصدري متاح على GitHub.",
    },
    tags: ["C++", "Console", "OOP basics"],
    repos: ["Coffee-shop-project", "Users-Manager-", "app_store"],
  },
  {
    id: "vision",
    cats: ["ai"],
    icon: "👁️",
    title: { en: "VisionCheck AI", ar: "VisionCheck AI" },
    status: "concept",
    short: {
      en: "A conceptual research project for a mobile app that screens visual acuity using computer vision and AI.",
      ar: "مشروع بحثي مفاهيمي لتطبيق موبايل يفحص حدة البصر مبدئياً باستخدام الرؤية الحاسوبية والذكاء الاصطناعي.",
    },
    problem: {
      en: "Many people never get a basic eye check; a phone could tell them when a professional exam is worth it.",
      ar: "كثيرون لا يُجرون فحصاً بسيطاً للنظر؛ ويمكن للهاتف أن ينبّههم متى يستحق الأمر فحصاً متخصصاً.",
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
    demo: "vision",
    demoNote: { en: "Concept demo — a playful sketch of the idea, not the real app.", ar: "تجربة مفاهيمية — تصوّر مبسّط للفكرة، وليست التطبيق الحقيقي." },
  },
  {
    id: "parking",
    cats: ["iot"],
    icon: "🅿️",
    title: { en: "Smart Parking System", ar: "نظام المواقف الذكية" },
    status: "idea",
    short: {
      en: "An academic concept using ultrasonic sensors, ESP32 and Wi-Fi to report free parking spaces on a dashboard.",
      ar: "فكرة أكاديمية تستخدم حساسات فوق صوتية و ESP32 و Wi-Fi لإظهار المواقف الفارغة على لوحة تحكم.",
    },
    problem: {
      en: "Drivers waste time circling for a free spot that a sensor could already see.",
      ar: "يضيّع السائقون وقتهم بحثاً عن موقف فارغ كان بإمكان حساس أن يراه مسبقاً.",
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
    demo: "parking",
    demoNote: { en: "Concept demo — the system has not been built yet; this simulator shows the idea.", ar: "تجربة مفاهيمية — النظام لم يُبنَ بعد؛ هذا المحاكي يوضّح الفكرة فقط." },
  },
];

/* ------------------------------------------------------------------ */
/* timeline                                                            */
/* ------------------------------------------------------------------ */
export type TlCat = "edu" | "work" | "venture" | "event" | "award" | "volunteer";
export type TlItem = {
  /** sortable key YYYY-MM (00 = month unknown); empty = undated */
  key: string;
  cat: TlCat;
  when: L;
  title: L;
  org: L;
  desc: L;
  tags: string[];
  icon: string;
};

const TIMELINE: TlItem[] = [
  // ---- existing entries (kept, dates added) ----
  {
    key: "2024-09",
    cat: "edu",
    when: { en: "Sep 2024 – expected 2028", ar: "سبتمبر 2024 – متوقع 2028" },
    title: { en: "Bachelor of Information Technology", ar: "بكالوريوس تكنولوجيا المعلومات" },
    org: { en: "Universitas Islam Negeri Salatiga — Indonesia", ar: "جامعة UIN سالاتيغا — إندونيسيا" },
    desc: {
      en: "Focusing on software engineering, web application development and modern technologies. Active in international programs and student organizations. Now in my third year · semester 4 GPA 3.70.",
      ar: "أركّز على هندسة البرمجيات وتطوير تطبيقات الويب والتقنيات الحديثة. نشط في البرامج الدولية والمنظمات الطلابية. حالياً في السنة الثالثة · المعدل في الفصل الرابع 3.70.",
    },
    tags: ["Software Eng.", "Web", "IoT", "Cloud"],
    icon: "🎓",
  },
  {
    key: "2025-06",
    cat: "venture",
    when: { en: "Jun 2025 – Present", ar: "يونيو 2025 – الآن" },
    title: { en: "Founder & Manager — Abu Hilal Sky", ar: "المؤسس والمدير — Abu Hilal Sky" },
    org: { en: "Travel & study-abroad guidance · remote", ar: "خدمات السفر والإرشاد للدراسة بالخارج · عن بُعد" },
    desc: {
      en: "Established an initiative providing travel services, visa-procedure assistance and educational consultancy for international students.",
      ar: "أسّستُ مبادرة تقدّم خدمات السفر والمساعدة في إجراءات التأشيرة والاستشارات التعليمية للطلاب الدوليين.",
    },
    tags: ["Leadership", "Management", "Consulting"],
    icon: "🚀",
  },
  {
    key: "",
    cat: "event",
    when: { en: "Beyond class", ar: "خارج القاعة" },
    title: { en: "Global Engagement", ar: "المشاركة العالمية" },
    org: { en: "Conferences · public speaking · cultural exchange", ar: "مؤتمرات · إلقاء · تبادل ثقافي" },
    desc: {
      // TODO(owner): add the names and dates of the student organizations and the events where you spoke.
      en: "Representing Yemeni culture and speaking at international events across Indonesia. I'm currently active in student organizations.",
      ar: "تمثيل الثقافة اليمنية والتحدث في فعاليات دولية داخل إندونيسيا. وأنا نشط حالياً في المنظمات الطلابية.",
    },
    tags: ["Speaking", "Teamwork", "Culture"],
    icon: "🌍",
  },
  // ---- new entries from the CV ----
  {
    key: "2026-10",
    cat: "event",
    when: { en: "6–8 Oct 2026", ar: "6–8 أكتوبر 2026" },
    title: { en: "Natura Scientia Camp Flash 2026", ar: "Natura Scientia Camp Flash 2026" },
    org: { en: "UNNES — Indonesia", ar: "جامعة UNNES — إندونيسيا" },
    desc: { en: "Participant in a three-day science camp.", ar: "مشارك في مخيّم علمي لمدة ثلاثة أيام." },
    tags: ["Science", "Camp"],
    icon: "🏕️",
  },
  {
    key: "2026-08",
    cat: "event",
    when: { en: "Aug 2026", ar: "أغسطس 2026" },
    title: { en: "Privacy & Cyber Security Awareness Conference", ar: "مؤتمر التوعية بالخصوصية والأمن السيبراني" },
    org: { en: "UIN Salatiga", ar: "جامعة UIN سالاتيغا" },
    desc: { en: "Attended a conference on privacy and cybersecurity awareness.", ar: "حضور مؤتمر حول التوعية بالخصوصية والأمن السيبراني." },
    tags: ["Cybersecurity", "Privacy"],
    icon: "🛡️",
  },
  {
    key: "2026-07",
    cat: "edu",
    when: { en: "Jul 2026", ar: "يوليو 2026" },
    title: { en: "Academic Writing for International Students", ar: "الكتابة الأكاديمية للطلاب الدوليين" },
    org: { en: "Training", ar: "تدريب" },
    desc: { en: "Training in academic writing for international students.", ar: "تدريب في الكتابة الأكاديمية للطلاب الدوليين." },
    tags: ["Writing", "Research"],
    icon: "✍️",
  },
  {
    key: "2026-00",
    cat: "event",
    when: { en: "2026", ar: "2026" },
    title: { en: "SHIRAA 2026", ar: "SHIRAA 2026" },
    org: { en: "Workshops & hackathon webinar", ar: "ورش عمل وندوة هاكاثون" },
    desc: { en: "Took part in the SHIRAA 2026 workshops and hackathon webinar.", ar: "شاركتُ في ورش عمل SHIRAA 2026 وندوة الهاكاثون." },
    tags: ["Workshops", "Hackathon"],
    icon: "⚡",
  },
  {
    key: "2025-05",
    cat: "award",
    when: { en: "4 May 2025", ar: "4 مايو 2025" },
    title: { en: "TOEFL Prediction — 583 (practice test)", ar: "TOEFL Prediction — 583 (اختبار تجريبي)" },
    org: { en: "English proficiency · practice test", ar: "إتقان الإنجليزية · اختبار تجريبي" },
    desc: { en: "Scored 583 on a TOEFL Prediction practice test.", ar: "حصلتُ على 583 في اختبار TOEFL Prediction التجريبي." },
    tags: ["English"],
    icon: "📝",
  },
  {
    key: "2024-10",
    cat: "event",
    when: { en: "Oct 2024", ar: "أكتوبر 2024" },
    title: { en: "International Islamic Economics Summer Class", ar: "الفصل الصيفي الدولي للاقتصاد الإسلامي" },
    org: { en: "UIN Raden Mas Said", ar: "جامعة UIN Raden Mas Said" },
    desc: { en: "Participant in an international summer class on Islamic economics.", ar: "مشارك في فصل صيفي دولي عن الاقتصاد الإسلامي." },
    tags: ["International", "Economics"],
    icon: "🌐",
  },
  {
    key: "2024-09",
    cat: "event",
    when: { en: "Sep 2024", ar: "سبتمبر 2024" },
    title: { en: "5th International Conference on Islamic Economics and Business", ar: "المؤتمر الدولي الخامس للاقتصاد والأعمال الإسلامية" },
    org: { en: "UIN Salatiga", ar: "جامعة UIN سالاتيغا" },
    desc: { en: "Attended the 5th international conference on Islamic economics and business.", ar: "حضور المؤتمر الدولي الخامس للاقتصاد والأعمال الإسلامية." },
    tags: ["Conference"],
    icon: "🎤",
  },
  {
    key: "2023-00",
    cat: "volunteer",
    when: { en: "Winter 2023", ar: "شتاء 2023" },
    title: { en: "Charity initiative", ar: "مبادرة خيرية" },
    org: { en: "Marib, Yemen", ar: "مأرب، اليمن" },
    desc: { en: "Volunteered in a winter charity initiative in Marib.", ar: "تطوّعتُ في مبادرة خيرية شتوية في مأرب." },
    tags: ["Volunteering", "Community"],
    icon: "🤝",
  },
  {
    key: "2023-08",
    cat: "edu",
    when: { en: "Aug 2023", ar: "أغسطس 2023" },
    title: { en: "Introduction to Cybersecurity", ar: "مقدمة في الأمن السيبراني" },
    org: { en: "Different Academy", ar: "Different Academy" },
    desc: { en: "Introductory training in cybersecurity — the start of my long-term goal.", ar: "تدريب تمهيدي في الأمن السيبراني — بداية هدفي بعيد المدى." },
    tags: ["Cybersecurity"],
    icon: "🔐",
  },
  {
    key: "2023-00",
    cat: "work",
    when: { en: "2023 · about 4–5 months", ar: "2023 · نحو 4–5 أشهر" },
    title: { en: "Executive Manager", ar: "مدير تنفيذي" },
    org: { en: "Al Shifa Medical Center — Marib, Yemen", ar: "مركز الشفاء الطبي — مأرب، اليمن" },
    desc: { en: "Executive management of a medical center for about four to five months.", ar: "الإدارة التنفيذية لمركز طبي لمدة أربعة إلى خمسة أشهر تقريباً." },
    tags: ["Management", "Operations"],
    icon: "🏥",
  },
  {
    key: "2023-04",
    cat: "award",
    when: { en: "Apr 2023", ar: "أبريل 2023" },
    title: { en: "ICDL — 1st in cohort (98.57%) · Quran memorisation certificate", ar: "رخصة ICDL — الأول على الدفعة (98.57%) · شهادة حفظ القرآن" },
    org: { en: "Achievements", ar: "إنجازات" },
    desc: {
      en: "Earned the International Computer Driving Licence, ranking first in my cohort with 98.57%, and received a Quran memorisation certificate the same month.",
      ar: "حصلتُ على الرخصة الدولية لقيادة الحاسوب بالمركز الأول على الدفعة بنسبة 98.57%، ونلتُ شهادة حفظ القرآن الكريم في الشهر نفسه.",
    },
    tags: ["ICDL", "Quran"],
    icon: "🏆",
  },
  {
    key: "2023-02",
    cat: "work",
    when: { en: "Feb – May 2023", ar: "فبراير – مايو 2023" },
    title: { en: "Secretary · Quran circle teacher", ar: "سكرتير · معلّم حلقة قرآن" },
    org: { en: "Al Dar Charity School — Marib, Yemen", ar: "مدرسة الدار الخيرية — مأرب، اليمن" },
    desc: {
      en: "Worked as the school's secretary and volunteered as a Quran circle teacher.",
      ar: "عملتُ سكرتيراً للمدرسة، وتطوّعتُ معلّماً لحلقة تحفيظ القرآن.",
    },
    tags: ["Administration", "Teaching"],
    icon: "📚",
  },
  {
    key: "2022-00",
    cat: "edu",
    when: { en: "2022", ar: "2022" },
    title: { en: "Professional Diploma in Business Administration", ar: "دبلوم مهني في إدارة الأعمال" },
    org: { en: "60 hours · 99%", ar: "60 ساعة · 99%" },
    desc: { en: "Completed a 60-hour professional diploma in business administration with 99%.", ar: "أكملتُ دبلوماً مهنياً في إدارة الأعمال مدته 60 ساعة بنسبة 99%." },
    tags: ["Business", "Management"],
    icon: "📊",
  },
  {
    // TODO(owner): add the year of the General Secondary Certificate.
    key: "0000-00",
    cat: "award",
    when: { en: "Secondary school", ar: "الثانوية العامة" },
    title: { en: "General Secondary Certificate — 86.38%", ar: "شهادة الثانوية العامة — 86.38%" },
    org: { en: "Literary section · Marib Governorate", ar: "القسم الأدبي · محافظة مأرب" },
    desc: { en: "Ranked 3rd in the literary section of Marib Governorate.", ar: "المركز الثالث على القسم الأدبي في محافظة مأرب." },
    tags: ["Top 3"],
    icon: "🥉",
  },
];

/* ------------------------------------------------------------------ */
/* certificates wall                                                   */
/* ------------------------------------------------------------------ */
export type Cert = { id: string; icon: string; kind: L; title: L; org: L; when: L; score?: string; note?: L };
// TODO(owner): if you add certificate scans to public/certs/, crop out any ID / passport / birth-date details first.
const CERTS: Cert[] = [
  {
    id: "icdl",
    icon: "💻",
    kind: { en: "Achievement", ar: "إنجاز" },
    title: { en: "ICDL — International Computer Driving Licence", ar: "ICDL — الرخصة الدولية لقيادة الحاسوب" },
    org: { en: "1st in cohort", ar: "الأول على الدفعة" },
    when: { en: "Apr 2023", ar: "أبريل 2023" },
    score: "98.57%",
  },
  {
    id: "quran",
    icon: "📖",
    kind: { en: "Achievement", ar: "إنجاز" },
    title: { en: "Quran memorisation certificate", ar: "شهادة حفظ القرآن الكريم" },
    org: { en: "Quran memorisation", ar: "تحفيظ القرآن" },
    when: { en: "Apr 2023", ar: "أبريل 2023" },
  },
  {
    id: "diploma",
    icon: "📊",
    kind: { en: "Diploma", ar: "دبلوم" },
    title: { en: "Professional Diploma in Business Administration", ar: "دبلوم مهني في إدارة الأعمال" },
    org: { en: "60 hours", ar: "60 ساعة" },
    when: { en: "2022", ar: "2022" },
    score: "99%",
  },
  {
    id: "secondary",
    icon: "🥉",
    kind: { en: "Achievement", ar: "إنجاز" },
    title: { en: "General Secondary Certificate", ar: "شهادة الثانوية العامة" },
    org: { en: "3rd in the literary section, Marib Governorate", ar: "الثالث على القسم الأدبي، محافظة مأرب" },
    when: { en: "Secondary school", ar: "الثانوية" },
    score: "86.38%",
  },
  {
    id: "cyber",
    icon: "🔐",
    kind: { en: "Training", ar: "تدريب" },
    title: { en: "Introduction to Cybersecurity", ar: "مقدمة في الأمن السيبراني" },
    org: { en: "Different Academy", ar: "Different Academy" },
    when: { en: "Aug 2023", ar: "أغسطس 2023" },
  },
  {
    id: "writing",
    icon: "✍️",
    kind: { en: "Training", ar: "تدريب" },
    title: { en: "Academic Writing for International Students", ar: "الكتابة الأكاديمية للطلاب الدوليين" },
    org: { en: "Training", ar: "تدريب" },
    when: { en: "Jul 2026", ar: "يوليو 2026" },
  },
  {
    id: "toefl",
    icon: "📝",
    kind: { en: "Practice test", ar: "اختبار تجريبي" },
    title: { en: "TOEFL Prediction", ar: "TOEFL Prediction" },
    org: { en: "Practice test — not an official TOEFL score", ar: "اختبار تجريبي — ليست درجة TOEFL رسمية" },
    when: { en: "4 May 2025", ar: "4 مايو 2025" },
    score: "583",
  },
];

/* ------------------------------------------------------------------ */
/* all UI text (EN + AR)                                               */
/* ------------------------------------------------------------------ */
export const t = {
  nav: {
    about: { en: "About", ar: "نبذة" },
    skills: { en: "Skills", ar: "المهارات" },
    resume: { en: "Journey", ar: "المسيرة" },
    projects: { en: "Projects", ar: "المشاريع" },
    github: { en: "GitHub", ar: "جيت هب" },
    certs: { en: "Certificates", ar: "الشهادات" },
    gallery: { en: "Gallery", ar: "المعرض" },
    contact: { en: "Contact", ar: "تواصل" },
  },
  boot: {
    skip: { en: "Press any key or tap to skip", ar: "اضغط أي زر أو المس الشاشة للتخطي" },
    lines: [
      "mohammed-os v2.0 — booting…",
      "[ ok ] mounting /home/mohammed",
      "[ ok ] loading modules: flutter python iot cloud security",
      "[ ok ] starting window manager",
      "[ ok ] restoring language & theme",
      "welcome, visitor.",
    ],
  },
  hero: {
    hi: { en: "Hi, I'm", ar: "مرحباً، أنا" },
    name: { en: "Mohammed", ar: "محمد" },
    alias: { en: "a.k.a. Abu Hilal", ar: "أبو هلال" },
    intro: {
      en: "A Yemeni Information Technology undergraduate at Universitas Islam Negeri Salatiga, Indonesia — building software, exploring AI, IoT and cybersecurity, and turning ideas into practical solutions.",
      ar: "طالب تكنولوجيا معلومات يمني في جامعة UIN سالاتيغا بإندونيسيا — أبني البرمجيات، وأستكشف الذكاء الاصطناعي وإنترنت الأشياء والأمن السيبراني، وأحوّل الأفكار إلى حلول عملية.",
    },
    cta1: { en: "Discover My Work", ar: "اكتشف أعمالي" },
    cta2: { en: "Get In Touch", ar: "تواصل معي" },
    cta3: { en: "Open Terminal", ar: "افتح التيرمنال" },
    cv: { en: "Download CV", ar: "تحميل السيرة الذاتية" },
    cvSoon: { en: "CV coming soon — email me for a copy.", ar: "السيرة الذاتية قريباً — راسلني للحصول على نسخة." },
    roles: {
      en: ["IT Student", "Full-Stack Developer", "IoT Explorer", "Cybersecurity Learner", "Entrepreneur"],
      ar: ["طالب تكنولوجيا معلومات", "مطوّر Full-Stack", "مستكشف إنترنت الأشياء", "متعلّم أمن سيبراني", "رائد أعمال"],
    },
    scroll: { en: "scroll", ar: "مرّر" },
    hint: { en: "Press Ctrl + K for the command palette", ar: "اضغط Ctrl + K للوحة الأوامر" },
  },
  stats: {
    started: { v: 2024, label: { en: "Started B.IT", ar: "بدأت البكالوريوس" } },
    repos: { v: 8, label: { en: "GitHub repos", ar: "مستودع على جيت هب" } },
    skills: { label: { en: "Skills & tools", ar: "مهارات وأدوات" } },
    countries: { label: { en: "Countries lived", ar: "بلدان عشت فيها" } },
  },
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
    study: { en: "Studying", ar: "الدراسة" },
    studyV: { en: "B.IT · 3rd year · GPA 3.70 (sem. 4)", ar: "بكالوريوس IT · السنة 3 · معدل 3.70 (الفصل 4)" },
    langsTitle: { en: "Languages", ar: "اللغات" },
    langsNote: { en: "Self-assessed, out of 5", ar: "تقييم ذاتي من 5" },
    langs: [
      { n: { en: "Arabic", ar: "العربية" }, lv: 5, tag: { en: "native", ar: "اللغة الأم" } },
      { n: { en: "English", ar: "الإنجليزية" }, lv: 4, tag: { en: "TOEFL Prediction 583 · practice test", ar: "TOEFL Prediction 583 · اختبار تجريبي" } },
      { n: { en: "Indonesian", ar: "الإندونيسية" }, lv: 4, tag: { en: "", ar: "" } },
      { n: { en: "Turkish", ar: "التركية" }, lv: 2, tag: { en: "basics", ar: "أساسيات" } },
    ],
    coursesTitle: { en: "Courses I've taken", ar: "مقررات درستها" },
    courses: [
      { en: "Systems Integration", ar: "تكامل الأنظمة" },
      { en: "Internet of Things", ar: "إنترنت الأشياء" },
      { en: "Machine Learning", ar: "تعلّم الآلة" },
      { en: "Cloud Computing", ar: "الحوسبة السحابية" },
      { en: "Cyber Security", ar: "الأمن السيبراني" },
      { en: "Computer Vision", ar: "الرؤية الحاسوبية" },
      { en: "Digital Forensics", ar: "التحليل الجنائي الرقمي" },
    ] as L[],
  },
  skills: {
    title: { en: "Tech Stack", ar: "الحزمة التقنية" },
    sub: {
      en: "Click a category, then hover or tap a skill to see how I use it.",
      ar: "اختر فئة ثم مرّر أو اضغط على المهارة لمعرفة كيف أستخدمها.",
    },
    mapSub: {
      en: "An interactive map: hover or tap a node to see how I use it and which projects it powers.",
      ar: "خريطة تفاعلية: مرّر أو اضغط على أي عقدة لترى كيف أستخدمها وما المشاريع المرتبطة بها.",
    },
    viewMap: { en: "Map", ar: "خريطة" },
    viewList: { en: "List", ar: "قائمة" },
    usedIn: { en: "Used in", ar: "مستخدمة في" },
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
          { n: "Flutter", d: { en: "Cross-platform UI — my current focus.", ar: "واجهات متعددة المنصات — تركيزي الحالي." }, p: ["fruitscan", "unitask"] },
          { n: "Dart", d: { en: "Language behind Flutter (e.g. fruit_scan_app).", ar: "لغة Flutter (مثل fruit_scan_app)." }, p: ["fruitscan", "unitask"] },
          { n: "C++", d: { en: "Console apps: Coffee shop, Users manager, App store.", ar: "تطبيقات كونسول: متجر قهوة، إدارة مستخدمين، متجر تطبيقات." }, p: ["cpp"] },
        ],
      },
      {
        id: "ai",
        icon: "🧠",
        name: { en: "AI & Python", ar: "الذكاء الاصطناعي وبايثون" },
        items: [
          { n: "Python", d: { en: "Scripting, automation and backend (python-tools).", ar: "سكربتات وأتمتة وباك إند (python-tools)." } },
          { n: "TensorFlow Lite", d: { en: "On-device fruit classification in FruitScan (TensorFlow.js on the web).", ar: "تصنيف الفاكهة على الجهاز في FruitScan (و TensorFlow.js على الويب)." }, p: ["fruitscan"] },
          { n: "Computer Vision", d: { en: "VisionCheck AI — visual acuity screening concept.", ar: "VisionCheck AI — فكرة فحص حدة البصر." }, p: ["vision", "facedoor"] },
          { n: "Machine Learning", d: { en: "Learning the fundamentals through projects.", ar: "أتعلّم الأساسيات عبر المشاريع." }, p: ["fruitscan"] },
          { n: "Image Processing", d: { en: "Working with image data and pipelines.", ar: "العمل على بيانات الصور ومعالجتها." } },
        ],
      },
      {
        id: "sys",
        icon: "🖥️",
        name: { en: "Systems & Cloud", ar: "الأنظمة والسحابة" },
        items: [
          { n: "Debian Linux", d: { en: "Server setup in a virtual environment.", ar: "إعداد خادم في بيئة افتراضية." }, p: ["cloud"] },
          { n: "Nginx", d: { en: "Web server & reverse proxy.", ar: "خادم ويب و Reverse proxy." }, p: ["cloud"] },
          { n: "PHP-FPM", d: { en: "Fast PHP process manager paired with Nginx.", ar: "مدير عمليات PHP سريع مع Nginx." }, p: ["cloud"] },
          { n: "Git & GitHub", d: { en: "Version control and collaboration.", ar: "التحكم بالإصدارات والتعاون." } },
          { n: "Vercel", d: { en: "Deploying this site.", ar: "نشر هذا الموقع." } },
        ],
      },
      {
        id: "iot",
        icon: "📡",
        name: { en: "IoT & Security", ar: "IoT والأمن" },
        items: [
          { n: "ESP32", d: { en: "Wi-Fi microcontroller for the Smart Parking concept.", ar: "متحكم Wi-Fi لفكرة المواقف الذكية." }, p: ["parking"] },
          { n: "Ultrasonic sensors", d: { en: "Distance sensing to detect cars.", ar: "استشعار المسافة لاكتشاف السيارات." }, p: ["parking"] },
          { n: "Sensors & buzzers", d: { en: "Reading a temperature sensor and sounding a buzzer at 30 °C.", ar: "قراءة حساس حرارة وتشغيل جرس عند 30 درجة." }, p: ["tempalarm"] },
          { n: "Cybersecurity", d: { en: "Exploring — my long-term career goal.", ar: "أستكشفه — هدفي المهني بعيد المدى." } },
        ],
      },
    ] as { id: string; icon: string; name: L; items: { n: string; d: L; p?: string[] }[] }[],
    tip: { en: "Tap a skill", ar: "اضغط على مهارة" },
  },
  resume: {
    title: { en: "Journey", ar: "المسيرة" },
    sub: {
      en: "Education, work, ventures, events and achievements — newest first. Filter, then open any entry.",
      ar: "التعليم والعمل والمبادرات والفعاليات والإنجازات — الأحدث أولاً. اختر فئة ثم افتح أي عنصر.",
    },
    filters: [
      { id: "all", label: { en: "All", ar: "الكل" } },
      { id: "edu", label: { en: "Education", ar: "التعليم" } },
      { id: "work", label: { en: "Work", ar: "العمل" } },
      { id: "venture", label: { en: "Venture", ar: "مبادرات" } },
      { id: "event", label: { en: "Events", ar: "فعاليات" } },
      { id: "award", label: { en: "Achievements", ar: "إنجازات" } },
      { id: "volunteer", label: { en: "Volunteering", ar: "تطوّع" } },
    ] as { id: "all" | TlCat; label: L }[],
    items: [...TIMELINE].sort((a, b) => (a.key === "" ? -1 : b.key === "" ? 1 : b.key.localeCompare(a.key))),
  },
  projects: {
    title: { en: "Technical Projects & Research", ar: "المشاريع التقنية والبحثية" },
    sub: {
      en: "Each project opens as a case study in its own window — drag it, stack several, close with ✕ or Esc. Status labels are honest.",
      ar: "كل مشروع يُفتح كدراسة حالة في نافذة مستقلة — اسحبها، وافتح أكثر من واحدة، وأغلقها بـ ✕ أو Esc. حالة كل مشروع مذكورة بصدق.",
    },
    filters: [
      { id: "all", label: { en: "All", ar: "الكل" } },
      { id: "mobile", label: { en: "Mobile", ar: "موبايل" } },
      { id: "ai", label: { en: "AI", ar: "ذكاء اصطناعي" } },
      { id: "iot", label: { en: "IoT", ar: "IoT" } },
      { id: "cloud", label: { en: "Cloud", ar: "سحابة" } },
      { id: "cpp", label: { en: "C++", ar: "C++" } },
    ],
    open: { en: "Open case study", ar: "افتح دراسة الحالة" },
    close: { en: "Close", ar: "إغلاق" },
    minimize: { en: "Minimize", ar: "تصغير" },
    maximize: { en: "Maximize", ar: "تكبير" },
    stack: { en: "Tech stack", ar: "التقنيات" },
    how: { en: "How it works", ar: "كيف يعمل" },
    problem: { en: "The problem", ar: "المشكلة" },
    built: { en: "What I built", ar: "ما الذي بنيته" },
    idea: { en: "The idea", ar: "الفكرة" },
    status: { en: "Status", ar: "الحالة" },
    demo: { en: "Interactive demo", ar: "عرض تفاعلي" },
    code: { en: "Source code", ar: "الكود المصدري" },
    pending: { en: "More details coming soon.", ar: "مزيد من التفاصيل قريباً." },
    shots: { en: "Screenshots coming soon", ar: "لقطات الشاشة قريباً" },
    dock: { en: "Open windows", ar: "النوافذ المفتوحة" },
    items: PROJECTS,
  },
  certs: {
    title: { en: "Certificates & Achievements", ar: "الشهادات والإنجازات" },
    sub: {
      en: "A wall of what I've earned and completed. Hover or tap a card to flip it.",
      ar: "جدار لما حصلتُ عليه وأنجزته. مرّر أو اضغط على البطاقة لقلبها.",
    },
    items: CERTS,
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
    // Captions describe what is visible in each photo (pic1 … pic7).
    caps: [
      { en: "Speaking at a seminar podium", ar: "إلقاء كلمة من منصّة ندوة" },
      { en: "Speaking with the mic in Yemeni dress", ar: "الإلقاء بالميكروفون بالزي اليمني" },
      { en: "Yemen booth — International Day", ar: "ركن اليمن — اليوم الدولي" },
      { en: "In traditional Yemeni dress", ar: "بالزي اليمني التقليدي" },
      { en: "Portrait", ar: "بورتريه" },
      { en: "Café portrait", ar: "صورة في مقهى" },
      { en: "At the window", ar: "عند النافذة" },
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

/** total number of skills in the stack — drives the "Skills & tools" stat */
export const SKILL_COUNT = t.skills.cats.reduce((n, c) => n + c.items.length, 0);

// TODO(owner): tugas-1-integrasi-sistem (Python) has no README — tell me what it is so it can get a case study.
export const FALLBACK_REPOS = [
  { name: "fruit_scan_app", language: "Dart", description: null },
  { name: "Coffee-shop-project", language: "C++", description: null },
  { name: "Users-Manager-", language: "C++", description: null },
  { name: "app_store", language: "C++", description: null },
  { name: "tugas-1-integrasi-sistem", language: "Python", description: null },
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
