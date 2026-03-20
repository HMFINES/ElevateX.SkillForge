// ───────────────────────────────────────────
// DATA
// ───────────────────────────────────────────
const COURSES_DATA=[
  {
    id:'responsive-web-design',
    cat:'web',
    track:'frontend',
    icon:'🌐',
    bg:'linear-gradient(135deg,#071a2d,#0f2f56)',
    tag:'Web Foundations',
    title:'Responsive Web Design Certification',
    provider:'freeCodeCamp',
    format:'Interactive certification',
    level:'Beginner',
    cost:'Free',
    source:'Official Web',
    url:'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    desc:'Hands-on HTML, CSS, accessibility, and layout practice with project-based certification work.',
    proof:'HTML • CSS • Accessibility',
    cta:'Open certification',
  },
  {
    id:'cs50-web',
    cat:'web',
    track:'frontend',
    icon:'⚙️',
    bg:'linear-gradient(135deg,#0f152b,#1d2961)',
    tag:'Full Stack Web',
    title:'CS50’s Web Programming with Python and JavaScript',
    provider:'Harvard CS50',
    format:'OpenCourseWare',
    level:'Intermediate',
    cost:'Free',
    source:'Official Web',
    url:'https://cs50.harvard.edu/web/',
    desc:'Nine weeks of web app engineering with Django, JavaScript, SQL, APIs, testing, and deployment.',
    proof:'Django • APIs • React',
    cta:'Open course',
  },
  {
    id:'google-ux-design',
    cat:'web',
    track:'design',
    icon:'🎨',
    bg:'linear-gradient(135deg,#1a1026,#36204f)',
    tag:'Design / UX',
    title:'Google UX Design Professional Certificate',
    provider:'Coursera',
    format:'Professional certificate',
    level:'Beginner',
    cost:'Free to enroll',
    source:'Official Web',
    url:'https://www.coursera.org/professional-certificates/google-ux-design',
    desc:'A structured UX program covering research, wireframes, prototypes, Figma, and AI-assisted design workflows.',
    proof:'UX • Figma • Portfolio',
    cta:'View certificate',
  },
  {
    id:'ml-crash-course',
    cat:'ai',
    track:'ai',
    icon:'🤖',
    bg:'linear-gradient(135deg,#0b1320,#13263f)',
    tag:'Machine Learning',
    title:'Machine Learning Crash Course',
    provider:'Google for Developers',
    format:'Interactive course',
    level:'Beginner',
    cost:'Free',
    source:'Official Web',
    url:'https://developers.google.com/machine-learning/crash-course',
    desc:'Google’s practical ML foundation with interactive modules on regression, data, neural networks, and LLM basics.',
    proof:'Regression • Data • LLM intro',
    cta:'Start crash course',
  },
  {
    id:'ml-for-everybody',
    cat:'ai',
    track:'ai',
    icon:'🧠',
    bg:'linear-gradient(135deg,#12111f,#24173d)',
    tag:'Machine Learning',
    title:'Machine Learning for Everybody',
    provider:'freeCodeCamp',
    format:'YouTube course',
    level:'Beginner',
    cost:'Free',
    source:'YouTube',
    url:'https://www.youtube.com/watch?v=i_LwzRVP7bg',
    desc:'A beginner-friendly video introduction to supervised learning, TensorFlow workflows, and practical ML experiments.',
    proof:'TensorFlow • Supervised ML • Projects',
    cta:'Watch on YouTube',
  },
  {
    id:'python-data-science',
    cat:'data',
    track:'data',
    icon:'📊',
    bg:'linear-gradient(135deg,#071c30,#0d3655)',
    tag:'Data Science',
    title:'Python for Data Science - Course for Beginners',
    provider:'freeCodeCamp',
    format:'YouTube course',
    level:'Beginner',
    cost:'Free',
    source:'YouTube',
    url:'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    desc:'A long-form beginner course covering Python basics, NumPy, Pandas, Matplotlib, and a full data analysis project.',
    proof:'Python • Pandas • Matplotlib',
    cta:'Watch on YouTube',
  },
  {
    id:'intro-to-sql',
    cat:'data',
    track:'data',
    icon:'🗃️',
    bg:'linear-gradient(135deg,#1a1024,#2b1c3b)',
    tag:'Analytics / SQL',
    title:'Intro to SQL',
    provider:'Kaggle Learn',
    format:'Micro-course',
    level:'Beginner',
    cost:'Free',
    source:'Official Web',
    url:'https://www.kaggle.com/learn/intro-to-sql',
    desc:'A focused SQL micro-course for queries, joins, aggregation, and practical analysis patterns on real datasets.',
    proof:'Queries • Joins • Aggregations',
    cta:'Open micro-course',
  },
  {
    id:'aws-cloud-practitioner',
    cat:'cloud',
    track:'cloud',
    icon:'☁️',
    bg:'linear-gradient(135deg,#11131d,#262833)',
    tag:'Cloud / AWS',
    title:'AWS Cloud Practitioner Essentials',
    provider:'AWS',
    format:'On-demand training',
    level:'Beginner',
    cost:'Free',
    source:'Official Web',
    url:'https://aws.amazon.com/training/learn-about/cloud-practitioner/',
    desc:'AWS beginner training that walks through cloud basics, core services, pricing, security, and certification prep.',
    proof:'Cloud basics • Security • Pricing',
    cta:'Start on AWS',
  },
  {
    id:'azure-cloud-concepts',
    cat:'cloud',
    track:'cloud',
    icon:'🛰️',
    bg:'linear-gradient(135deg,#061326,#10355c)',
    tag:'Cloud / Azure',
    title:'Introduction to Cloud Infrastructure: Describe cloud concepts',
    provider:'Microsoft Learn',
    format:'Learning path',
    level:'Beginner',
    cost:'Free',
    source:'Official Web',
    url:'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
    desc:'A three-module Azure fundamentals path covering cloud concepts, benefits, and service types with hands-on labs.',
    proof:'Azure • Cloud models • AZ-900',
    cta:'Open learning path',
  },
  {
    id:'flutter-beginners',
    cat:'mobile',
    track:'mobile',
    icon:'📱',
    bg:'linear-gradient(135deg,#0a1b31,#0f4f73)',
    tag:'Mobile Development',
    title:'Flutter Course for Beginners',
    provider:'freeCodeCamp',
    format:'YouTube course',
    level:'Beginner',
    cost:'Free',
    source:'YouTube',
    url:'https://www.youtube.com/watch?v=VPvVD8t02U8',
    desc:'A deep beginner course for building cross-platform apps with Flutter, Dart, state, navigation, and app architecture.',
    proof:'Flutter • Dart • Cross-platform apps',
    cta:'Watch on YouTube',
  },
  {
    id:'cs50x',
    cat:'dsa',
    track:'dsa',
    icon:'🧩',
    bg:'linear-gradient(135deg,#140f1e,#22173d)',
    tag:'Computer Science',
    title:'CS50x: Introduction to Computer Science',
    provider:'Harvard CS50',
    format:'OpenCourseWare',
    level:'Beginner',
    cost:'Free',
    source:'Official Web',
    url:'https://cs50.harvard.edu/x/',
    desc:'A broad computer science foundation covering algorithms, data structures, memory, Python, SQL, and web basics.',
    proof:'Algorithms • C • Python',
    cta:'Open course',
  },
  {
    id:'data-structures-course',
    cat:'dsa',
    track:'dsa',
    icon:'🧠',
    bg:'linear-gradient(135deg,#100e20,#241c49)',
    tag:'Data Structures',
    title:'Data Structures Easy to Advanced Course',
    provider:'freeCodeCamp',
    format:'YouTube course',
    level:'Intermediate',
    cost:'Free',
    source:'YouTube',
    url:'https://www.youtube.com/watch?v=RBSGKlAvoiM',
    desc:'A structured DSA course that moves from arrays and linked lists into trees, graphs, recursion, and algorithmic thinking.',
    proof:'Arrays • Trees • Graphs',
    cta:'Watch on YouTube',
  },
  {
    id:'web-app-ethical-hacking',
    cat:'cyber',
    track:'cyber',
    icon:'🔐',
    bg:'linear-gradient(135deg,#180d12,#34161f)',
    tag:'Cybersecurity',
    title:'Web Application Ethical Hacking',
    provider:'freeCodeCamp',
    format:'YouTube course',
    level:'Intermediate',
    cost:'Free',
    source:'YouTube',
    url:'https://www.youtube.com/watch?v=X4eRbHgRawI',
    desc:'A beginner-friendly penetration testing course focused on enumeration, XSS, SQL injection, XXE, and bug bounty workflows.',
    proof:'Burp Suite • XSS • SQLi',
    cta:'Watch on YouTube',
  },
];
const COURSE_INDEX=Object.fromEntries(COURSES_DATA.map(course=>[course.id,course]));
const AI_TRACKS={
  frontend:{
    label:'Frontend Engineer',
    kicker:'HTML to interactive UI',
    duration:'10 weeks',
    intensity:'8-10 hrs/week',
    outcome:'Ship a polished portfolio site, a responsive landing page, and one API-driven dashboard.',
    skills:['Semantic HTML','Responsive CSS','Accessibility','JavaScript fundamentals','Component thinking'],
    deliverables:['Responsive portfolio website','Marketing landing page','Dashboard using a real API'],
    roadmap:[
      'Weeks 1-2: finish responsive HTML/CSS foundations and rebuild one great-looking page from scratch.',
      'Weeks 3-5: add JavaScript for forms, DOM state, fetch, and clean UI interactions.',
      'Weeks 6-8: use CS50 Web sections on JavaScript, APIs, and application structure to level up.',
      'Weeks 9-10: polish a capstone, deploy it, and turn it into recruiter-facing proof.',
    ],
    courseIds:['responsive-web-design','cs50-web','cs50x'],
  },
  ai:{
    label:'AI Engineer',
    kicker:'Math-light practical ML start',
    duration:'12 weeks',
    intensity:'8-12 hrs/week',
    outcome:'Build one notebook-based ML project, one deployable AI demo, and a clear learning base for deeper work.',
    skills:['Python for ML','Supervised learning','Model evaluation','TensorFlow basics','LLM fundamentals'],
    deliverables:['Dataset analysis notebook','Beginner ML classification project','Small AI demo with write-up'],
    roadmap:[
      'Weeks 1-3: refresh Python and computer science basics so the ML material feels easier.',
      'Weeks 4-6: finish Machine Learning for Everybody and implement the examples yourself.',
      'Weeks 7-9: work through Google ML Crash Course modules and complete the interactive exercises.',
      'Weeks 10-12: choose one problem, train a model, document tradeoffs, and publish the project.',
    ],
    courseIds:['cs50x','ml-for-everybody','ml-crash-course'],
  },
  data:{
    label:'Data Analyst',
    kicker:'SQL + Python + dashboards',
    duration:'10 weeks',
    intensity:'6-8 hrs/week',
    outcome:'Create one analysis notebook, one SQL case study, and one dashboard-ready portfolio story.',
    skills:['Python analysis stack','SQL querying','Data cleaning','Visualization','Stakeholder communication'],
    deliverables:['Jupyter analysis project','SQL business case study','Presentation-ready metrics summary'],
    roadmap:[
      'Weeks 1-3: complete Python for Data Science and practice with your own CSV datasets.',
      'Weeks 4-5: finish Intro to SQL and rewrite every query without looking at notes.',
      'Weeks 6-8: combine SQL exports with Python visualizations to tell one clear business story.',
      'Weeks 9-10: package your best analysis into a portfolio case study with before/after insights.',
    ],
    courseIds:['python-data-science','intro-to-sql','ml-crash-course'],
  },
  cloud:{
    label:'Cloud Starter',
    kicker:'Cloud basics to cert prep',
    duration:'8 weeks',
    intensity:'5-7 hrs/week',
    outcome:'Build solid cloud vocabulary, compare platforms, and get ready for entry-level cloud certification work.',
    skills:['Cloud concepts','Core AWS services','Azure service models','Pricing and security basics','Architecture language'],
    deliverables:['Cloud notes hub','Provider comparison sheet','Certification study plan'],
    roadmap:[
      'Weeks 1-3: complete the AWS cloud essentials path and focus on pricing, security, and global infrastructure.',
      'Weeks 4-5: move through Azure cloud concepts to compare service models and terminology.',
      'Weeks 6-7: write simplified notes and explain services out loud in plain language.',
      'Week 8: revise with flashcards and map a next step toward AWS Cloud Practitioner or AZ-900.',
    ],
    courseIds:['aws-cloud-practitioner','azure-cloud-concepts','cs50x'],
  },
  mobile:{
    label:'App Developer',
    kicker:'Cross-platform shipping',
    duration:'12 weeks',
    intensity:'8-10 hrs/week',
    outcome:'Build and publish a usable Flutter app with state, navigation, storage, and polished UI flows.',
    skills:['Dart basics','Flutter widgets','State management','Navigation','App architecture'],
    deliverables:['Notes or habit tracker app','API-driven mobile app','Playable demo video'],
    roadmap:[
      'Weeks 1-4: complete the Flutter beginner course and code alongside every major section.',
      'Weeks 5-7: rebuild one app feature without following the video to test real understanding.',
      'Weeks 8-10: add API data, local storage, and a cleaner design system.',
      'Weeks 11-12: polish, test, and record a short demo that feels portfolio ready.',
    ],
    courseIds:['flutter-beginners','responsive-web-design','cs50x'],
  },
  dsa:{
    label:'DSA + Problem Solving',
    kicker:'Interview-ready foundations',
    duration:'12 weeks',
    intensity:'7-9 hrs/week',
    outcome:'Improve algorithmic thinking, code confidently under pressure, and build a stronger interview base.',
    skills:['Arrays and strings','Trees and graphs','Recursion','Big O reasoning','Problem decomposition'],
    deliverables:['Solved DSA notebook','Pattern cheat sheet','Weekly timed practice routine'],
    roadmap:[
      'Weeks 1-4: go through CS50x algorithm and memory-heavy material until the fundamentals feel intuitive.',
      'Weeks 5-8: use the data structures course to deepen trees, graphs, heaps, and recursion.',
      'Weeks 9-10: summarize patterns by category instead of memorizing random problems.',
      'Weeks 11-12: practice timed sets and explain tradeoffs out loud after every solution.',
    ],
    courseIds:['cs50x','data-structures-course'],
  },
  cyber:{
    label:'Cybersecurity Starter',
    kicker:'Web security foundations',
    duration:'8 weeks',
    intensity:'6-8 hrs/week',
    outcome:'Understand common web vulnerabilities, security tooling, and safe beginner pentesting workflows.',
    skills:['Recon basics','Burp Suite workflow','XSS and SQLi basics','OWASP mindset','Security reporting'],
    deliverables:['Bug reproduction notes','Security learning journal','Mini assessment checklist'],
    roadmap:[
      'Weeks 1-3: finish the web application ethical hacking course and take notes on every attack path.',
      'Weeks 4-5: revisit the demos in a safe practice environment and document the steps clearly.',
      'Weeks 6-7: connect vulnerabilities back to how web apps are actually built.',
      'Week 8: create a beginner security checklist and map your next lab or certification step.',
    ],
    courseIds:['web-app-ethical-hacking','cs50-web'],
  },
  design:{
    label:'Product Design',
    kicker:'UX thinking + Figma execution',
    duration:'12 weeks',
    intensity:'6-8 hrs/week',
    outcome:'Create a beginner UX portfolio with wireframes, prototypes, and a responsive product case study.',
    skills:['User research','Wireframing','Figma','Usability testing','Design systems'],
    deliverables:['One UX case study','Figma prototype','Responsive product redesign'],
    roadmap:[
      'Weeks 1-4: complete the opening UX certificate modules and learn the full design process.',
      'Weeks 5-7: build low-fidelity and high-fidelity prototypes in Figma.',
      'Weeks 8-10: study responsive web constraints so your designs translate to real interfaces.',
      'Weeks 11-12: package the work into a portfolio case study with problem, process, and outcomes.',
    ],
    courseIds:['google-ux-design','responsive-web-design','cs50-web'],
  },
};

