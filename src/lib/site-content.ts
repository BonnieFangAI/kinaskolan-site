export const locales = ["zh", "sv"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export type NewsItem = {
  slug: string;
  date: string;
  image: string;
  featured?: boolean;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: Record<Locale, string[]>;
};

export type TeacherProfile = {
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  focus: LocalizedText;
  image: string;
};

export type CourseItem = {
  name: LocalizedText;
  ageGroup: LocalizedText;
  objective: LocalizedText;
  textbook: LocalizedText;
};

export type ActivityCategory = {
  key: string;
  title: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedText[];
  image: string;
};

export type ScholarshipItem = {
  title: LocalizedText;
  summary: LocalizedText;
  date: string;
};

export type HistoryMilestone = {
  year: string;
  title: LocalizedText;
  summary: LocalizedText;
};

export type PracticalCard = {
  title: LocalizedText;
  summary: LocalizedText;
};

export const sitePaths = {
  home: "",
  news: "/news",
  about: "/about",
  teachers: "/teachers",
  courses: "/courses",
  activities: "/students",
  hsk: "/hsk",
  contact: "/contact",
} as const;

export type SitePathKey = keyof typeof sitePaths;

export function resolveSitePath(locale: Locale, key: SitePathKey) {
  return `/${locale}${sitePaths[key]}`;
}

export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? ""}${path}`;
}

export const ui = {
  brand: {
    zh: "斯德哥尔摩瑞青中文学校",
    sv: "Ruiqing kinesiska skola i Stockholm",
  },
  shortBrand: {
    zh: "瑞青中文学校",
    sv: "Ruiqing",
  },
  tagline: {
    zh: "周末中文学校与 HSK 考点",
    sv: "Helgskola i kinesiska och HSK-center",
  },
  nav: {
    home: { zh: "首页", sv: "Hem" },
    news: { zh: "新闻", sv: "Nyheter" },
    about: { zh: "瑞青简介", sv: "Om Ruiqing" },
    teachers: { zh: "教师介绍", sv: "Lärare" },
    courses: { zh: "课程介绍", sv: "Kurser" },
    activities: { zh: "学生作品", sv: "Elevarbeten" },
    hsk: { zh: "汉考信息", sv: "HSK" },
    contact: { zh: "联系学校", sv: "Kontakt" },
  },
  common: {
    learnMore: { zh: "了解更多", sv: "Läs mer" },
    contactUs: { zh: "联系学校", sv: "Kontakta skolan" },
    readMore: { zh: "阅读全文", sv: "Läs vidare" },
    viewAllNews: { zh: "查看全部新闻", sv: "Se alla nyheter" },
    backToNews: { zh: "返回新闻列表", sv: "Tillbaka till nyheter" },
    contactAdmissions: { zh: "报名咨询", sv: "Frågor om anmälan" },
    latestNews: { zh: "最新新闻", sv: "Senaste nytt" },
  },
  hero: {
    title: {
      zh: "斯德哥尔摩瑞青中文学校",
      sv: "Ruiqing kinesiska skola i Stockholm",
    },
    subtitle: {
      zh: "瑞青中文学校自 2008 年起在斯德哥尔摩开展周末中文教学，重视语言学习、文化理解和学生表达，让孩子在稳定、亲切的课堂中持续接触中文。",
      sv: "Sedan 2008 bedriver Ruiqing helgundervisning i kinesiska i Stockholm med fokus på språk, kulturförståelse och elevers eget uttryck.",
    },
  },
  footer: {
    line1: {
      zh: "课程、新闻、活动与 HSK 通知以学校官网发布信息为准。",
      sv: "Kurser, nyheter, aktiviteter och HSK-notiser publiceras på skolans webbplats.",
    },
    line2: {
      zh: "欢迎家长、学生和考生通过邮箱联系学校。",
      sv: "Familjer, elever och provdeltagare är välkomna att kontakta skolan via e-post.",
    },
  },
  admin: {
    title: "School Admin Dashboard",
    description:
      "A simple content area for news, page copy, HSK information, media, and reusable school information.",
  },
} as const;

export const siteNavigation = [
  { key: "home", href: sitePaths.home, label: ui.nav.home },
  { key: "news", href: sitePaths.news, label: ui.nav.news },
  { key: "about", href: sitePaths.about, label: ui.nav.about },
  { key: "activities", href: sitePaths.activities, label: ui.nav.activities },
  { key: "hsk", href: sitePaths.hsk, label: ui.nav.hsk },
] as const;

export const schoolOverview = {
  intro: {
    zh: "瑞青中文学校是一所面向儿童、青少年和中文学习者的周末中文学校，由瑞典青田同乡会支持办学，长期在 Södra Latins Gymnasium 开展教学。学校把中文课程、文化活动、学生展示与 HSK 服务结合起来，形成了稳定、清晰、可信的学校形象。",
    sv: "Ruiqing är en helgskola i kinesiska för barn, ungdomar och andra kinesiskstuderande. Skolan stöds av Qingtianföreningen och har under lång tid bedrivit undervisning på Södra Latins Gymnasium.",
  },
  purpose: {
    zh: "学校希望让学生在瑞典的生活环境中持续学习中文，理解中国文化，并在朗诵、书写、节庆和交流活动中建立表达能力与文化认同。",
    sv: "Skolan vill ge elever i Sverige en stadig väg in i kinesiska språket, kinesisk kultur och tryggare uttryck genom undervisning, recitation, skrivande och kulturaktiviteter.",
  },
  pillars: [
    {
      title: {
        zh: "长期稳定办学",
        sv: "Långsiktig verksamhet",
      },
      summary: {
        zh: "学校于 2008 年 1 月 19 日开办，首批学生约 150 人，此后逐步发展为斯德哥尔摩稳定的周末中文学校。",
        sv: "Skolan öppnade den 19 januari 2008 med omkring 150 elever och har sedan dess utvecklats till en stabil helgskola i Stockholm.",
      },
    },
    {
      title: {
        zh: "中文教育特色",
        sv: "Kinesiska med kultur",
      },
      summary: {
        zh: "课程覆盖低龄启蒙、少儿中文、青少年学习和 HSK 衔接，同时通过传统节日、朗诵和书法活动延伸课堂。",
        sv: "Undervisningen omfattar yngre barn, skolbarn, ungdomar och HSK-koppling samt förlängs genom högtider, recitation och kalligrafi.",
      },
    },
    {
      title: {
        zh: "课堂与活动结合",
        sv: "Klassrum och aktiviteter",
      },
      summary: {
        zh: "学生作品、比赛照片和校园活动共同展示学习成果，让家长更直观看到学生成长。",
        sv: "Elevarbeten, tävlingsbilder och skolaktiviteter visar elevernas utveckling på ett konkret sätt.",
      },
    },
  ],
};

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "2008",
    title: {
      zh: "学校正式开办",
      sv: "Skolan startar",
    },
    summary: {
      zh: "瑞青中文学校在斯德哥尔摩迎来首批学生，开始系统开展周末中文教育。",
      sv: "Ruiqing tog emot sina första elever i Stockholm och startade regelbunden helgundervisning i kinesiska.",
    },
  },
  {
    year: "2011",
    title: {
      zh: "获得华文教育荣誉",
      sv: "Utmärkelse för kinesisk utbildning",
    },
    summary: {
      zh: "学校公开校史提到，瑞青曾获得华文教育示范学校相关荣誉。",
      sv: "Skolans egen historik nämner en utmärkelse kopplad till kinesisk språkundervisning.",
    },
  },
  {
    year: "今天",
    title: {
      zh: "持续服务学生与家庭",
      sv: "Fortsatt arbete för elever och familjer",
    },
    summary: {
      zh: "学校继续提供中文课程、校园活动、新闻发布和 HSK 信息，方便家长、学生和考生统一查看。",
      sv: "Skolan fortsätter att erbjuda kurser, aktiviteter, nyheter och HSK-information på ett samlat sätt.",
    },
  },
];

export const newsItems: NewsItem[] = [
  {
    slug: "ambassador-award-2026",
    date: "2026-05-28",
    image: "/original/ambassador-2026-hero.jpg",
    featured: true,
    title: {
      zh: "瑞青中文学校第十二届大使奖优秀朗诵作品展演暨颁奖典礼",
      sv: "Ambassadorpriset 2026 med framträdanden och prisutdelning",
    },
    excerpt: {
      zh: "学生把课堂中的中文学习带到舞台上，通过朗诵和展演展示语言表达与文化理解。",
      sv: "Eleverna tog med sig kinesiskan från klassrummet till scenen genom recitation och framträdanden.",
    },
    body: {
      zh: [
        "2026 年 5 月 23 日，瑞青中文学校举行第十二届大使奖优秀朗诵作品展演暨颁奖典礼。师生、家长和嘉宾共同到场，见证学生的中文表达成果。",
        "活动延续了学校重视朗诵、舞台表达和文化理解的传统。学生通过古诗、故事和主题作品展示课堂学习，也让家长看到中文教育在课堂之外的延伸。",
      ],
      sv: [
        "Den 23 maj 2026 anordnade Ruiqing den tolfte upplagan av Ambassadorpriset med framträdanden och prisutdelning.",
        "Aktiviteten följer skolans tradition att låta elever visa språk, recitation och kulturförståelse även utanför klassrummet.",
      ],
    },
  },
  {
    slug: "autumn-term-2026",
    date: "2026-05-26",
    image: "/original/sodralatin.jpg",
    title: {
      zh: "瑞青中文 2026 秋季课程安排发布",
      sv: "Höstterminens kursplanering 2026 har publicerats",
    },
    excerpt: {
      zh: "秋季课程安排包含学期节奏、班级设置和报名咨询信息，方便家长提前规划。",
      sv: "Höstterminens planering beskriver terminens rytm, grupper och kontaktvägar för anmälan.",
    },
    body: {
      zh: [
        "学校发布 2026 年秋季课程安排，内容包括学期节奏、班级设置、上课时间和报名咨询方式。",
        "家长如需了解新生报名或插班安排，可通过学校邮箱联系，学校会结合学生年龄、中文基础和班级情况进行沟通。",
      ],
      sv: [
        "Skolan har publicerat planeringen för höstterminen 2026 med information om termin, grupper, tider och anmälan.",
        "Familjer som vill fråga om nyanmälan eller placering kan kontakta skolan via e-post.",
      ],
    },
  },
  {
    slug: "summer-camp-2026",
    date: "2026-05-22",
    image: "/original/ambassador-2026-stage.jpg",
    title: {
      zh: "瑞青中文夏令营报名开启",
      sv: "Anmälan till Ruiqings sommarläger är öppen",
    },
    excerpt: {
      zh: "暑期活动把中文学习、集体活动和文化体验放进更真实的使用场景里。",
      sv: "Sommarlägret kopplar kinesiska språket till gemenskap, aktivitet och kulturupplevelser.",
    },
    body: {
      zh: [
        "瑞青中文夏令营面向希望在课堂之外继续接触中文的学生，内容结合语言使用、集体活动和文化体验。",
        "学校会通过官网新闻和通知持续发布活动信息，方便家长查看报名时间、活动安排和后续说明。",
      ],
      sv: [
        "Ruiqings sommarläger riktar sig till elever som vill fortsätta möta kinesiskan även utanför klassrummet.",
        "Skolan publicerar information om anmälan, upplägg och praktiska detaljer via webbplatsens nyheter.",
      ],
    },
  },
];

export const teachers: TeacherProfile[] = [
  {
    name: "王梅霜 Meisang Wang Fredmark",
    role: {
      zh: "校长",
      sv: "Rektor",
    },
    bio: {
      zh: "长期从事中文教学与学校管理，负责学校整体办学方向、教学组织和 HSK 联系工作。",
      sv: "Arbetar långsiktigt med kinesisk undervisning och skolledning samt ansvarar för skolans övergripande riktning och HSK-kontakt.",
    },
    focus: {
      zh: "学校发展、课程方向、HSK 服务",
      sv: "Skolutveckling, kursinriktning och HSK-service",
    },
    image: "/original/logo-ruiqing.png",
  },
  {
    name: "陈曦 Chen Xi",
    role: {
      zh: "教师 / 活动与宣传",
      sv: "Lärare / aktiviteter och information",
    },
    bio: {
      zh: "参与课堂教学、学校活动组织和公开内容发布，帮助学生在活动中展示中文表达。",
      sv: "Arbetar med undervisning, skolaktiviteter och information samt hjälper elever att visa sitt kinesiska uttryck.",
    },
    focus: {
      zh: "活动组织、文化表达、低龄教学",
      sv: "Aktiviteter, kulturuttryck och yngre elever",
    },
    image: "/original/logo-ruiqing.png",
  },
  {
    name: "陈月辉 Chen Yuehui",
    role: {
      zh: "中班教师",
      sv: "Lärare för mellannivå",
    },
    bio: {
      zh: "具备语言文学与教学背景，重视阅读、表达和学生不同阶段的学习衔接。",
      sv: "Har språk- och undervisningsbakgrund med fokus på läsning, uttryck och progression mellan nivåer.",
    },
    focus: {
      zh: "阅读表达、分层教学、学生成长",
      sv: "Läsning, nivåanpassning och elevutveckling",
    },
    image: "/original/logo-ruiqing.png",
  },
  {
    name: "刘姗姗 Liu Shanshan",
    role: {
      zh: "教师",
      sv: "Lärare",
    },
    bio: {
      zh: "关注低龄学生的课堂参与和互动学习，帮助学生在轻松稳定的环境中进入中文学习。",
      sv: "Fokuserar på yngre elevers delaktighet och interaktiv undervisning i en trygg lärmiljö.",
    },
    focus: {
      zh: "低龄教学、互动课堂、因材施教",
      sv: "Yngre elever, interaktion och individanpassning",
    },
    image: "/original/logo-ruiqing.png",
  },
];

export const courses: CourseItem[] = [
  {
    name: { zh: "幼儿课程", sv: "Kurs för yngre barn" },
    ageGroup: { zh: "学前儿童", sv: "Förskoleålder" },
    objective: {
      zh: "以听说启蒙、识字兴趣、儿歌绘本和课堂习惯培养为主，帮助孩子自然接触中文。",
      sv: "Fokuserar på muntlig start, intresse för tecken, sånger, bildböcker och klassrumsrutiner.",
    },
    textbook: { zh: "启蒙识字材料与课堂教案", sv: "Introduktionsmaterial och klassrumsunderlag" },
  },
  {
    name: { zh: "少儿课程", sv: "Kurs för barn" },
    ageGroup: { zh: "小学阶段", sv: "Skolbarn" },
    objective: {
      zh: "系统推进拼音、识字、阅读和表达，让学生建立稳定的中文学习基础。",
      sv: "Bygger grunden i uttal, tecken, läsning och muntligt uttryck.",
    },
    textbook: { zh: "新双双、中文好学等阶段教材", sv: "Xin Shuangshuang, Happy Chinese och nivåmaterial" },
  },
  {
    name: { zh: "青少年课程", sv: "Kurs för ungdomar" },
    ageGroup: { zh: "中高年级学生", sv: "Ungdomar" },
    objective: {
      zh: "加强阅读、写作、文化主题和表达能力，并与 HSK 学习需求形成衔接。",
      sv: "Fördjupar läsning, skrivande, kulturteman och uttryck med koppling till HSK.",
    },
    textbook: { zh: "进阶中文教材、HSK 教程及专题材料", sv: "Fördjupade läromedel, HSK-material och temapaket" },
  },
  {
    name: { zh: "成人课程", sv: "Kurs för vuxna" },
    ageGroup: { zh: "如学校开设", sv: "Vid behov" },
    objective: {
      zh: "面向希望学习中文基础、提升日常沟通或准备 HSK 的成人学习者，可根据学校安排更新。",
      sv: "För vuxna som vill läsa grundläggande kinesiska, vardagskommunikation eller förbereda HSK när skolan erbjuder det.",
    },
    textbook: { zh: "按班级水平选择教材", sv: "Material väljs efter nivå" },
  },
];

export const admissionsCards: PracticalCard[] = [
  {
    title: {
      zh: "报名方式",
      sv: "Anmälan",
    },
    summary: {
      zh: "新生和插班生可通过 rektor@kinaskolan.se 联系学校，学校会结合年龄、中文基础和班级情况沟通安排。",
      sv: "Nya elever och elever som vill börja mitt i terminen kontaktar skolan via rektor@kinaskolan.se.",
    },
  },
  {
    title: {
      zh: "上课时间",
      sv: "Undervisningstid",
    },
    summary: {
      zh: "学校以周末中文课程为主，具体班级时间和学期安排以学校最新通知为准。",
      sv: "Undervisningen sker främst på helger. Aktuella tider och terminsplanering följer skolans senaste information.",
    },
  },
  {
    title: {
      zh: "教材体系",
      sv: "Läromedel",
    },
    summary: {
      zh: "学校根据年龄和中文水平使用分级教材，并结合 HSK、文化主题和课堂活动进行补充。",
      sv: "Skolan använder nivåanpassade läromedel och kompletterar med HSK, kulturteman och klassrumsaktiviteter.",
    },
  },
];

export const activityCategories: ActivityCategory[] = [
  {
    key: "recitation",
    title: { zh: "朗诵比赛", sv: "Recitationstävling" },
    summary: {
      zh: "朗诵比赛和大使奖展演让学生把课堂学习带到舞台上，展示中文表达、节奏感和文化理解。",
      sv: "Recitation och Ambassadorpriset låter elever visa kinesiskt uttryck, rytm och kulturförståelse på scen.",
    },
    highlights: [
      { zh: "活动介绍", sv: "Aktivitetsintroduktion" },
      { zh: "比赛照片", sv: "Tävlingsbilder" },
      { zh: "视频可后续补充", sv: "Video kan läggas till senare" },
    ],
    image: "/original/ambassador-2026-stage.jpg",
  },
  {
    key: "calligraphy",
    title: { zh: "书法比赛", sv: "Kalligrafitävling" },
    summary: {
      zh: "书写与书法活动展示学生对汉字结构、笔画和审美的练习成果，适合长期沉淀学生作品。",
      sv: "Kalligrafi visar elevernas arbete med teckenstruktur, streck och estetiskt uttryck.",
    },
    highlights: [
      { zh: "学生作品图片", sv: "Bilder på elevarbeten" },
      { zh: "获奖作品", sv: "Prisbelönta arbeten" },
      { zh: "分年龄展示", sv: "Visning per ålder" },
    ],
    image: "/original/about-ruiqing.png",
  },
  {
    key: "extracurricular",
    title: { zh: "课外活动", sv: "Aktiviteter utanför klassrummet" },
    summary: {
      zh: "春游、夏令营、节日活动和文化体验活动，把中文学习延伸到真实场景和集体记忆中。",
      sv: "Utflykter, sommarläger, högtider och kulturupplevelser förlänger kinesiskan till verkliga sammanhang.",
    },
    highlights: [
      { zh: "春游与户外中文课", sv: "Utflykter och utomhuslektioner" },
      { zh: "夏令营", sv: "Sommarläger" },
      { zh: "节日与文化体验", sv: "Högtider och kulturupplevelser" },
    ],
    image: "/trip-finland.png",
  },
];

export const hskInfo = {
  overview: {
    zh: "瑞青中文学校提供 HSK 相关信息，集中说明考试日期、报名时间、考试地点、奖学金参考和游学活动通知。考生可通过学校官网查看最新消息，也可通过 hsk@kinaskolan.se 咨询。",
    sv: "Ruiqing samlar HSK-information om provdatum, registrering, provplats, stipendier och studieresor. Frågor kan skickas till hsk@kinaskolan.se.",
  },
  notices: [
    {
      title: {
        zh: "最新考试通知",
        sv: "Aktuell provinformation",
      },
      summary: {
        zh: "HSK 考试安排、报名时间和考试地点以学校最新通知为准。考试地点为瑞青中文学校所在教学地点，报名通常通过 chinesetest.cn 完成。",
        sv: "Provdatum, registrering och provplats följer skolans senaste information. Registrering sker normalt via chinesetest.cn.",
      },
    },
    {
      title: {
        zh: "奖学金信息",
        sv: "Stipendieinformation",
      },
      summary: {
        zh: "学校可发布中国高校奖学金、汉语桥项目和推荐项目等信息，方便学生结合 HSK 成绩规划后续学习。",
        sv: "Skolan kan publicera information om stipendier, Chinese Bridge och rekommenderade program kopplade till fortsatta studier.",
      },
    },
    {
      title: {
        zh: "游学活动通知",
        sv: "Studieresor och kulturutbyte",
      },
      summary: {
        zh: "中国游学、夏令营和文化交流活动可在此更新，便于家长和学生统一查看活动时间、对象和报名方式。",
        sv: "Studieresor, sommarläger och kulturutbyten kan publiceras här med tider, målgrupp och anmälan.",
      },
    },
  ],
};

export const hskBenefits: PracticalCard[] = [
  {
    title: {
      zh: "HSK 考试安排",
      sv: "HSK-prov",
    },
    summary: {
      zh: "公布考试日期、报名时间、考试地点和联系邮箱。",
      sv: "Publicerar provdatum, registrering, provplats och kontakt.",
    },
  },
  {
    title: {
      zh: "奖学金与项目",
      sv: "Stipendier och program",
    },
    summary: {
      zh: "整理中国高校奖学金、汉语桥项目和推荐项目。",
      sv: "Samlar stipendier, Chinese Bridge och rekommenderade program.",
    },
  },
  {
    title: {
      zh: "游学与交流",
      sv: "Studieresor och utbyte",
    },
    summary: {
      zh: "发布中国游学、夏令营和文化交流活动通知。",
      sv: "Publicerar studieresor, sommarläger och kulturutbyten.",
    },
  },
];

export const scholarshipItems: ScholarshipItem[] = [
  {
    date: "2026-06-01",
    title: {
      zh: "中国高校奖学金",
      sv: "Stipendier vid kinesiska universitet",
    },
    summary: {
      zh: "可用于发布奖学金申请时间、语言要求、推荐项目和相关说明。",
      sv: "Kan användas för ansökningstider, språkkrav, rekommenderade program och praktisk information.",
    },
  },
  {
    date: "2026-05-21",
    title: {
      zh: "游学与夏令营",
      sv: "Studieresor och sommarläger",
    },
    summary: {
      zh: "可用于发布中国游学项目、夏令营和文化交流活动。",
      sv: "Kan användas för Kinaprogram, sommarläger och kulturutbyte.",
    },
  },
];

export const contactInfo = {
  address: "Södra Latins Gymnasium, Stockholm",
  email: "rektor@kinaskolan.se",
  hskEmail: "hsk@kinaskolan.se",
  phone: "+46 (0)70 720 35 16",
  mapQuery: "Södra Latins Gymnasium Stockholm",
  admissionsNote: {
    zh: "报名、课程与学校咨询请写信到 rektor@kinaskolan.se。",
    sv: "Frågor om kurser, anmälan och skolan skickas till rektor@kinaskolan.se.",
  },
  hskNote: {
    zh: "HSK 相关问题请直接联系 hsk@kinaskolan.se。",
    sv: "HSK-frågor skickas direkt till hsk@kinaskolan.se.",
  },
};

export const adminModules = [
  {
    name: "News",
    description: "Create, edit, and delete news with dates, cover images, titles, and body copy.",
  },
  {
    name: "Page Content",
    description: "Edit the school profile, course introduction, textbook introduction, and HSK information.",
  },
  {
    name: "Media Library",
    description: "Upload images, keep reusable media, and manage activity albums.",
  },
  {
    name: "SEO",
    description: "Maintain page title, meta description, and friendly URLs for public pages.",
  },
];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function t(locale: Locale, value: LocalizedText) {
  return value[locale];
}