const JOBS_DATA=[
  {icon:'🏢',role:'Frontend Developer',co:'Razorpay',type:'Remote',sal:'₹12-18 LPA',tags:['React','TypeScript','Next.js'],match:96},
  {icon:'💳',role:'ML Engineer',co:'Paytm',type:'Hybrid',sal:'₹18-30 LPA',tags:['PyTorch','MLOps'],match:91},
  {icon:'🦄',role:'Data Scientist',co:'CRED',type:'Hybrid',sal:'₹15-25 LPA',tags:['Python','ML','SQL'],match:89},
  {icon:'🌐',role:'Full Stack Engineer',co:'Zepto',type:'On-site',sal:'₹10-18 LPA',tags:['MERN','AWS'],match:82},
  {icon:'🚕',role:'Backend Engineer',co:'Ola',type:'On-site',sal:'₹12-20 LPA',tags:['Node.js','Go'],match:85},
  {icon:'🍕',role:'Cloud / DevOps',co:'Swiggy',type:'Hybrid',sal:'₹14-22 LPA',tags:['AWS','Docker'],match:88},
  {icon:'🧠',role:'AI Engineer',co:'Juspay',type:'Remote',sal:'₹20-35 LPA',tags:['LLMs','LangChain'],match:94},
  {icon:'🛒',role:'Android Dev',co:'Meesho',type:'Remote',sal:'₹8-14 LPA',tags:['Kotlin','Jetpack'],match:78},
];

const TESTI_DATA=[
  {name:'Arjun Sharma',role:'Frontend Dev @ Razorpay',text:'SkillForge AI helped me crack Razorpay in 3 months. The AI mentor felt like having a personal coach 24/7.',av:'AS',h:220},
  {name:'Priya Nair',role:'Data Analyst @ CRED',text:'Zero Python to Data Analyst at CRED. Gamification kept me on track every single day. Life-changing.',av:'PN',h:280},
  {name:'Rohan Gupta',role:'ML Intern @ Google',text:'The Career Blueprint showed me exactly what to do. Now interning at Google. This platform changed my life.',av:'RG',h:190},
  {name:'Sneha Reddy',role:'Cloud Architect @ TCS',text:'AWS cert prep is the best I\'ve seen. Landed a 20 LPA role after 4 months. Worth every rupee!',av:'SR',h:50},
  {name:'Amit Kumar',role:'React Dev @ Swiggy',text:'Resume AI review, mock interviews, direct recruiter connects. Got placed in 6 weeks. Insane ROI.',av:'AK',h:10},
  {name:'Kavya Singh',role:'AI Engineer @ Juspay',text:'The LLM Engineering course is incredible. Got an AI role at 28 LPA. Harshal built exactly what India needs.',av:'KS',h:255},
];

// ───── ALL PLATFORMS (40+) ─────
// fee=0 = free redirect | fee>0 = small gateway access fee (INR)
const ALL_PLATFORMS=[
  // 🎓 Premium Course Platforms
  {cat:'Premium Course Platforms',icon:'📘',name:'Coursera',desc:'University-grade courses & certifications',url:'https://coursera.org',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Premium Course Platforms',icon:'🎯',name:'Udemy',desc:'10M+ courses, practical skills',url:'https://udemy.com',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Premium Course Platforms',icon:'🏫',name:'edX',desc:'MIT, Harvard, top uni courses',url:'https://edx.org',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Premium Course Platforms',icon:'🎨',name:'Skillshare',desc:'Creative & tech skills',url:'https://skillshare.com',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Premium Course Platforms',icon:'📡',name:'Pluralsight',desc:'Tech & cloud skills',url:'https://pluralsight.com',badge:'pb-live',bl:'LINKED',fee:9},
  // 🇮🇳 India-Specific Platforms
  {cat:'India-Specific Platforms',icon:'🎓',name:'NPTEL',desc:'IIT/IISc certified courses, free',url:'https://nptel.ac.in',badge:'pb-free',bl:'FREE',fee:0},
  {cat:'India-Specific Platforms',icon:'🇮🇳',name:'SWAYAM',desc:'Govt. of India free courses',url:'https://swayam.gov.in',badge:'pb-free',bl:'FREE',fee:0},
  {cat:'India-Specific Platforms',icon:'🌟',name:'Great Learning',desc:'PG programs & free courses',url:'https://greatlearning.in',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'India-Specific Platforms',icon:'📈',name:'Simplilearn',desc:'Professional certifications',url:'https://simplilearn.com',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'India-Specific Platforms',icon:'🚀',name:'upGrad',desc:'PG degrees & industry programs',url:'https://upgrad.com',badge:'pb-live',bl:'LINKED',fee:9},
  // 💻 Coding & Tech Platforms
  {cat:'Coding & Tech Platforms',icon:'⚡',name:'LeetCode',desc:'DSA practice for FAANG',url:'https://leetcode.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Coding & Tech Platforms',icon:'💚',name:'HackerRank',desc:'Coding challenges & certifications',url:'https://hackerrank.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Coding & Tech Platforms',icon:'👨‍🍳',name:'CodeChef',desc:'Competitive programming',url:'https://codechef.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Coding & Tech Platforms',icon:'🏆',name:'Codeforces',desc:'Competitive programming contests',url:'https://codeforces.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Coding & Tech Platforms',icon:'📊',name:'Kaggle',desc:'ML competitions & datasets',url:'https://kaggle.com',badge:'pb-free',bl:'FREE',fee:0},
  // ☁️ Cloud & Certification Platforms
  {cat:'Cloud & Certification Platforms',icon:'☁️',name:'AWS Training',desc:'Amazon cloud certifications',url:'https://aws.amazon.com/training',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Cloud & Certification Platforms',icon:'🌐',name:'Google Cloud',desc:'GCP skills & certifications',url:'https://cloud.google.com/training',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Cloud & Certification Platforms',icon:'🪟',name:'Microsoft Learn',desc:'Azure & MS certifications',url:'https://learn.microsoft.com',badge:'pb-free',bl:'FREE',fee:0},
  {cat:'Cloud & Certification Platforms',icon:'💼',name:'LinkedIn Learning',desc:'Professional skills, badges',url:'https://linkedin.com/learning',badge:'pb-live',bl:'LINKED',fee:9},
  {cat:'Cloud & Certification Platforms',icon:'🔥',name:'freeCodeCamp',desc:'Free web dev certifications',url:'https://freecodecamp.org',badge:'pb-free',bl:'FREE',fee:0},
  // 📱 Community & Social Platforms
  {cat:'Community & Social Platforms',icon:'▶️',name:'YouTube',desc:'Video tutorials & lectures',url:'https://youtube.com',badge:'pb-live',bl:'LIVE',fee:0},
  {cat:'Community & Social Platforms',icon:'💼',name:'LinkedIn',desc:'Professional network & jobs',url:'https://linkedin.com',badge:'pb-live',bl:'LIVE',fee:0},
  {cat:'Community & Social Platforms',icon:'🐙',name:'GitHub',desc:'Projects, code, portfolio',url:'https://github.com',badge:'pb-live',bl:'LIVE',fee:0},
  {cat:'Community & Social Platforms',icon:'💬',name:'Discord',desc:'Student community & support',url:'https://discord.com',badge:'pb-live',bl:'LIVE',fee:0},
  {cat:'Community & Social Platforms',icon:'✈️',name:'Telegram',desc:'Study groups & resources',url:'https://telegram.org',badge:'pb-live',bl:'LIVE',fee:0},
  // 💼 Job & Placement Platforms
  {cat:'Job & Placement Platforms',icon:'💼',name:'Naukri.com',desc:"India's #1 job portal",url:'https://naukri.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Job & Placement Platforms',icon:'🎒',name:'Internshala',desc:'Internships & fresher jobs',url:'https://internshala.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Job & Placement Platforms',icon:'🏢',name:'Glassdoor',desc:'Company reviews & salaries',url:'https://glassdoor.co.in',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Job & Placement Platforms',icon:'🏅',name:'Unstop',desc:'Competitions & campus hiring',url:'https://unstop.com',badge:'pb-live',bl:'LINKED',fee:5},
  {cat:'Job & Placement Platforms',icon:'⚡',name:'Hirist',desc:'Tech jobs in India',url:'https://hirist.tech',badge:'pb-new',bl:'SOON',fee:5},
]

const HOME_PLATFORMS=ALL_PLATFORMS.slice(0,12);
const CURRENT_YEAR=new Date().getFullYear();
let activeCourseFilter='all';
let activeTrackKey='frontend';
const APP_CONFIG=window.SKILLFORGE_CONFIG||{};
const CONTACT_CONFIG={
  email:String(APP_CONFIG.contact?.email||'wakodeaharshal@gmail.com').trim()||'wakodeaharshal@gmail.com',
  phone:String(APP_CONFIG.contact?.phone||'+91 9209630283').trim()||'+91 9209630283',
  founderName:String(APP_CONFIG.contact?.founderName||'Harshal Panjabrao Wakode').trim()||'Harshal Panjabrao Wakode',
  social:{
    linkedin:String(APP_CONFIG.contact?.social?.linkedin||'').trim(),
    instagram:String(APP_CONFIG.contact?.social?.instagram||'').trim(),
    youtube:String(APP_CONFIG.contact?.social?.youtube||'').trim(),
    github:String(APP_CONFIG.contact?.social?.github||'').trim(),
    twitter:String(APP_CONFIG.contact?.social?.twitter||'').trim(),
  },
};
const PAYMENT_CONFIG={
  key:String(APP_CONFIG.payment?.razorpayKey||window.RAZORPAY_KEY||'').trim(),
  createOrderUrl:String(APP_CONFIG.payment?.createOrderUrl||'').trim(),
  verifyPaymentUrl:String(APP_CONFIG.payment?.verifyPaymentUrl||'').trim(),
  currency:String(APP_CONFIG.payment?.currency||'INR').trim()||'INR',
  companyName:String(APP_CONFIG.payment?.companyName||'SkillForge AI').trim()||'SkillForge AI',
  themeColor:String(APP_CONFIG.payment?.themeColor||'#4f8eff').trim()||'#4f8eff',
  allowDemoFallback:APP_CONFIG.payment?.allowDemoFallback===true,
};
const RAZORPAY_KEY=PAYMENT_CONFIG.key;
const AUTH_CONFIG={
  mode:String(APP_CONFIG.auth?.emailOtp?.mode||'auto').trim().toLowerCase()||'auto',
  sendUrl:String(APP_CONFIG.auth?.emailOtp?.sendUrl||'').trim(),
  verifyUrl:String(APP_CONFIG.auth?.emailOtp?.verifyUrl||'').trim(),
  otpLength:Number(APP_CONFIG.auth?.emailOtp?.otpLength)||6,
  otpTtlMs:Number(APP_CONFIG.auth?.emailOtp?.otpTtlMs)||5*60*1000,
};
const AUTH_STORAGE_KEYS={
  users:'skillforge-auth-users',
  current:'skillforge-auth-current-user',
  pending:'skillforge-auth-pending',
};
const SOCIAL_AUTH_CONFIG={
  googleClientId:String(APP_CONFIG.auth?.googleClientId||'903254076980-186v0f8nq71nf0g2pp6a362rh4hqm19g.apps.googleusercontent.com').trim(),
  githubClientId:String(APP_CONFIG.auth?.githubClientId||'').trim(),
  githubRedirectUri:String(APP_CONFIG.auth?.githubRedirectUri||'').trim(),
  githubExchangeUrl:String(APP_CONFIG.auth?.githubExchangeUrl||'').trim(),
  githubScope:String(APP_CONFIG.auth?.githubScope||'read:user user:email').trim()||'read:user user:email',
};
const SOCIAL_AUTH_STORAGE_KEYS={
  githubState:'skillforge-auth-github-state',
};
const ACCESS_STORAGE_KEY='skillforge-access-state';
const ACCESS_DEFAULT_STATE={
  trialUsedAt:'',
  trialFeature:'',
  paidPlan:'',
  paidAt:'',
};
let authMode='signup';
let googleAuthInitialized=false;

const LESSON_LIBRARY=[
  {
    match:['promise','async','await'],
    lesson:'<strong>Promises</strong> represent work that finishes later, like an API request. <strong>async/await</strong> is a cleaner way to read that flow because it lets you write asynchronous logic top to bottom instead of chaining many <strong>.then()</strong> calls.<br><br>Use <strong>await</strong> only inside an <strong>async</strong> function. In real apps, wrap async code in <strong>try/catch</strong> so loading, success, and failure states are all handled deliberately.',
    question:'Which keyword waits for a Promise to settle inside an async function?',
    options:['yield','await','pause','defer'],
    answer:1,
  },
  {
    match:['react hooks','usestate','useeffect','react'],
    lesson:'<strong>useState</strong> stores UI state inside a component, while <strong>useEffect</strong> runs side effects such as fetching data, syncing with local storage, or subscribing to events.<br><br>Think of state as data that changes what the UI shows, and effects as code that talks to the outside world. A strong React component keeps state minimal and effects purposeful.',
    question:'Which hook is primarily used for side effects like fetching data?',
    options:['useRef','useMemo','useEffect','useId'],
    answer:2,
  },
  {
    match:['linear regression','machine learning'],
    lesson:'<strong>Linear regression</strong> predicts a numeric value by fitting the best straight-line relationship between input data and output data. It is often the first supervised learning model people learn because it shows how features influence a prediction.<br><br>If housing size increases and price tends to increase too, linear regression tries to learn that pattern. Model quality is usually checked with error metrics such as MAE, MSE, or RMSE.',
    question:'Linear regression is mainly used for predicting what kind of value?',
    options:['A class label','A numeric value','A database key','A file format'],
    answer:1,
  },
  {
    match:['python data structures','lists','dicts','sets','python ds'],
    lesson:'<strong>Lists</strong> keep ordered collections, <strong>dictionaries</strong> store key-value pairs, and <strong>sets</strong> keep unique values only. Choosing the right structure makes code simpler and faster.<br><br>Use lists when order matters, dictionaries when lookup by key matters, and sets when you need quick membership checks or duplicate removal.',
    question:'Which Python structure automatically removes duplicates?',
    options:['List','Tuple','Set','Dictionary'],
    answer:2,
  },
  {
    match:['sql joins','join'],
    lesson:'<strong>SQL JOINs</strong> combine rows from multiple tables based on a shared key. The most common one is <strong>INNER JOIN</strong>, which returns only matching rows from both tables.<br><br><strong>LEFT JOIN</strong> keeps every row from the left table even when the right table has no match. That makes it useful when you want to find missing relationships.',
    question:'Which JOIN keeps all rows from the left table even if no match exists on the right?',
    options:['INNER JOIN','LEFT JOIN','CROSS JOIN','SELF JOIN'],
    answer:1,
  },
  {
    match:['rest apis','http methods','http'],
    lesson:'<strong>REST APIs</strong> expose resources through URLs and standard HTTP methods. In most systems, <strong>GET</strong> reads data, <strong>POST</strong> creates it, <strong>PUT/PATCH</strong> updates it, and <strong>DELETE</strong> removes it.<br><br>Good API design uses clear routes, correct status codes, and predictable JSON shapes so frontend and backend teams can work independently.',
    question:'Which HTTP method is most commonly used to create a new resource?',
    options:['GET','POST','PATCH','DELETE'],
    answer:1,
  },
  {
    match:['css flexbox','grid layout','css layout','flexbox','grid'],
    lesson:'<strong>Flexbox</strong> is best for arranging items in one direction, either a row or a column. <strong>CSS Grid</strong> is stronger for two-dimensional layouts where rows and columns both matter.<br><br>A good rule is: use Flexbox inside components and Grid for page-level structure. They work well together rather than competing with each other.',
    question:'Which CSS layout system is better suited for two-dimensional page layouts?',
    options:['Float','Flexbox','Grid','Position'],
    answer:2,
  },
  {
    match:['dynamic programming','dynamic prog'],
    lesson:'<strong>Dynamic programming</strong> solves complex problems by breaking them into overlapping subproblems and storing earlier results. That avoids repeated work and usually turns slow recursive solutions into efficient ones.<br><br>The two main styles are <strong>memoization</strong> from top down and <strong>tabulation</strong> from bottom up. The hard part is spotting the repeated state.',
    question:'What makes dynamic programming especially useful?',
    options:['It avoids using loops','It stores repeated subproblem results','It only works on arrays','It replaces recursion with sorting'],
    answer:1,
  },
  {
    match:['system design'],
    lesson:'<strong>System design</strong> is about building reliable software at scale. You usually start with requirements, estimate traffic, choose data storage, add caching, and think through reliability, latency, and failure handling.<br><br>Interviewers care less about a perfect answer and more about your tradeoff thinking. Explain why you chose a queue, cache, database, or load balancer.',
    question:'What should usually come first in a system design discussion?',
    options:['Picking a database vendor','Clarifying requirements','Adding caching everywhere','Drawing microservices'],
    answer:1,
  },
  {
    match:['big o','time complexity'],
    lesson:'<strong>Big O notation</strong> describes how runtime or memory grows as input size increases. It helps you compare solutions beyond small test cases and understand which approach will scale better.<br><br><strong>O(1)</strong> is constant time, <strong>O(log n)</strong> grows slowly, <strong>O(n)</strong> grows linearly, and <strong>O(n^2)</strong> can become expensive quickly.',
    question:'Which time complexity usually scales better as input size grows?',
    options:['O(n^2)','O(n log n)','O(1)','O(n)'],
    answer:2,
  },
  {
    match:['typescript'],
    lesson:'<strong>TypeScript</strong> adds static typing on top of JavaScript, which helps catch mistakes earlier and improves editor tooling. In React projects it is especially useful for component props, API responses, and shared utility code.<br><br>You do not need to type everything perfectly on day one. Start with interfaces for data you use often and let inference handle the rest.',
    question:'Why do many React teams adopt TypeScript?',
    options:['It replaces HTML','It adds static typing and better tooling','It removes the need for testing','It only works with Node.js'],
    answer:1,
  },
  {
    match:['docker','containerization'],
    lesson:'<strong>Docker</strong> packages an application with its runtime, dependencies, and configuration so it behaves consistently across environments. That reduces the classic "works on my machine" problem.<br><br>Images are reusable blueprints, while containers are running instances of those images. Teams often use Docker for local development, CI, and deployment pipelines.',
    question:'What is the main benefit of containerization with Docker?',
    options:['It turns JavaScript into Python','It guarantees consistent environments','It removes internet latency','It replaces version control'],
    answer:1,
  },
];

const BLUEPRINT_PROFILES={
  'Tech / Coding':{
    paths:['Full Stack Developer','Frontend Engineer','Software Engineer'],
    skills:['JavaScript','React','Node.js','Git','SQL'],
    courses:['Responsive Web Design Certification','CS50’s Web Programming with Python and JavaScript','CS50x: Introduction to Computer Science'],
    roles:['Junior Developer','Frontend Developer','Software Engineer','Full Stack Developer'],
  },
  'Data / Analytics':{
    paths:['Data Analyst','Business Intelligence Analyst','Analytics Engineer'],
    skills:['Python','SQL','Power BI','Excel','Statistics'],
    courses:['Python for Data Science - Course for Beginners','Intro to SQL','Machine Learning Crash Course'],
    roles:['Data Analyst','BI Analyst','Reporting Analyst','Analytics Associate'],
  },
  'AI / Machine Learning':{
    paths:['ML Engineer','AI Engineer','Data Scientist'],
    skills:['Python','Machine Learning','Deep Learning','MLOps','SQL'],
    courses:['Machine Learning Crash Course','Machine Learning for Everybody','CS50x: Introduction to Computer Science'],
    roles:['ML Engineer','AI Engineer','Data Scientist','Applied AI Developer'],
  },
  'Design / Product':{
    paths:['UI/UX Designer','Product Designer','Frontend Product Engineer'],
    skills:['Figma','Design Systems','User Research','Wireframing','Frontend Basics'],
    courses:['Google UX Design Professional Certificate','Responsive Web Design Certification','CS50’s Web Programming with Python and JavaScript'],
    roles:['UI/UX Designer','Product Designer','Design Intern','Frontend Designer'],
  },
};

function delay(ms=700){return new Promise(resolve=>setTimeout(resolve,ms))}
function containsAny(source,terms){return terms.some(term=>source.includes(term))}
function normalizeEmail(value=''){return value.trim().toLowerCase()}
function isValidEmail(value=''){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value))}
function getFirstName(name=''){return name.trim().split(/\s+/)[0]||'Learner'}
function hasConfiguredValue(value=''){
  const clean=String(value||'').trim();
  return Boolean(clean&&!/^YOUR_/i.test(clean));
}
function getEmailAuthMode(){
  if(AUTH_CONFIG.mode==='demo')return 'demo';
  if(hasConfiguredValue(AUTH_CONFIG.sendUrl)&&hasConfiguredValue(AUTH_CONFIG.verifyUrl))return 'api';
  return 'disabled';
}
function getPaymentMode(){
  if(hasConfiguredValue(PAYMENT_CONFIG.key)&&hasConfiguredValue(PAYMENT_CONFIG.createOrderUrl)&&hasConfiguredValue(PAYMENT_CONFIG.verifyPaymentUrl))return 'live';
  if(PAYMENT_CONFIG.allowDemoFallback)return 'demo';
  return 'disabled';
}
function getConfiguredSocialUrl(key=''){
  const url=CONTACT_CONFIG.social[key];
  return hasConfiguredValue(url)?url:'';
}
function toMailtoHref(email=''){return `mailto:${String(email).trim()}`}
function toTelHref(phone=''){return `tel:${String(phone).replace(/[^\d+]/g,'')}`}
async function postJson(url,payload){
  const response=await fetch(url,{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(payload),
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(data.error||data.message||'Request failed. Please try again.');
  return data;
}
function isHttpOrigin(){return /^https?:$/.test(window.location.protocol)}
function getProviderLabel(provider=''){
  if(provider==='google')return 'Google';
  if(provider==='github')return 'GitHub';
  return 'Email OTP';
}
function readJsonStorage(storage,key,fallback){
  try{
    const raw=storage.getItem(key);
    return raw?JSON.parse(raw):fallback;
  }catch(e){
    return fallback;
  }
}
function writeJsonStorage(storage,key,value){storage.setItem(key,JSON.stringify(value))}
function getAuthUsers(){return readJsonStorage(localStorage,AUTH_STORAGE_KEYS.users,[])}
function saveAuthUsers(users){writeJsonStorage(localStorage,AUTH_STORAGE_KEYS.users,users)}
function getCurrentUser(){return readJsonStorage(localStorage,AUTH_STORAGE_KEYS.current,null)}
function setCurrentUser(user){writeJsonStorage(localStorage,AUTH_STORAGE_KEYS.current,user)}
function clearCurrentUser(){localStorage.removeItem(AUTH_STORAGE_KEYS.current)}
function getPendingAuth(){return readJsonStorage(sessionStorage,AUTH_STORAGE_KEYS.pending,null)}
function setPendingAuth(data){writeJsonStorage(sessionStorage,AUTH_STORAGE_KEYS.pending,data)}
function clearPendingAuth(){sessionStorage.removeItem(AUTH_STORAGE_KEYS.pending)}
function getUserByEmail(email){return getAuthUsers().find(user=>user.email===normalizeEmail(email))}
function generateOtp(){
  const min=10**(AUTH_CONFIG.otpLength-1);
  const max=(10**AUTH_CONFIG.otpLength)-1;
  return String(Math.floor(min+Math.random()*(max-min+1)));
}
function getGitHubRedirectUri(){
  const configured=String(SOCIAL_AUTH_CONFIG.githubRedirectUri||'').trim();
  return configured||(isHttpOrigin()?`${window.location.origin}${window.location.pathname}`:'');
}
function createRandomToken(length=28){
  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if(window.crypto?.getRandomValues){
    const bytes=new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes,byte=>chars[byte%chars.length]).join('');
  }
  return Array.from({length},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
}
function decodeBase64Url(value=''){
  const normalized=String(value).replace(/-/g,'+').replace(/_/g,'/');
  const padded=normalized.padEnd(Math.ceil(normalized.length/4)*4,'=');
  const binary=atob(padded);
  return decodeURIComponent(Array.from(binary,char=>`%${char.charCodeAt(0).toString(16).padStart(2,'0')}`).join(''));
}
function parseJwt(token=''){
  const parts=String(token).split('.');
  if(parts.length<2)return null;
  try{
    return JSON.parse(decodeBase64Url(parts[1]));
  }catch(e){
    return null;
  }
}
function clearSocialAuthParams(){
  const url=new URL(window.location.href);
  let changed=false;
  ['code','state','error','error_description'].forEach(key=>{
    if(url.searchParams.has(key)){
      url.searchParams.delete(key);
      changed=true;
    }
  });
  if(!changed)return;
  const next=`${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({},document.title,next);
}
function escapeHtml(value=''){
  return String(value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
function formatRichText(value=''){
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\n/g,'<br>');
}
function formatStatValue(value,suffix=''){
  return value>=1000?`${Math.round(value/1000)}K${suffix}`:`${value}${suffix}`;
}
function getAccessState(){
  const state=readJsonStorage(localStorage,ACCESS_STORAGE_KEY,ACCESS_DEFAULT_STATE);
  return {...ACCESS_DEFAULT_STATE,...(state&&typeof state==='object'?state:{})};
}
function saveAccessState(state){
  writeJsonStorage(localStorage,ACCESS_STORAGE_KEY,{...ACCESS_DEFAULT_STATE,...state});
}
function getPaidPlanLabel(planName=''){
  return /premium/i.test(planName)?'Premium':'Pro';
}
function getAccessStatus(){
  const state=getAccessState();
  return {
    ...state,
    hasTrial:Boolean(state.trialUsedAt),
    hasPaid:Boolean(state.paidPlan),
  };
}
function rememberPaidPlan(planName='Pro Plan'){
  const state=getAccessState();
  saveAccessState({
    ...state,
    paidPlan:getPaidPlanLabel(planName),
    paidAt:new Date().toISOString(),
  });
}
function openCourse(url=''){
  if(!url)return;
  sndClick();
  window.open(url,'_blank','noopener');
}
function getCourseAccessUi(course){
  const access=getAccessStatus();
  if(access.hasPaid){
    return {
      price:course.cost,
      priceClass:/free/i.test(course.cost)?'is-free':'',
      note:`${course.source} source`,
      cta:course.cta,
    };
  }
  if(!access.hasTrial){
    return {
      price:'1st unlock free',
      priceClass:'is-free',
      note:'One-time SkillForge trial',
      cta:'Use 1 Free Unlock',
    };
  }
  return {
    price:'Paid access',
    priceClass:'',
    note:'Upgrade to Pro or Premium',
    cta:'Upgrade to Open',
  };
}
function getPlatformAccessUi(){
  const access=getAccessStatus();
  if(access.hasPaid){
    return {badge:'pb-live',label:'UNLOCKED',note:'Included in your paid plan'};
  }
  if(!access.hasTrial){
    return {badge:'pb-free',label:'1X FREE',note:'Use your one-time free unlock'};
  }
  return {badge:'pb-new',label:'PAID',note:'Upgrade to continue'};
}
function requestPremiumFeatureAccess(featureName,onAllow,{planName='Pro Plan',amount=499,announceTrial=true}={}){
  const state=getAccessState();
  if(state.paidPlan){
    if(typeof onAllow==='function')onAllow();
    return true;
  }
  if(!state.trialUsedAt){
    saveAccessState({
      ...state,
      trialUsedAt:new Date().toISOString(),
      trialFeature:featureName,
    });
    syncLaunchUi();
    if(announceTrial){
      alert(`One-time free access unlocked for ${featureName}.\n\nAfter this first use, a paid plan is required.`);
    }
    if(typeof onAllow==='function')onAllow();
    return true;
  }
  const proceed=window.confirm(`Your one-time free access${state.trialFeature?` was already used for ${state.trialFeature}`:''}.\n\nUpgrade to ${getPaidPlanLabel(planName)} for ₹${amount} to continue using ${featureName}?`);
  if(!proceed){
    sndError();
    return false;
  }
  rzpay(amount,planName,()=>{
    if(typeof onAllow==='function')onAllow();
  });
  return false;
}
function unlockCourse(courseId=''){
  const course=COURSE_INDEX[courseId];
  if(!course)return;
  requestPremiumFeatureAccess(course.title,()=>openCourse(course.url));
}
function renderAiTrackPills(){
  const el=document.getElementById('aiTrackPills');
  if(!el)return;
  el.innerHTML=Object.entries(AI_TRACKS).map(([key,track])=>`<button class="ai-track-pill ${key===activeTrackKey?'on':''}" type="button" onclick="openAiTrack('${key}',false)">${track.label}</button>`).join('');
}
function renderAiTrack(key){
  const track=AI_TRACKS[key]||AI_TRACKS.frontend;
  activeTrackKey=AI_TRACKS[key]?key:'frontend';
  const el=document.getElementById('aiTrackOut');
  if(!el)return;
  const courses=track.courseIds.map(id=>COURSE_INDEX[id]).filter(Boolean);
  el.innerHTML=`
    <div class="ai-track-top">
      <div>
        <div class="ai-track-kicker">${escapeHtml(track.kicker)}</div>
        <h3>${escapeHtml(track.label)}</h3>
        <p>${escapeHtml(track.outcome)}</p>
      </div>
      <div class="ai-track-stats">
        <div class="ai-stat"><span>Duration</span><strong>${escapeHtml(track.duration)}</strong></div>
        <div class="ai-stat"><span>Effort</span><strong>${escapeHtml(track.intensity)}</strong></div>
        <div class="ai-stat"><span>Sources</span><strong>${courses.length} real courses</strong></div>
      </div>
    </div>
    <div class="ai-track-grid">
      <div class="ai-track-panel">
        <h4>Skill stack</h4>
        <ul class="ai-track-list">${track.skills.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <div class="ai-track-panel">
        <h4>What you will ship</h4>
        <ul class="ai-track-list">${track.deliverables.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <div class="ai-track-panel ai-track-panel-wide">
        <h4>AI-generated roadmap</h4>
        <ul class="ai-track-list">${track.roadmap.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <div class="ai-track-panel ai-track-panel-wide">
        <h4>Real source courses</h4>
        <div class="ai-resource-list">
          ${courses.map(course=>{
            const accessUi=getCourseAccessUi(course);
            return `<article class="ai-resource-item">
            <div class="ai-resource-copy">
              <div class="ai-resource-title">${escapeHtml(course.title)}</div>
              <div class="ai-resource-meta">${escapeHtml(course.provider)} · ${escapeHtml(course.format)} · ${escapeHtml(accessUi.price)}</div>
            </div>
            <button class="ai-resource-action" type="button" onclick="unlockCourse('${course.id}')">${escapeHtml(accessUi.cta)}</button>
          </article>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}
function openAiTrack(key,shouldScroll=true){
  if(!AI_TRACKS[key])return;
  sndClick();
  renderAiTrack(key);
  renderAiTrackPills();
  if(shouldScroll){
    document.getElementById('aiCourseBuilder')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
}
function setRuntimeText(){
  const yearEl=document.getElementById('yearNow');
  if(yearEl)yearEl.textContent=CURRENT_YEAR;
  const dayEl=document.getElementById('dashboardDay');
  if(dayEl)dayEl.textContent=new Intl.DateTimeFormat('en-US',{weekday:'long'}).format(new Date());
}
function getAvailableAuthProviders(){
  const providers=[];
  if(getEmailAuthMode()!=='disabled')providers.push('email OTP');
  if(hasConfiguredValue(SOCIAL_AUTH_CONFIG.googleClientId))providers.push('Google');
  if(hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubClientId)&&hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubExchangeUrl))providers.push('GitHub');
  return providers;
}
function formatProviderList(providers=[]){
  if(providers.length===0)return 'an available sign-in method';
  if(providers.length===1)return providers[0];
  if(providers.length===2)return `${providers[0]} or ${providers[1]}`;
  return `${providers.slice(0,-1).join(', ')}, or ${providers.at(-1)}`;
}
function syncLaunchUi(){
  const emailAuthMode=getEmailAuthMode();
  const paymentMode=getPaymentMode();
  const paymentReady=paymentMode==='live';
  const access=getAccessStatus();
  const githubReady=hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubClientId)&&hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubExchangeUrl);
  const authChip=document.querySelector('.auth-mini-chip');
  if(authChip){
    authChip.textContent=emailAuthMode==='demo'
      ? 'Demo Email OTP Verification'
      : emailAuthMode==='api'
        ? 'Secure Email OTP Verification'
        : 'Secure Social Sign In';
  }
  const authDivider=document.querySelector('.auth-divider span');
  if(authDivider)authDivider.textContent=emailAuthMode==='disabled'?'email OTP unavailable':'or use email OTP';
  const authDisclaimer=document.getElementById('authDisclaimer');
  if(authDisclaimer){
    authDisclaimer.textContent=emailAuthMode==='demo'
      ? 'Demo mode is active: the OTP is shown here for testing.'
      : emailAuthMode==='api'
        ? 'We will send a real one-time verification code to your email.'
        : 'Email OTP sign-in is currently unavailable. Use an enabled social sign-in method instead.';
  }
  const authSubmit=document.querySelector('#authRequestStep .auth-submit');
  if(authSubmit){
    authSubmit.disabled=emailAuthMode==='disabled';
    authSubmit.textContent=emailAuthMode==='disabled'?'Email OTP Unavailable':authMode==='signup'?'Send OTP':'Send Login OTP';
  }
  document.querySelectorAll('#authName,#authEmail').forEach(field=>{
    field.disabled=emailAuthMode==='disabled';
  });
  const githubBtn=document.getElementById('githubLoginBtn');
  if(githubBtn){
    githubBtn.disabled=!githubReady;
    githubBtn.setAttribute('aria-disabled',String(!githubReady));
    githubBtn.title=githubReady?'Continue with GitHub':'GitHub login is coming soon';
  }
  const pricingNote=document.querySelector('.pricing-note');
  if(pricingNote){
    const paymentLabel=paymentMode==='live'
      ? 'Secure checkout via Razorpay.'
      : paymentMode==='demo'
        ? 'Demo checkout is active right now. No real payment will be charged.'
        : 'Payments are temporarily unavailable right now.';
    pricingNote.textContent=access.hasPaid
      ? `${access.paidPlan} plan is active. All premium access is unlocked. ${paymentLabel}`
      : access.hasTrial
        ? `Your one-time free access was used${access.trialFeature?` for ${access.trialFeature}`:''}. Upgrade to continue. ${paymentLabel}`
        : `One-time free access is available. After your first unlock, a paid plan is required. ${paymentLabel}`;
  }
  const trialButton=document.querySelector('.pricing-grid .plan .btn-secondary.btn-full');
  if(trialButton){
    trialButton.textContent=access.hasPaid?'Explore Courses':access.hasTrial?'Trial Used · Upgrade Next':'Use 1 Free Unlock';
  }
  const pricingButtons=document.querySelectorAll('.pricing-grid button[onclick*="rzpay("]');
  if(pricingButtons[0]){
    pricingButtons[0].textContent=paymentMode==='live'?'Pay ₹499 via Razorpay':paymentMode==='demo'?'Try Pro Demo Checkout':'Payments Unavailable';
    pricingButtons[0].disabled=paymentMode==='disabled';
  }
  if(pricingButtons[1]){
    pricingButtons[1].textContent=paymentMode==='live'?'Pay ₹999 via Razorpay':paymentMode==='demo'?'Try Premium Demo Checkout':'Payments Unavailable';
    pricingButtons[1].disabled=paymentMode==='disabled';
  }
  const platformConfirm=document.querySelector('.plat-modal-confirm');
  if(platformConfirm){
    platformConfirm.innerHTML=paymentMode==='live'
      ? 'Pay ₹<span id="platModalPlatFee"></span> & Access →'
      : paymentMode==='demo'
        ? 'Try Demo Checkout ₹<span id="platModalPlatFee"></span> & Access →'
        : 'Payments Unavailable<span id="platModalPlatFee" hidden></span>';
    platformConfirm.disabled=paymentMode==='disabled';
  }
  const platformFooter=document.querySelector('.plat-modal-footer');
  if(platformFooter){
    platformFooter.textContent=paymentMode==='live'
      ? `Secure checkout via Razorpay · ${CONTACT_CONFIG.email}`
      : paymentMode==='demo'
        ? `Demo checkout active · ${CONTACT_CONFIG.email}`
        : `Payments unavailable · ${CONTACT_CONFIG.email}`;
  }
  document.querySelectorAll('[data-contact-email]').forEach(link=>{
    if(link.tagName==='A')link.href=toMailtoHref(CONTACT_CONFIG.email);
    link.textContent=CONTACT_CONFIG.email;
  });
  document.querySelectorAll('[data-contact-phone]').forEach(link=>{
    if(link.tagName==='A')link.href=toTelHref(CONTACT_CONFIG.phone);
    link.textContent=CONTACT_CONFIG.phone;
  });
  document.querySelectorAll('[data-social-link]').forEach(link=>{
    const url=getConfiguredSocialUrl(link.dataset.socialLink||'');
    link.hidden=!url;
    if(url)link.href=url;
  });
  const courseSourceNote=document.querySelector('.course-source-note');
  if(courseSourceNote){
    courseSourceNote.textContent=access.hasPaid
      ? `${access.paidPlan} is active. Real source links and SkillForge AI tools are unlocked.`
      : access.hasTrial
        ? `Your one-time free unlock has been used${access.trialFeature?` for ${access.trialFeature}`:''}. Upgrade to Pro or Premium to keep opening resources.`
        : 'Real source courses from YouTube and trusted platforms. SkillForge gives one free unlock, then paid access is required.';
  }
  const connectCopy=document.querySelector('#page-connect .page-head p');
  if(connectCopy){
    connectCopy.textContent=access.hasPaid
      ? `${access.paidPlan} is active. All linked platforms are unlocked through your paid plan.`
      : access.hasTrial
        ? 'Your one-time free platform unlock has been used. Upgrade to Pro or Premium to continue accessing linked platforms.'
        : 'Access 30+ top learning, coding, cloud, job, and community platforms. Your first SkillForge platform unlock is free once, then paid access is required.';
  }
  const connectFreeBadge=document.querySelector('.connect-badge-free');
  if(connectFreeBadge)connectFreeBadge.textContent=access.hasPaid?'✅ PAID PLAN ACTIVE — Platforms unlocked':'✅ 1X FREE TRIAL — Your first SkillForge unlock';
  const connectPassBadge=document.querySelector('.connect-badge-pass');
  if(connectPassBadge)connectPassBadge.textContent=access.hasPaid?'💳 INCLUDED — No extra unlock needed right now':'💳 PAID AFTER TRIAL — Pro or Premium required';
  const chatIntro=document.getElementById('chatIntroText');
  if(chatIntro){
    chatIntro.innerHTML=`Hi! I'm your AI assistant for SkillForge AI${CONTACT_CONFIG.founderName?` — founded by ${escapeHtml(CONTACT_CONFIG.founderName)}`:''}.<br><br>I can help with career paths, course recs, resume tips, billing, and more.<br><br>📧 ${escapeHtml(CONTACT_CONFIG.email)} · 📞 ${escapeHtml(CONTACT_CONFIG.phone)}<br><br>What's on your mind? 🚀`;
  }
}
function setAuthFeedback(message='',type=''){
  const el=document.getElementById('authFeedback');
  if(!el)return;
  el.textContent=message;
  el.className='auth-feedback';
  if(type)el.classList.add(type);
}
function setAuthModeCopy(){
  const signup=authMode==='signup';
  const emailAuthMode=getEmailAuthMode();
  document.getElementById('authSignupTab')?.classList.toggle('on',signup);
  document.getElementById('authLoginTab')?.classList.toggle('on',!signup);
  const title=document.getElementById('authTitle');
  const sub=document.getElementById('authSub');
  const nameWrap=document.getElementById('authNameWrap');
  const action=document.querySelector('#authRequestStep .auth-submit');
  if(title)title.textContent=signup?'Create your SkillForge AI account':'Log in with your email';
  if(sub)sub.textContent=signup?'Enter your email to get a one-time verification code.':'We will send a one-time verification code to your email.';
  if(nameWrap)nameWrap.classList.toggle('is-hidden',!signup);
  if(action)action.textContent=emailAuthMode==='disabled'?'Email OTP Unavailable':signup?'Send OTP':'Send Login OTP';
}
function showAuthStep(step){
  document.getElementById('authRequestStep')?.classList.toggle('is-hidden',step!=='request');
  document.getElementById('authVerifyStep')?.classList.toggle('is-hidden',step!=='verify');
}
function populateOtpPreview(pending){
  const preview=document.getElementById('authOtpPreview');
  const disclaimer=document.getElementById('authDisclaimer');
  if(!preview||!disclaimer)return;
  const expiresIn=Math.max(0,Math.ceil((pending.expiresAt-Date.now())/1000));
  if(getEmailAuthMode()==='demo'){
    preview.innerHTML=`Demo OTP for <strong>${escapeHtml(pending.email)}</strong>: <strong>${pending.otp}</strong><br>Expires in about ${expiresIn}s.`;
    disclaimer.textContent='Demo mode is active: the OTP is shown here for testing.';
  }else{
    preview.textContent=`A verification code was sent to ${pending.email}.`;
    disclaimer.textContent='Check your email inbox and enter the OTP above.';
  }
}
function resetAuthInputs(){
  const otp=document.getElementById('authOtp');
  if(otp)otp.value='';
}
function openAuth(mode='signup'){
  authMode=mode;
  setAuthModeCopy();
  setAuthFeedback('');
  resetAuthInputs();
  const modal=document.getElementById('authModal');
  if(modal){
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }
  document.body.classList.add('auth-open');
  requestAnimationFrame(()=>renderGoogleAuthButton(true));
  const emailAuthMode=getEmailAuthMode();
  const pending=getPendingAuth();
  const hasUsablePending=emailAuthMode==='demo'?Boolean(pending?.otp):emailAuthMode==='api'?Boolean(pending?.email):false;
  if(hasUsablePending&&pending&&pending.mode===authMode&&pending.expiresAt>Date.now()){
    document.getElementById('authEmail').value=pending.email||'';
    if(pending.name)document.getElementById('authName').value=pending.name;
    document.getElementById('authOtpEmail').textContent=pending.email;
    populateOtpPreview(pending);
    showAuthStep('verify');
    document.getElementById('authOtp')?.focus();
    return;
  }
  showAuthStep('request');
  if(mode==='signup'){
    document.getElementById('authName')?.focus();
  }else{
    document.getElementById('authEmail')?.focus();
  }
}
function closeAuth(){
  const modal=document.getElementById('authModal');
  if(modal){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
  document.body.classList.remove('auth-open');
  setAuthFeedback('');
}
function switchAuthMode(mode){
  authMode=mode;
  setAuthModeCopy();
  setAuthFeedback('');
  resetAuthInputs();
  showAuthStep('request');
}
function backAuthStep(){
  setAuthFeedback('');
  resetAuthInputs();
  showAuthStep('request');
}
function upsertSocialUser(profile={}){
  const email=normalizeEmail(profile.email||'');
  if(!isValidEmail(email)){
    setAuthFeedback('This social account did not provide a usable email address.','error');
    sndError();
    return false;
  }
  const users=getAuthUsers();
  const existingIndex=users.findIndex(user=>user.email===email);
  const existing=existingIndex>=0?users[existingIndex]:null;
  const now=new Date().toISOString();
  const user={
    ...existing,
    id:existing?.id||`${profile.provider||'social'}_${Date.now()}`,
    name:(profile.name||existing?.name||getFirstName(email)).trim(),
    email,
    provider:profile.provider||existing?.provider||'social',
    providerId:profile.providerId||existing?.providerId||'',
    avatar:profile.avatar||existing?.avatar||'',
    emailVerified:profile.emailVerified!==false,
    createdAt:existing?.createdAt||now,
    verifiedAt:existing?.verifiedAt||now,
    lastLoginAt:now,
  };
  if(existingIndex>=0)users[existingIndex]=user;
  else users.unshift(user);
  saveAuthUsers(users);
  setCurrentUser(user);
  clearPendingAuth();
  syncAuthUI();
  closeAuth();
  sndSuccess();
  go('dashboard');
  return true;
}
function showSocialProviderHelp(provider=''){
  if(!document.getElementById('authModal')?.classList.contains('open'))openAuth('login');
  if(!isHttpOrigin()){
    setAuthFeedback('Serve this project from http://localhost or HTTPS to use real Google and GitHub login. OAuth does not work from file:// pages.','info');
    return;
  }
  if(provider==='google-sdk'){
    setAuthFeedback('Google sign-in is still loading. Check your internet connection and try again.','info');
    return;
  }
  if(provider==='github'){
    setAuthFeedback('GitHub sign-in is not available right now. Please use another sign-in method.','info');
    return;
  }
  setAuthFeedback('Google sign-in is not available right now. Please use another sign-in method.','info');
}
function renderGoogleFallback(){
  const host=document.getElementById('googleAuthButton');
  if(!host)return;
  host.innerHTML=`<button class="auth-provider" type="button" onclick="showSocialProviderHelp('google')">
    <span class="auth-provider-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.6 12.23c0-.7-.06-1.37-.18-2.01H12v3.8h5.39a4.62 4.62 0 0 1-2 3.03v2.5h3.24c1.89-1.74 2.97-4.31 2.97-7.32Z" fill="#4285F4"/>
        <path d="M12 22c2.7 0 4.96-.89 6.61-2.42l-3.24-2.5c-.9.6-2.05.96-3.37.96-2.59 0-4.78-1.75-5.56-4.11H3.09v2.58A9.98 9.98 0 0 0 12 22Z" fill="#34A853"/>
        <path d="M6.44 13.93A5.98 5.98 0 0 1 6.13 12c0-.67.11-1.32.31-1.93V7.49H3.09A10 10 0 0 0 2 12c0 1.61.39 3.13 1.09 4.51l3.35-2.58Z" fill="#FBBC04"/>
        <path d="M12 5.96c1.47 0 2.79.5 3.83 1.47l2.87-2.87C16.95 2.93 14.69 2 12 2A9.98 9.98 0 0 0 3.09 7.49l3.35 2.58c.78-2.36 2.97-4.11 5.56-4.11Z" fill="#EA4335"/>
      </svg>
    </span>
    Continue with Google
  </button>`;
}
function renderGoogleAuthButton(force=false){
  const host=document.getElementById('googleAuthButton');
  if(!host)return;
  if(!force&&host.dataset.ready==='true')return;
  if(!isHttpOrigin()||!hasConfiguredValue(SOCIAL_AUTH_CONFIG.googleClientId)){
    host.dataset.ready='fallback';
    renderGoogleFallback();
    return;
  }
  if(!window.google?.accounts?.id){
    host.dataset.ready='fallback';
    renderGoogleFallback();
    return;
  }
  try{
    if(!googleAuthInitialized){
      window.google.accounts.id.initialize({
        client_id:SOCIAL_AUTH_CONFIG.googleClientId,
        callback:handleGoogleCredential,
        ux_mode:'popup',
        context:'signin',
      });
      googleAuthInitialized=true;
    }
    host.innerHTML='';
    window.google.accounts.id.renderButton(host,{
      type:'standard',
      theme:'outline',
      size:'large',
      text:'continue_with',
      shape:'pill',
      logo_alignment:'left',
      width:Math.max(260,Math.min(370,window.innerWidth-90)),
    });
    host.dataset.ready='true';
  }catch(e){
    host.dataset.ready='fallback';
    renderGoogleFallback();
  }
}
function handleGoogleCredential(response){
  const payload=parseJwt(response?.credential||'');
  if(!payload?.email){
    setAuthFeedback('Google login could not read your account details. Please try again.','error');
    sndError();
    return;
  }
  upsertSocialUser({
    provider:'google',
    providerId:payload.sub||'',
    name:payload.name||payload.given_name||'Google User',
    email:payload.email,
    avatar:payload.picture||'',
    emailVerified:payload.email_verified!==false,
  });
}
function startGitHubLogin(){
  if(!isHttpOrigin()){
    showSocialProviderHelp('github');
    return;
  }
  if(!hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubClientId)||!hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubExchangeUrl)){
    showSocialProviderHelp('github');
    return;
  }
  const redirectUri=getGitHubRedirectUri();
  if(!redirectUri){
    showSocialProviderHelp('github');
    return;
  }
  const state=createRandomToken();
  sessionStorage.setItem(SOCIAL_AUTH_STORAGE_KEYS.githubState,state);
  const url=new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id',SOCIAL_AUTH_CONFIG.githubClientId);
  url.searchParams.set('redirect_uri',redirectUri);
  url.searchParams.set('scope',SOCIAL_AUTH_CONFIG.githubScope);
  url.searchParams.set('state',state);
  sndClick();
  window.location.assign(url.toString());
}
async function handleGitHubCallback(){
  const params=new URLSearchParams(window.location.search);
  const code=params.get('code');
  const state=params.get('state');
  const error=params.get('error');
  if(!code&&!error)return;
  const expectedState=sessionStorage.getItem(SOCIAL_AUTH_STORAGE_KEYS.githubState)||'';
  sessionStorage.removeItem(SOCIAL_AUTH_STORAGE_KEYS.githubState);
  openAuth('login');
  if(error){
    setAuthFeedback('GitHub login was cancelled or denied. Please try again.','error');
    sndError();
    clearSocialAuthParams();
    return;
  }
  if(!code||!state||!expectedState||state!==expectedState){
    setAuthFeedback('GitHub login could not be verified safely. Please try again.','error');
    sndError();
    clearSocialAuthParams();
    return;
  }
  if(!hasConfiguredValue(SOCIAL_AUTH_CONFIG.githubExchangeUrl)){
    setAuthFeedback('GitHub sign-in is not available right now. Please try another sign-in method.','info');
    clearSocialAuthParams();
    return;
  }
  setAuthFeedback('Connecting your GitHub account...','info');
  try{
    const response=await fetch(SOCIAL_AUTH_CONFIG.githubExchangeUrl,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({code,state,redirectUri:getGitHubRedirectUri()}),
    });
    const payload=await response.json().catch(()=>({}));
    if(!response.ok){
      throw new Error(payload.error||payload.message||'GitHub login failed. Please try again.');
    }
    const profile=payload.user||payload.profile||payload;
    if(!profile?.email){
      throw new Error('GitHub did not return an email address. Make sure your backend requests the user:email scope.');
    }
    upsertSocialUser({
      provider:'github',
      providerId:String(profile.id||profile.node_id||''),
      name:profile.name||profile.login||'GitHub User',
      email:profile.email,
      avatar:profile.avatar_url||profile.avatar||'',
      emailVerified:true,
    });
    clearSocialAuthParams();
  }catch(e){
    setAuthFeedback(e.message||'GitHub login failed. Please try again.','error');
    sndError();
    clearSocialAuthParams();
  }
}
function initSocialAuth(){
  void handleGitHubCallback();
}
async function sendAuthOtp(){
  const emailAuthMode=getEmailAuthMode();
  const nameInput=document.getElementById('authName');
  const emailInput=document.getElementById('authEmail');
  const rawName=nameInput?.value.trim()||'';
  const email=normalizeEmail(emailInput?.value||'');
  if(emailAuthMode==='disabled'){
    setAuthFeedback('Email OTP sign-in is not available right now. Please use another sign-in method.','info');
    sndError();
    return;
  }
  if(authMode==='signup'&&!rawName){
    setAuthFeedback('Please enter your full name to create your account.','error');
    sndError();
    nameInput?.focus();
    return;
  }
  if(!isValidEmail(email)){
    setAuthFeedback('Please enter a valid email address.','error');
    sndError();
    emailInput?.focus();
    return;
  }
  const existing=emailAuthMode==='demo'?getUserByEmail(email):null;
  if(emailAuthMode==='demo'&&authMode==='signup'&&existing){
    setAuthFeedback('This email already has an account. Try Login instead.','error');
    sndError();
    return;
  }
  if(emailAuthMode==='demo'&&authMode==='login'&&!existing){
    setAuthFeedback('No account found for this email. Please sign up first.','error');
    sndError();
    return;
  }
  setAuthFeedback(emailAuthMode==='demo'?'Sending OTP...':'Sending verification code...','info');
  await delay(500);
  if(emailAuthMode==='demo'){
    const pending={
      mode:authMode,
      name:authMode==='signup'?rawName:(existing?.name||'Learner'),
      email,
      otp:generateOtp(),
      expiresAt:Date.now()+AUTH_CONFIG.otpTtlMs,
    };
    setPendingAuth(pending);
    document.getElementById('authOtpEmail').textContent=email;
    populateOtpPreview(pending);
    showAuthStep('verify');
    resetAuthInputs();
    setAuthFeedback(`OTP ready for ${email}.`,'success');
    sndSuccess();
    document.getElementById('authOtp')?.focus();
    return;
  }
  try{
    const payload=await postJson(AUTH_CONFIG.sendUrl,{
      mode:authMode,
      name:authMode==='signup'?rawName:'',
      email,
    });
    const pending={
      mode:authMode,
      name:authMode==='signup'?rawName:(payload.user?.name||payload.name||existing?.name||'Learner'),
      email:normalizeEmail(payload.user?.email||email),
      requestId:String(payload.requestId||payload.otpRequestId||payload.id||'').trim(),
      expiresAt:Date.now()+(Math.max(30,Number(payload.expiresIn||payload.ttlSeconds||payload.ttl||Math.ceil(AUTH_CONFIG.otpTtlMs/1000))))*1000,
    };
    setPendingAuth(pending);
    document.getElementById('authOtpEmail').textContent=pending.email;
    populateOtpPreview(pending);
    showAuthStep('verify');
    resetAuthInputs();
    setAuthFeedback(payload.message||`Verification code sent to ${pending.email}.`,'success');
    sndSuccess();
    document.getElementById('authOtp')?.focus();
  }catch(e){
    setAuthFeedback(e.message||'Could not send the verification code. Please try again.','error');
    sndError();
  }
}
function resendAuthOtp(){
  const pending=getPendingAuth();
  const emailAuthMode=getEmailAuthMode();
  if(!pending){
    setAuthFeedback('Start by entering your email to request a code.','info');
    showAuthStep('request');
    return;
  }
  if(emailAuthMode==='disabled'){
    setAuthFeedback('Email OTP sign-in is not available right now.','info');
    sndError();
    showAuthStep('request');
    return;
  }
  if(emailAuthMode==='demo'){
    const refreshed={...pending,otp:generateOtp(),expiresAt:Date.now()+AUTH_CONFIG.otpTtlMs};
    setPendingAuth(refreshed);
    populateOtpPreview(refreshed);
    resetAuthInputs();
    setAuthFeedback('A fresh OTP has been generated.','success');
    sndSuccess();
    document.getElementById('authOtp')?.focus();
    return;
  }
  setAuthFeedback('Sending a fresh verification code...','info');
  void delay(250).then(async()=>{
    try{
      const payload=await postJson(AUTH_CONFIG.sendUrl,{
        mode:pending.mode||authMode,
        name:pending.name||'',
        email:pending.email,
        resend:true,
        requestId:pending.requestId||'',
      });
      const refreshed={
        ...pending,
        requestId:String(payload.requestId||payload.otpRequestId||payload.id||pending.requestId||'').trim(),
        expiresAt:Date.now()+(Math.max(30,Number(payload.expiresIn||payload.ttlSeconds||payload.ttl||Math.ceil(AUTH_CONFIG.otpTtlMs/1000))))*1000,
      };
      setPendingAuth(refreshed);
      populateOtpPreview(refreshed);
      resetAuthInputs();
      setAuthFeedback(payload.message||'A fresh verification code has been sent.','success');
      sndSuccess();
      document.getElementById('authOtp')?.focus();
    }catch(e){
      setAuthFeedback(e.message||'Could not resend the verification code. Please try again.','error');
      sndError();
    }
  });
}
function finishEmailAuth(pending,profile={},allowCreateOnLogin=false){
  const email=normalizeEmail(profile.email||pending.email||'');
  const users=getAuthUsers();
  const existingIndex=users.findIndex(user=>user.email===email);
  const existing=existingIndex>=0?users[existingIndex]:null;
  const now=new Date().toISOString();
  const userRecord={
    ...existing,
    id:String(profile.id||existing?.id||`user_${Date.now()}`),
    name:String(profile.name||pending.name||existing?.name||getFirstName(email)).trim(),
    email,
    provider:'email',
    emailVerified:true,
    createdAt:existing?.createdAt||profile.createdAt||now,
    verifiedAt:profile.verifiedAt||now,
    lastLoginAt:now,
  };
  if(profile.avatar||existing?.avatar)userRecord.avatar=profile.avatar||existing?.avatar;
  if(profile.token||profile.accessToken||existing?.authToken)userRecord.authToken=profile.token||profile.accessToken||existing?.authToken||'';
  let user=userRecord;
  if((pending.mode||authMode)==='signup'){
    if(existingIndex>=0){
      users[existingIndex]={...users[existingIndex],...userRecord};
      user=users[existingIndex];
    }else{
      users.unshift(userRecord);
    }
  }else if(existingIndex>=0){
    users[existingIndex]={...users[existingIndex],...userRecord,createdAt:users[existingIndex].createdAt||userRecord.createdAt};
    user=users[existingIndex];
  }else if(allowCreateOnLogin){
    users.unshift(userRecord);
  }else{
    return {ok:false,message:'We could not find that account. Please sign up first.'};
  }
  saveAuthUsers(users);
  setCurrentUser(user);
  clearPendingAuth();
  syncAuthUI();
  closeAuth();
  return {ok:true,user};
}
function verifyAuthOtp(){
  const pending=getPendingAuth();
  const otpInput=document.getElementById('authOtp');
  const entered=otpInput?.value.trim()||'';
  const emailAuthMode=getEmailAuthMode();
  if(!pending){
    setAuthFeedback('Your session expired. Please request a new OTP.','error');
    sndError();
    showAuthStep('request');
    return;
  }
  if(Date.now()>pending.expiresAt){
    setAuthFeedback('This OTP has expired. Please resend a new one.','error');
    sndError();
    populateOtpPreview({...pending,expiresAt:Date.now()});
    return;
  }
  if(entered.length!==AUTH_CONFIG.otpLength){
    setAuthFeedback('Please enter the full verification code.','error');
    sndError();
    otpInput?.focus();
    return;
  }
  if(emailAuthMode==='demo'&&entered!==pending.otp){
    setAuthFeedback('Incorrect OTP. Please check the code and try again.','error');
    sndError();
    otpInput?.focus();
    return;
  }
  if(emailAuthMode==='demo'){
    const result=finishEmailAuth(pending,{name:pending.name,email:pending.email},false);
    if(!result.ok){
      setAuthFeedback(result.message,'error');
      sndError();
      return;
    }
    setAuthFeedback((pending.mode||authMode)==='signup'?'Account verified successfully.':'Login successful.','success');
    sndSuccess();
    go('dashboard');
    return;
  }
  setAuthFeedback('Verifying your code...','info');
  void postJson(AUTH_CONFIG.verifyUrl,{
    mode:pending.mode||authMode,
    name:pending.name||'',
    email:pending.email,
    otp:entered,
    requestId:pending.requestId||'',
  }).then(payload=>{
    const result=finishEmailAuth(pending,payload.user||payload.profile||payload,true);
    if(!result.ok){
      setAuthFeedback(result.message,'error');
      sndError();
      return;
    }
    setAuthFeedback(payload.message||((pending.mode||authMode)==='signup'?'Account verified successfully.':'Login successful.'),'success');
    sndSuccess();
    go('dashboard');
  }).catch(e=>{
    setAuthFeedback(e.message||'Verification failed. Please try again.','error');
    sndError();
    otpInput?.focus();
  });
}
function logoutAuth(){
  const user=getCurrentUser();
  if(!user)return;
  const proceed=window.confirm(`Log out ${user.email}?`);
  if(!proceed)return;
  clearCurrentUser();
  clearPendingAuth();
  syncAuthUI();
  sndClick();
  go('home');
}
function handlePrimaryNavAction(){
  const user=getCurrentUser();
  if(user){
    logoutAuth();
    return;
  }
  openAuth('signup');
}
function handleSecondaryNavAction(){
  const user=getCurrentUser();
  if(user){
    go('dashboard');
    return;
  }
  openAuth('login');
}
function syncAuthUI(){
  const user=getCurrentUser();
  const navPrimary=document.getElementById('navPrimaryBtn');
  const navSecondary=document.getElementById('navSecondaryBtn');
  const dashboardUserName=document.getElementById('dashboardUserName');
  const dashboardUserEmail=document.getElementById('dashboardUserEmail');
  if(user){
    if(navPrimary){
      navPrimary.textContent='Logout';
      navPrimary.classList.add('logout');
    }
    if(navSecondary)navSecondary.textContent='Dashboard';
    if(dashboardUserName)dashboardUserName.textContent=getFirstName(user.name);
    if(dashboardUserEmail){
      const providerLabel=getProviderLabel(user.provider);
      dashboardUserEmail.textContent=providerLabel==='Email OTP'?`Verified email: ${user.email}`:`Verified with ${providerLabel}: ${user.email}`;
    }
  }else{
    if(navPrimary){
      navPrimary.textContent='Sign Up Free';
      navPrimary.classList.remove('logout');
    }
    if(navSecondary)navSecondary.textContent='Login';
    if(dashboardUserName)dashboardUserName.textContent='Harshal';
    if(dashboardUserEmail)dashboardUserEmail.textContent=`Sign in with ${formatProviderList(getAvailableAuthProviders())} to save your learning dashboard.`;
  }
}
function buildMentorReply(message){
  const lower=message.toLowerCase();
  if(containsAny(lower,['confused','path','choose','which path'])){
    return `**Start with one lane, not five.**\n\nIf you enjoy building interfaces, go with Frontend: HTML, CSS, JavaScript, React. If you like numbers and decision-making, go with Data: Python, SQL, Power BI, statistics. If you love intelligent systems, go with AI/ML: Python, math basics, ML, and projects.\n\nReply with the lane that feels most exciting and I can map your next 30 days.`;
  }
  if(containsAny(lower,['resume','cv'])){
    return `**Resume upgrade plan**\n\nKeep it to one page, lead with a sharp summary, and add 2 to 3 proof-based projects with measurable outcomes. For each project, mention the stack, what problem you solved, and one metric such as users, speed, accuracy, or completion rate.\n\nIf you want, paste your target role next and I’ll suggest resume bullet points for it.`;
  }
  if(containsAny(lower,['billing','payment','subscription','refund','razorpay'])){
    return `**Billing help**\n\nSkillForge AI gives one free trial unlock, then access continues on Pro at ₹499/month or Premium at ₹999/month. ${getPaymentMode()==='live'?'Payments are processed securely through Razorpay. If checkout does not open, reload once, allow pop-ups, and retry from the same button.':getPaymentMode()==='demo'?'Demo checkout is active right now, so no real payment will be charged.':'Payments are temporarily unavailable right now. Please contact support for help.'}\n\nFor manual help, use ${CONTACT_CONFIG.email} or ${CONTACT_CONFIG.phone}. If you want, I can also explain which plan fits your goal.`;
  }
  if(containsAny(lower,['certificate','certificates','blockchain'])){
    return `**Certificate support**\n\nCertificates unlock after course completion rules are met and are intended to be blockchain-verifiable. Before requesting support, check course progress, final quiz status, and payment state if it is a premium course.\n\nIf the certificate still does not appear, send the course title and your registered email so support can trace it faster.`;
  }
  if(containsAny(lower,['data science','analytics','python'])){
    return `**Data Science path for ${CURRENT_YEAR}**\n\nStart with Python, SQL, Excel or Power BI, statistics, and exploratory data analysis. Then build 2 portfolio projects: one dashboard project and one prediction or analysis project using real data.\n\nA strong order is Python for Data Science → Intro to SQL → statistics basics → Machine Learning Crash Course. Want a 12-week roadmap?`;
  }
  if(containsAny(lower,['frontend','react','next.js','nextjs','web dev'])){
    return `**Frontend roadmap**\n\nFocus first on HTML, CSS, and JavaScript, then move into component-driven apps and deployment. A strong sequence is Responsive Web Design Certification → CS50’s Web Programming with Python and JavaScript → 3 shipped projects.\n\nRecruiters usually look for clean UI, component thinking, Git usage, deployment, and one polished portfolio project. If you want, I can list the exact projects to build next.`;
  }
  if(containsAny(lower,['ai','ml','machine learning','llm'])){
    return `**AI/ML path**\n\nBuild foundations in Python, statistics, and core computer science first. Then move into machine learning, model evaluation, and one practical AI project such as classification, summarization, or a small assistant workflow.\n\nA strong sequence is CS50x → Machine Learning for Everybody → Machine Learning Crash Course. The biggest differentiator is proof-of-work, so aim for one deployable project, one notebook-based project, and one concise write-up.`;
  }
  return `**You are closer than you think.**\n\nPick one target role, build one matching project, and spend the next 2 weeks getting consistent instead of trying to learn everything at once.\n\nI can help with a roadmap, a resume outline, or course suggestions next.`;
}
function buildLessonPack(topic){
  const cleanTopic=topic.trim();
  const lower=cleanTopic.toLowerCase();
  const found=LESSON_LIBRARY.find(item=>containsAny(lower,item.match));
  if(found)return found;
  return {
    lesson:`<strong>${escapeHtml(cleanTopic)}</strong> becomes easier when you break it into three parts: the core idea, one real example, and the tradeoff. Start by defining what problem the topic solves, then build a tiny example, and finally explain when you would or would not use it.<br><br>That pattern works well for interviews and for real learning because it pushes you beyond memorization into reasoning.`,
    question:`What is the best first step when learning ${cleanTopic}?`,
    options:['Memorize syntax only','Ignore examples','Understand the core problem it solves','Skip the basics'],
    answer:2,
  };
}
function buildPlanWeeks(){
  const activeVariants=[
    {
      title:'React.js Deep Dive',
      desc:'Components, hooks, state, Context API. Build a polished e-commerce UI with reusable patterns.',
      chips:['React','UI Systems'],
    },
    {
      title:'React + TypeScript Foundations',
      desc:'Typed components, props, hooks, and API calls. Build a job dashboard with filtering and forms.',
      chips:['React','TypeScript'],
    },
    {
      title:'Frontend Projects Sprint',
      desc:'Ship 2 portfolio projects with routing, API integration, and deployment. Focus on recruiter-ready polish.',
      chips:['Projects','Portfolio'],
    },
  ];
  const nextVariants=[
    {
      title:'Next.js + App Router',
      desc:'SSR, layouts, metadata, and server-first patterns. Turn your React skills into production-ready apps.',
      chips:['Next.js','App Router'],
    },
    {
      title:'Backend APIs with Node.js',
      desc:'REST APIs, Express, auth, and MongoDB basics so your frontend apps can work with real data.',
      chips:['Node.js','APIs'],
    },
    {
      title:'DSA + Interview Prep',
      desc:'Arrays, strings, maps, recursion, and problem solving habits for technical interviews.',
      chips:['DSA','Interviews'],
    },
  ];
  const active=activeVariants[Math.floor(Math.random()*activeVariants.length)];
  const next=nextVariants[Math.floor(Math.random()*nextVariants.length)];
  return [
    {week:'WEEK 1-2',title:'HTML/CSS Foundations',desc:'Semantic HTML5, CSS3, Flexbox, Grid. Build 2 responsive landing pages.',chips:['HTML5'],status:'done'},
    {week:'WEEK 3-4',title:'JavaScript Essentials',desc:'ES6+, DOM, async/await, fetch API. Build a weather app and to-do app.',chips:['JavaScript'],status:'done'},
    {week:'WEEK 5-7',title:active.title,desc:active.desc,chips:active.chips,status:'active'},
    {week:'WEEK 8-10',title:next.title,desc:next.desc,chips:next.chips,status:'locked'},
    {week:'WEEK 11-14',title:'Backend + Database Layer',desc:'Auth, CRUD, validation, and data modeling. Connect frontend apps to a real backend.',chips:['Backend','Database'],status:'locked'},
    {week:'WEEK 15-18',title:'Capstone Project Build',desc:'Ship one end-to-end app with auth, dashboards, and deployment. This becomes the portfolio centerpiece.',chips:['Capstone'],status:'locked'},
    {week:'WEEK 19-24',title:'Applications + Placement Prep',desc:'Resume, LinkedIn, mock interviews, and a focused application pipeline toward job-ready roles.',chips:['Placement'],status:'locked'},
  ];
}
function buildBlueprintData(data){
  const background=data.bg||'Student / Fresher';
  const interest=data.int||'Tech / Coding';
  const level=data.lvl||'Beginner';
  const salary=data.sal||'6-12 LPA';
  const timeline=data.tl||'3-6 months';
  const profile=BLUEPRINT_PROFILES[interest]||BLUEPRINT_PROFILES['Tech / Coding'];
  const firstSkills=profile.skills.slice(0,2).join(' and ');
  const nextSkills=profile.skills.slice(2,4).join(' and ');
  return {
    tagline:`${background} to ${profile.paths[0]} in ${timeline}. Start from a ${level.toLowerCase()} baseline, master ${firstSkills}, then build proof-of-work for ${salary} roles in India.`,
    paths:profile.paths,
    skills:profile.skills,
    courses:profile.courses,
    roles:profile.roles,
    milestones:[
      `Month 1-2: Build foundations in ${firstSkills} and complete one guided project.`,
      `Month 3-4: Add ${nextSkills}, ship 2 portfolio pieces, and practice explaining your work clearly.`,
      `Month 5-6: Refine resume, apply consistently for ${profile.roles.slice(0,2).join(' / ')} roles, and target ${salary} opportunities.`,
    ],
    salary,
  };
}
function renderRoadmap(weeks){
  const rm=document.getElementById('rm3');
  if(!rm)return;
  rm.innerHTML=weeks.map(w=>`<div class="rm-item">
    <div class="rm-dot3 ${w.status}">${w.status==='done'?'✓':w.status==='active'?'→':'🔒'}</div>
    <div class="rm-body" ${w.status==='active'?'style="border-color:rgba(79,142,255,.3)"':''}>
      <div class="rm-wk">${w.week}${w.status==='active'?' · CURRENT':''}</div>
      <div class="rm-ti">${w.title}</div>
      <div class="rm-de">${w.desc}</div>
      <div class="rm-chips">${(w.chips||[]).map(c=>`<span class="rmchip e">${c}</span>`).join('')}${w.status==='done'?'<span class="rmchip g">✓ Done</span>':w.status==='active'?'<span class="rmchip a">⚡ In Progress</span>':''}</div>
    </div></div>`).join('');
}

// ───────────────────────────────────────────
// CURSOR
// ───────────────────────────────────────────
const c1=document.getElementById('CUR'),c2=document.getElementById('CUR2');
const INTERACTIVE_CURSOR_SELECTOR='button,a,.q-opt4,.topicbtn,.bento-card,.plat-card,.crs-card,.cg-card,.job-card,.job-apply-btn,.sugg2,.auth-tab,.auth-link-btn,.auth-close,.nav-ghost,.auth-provider';
document.addEventListener('mousemove',e=>{
  c1.style.cssText+=`left:${e.clientX}px;top:${e.clientY}px`;
  c2.style.cssText+=`left:${e.clientX}px;top:${e.clientY}px`;
});
function setCursorState(active){
  c2.style.transform=active?'translate(-50%,-50%) scale(1.6)':'translate(-50%,-50%) scale(1)';
  c2.style.borderColor=active?'rgba(79,142,255,.8)':'rgba(79,142,255,.4)';
}
document.addEventListener('pointerover',e=>{
  if(e.target.closest(INTERACTIVE_CURSOR_SELECTOR))setCursorState(true);
});
document.addEventListener('pointerout',e=>{
  if(!e.relatedTarget?.closest(INTERACTIVE_CURSOR_SELECTOR))setCursorState(false);
});

// ───────────────────────────────────────────
// 3D PARTICLE CANVAS
// ───────────────────────────────────────────
const cv=document.getElementById('cv');
const ctx=cv.getContext('2d');
let W,H;
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight}
resize();addEventListener('resize',resize);

class P{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*W;this.y=Math.random()*H;this.z=Math.random()*800+200;
    this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.vz=-Math.random()*.6-.2;
    this.r=Math.random()*1.8+.4;
    this.hue=Math.random()<.55?215:Math.random()<.5?260:340;
    this.age=0;this.maxAge=Math.random()*300+150;
  }
  update(){
    this.x+=this.vx;this.y+=this.vy;this.z+=this.vz;this.age++;
    if(this.z<1||this.x<-20||this.x>W+20||this.y<-20||this.y>H+20||this.age>this.maxAge)this.reset();
  }
  draw(){
    const s=500/(500+this.z);
    const sx=(this.x-W/2)*s+W/2,sy=(this.y-H/2)*s+H/2;
    const life=Math.min(1,(this.maxAge-this.age)/60);
    ctx.beginPath();ctx.arc(sx,sy,this.r*s,0,Math.PI*2);
    ctx.fillStyle=`hsla(${this.hue},90%,70%,${life*.5})`;ctx.fill();
  }
}
const particles=Array.from({length:180},()=>new P());

function drawGrid(){
  ctx.strokeStyle='rgba(79,142,255,0.022)';ctx.lineWidth=.8;
  for(let x=0;x<W;x+=72){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
  for(let y=0;y<H;y+=72){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
}
function drawEdges(){
  for(let i=0;i<particles.length;i++){
    const a=particles[i];
    const sax=500/(500+a.z)*(a.x-W/2)+W/2,say=500/(500+a.z)*(a.y-H/2)+H/2;
    for(let j=i+1;j<Math.min(i+6,particles.length);j++){
      const b=particles[j];
      const sbx=500/(500+b.z)*(b.x-W/2)+W/2,sby=500/(500+b.z)*(b.y-H/2)+H/2;
      const d=Math.hypot(sax-sbx,say-sby);
      if(d<130){ctx.beginPath();ctx.moveTo(sax,say);ctx.lineTo(sbx,sby);ctx.strokeStyle=`rgba(79,142,255,${(1-d/130)*.07})`;ctx.lineWidth=.5;ctx.stroke()}
    }
  }
}
function loop(){
  ctx.clearRect(0,0,W,H);
  drawGrid();
  particles.forEach(p=>{p.update();p.draw()});
  drawEdges();
  requestAnimationFrame(loop);
}
loop();

// ───────────────────────────────────────────
// AUDIO (subtle, tasteful)
// ───────────────────────────────────────────
let AC;
function getAC(){if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();return AC}
function beep(f=600,d=.1,v=.08,t='sine'){try{const a=getAC(),o=a.createOscillator(),g=a.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+d)}catch(e){}}
function sndClick(){beep(700,.09,.06)}
function sndSuccess(){[520,660,780].forEach((f,i)=>setTimeout(()=>beep(f,.15,.06),i*80))}
function sndError(){beep(220,.25,.08,'sawtooth')}

// ───────────────────────────────────────────
// NAVIGATION
// ───────────────────────────────────────────
const PAGES=['home','dashboard','courses','jobs','chat','tutor','plan','blueprint','founder','connect'];
function getPageFromHash(hash=window.location.hash){
  const clean=String(hash||'').replace(/^#/,'').trim().toLowerCase();
  if(!clean)return 'home';
  const normalized=clean.startsWith('page-')?clean.slice(5):clean;
  return PAGES.includes(normalized)?normalized:'home';
}
function syncPageHash(id){
  const nextHash=id==='home'?'':`#page-${id}`;
  const next=`${window.location.pathname}${window.location.search}${nextHash}`;
  const current=`${window.location.pathname}${window.location.search}${window.location.hash}`;
  if(current!==next)window.history.replaceState({},document.title,next);
}
function go(id,{updateHash=true}={}){
  if(id==='dashboard'&&!getCurrentUser()){
    openAuth('signup');
    setAuthFeedback('Sign up or log in to access your dashboard.','info');
    return;
  }
  sndClick();
  PAGES.forEach(p=>{const el=document.getElementById('page-'+p);if(el)el.classList.toggle('active',p===id)});
  if(updateHash)syncPageHash(id);
  window.scrollTo(0,0);
  if(id==='home')initHome();
  if(id==='courses')initCourses();
  if(id==='jobs')initJobs();
  if(id==='connect')initConnect();
}

// ───────────────────────────────────────────
// HOME INIT
// ───────────────────────────────────────────
function initHome(){
  animNum('sn1',10000,'+',60);
  animNum('sn2',500,'+',3);
  animNum('sn3',COURSES_DATA.length,'',1);
  // marquee
  const mt=document.getElementById('mtrack');
  if(mt){
    const all=[...COURSES_DATA,...COURSES_DATA];
    mt.innerHTML=all.map(c=>{
      const accessUi=getCourseAccessUi(c);
      return `<div class="crs-card" onclick="unlockCourse('${c.id}')">
      <div class="crs-thumb" style="background:${c.bg}">${c.icon}</div>
      <div class="crs-body">
        <div class="crs-tag">${c.tag} · ${c.source}</div>
        <div class="crs-title">${c.title}</div>
        <div class="crs-foot"><span>${c.provider}</span><span>${c.format}</span><span class="crs-price">${accessUi.price}</span></div>
      </div></div>`;
    }).join('');
  }
  // platform preview
  const pg=document.getElementById('platGridHome');
  if(pg)renderPlatCards(pg,HOME_PLATFORMS);
  // testi
  const tg=document.getElementById('testiGrid3');
  if(tg&&tg.children.length===0){
    tg.innerHTML=TESTI_DATA.map(t=>`<div class="testi-card">
      <div class="testi-quote">"</div>
      <div class="testi-stars">★★★★★</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-user">
        <div class="testi-av" style="background:hsla(${t.h},70%,40%,.2);color:hsl(${t.h},80%,65%);border:1.5px solid hsl(${t.h},60%,35%)">${t.av}</div>
        <div><div class="testi-n">${t.name}</div><div class="testi-r">${t.role}</div></div>
      </div></div>`).join('');
  }
}
function animNum(id,target,sfx,step){
  const el=document.getElementById(id);if(!el)return;
  if(el.dataset.animated==='true'){
    el.textContent=formatStatValue(target,sfx);
    return;
  }
  if(el.dataset.timerId)clearInterval(Number(el.dataset.timerId));
  let c=0;
  const ti=setInterval(()=>{
    c+=step;
    if(c>=target){
      c=target;
      clearInterval(ti);
      delete el.dataset.timerId;
      el.dataset.animated='true';
    }
    el.textContent=formatStatValue(c,sfx);
  },20);
  el.dataset.timerId=String(ti);
}
function renderPlatCards(el,data,grouped=false){
  if(!grouped){
    el.innerHTML=data.map(p=>{
      const accessUi=getPlatformAccessUi();
      return `<div class="plat-card" onclick="platAccess(event,'${p.url}',${p.fee},'${p.name}')">
      <span class="plat-logo">${p.icon}</span>
      <div class="plat-name">${p.name}</div>
      <div class="plat-desc">${p.desc}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:8px">
        <span class="plat-badge ${accessUi.badge}">${accessUi.label}</span>
        <span style="font-size:9px;font-weight:700;color:${accessUi.badge==='pb-live'?'var(--emerald)':accessUi.badge==='pb-free'?'var(--amber)':'var(--electric)'};font-family:'JetBrains Mono',monospace">${accessUi.note}</span>
      </div>
    </div>`;
    }).join('');
  } else {
    // grouped by category
    const cats=[...new Set(data.map(p=>p.cat))];
    el.innerHTML=cats.map(cat=>{
      const items=data.filter(p=>p.cat===cat);
      const catIcons={'Premium Course Platforms':'🎓','India-Specific Platforms':'🇮🇳','Coding & Tech Platforms':'💻','Cloud & Certification Platforms':'☁️','Community & Social Platforms':'📱','Job & Placement Platforms':'💼'};
      return `<div style="grid-column:1/-1;margin-top:32px;margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid var(--border)">
          <span style="font-size:20px">${catIcons[cat]||'🔗'}</span>
          <span style="font-family:'Cabinet Grotesk',sans-serif;font-size:17px;font-weight:800;letter-spacing:-.3px">${cat}</span>
          <span style="font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace">${items.length} platforms</span>
        </div>
      </div>
      ${items.map(p=>{
        const accessUi=getPlatformAccessUi();
        return `<div class="plat-card" onclick="platAccess(event,'${p.url}',${p.fee},'${p.name}')">
        <span class="plat-logo">${p.icon}</span>
        <div class="plat-name">${p.name}</div>
        <div class="plat-desc">${p.desc}</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:8px">
          <span class="plat-badge ${accessUi.badge}">${accessUi.label}</span>
          <span style="font-size:9px;font-weight:700;color:${accessUi.badge==='pb-live'?'var(--emerald)':accessUi.badge==='pb-free'?'var(--amber)':'var(--electric)'};font-family:'JetBrains Mono',monospace">${accessUi.note}</span>
        </div>
      </div>`;
      }).join('')}`;
    }).join('');
  }
}

// ── PLATFORM ACCESS GATEWAY ──
function platAccess(event,url,fee,name){
  event.stopPropagation();
  requestPremiumFeatureAccess(`${name} platform`,()=>openCourse(url));
}
function closePlatModal(){document.getElementById('platModal').classList.remove('open')}
function confirmPlatAccess(){
  const url=document.getElementById('platModalUrl').value;
  const fee=parseInt(document.getElementById('platModalFee').textContent,10);
  const name=document.getElementById('platModalName').textContent;
  closePlatModal();
  rzpay(fee,'Access Pass: '+name,()=>window.open(url,'_blank','noopener'));
}

// ───────────────────────────────────────────
// COURSES
// ───────────────────────────────────────────
function initCourses(){
  renderAiTrackPills();
  renderAiTrack(activeTrackKey);
  const activeBtn=document.querySelector(`#page-courses .fb[data-cat="${activeCourseFilter}"]`)||document.querySelector('#page-courses .fb');
  fC(activeCourseFilter,activeBtn);
}
function fC(cat,btn){
  activeCourseFilter=cat;
  document.querySelectorAll('.fb').forEach(b=>b.classList.remove('on'));
  if(btn)btn.classList.add('on');
  const g=document.getElementById('cGrid3');if(!g)return;
  const f=cat==='all'?COURSES_DATA:COURSES_DATA.filter(c=>c.cat===cat);
  g.innerHTML=f.map(c=>{
    const accessUi=getCourseAccessUi(c);
    return `<div class="cg-card" onclick="unlockCourse('${c.id}')">
    <div class="cg-thumb" style="background:${c.bg}">
      <span class="cg-source-badge ${c.source==='YouTube'?'youtube':'web'}">${c.source}</span>
      ${c.icon}
    </div>
    <div class="cg-body">
      <div class="cg-tag">${c.tag}</div>
      <div class="cg-title">${c.title}</div>
      <div class="cg-desc">${c.desc}</div>
      <div class="cg-meta">
        <span class="cg-chip">${c.provider}</span>
        <span class="cg-chip">${c.format}</span>
        <span class="cg-chip">${c.level}</span>
      </div>
      <div class="cg-proof">${c.proof}</div>
      <div class="cg-foot">
        <div>
          <div class="cg-price ${accessUi.priceClass}">${accessUi.price}</div>
          <div class="cg-source">${accessUi.note}</div>
        </div>
        <div class="cg-actions">
          <button class="cg-secondary" onclick="event.stopPropagation();openAiTrack('${c.track}')">AI Plan</button>
          <button class="cg-enroll" onclick="event.stopPropagation();unlockCourse('${c.id}')">${accessUi.cta}</button>
        </div>
      </div>
    </div></div>`;
  }).join('');
}

// ───────────────────────────────────────────
// JOBS
// ───────────────────────────────────────────
function initJobs(){renderJobs(JOBS_DATA)}
function renderJobs(jobs){
  const el=document.getElementById('jList3');if(!el)return;
  el.innerHTML=jobs.map(j=>`<div class="job-card" onclick="sndClick()">
    <div class="job-logo">${j.icon}</div>
    <div class="job-main">
      <div class="job-role">${j.role}</div>
      <div class="job-company">${j.co} · ${j.type}</div>
      <div class="job-tags">${j.tags.map(t=>`<span class="jtag">${t}</span>`).join('')}</div>
    </div>
    <div class="job-right">
      <div class="job-sal">${j.sal}</div>
      <div class="job-match">${j.match}% MATCH</div>
      <button class="job-apply-btn" onclick="event.stopPropagation();sndClick()">Apply →</button>
    </div></div>`).join('');
}
function fJ(){
  const q=(document.getElementById('jSrch')?.value||'').toLowerCase();
  const t=(document.getElementById('jTyp')?.value||'').toLowerCase();
  renderJobs(JOBS_DATA.filter(j=>(!q||j.role.toLowerCase().includes(q)||j.co.toLowerCase().includes(q)||j.tags.some(x=>x.toLowerCase().includes(q)))&&(!t||j.type.toLowerCase().includes(t))));
}

// ───────────────────────────────────────────
// AI CHAT
// ───────────────────────────────────────────
const chatH=[];
async function runMentorReply(msg){
  sndClick();
  addMsg('user',msg);chatH.push({role:'user',content:msg});
  showTyp3();
  try{
    await delay(650);
    const rep=buildMentorReply(msg);
    chatH.push({role:'assistant',content:rep});
    removeTyp3();addMsg('bot',rep);sndSuccess();
  }catch(e){removeTyp3();addMsg('bot',`Connection issue. Please retry or email ${CONTACT_CONFIG.email} 📧`);sndError()}
}
function sendC3(){
  const inp=document.getElementById('chatI3');
  const msg=inp.value.trim();if(!msg)return;
  requestPremiumFeatureAccess('AI Mentor',()=>{
    inp.value='';
    void runMentorReply(msg);
  });
}
function sendS3(t){document.getElementById('chatI3').value=t;sendC3()}
function addMsg(role,text){
  const box=document.getElementById('chatBox3');
  const d=document.createElement('div');d.className='chat-bubble-wrap '+role[0];
  d.innerHTML=`${role==='bot'?'<div class="cb-name">🤖 SkillForge AI</div>':''}<div class="cb">${formatRichText(text)}</div>`;
  box.appendChild(d);box.scrollTop=box.scrollHeight;
}
function showTyp3(){const box=document.getElementById('chatBox3');const d=document.createElement('div');d.id='typ3';d.className='chat-typing';d.innerHTML='<span></span><span></span><span></span>';box.appendChild(d);box.scrollTop=box.scrollHeight}
function removeTyp3(){document.getElementById('typ3')?.remove()}

// ───────────────────────────────────────────
// AI TUTOR
// ───────────────────────────────────────────
let curQuiz3=null;
async function runTutorLesson(topic,btn){
  if(!topic?.trim())return;
  document.querySelectorAll('.topicbtn').forEach(b=>b.classList.remove('on'));
  if(btn)btn.classList.add('on');
  sndClick();
  document.getElementById('lessonOut').innerHTML='<span style="color:var(--electric);font-family:\'JetBrains Mono\',monospace;font-size:12px">Generating AI lesson...</span>';
  document.getElementById('quizP3').style.display='none';
  try{
    await delay(850);
    const p=buildLessonPack(topic);
    document.getElementById('lessonOut').innerHTML=p.lesson||'Lesson ready!';
    curQuiz3={q:p.question,opts:p.options,ans:p.answer};
    renderQ3();document.getElementById('quizP3').style.display='block';sndSuccess();
  }catch(e){document.getElementById('lessonOut').innerHTML='<span style="color:var(--muted)">Could not generate lesson. Try again or check connection.</span>';sndError()}
}
function lTopic(topic,btn){
  requestPremiumFeatureAccess('AI Tutor',()=>{
    void runTutorLesson(topic,btn);
  });
}
function renderQ3(){
  if(!curQuiz3)return;
  document.getElementById('qQ3').textContent=curQuiz3.q;
  document.getElementById('qOpts3').innerHTML=curQuiz3.opts.map((o,i)=>`<button class="qopt3" onclick="checkQ3(${i},this)">${String.fromCharCode(65+i)}. ${o}</button>`).join('');
}
function checkQ3(i,btn){
  document.querySelectorAll('.qopt3').forEach(o=>o.disabled=true);
  if(i===curQuiz3.ans){btn.classList.add('correct');sndSuccess()}
  else{btn.classList.add('wrong');document.querySelectorAll('.qopt3')[curQuiz3.ans].classList.add('correct');sndError()}
}

// ───────────────────────────────────────────
// LEARNING PLAN
// ───────────────────────────────────────────
async function runRePlan(){
  sndClick();document.getElementById('loading3').classList.add('on');
  try{
    await delay(900);
    renderRoadmap(buildPlanWeeks());
    sndSuccess();
  }catch(e){sndError()}
  finally{document.getElementById('loading3').classList.remove('on')}
}
function rePlan(){
  requestPremiumFeatureAccess('AI Learning Plan',()=>{
    void runRePlan();
  });
}

// ───────────────────────────────────────────
// BLUEPRINT
// ───────────────────────────────────────────
const bpD={};
function bpSel(el,k,v){el.closest('.q-opts4').querySelectorAll('.q-opt4').forEach(o=>o.classList.remove('sel'));el.classList.add('sel');bpD[k]=v;sndClick()}
function bpGo(n){
  const current=document.querySelector('.q-step4.on');
  if(current&&!current.querySelector('.q-opt4.sel')){
    sndError();
    return;
  }
  sndClick();
  document.querySelectorAll('.q-step4').forEach(s=>s.classList.remove('on'));
  document.getElementById('bq'+n).classList.add('on');
}
async function runBlueprintGeneration(){
  sndClick();document.getElementById('loading3').classList.add('on');
  try{
    await delay(1000);
    showBP3(buildBlueprintData(bpD));sndSuccess();
  }catch(e){
    showBP3({tagline:`Your ${bpD.int||'Tech'} journey starts now!`,paths:['Full Stack Dev','Frontend Engineer','Software Engineer'],skills:['JavaScript','React','Node.js','Git','SQL'],courses:['Responsive Web Design Certification','CS50’s Web Programming with Python and JavaScript','CS50x: Introduction to Computer Science'],roles:['Junior Dev','Frontend Dev','Full Stack','SWE'],milestones:['Month 1-2: Fundamentals','Month 3-4: Projects','Month 5-6: Job hunt'],salary:'₹6-14 LPA start'});sndError();
  }
  finally{document.getElementById('loading3').classList.remove('on')}
}
function genBP3(){
  if(!document.querySelector('#bq5 .q-opt4.sel')){
    sndError();
    return;
  }
  requestPremiumFeatureAccess('Career Blueprint',()=>{
    void runBlueprintGeneration();
  });
}
const RDOTS=['var(--electric)','var(--emerald)','var(--rose)','var(--amber)'];
function showBP3(p){
  document.getElementById('bpQuiz').style.display='none';
  document.getElementById('bpResult').style.display='block';
  document.getElementById('bpTag').textContent=p.tagline;
  document.getElementById('bpGrid3').innerHTML=`
    <div class="res-card4"><h4>🎯 Career Paths</h4><ul class="res-list4">${(p.paths||[]).map(i=>`<li><div class="rdot" style="background:${RDOTS[0]}"></div>${i}</li>`).join('')}</ul></div>
    <div class="res-card4"><h4>🛠️ Skills to Learn</h4><ul class="res-list4">${(p.skills||[]).map(i=>`<li><div class="rdot" style="background:${RDOTS[1]}"></div>${i}</li>`).join('')}</ul></div>
    <div class="res-card4"><h4>📚 Courses</h4><ul class="res-list4">${(p.courses||[]).map(i=>`<li><div class="rdot" style="background:${RDOTS[2]}"></div>${i}</li>`).join('')}</ul></div>
    <div class="res-card4"><h4>💼 Job Roles</h4><ul class="res-list4">${(p.roles||[]).map(i=>`<li><div class="rdot" style="background:${RDOTS[3]}"></div>${i}</li>`).join('')}</ul></div>
    <div class="res-card4" style="grid-column:1/-1"><h4>📅 Roadmap Timeline</h4><ul class="res-list4">${(p.milestones||[]).map(i=>`<li><div class="rdot" style="background:var(--violet)"></div>${i}</li>`).join('')}</ul>${p.salary?`<p style="margin-top:12px;color:var(--emerald);font-family:'Cabinet Grotesk',sans-serif;font-size:15px;font-weight:800">💰 Expected: ${p.salary}</p>`:''}</div>`;
}
function restBP3(){document.getElementById('bpQuiz').style.display='block';document.getElementById('bpResult').style.display='none';document.querySelectorAll('.q-step4').forEach((s,i)=>s.classList.toggle('on',i===0));document.querySelectorAll('.q-opt4').forEach(o=>o.classList.remove('sel'));Object.keys(bpD).forEach(k=>delete bpD[k])}

// ───────────────────────────────────────────
// CONNECT PLATFORMS
// ───────────────────────────────────────────
function initConnect(){
  const el=document.getElementById('allPlatGrid');
  if(el)renderPlatCards(el,ALL_PLATFORMS,true);
}

// ───────────────────────────────────────────
// RAZORPAY
// ───────────────────────────────────────────
async function rzpay(amount,planName,onSuccess){
  sndClick();
  const parsedAmount=parseInt(String(amount).replace(/[^0-9]/g,''),10);
  if(!parsedAmount){sndError();return}
  const paymentMode=getPaymentMode();
  const finishPayment=(paymentId,isDemoPayment=false)=>{
    rememberPaidPlan(planName);
    syncLaunchUi();
    initHome();
    initCourses();
    initConnect();
    sndSuccess();
    if(typeof onSuccess==='function')onSuccess();
    alert(`${isDemoPayment?'🧪 Demo Checkout Complete!':'✅ Payment Successful!'}\nPayment ID: ${paymentId}\n\n${isDemoPayment?'This was a demo checkout. No real money was charged.':'Welcome to SkillForge AI! 🚀'}\nFounded by ${CONTACT_CONFIG.founderName}\n📧 ${CONTACT_CONFIG.email}`);
    go('dashboard');
  };
  if(paymentMode==='disabled'){
    alert(`Payments are unavailable right now.\n\nPlease contact ${CONTACT_CONFIG.email} or ${CONTACT_CONFIG.phone} for manual help.`);
    sndError();
    return;
  }
  if(typeof window.Razorpay!=='function'){
    alert('Secure checkout is unavailable right now. Please try again shortly.');
    sndError();
    return;
  }
  if(paymentMode==='demo'){
    const proceed=window.confirm(`Demo checkout is active right now.\n\nContinue with a demo payment for ${planName} (₹${parsedAmount})?`);
    if(!proceed){sndError();return}
    finishPayment(`demo_${Date.now()}`,true);
    return;
  }
  const currentUser=getCurrentUser()||{};
  try{
    const orderPayload=await postJson(PAYMENT_CONFIG.createOrderUrl,{
      amount:parsedAmount*100,
      currency:PAYMENT_CONFIG.currency,
      planName,
    });
    const orderId=String(orderPayload.orderId||orderPayload.id||orderPayload.order?.id||'').trim();
    const orderAmount=Number(orderPayload.amount||orderPayload.order?.amount||parsedAmount*100);
    const orderCurrency=String(orderPayload.currency||orderPayload.order?.currency||PAYMENT_CONFIG.currency).trim()||PAYMENT_CONFIG.currency;
    if(!orderId)throw new Error('Could not start secure checkout right now. Please try again.');
    const opts={
      key:RAZORPAY_KEY,
      amount:orderAmount,
      currency:orderCurrency,
      name:String(orderPayload.name||PAYMENT_CONFIG.companyName).trim()||PAYMENT_CONFIG.companyName,
      description:String(orderPayload.description||planName).trim()||planName,
      order_id:orderId,
      async handler(resp){
        try{
          const verification=await postJson(PAYMENT_CONFIG.verifyPaymentUrl,{
            planName,
            amount:orderAmount,
            currency:orderCurrency,
            orderId,
            razorpay_payment_id:resp.razorpay_payment_id,
            razorpay_order_id:resp.razorpay_order_id,
            razorpay_signature:resp.razorpay_signature,
          });
          finishPayment(verification.paymentId||verification.razorpay_payment_id||resp.razorpay_payment_id||`pay_${Date.now()}`);
        }catch(error){
          alert(error.message||'Payment verification failed. Please contact support if money was debited.');
          sndError();
        }
      },
      prefill:{
        name:currentUser.name||'',
        email:currentUser.email||'',
        contact:currentUser.phone||currentUser.contact||CONTACT_CONFIG.phone,
      },
      theme:{color:PAYMENT_CONFIG.themeColor},
      modal:{ondismiss:()=>sndError()},
    };
    new window.Razorpay(opts).open();
  }catch(e){
    alert(e.message||'Could not start secure checkout right now. Please try again.');
    sndError();
  }
}

// ───────────────────────────────────────────
// BOOT
// ───────────────────────────────────────────
addEventListener('load',()=>{
  setRuntimeText();
  syncLaunchUi();
  setAuthModeCopy();
  syncAuthUI();
  initSocialAuth();
  initHome();
  initCourses();
  initJobs();
  const initialPage=getPageFromHash();
  if(initialPage!=='home')go(initialPage,{updateHash:false});
  document.getElementById('authModal')?.addEventListener('click',e=>{
    if(e.target.id==='authModal')closeAuth();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&document.getElementById('authModal')?.classList.contains('open'))closeAuth();
  });
  addEventListener('hashchange',()=>{
    const nextPage=getPageFromHash();
    const activePage=document.querySelector('.page.active')?.id.replace('page-','')||'home';
    if(nextPage!==activePage)go(nextPage,{updateHash:false});
  });
});
