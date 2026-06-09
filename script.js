const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const langOptions = document.querySelectorAll(".lang-option");

const translations = {
  zh: {
    "brand.school": "斯德哥尔摩瑞青中文学校",
    "nav.about": "瑞青简介",
    "nav.courses": "课程体系",
    "nav.news": "新闻",
    "nav.students": "学生作品",
    "nav.hsk": "汉考信息",
    "nav.contact": "招生联系",
    "footer.school": "斯德哥尔摩瑞青中文学校",
    "footer.address": "Södra Latins Gymnasium · Stockholm",
    "common.readMore": "阅读全文",
    "common.viewActivity": "查看活动",
    "common.viewUpdate": "查看动态",
    "index.eyebrow": "斯德哥尔摩瑞青中文学校",
    "index.heroTitle": "在瑞典持续传播中文与中华文化的周末学校。",
    "index.heroText": "瑞典斯德哥尔摩瑞青中文学校（Kinaskolan Ruiqing i Stockholm）是瑞典青田同乡会下属的非盈利周末中文学校。学校位于 Södra Latins Gymnasium，高质量语言教学与舞蹈、美术、书法等文化课程并行发展。",
    "index.ctaAbout": "学校简介",
    "index.ctaContact": "报名咨询",
    "index.stat1": "学校创办并迎来首批 150 名学生",
    "index.stat2": "稳定在校学生规模",
    "index.stat3": "专业汉语与对外汉语教师",
    "index.stat4": "重启北欧 HSK 考试中心",
    "index.addressLabel": "学校地址",
    "index.grid1Title": "课程方向",
    "index.grid1Text": "学前班、青少年班、成人班与文化班",
    "index.grid2Title": "师资团队",
    "index.grid2Text": "30 名专业汉语与对外汉语教师",
    "index.grid3Title": "文化活动",
    "index.grid3Text": "朗诵、书写、游园会、游学与夏令营",
    "index.grid4Title": "汉考中心",
    "index.grid4Text": "面向北欧学习者的 HSK 服务入口",
    "index.priorityEyebrow": "重要入口",
    "index.priorityTitle": "首页只保留家长最先要找的内容",
    "index.card1Label": "学校简介",
    "index.card1Title": "了解学校定位与办学历史",
    "index.card1Text": "快速了解学校背景、办学理念、校史与教师团队。",
    "index.card1Cta": "进入简介",
    "index.card2Label": "课程体系",
    "index.card2Title": "查看班级设置与教材路径",
    "index.card2Text": "了解学前班、年级班、对外汉语班及文化课程结构。",
    "index.card2Cta": "查看课程",
    "index.card3Label": "招生联系",
    "index.card3Title": "找到报名与咨询入口",
    "index.card3Text": "集中查看报名邮箱、学校地址与近期开班信息。",
    "index.card3Cta": "报名咨询",
    "index.card4Label": "HSK / 汉考",
    "index.card4Title": "考试信息与考点说明",
    "index.card4Text": "查看考试用途、联系方式与最近考试动态。",
    "index.card4Cta": "查看汉考",
    "index.newsEyebrow": "最新新闻",
    "index.newsTitle": "最新新闻",
    "index.newsText": "首页只展示最近几条最重要的学校动态，其余内容进入新闻页继续阅读。",
    "index.news1Title": "瑞青中文学校 2026 年第十二届“大使奖”优秀朗诵作品展演暨颁奖典礼",
    "index.news1Text": "声韵传文脉，童声诵中华。本届活动延续“课堂所学，舞台所现”的方向，让海外学子在朗诵中感受中文之美与中华文化的厚度。",
    "index.news2Title": "瑞青中文 2026 秋课程安排",
    "index.news2Text": "秋季课程安排已经公布，涵盖学期节奏、班级安排与家长最关心的核心信息。",
    "index.news3Title": "瑞青中文夏令营报名啦",
    "index.news3Text": "学校暑期活动开放报名，包含户外活动、中文游戏与集体篝火晚会。",
    "index.news4Title": "2026 斯京 HSK 春季考试圆满落幕",
    "index.news4Text": "来自北欧多国的考生参与考试，学校继续稳定承接考点服务工作。",
    "index.allNews": "查看全部新闻",
    "about.eyebrow": "瑞青简介",
    "about.heroTitle": "这是斯德哥尔摩瑞青中文学校。",
    "about.heroText": "我们，是一群涌着火样热忱致力于海外中文教育事业的华人；也是一群怀着无限赤诚，执着传播华夏悠久文化的华人。",
    "about.introLabel": "学校介绍",
    "about.introTitle": "位于 Södra Latins Gymnasium 的周末中文学校",
    "about.introBody": `<p>瑞典斯德哥尔摩瑞青中文学校（Kinaskolan Ruiqing i Stockholm）是瑞典青田同乡会下属的非盈利周末中文学校。每周六，来自不同文化背景的学生来到这里学习汉语，也在舞蹈、美术、书法等文化课程中理解中华文化。</p><p>学校一流的教学设施为学生提供高质量学习环境。清晨教室里传来朗朗书声，午后音乐厅、舞蹈房与活动教室依然活跃，形成语言学习与文化体验并重的节奏。</p>`,
    "about.missionLabel": "办学理念",
    "about.missionTitle": "十年制中文教育系统",
    "about.missionText": "设置专业对口海外出生、长大的孩子的十年制中文教育系统，以培养中文学习兴趣为起点，以承传中华文化为核心。",
    "about.facultyLabel": "师资团队",
    "about.facultyTitle": "30 名专业教师",
    "about.facultyText": "学校现任专业汉语和对外汉语教师 30 名，既有教学理论与经验，也保持高度教学热情与责任感。",
    "about.programsLabel": "课程体系",
    "about.programsTitle": "学前班、青少年班、成人班",
    "about.programsText": "课程覆盖不同年龄段，每学期两次对学生学习情况和教师教学质量进行评估，强调系统性、连续性与教学质量。",
    "about.teamEyebrow": "教师团队",
    "about.teamTitle": "老师介绍与教学团队",
    "about.teamText": "瑞青的教师团队长期围绕海外中文教育、教材研究、课堂方法和文化课程持续打磨，形成了稳定的教学梯队。",
    "about.teacher1Title": "王梅霜校长",
    "about.teacher1Text": "负责学校整体教学方向与校务统筹，长期推进课程体系建设、汉考中心工作与校际交流活动。",
    "about.teacher2Title": "刘瑞侠副校长",
    "about.teacher2Text": "参与教学管理与课程推进，在课堂组织、活动展演和高年级内容表达上承担重要协调工作。",
    "about.teacher3Title": "陈曦副校长",
    "about.teacher3Text": "参与教学设计与课程拓展，兼顾课堂教学与文化类内容组织，持续推动学校教学质量提升。",
    "about.teacher4Title": "低年级教学组",
    "about.teacher4Text": "姜玲、王仪卿、付军等老师在启蒙识字、字卡游戏、朗读训练和双语课堂方面积累了成熟方法。",
    "about.teacher5Title": "中高年级教学组",
    "about.teacher5Text": "贾海燕、杨婕、颜佳、陈月辉等老师围绕诗歌、神话、哲学、科技等主题展开分层教学。",
    "about.teacher6Title": "教研与交流",
    "about.teacher6Text": "学校教师团队长期通过听课、培训、团建与校际交流分享教学法，持续优化课堂体验与教学成果。",
    "about.historyEyebrow": "校史",
    "about.historyTitle": "学校发展历程",
    "about.history2008": "学校开门第一天迎来首批 150 名学生，之后逐步成长为斯德哥尔摩重要的中华文化传播平台。",
    "about.history2011": "获得中国国务院侨办颁发的“华文教育示范学校”荣誉。",
    "about.history2015": "承办“华文教育·名师巡讲团”斯京华文教师培训活动，持续加强校际交流与教师成长。",
    "about.history2016": "启用由北京大学出版社出版的新双双中文教材，尝试解决海外华裔子弟中文学习兴趣递减问题。",
    "about.history2019": "与中国汉考国际合作，在瑞典首都重启北欧地区国际汉语能力标准化考试中心。",
    "about.history2021": "在经历三学期线上教学后，恢复 Södra Latin 校区线下实体课堂教学。",
    "courses.eyebrow": "课程体系",
    "courses.heroTitle": "以系统中文课程为主轴，以文化课程和活动体系为延伸。",
    "courses.heroText": "瑞青中文学校从学生发展出发，逐步形成了课程体系为主、文化体系和活动体系为辅的教学模式，兼顾语言能力、文化理解和长期学习兴趣。",
    "courses.introLabel": "瑞青特色",
    "courses.introTitle": "十年制中文教育系统",
    "courses.introBody": `<p>学校自 2008 年创立以来，不断完善海外中文教育路径，面向不同年龄段和不同语言背景学生，形成了覆盖学前、低中高年级、青少年、对外汉语和成人班的多梯度教学结构。</p><p>教学重点不是短期灌输，而是让学生在长期学习中逐步建立识字、阅读、写作、表达与文化理解能力。</p>`,
    "courses.classLabel": "班级设置",
    "courses.class1Title": "学前班",
    "courses.class1Text": "主要面向 4-5 岁儿童，通过儿歌、故事和启蒙识字建立中文听说基础与良好学习习惯。",
    "courses.class2Title": "低中高年级组",
    "courses.class2Text": "面向本地华人华侨子女及多语家庭学生，强调系统识字、阅读理解和课堂表达。",
    "courses.class3Title": "青少年 / 成人 / 对外汉语班",
    "courses.class3Text": "兼顾海外成长学生、瑞典本地学习者与成人兴趣学习者，课程更贴近日常交流和文化理解。",
    "courses.materialsEyebrow": "教材与教学",
    "courses.materialsTitle": "主教材与分级学习路径",
    "courses.material1Title": "学前班",
    "courses.material1Text": "以自编教材和启蒙内容为主，帮助儿童建立中文听说、识字和课堂参与能力。",
    "courses.material2Title": "一年级至初中",
    "courses.material2Text": "系统使用《新双双中文教材》，并按年级搭配中文课本、中国成语、中国地理、古代故事等内容。",
    "courses.material3Title": "对外汉语课程",
    "courses.material3Text": "采用《中文好学》与 HSK 标准教程，适合非母语学习者按阶段逐步提升。",
    "courses.cultureEyebrow": "文化课程",
    "courses.cultureTitle": "语言学习之外，学校也重视审美、表达与文化体验。",
    "courses.culture1Title": "书法 / 美术 / 舞蹈",
    "courses.culture1Text": "学校长期开设书法、美术、舞蹈等课程，让学生在艺术训练中接触中华文化。",
    "courses.culture2Title": "武术 / 音乐欣赏",
    "courses.culture2Text": "多元文化课程帮助学生在体验中建立节奏感、身体感和更立体的文化认知。",
    "courses.culture3Title": "家长课程",
    "courses.culture3Text": "学校也曾为家长推出太极拳、瑜伽等课程，让陪读时间更有参与感和社区氛围。",
    "courses.activityEyebrow": "活动体系",
    "courses.activityTitle": "课堂之外，学生还在比赛、游学、夏令营和文化活动中继续使用中文。",
    "courses.activity1": "朗诵、书写、读后感等校内比赛持续推进表达训练",
    "courses.activity2": "游园会、博物馆参访和文化活动拓展真实场景",
    "courses.activity3": "夏令营和游学项目强化语言与文化的结合",
    "courses.activity4": "学校通过持续活动让学生把课堂学习带到真实交流与文化体验中",
    "news.eyebrow": "学校新闻",
    "news.heroTitle": "近期学校活动、课程通知与校园动态",
    "news.heroText": "以下展示学校近一年内的重要新闻、课程安排、活动报道与招生相关信息。",
    "news.item1Title": "瑞青中文学校 2026 年第十二届“大使奖”优秀朗诵作品展演暨颁奖典礼",
    "news.item1Text": "五月芳菲，文脉绵长。学校以朗诵连接课堂与舞台，让海外学子在诵读中感受中文之美，也让家长与来宾共同见证学生成长与学校教学成果。",
    "news.item2Title": "中文浸润下的和平之旅：瑞典华校芬兰游学记",
    "news.item2Text": "学生在旅途中用中文记录历史、讨论和平，让中文不只停留在课本上，而成为理解世界、连接历史与现实的一种能力。",
    "news.item3Title": "瑞青中文 2026 秋课程安排",
    "news.item3Text": "秋季学期课程安排已经公布，方便家长和学生及时了解新学期的教学节奏。",
    "news.item4Title": "瑞青中文夏令营报名啦",
    "news.item4Text": "学校暑期活动现已开放报名，包含室外活动、中文游戏与篝火晚会等丰富内容。",
    "news.item5Title": "Chinese proficiency Exam at Stockholm Center completed successfully",
    "news.item5Text": "The HSK exam in Stockholm was successfully held, attracting candidates from different Nordic countries and learning backgrounds.",
    "news.item6Title": "2026 斯京 HSK 春季考试圆满落幕",
    "news.item6Text": "来自不同国家和不同学习背景的考生齐聚斯德哥尔摩，学校作为考点顺利完成本次考试组织工作。",
    "news.item7Title": "瑞青第十二届“大使奖”全校朗诵大赛精彩呈现",
    "news.item7Text": "全校朗诵活动延续课堂到舞台的教学路径，也为后续优秀作品展演和颁奖典礼做了完整铺垫。",
    "news.item8Title": "瑞青中文学校 2026 年春季安排",
    "news.item8Text": "保留近一年内的学期信息，让家长仍可回看春季学期的班级节奏与报名联系方式。",
    "news.footerNote": "近一年学校新闻归档",
    "students.eyebrow": "学生作品",
    "students.heroTitle": "学生写作、比赛作品与活动成果展示",
    "students.heroText": "这里集中展示学生阅读写作成果，以及朗诵、书写、游学等活动中的精彩内容。",
    "students.introLabel": "学生作品",
    "students.introTitle": "阅读与写作成果",
    "students.introText1": "学校长期鼓励学生通过阅读与写作深化中文表达，形成了稳定的学生作品积累。",
    "students.introText2": "这里收录读后感、写作练习、比赛作品与活动成果，呈现学生在语言学习中的真实成长。",
    "students.readingLabel": "阅读作品",
    "students.work1Title": "《宾馆谜案》读后感",
    "students.work1Text": "作者：陈瑞麒，11 岁。通过阅读与写作训练，学生能够更完整地表达观点与阅读感受。",
    "students.work2Title": "云边有个小卖部",
    "students.work2Text": "学生通过中文阅读作品训练理解、概括与表达能力，也让中文学习与真实情感体验建立联系。",
    "students.work3Title": "《我的世界-幽灵的传说》",
    "students.work3Text": "学生作品既呈现中文能力的提升，也记录他们对故事、人物与世界的个人理解。",
    "students.eventsEyebrow": "校园成果",
    "students.eventsTitle": "比赛与活动也是学生成长的一部分",
    "students.event1Title": "第十二届“大使奖”朗诵大赛",
    "students.event1Text": "朗诵比赛把课堂朗读、舞台表达与中华文化学习结合在一起。",
    "students.event2Title": "书写比赛 / 书法大赛",
    "students.event2Text": "书写与书法活动帮助学生在笔墨之间理解汉字结构与审美。",
    "students.event3Title": "游园会 / 游学 / 夏令营",
    "students.event3Text": "校园活动把语言学习延伸到真实生活场景，增加学生的参与感与文化体验。",
    "students.footerNote": "学生作品与活动成果",
    "students.footerSub": "阅读、写作与校园活动栏目",
    "hsk.eyebrow": "HSK / Test Center",
    "hsk.heroTitle": "汉语水平考试中心信息",
    "hsk.heroText": "瑞青中文学校为北欧地区学习者提供 HSK 考试相关说明、报名方式与联系方式。",
    "hsk.infoLabel": "考试说明",
    "hsk.infoTitle": "瑞青中文学校 / Södra Latins Gymnasium",
    "hsk.infoBody": `<p>参加 HSK 考试可以帮助学习者了解自己的汉语水平，也可用于申请留学及奖学金，并成为求职就职的重要能力证明。</p><p>报名方式：官方网站 <a href="https://www.chinesetest.cn">www.chinesetest.cn</a></p><p>联系方式：hsk@kinaskolan.se / 王梅霜校长 0707-203516</p>`,
    "hsk.useLabel": "考试作用",
    "hsk.use1Title": "教学评估",
    "hsk.use1Text": "对自己目前的汉语学习水平进行了解，方便进一步学习和老师指导。",
    "hsk.use2Title": "留学与奖学金",
    "hsk.use2Text": "申请赴华学习和相关奖学金时，HSK 成绩通常是重要参考依据之一。",
    "hsk.use3Title": "求职就职",
    "hsk.use3Text": "在国内外政府部门和跨国企业中，HSK 可作为招聘、提薪和晋升的重要依据。",
    "hsk.relatedEyebrow": "相关动态",
    "hsk.relatedTitle": "近期考试相关信息",
    "hsk.related1Title": "2026 Stockholm HSK 考试通知",
    "hsk.related1Text": "考试时间、级别安排与报名入口已经发布，方便考生及时安排报名与备考。",
    "hsk.related2Title": "2026 春季考试圆满落幕",
    "hsk.related2Text": "学校完成春季考试组织工作，体现了作为北欧地区 HSK 考点的实际服务能力。",
    "hsk.related3Title": "Stockholm Center completed successfully",
    "hsk.related3Text": "学校持续为不同语言背景的学习者提供清晰的考试信息与服务支持。",
    "hsk.footerLabel": "HSK Test Center",
    "contact.eyebrow": "招生联系",
    "contact.heroTitle": "报名、课程咨询与考试联系入口",
    "contact.heroText": "这里集中展示家长最常用的报名、课程咨询与考试联系信息，方便快速查找学校地址、联系邮箱和近期重要通知。",
    "contact.card1Label": "学校地址",
    "contact.card1Text": "学校目前在斯德哥尔摩 Södra Latins Gymnasium 开展周末教学与相关活动。",
    "contact.card2Label": "报名咨询",
    "contact.card2Text": "近期开课安排和招生通知中已使用该邮箱作为报名联系入口，适合承接新生咨询。",
    "contact.card3Label": "HSK 联系",
    "contact.card3Text": "汉考相关问题可通过考试专用邮箱联系，便于把学校教学咨询与考试事务区分开。",
    "contact.introLabel": "近期招生信息",
    "contact.introTitle": "学校会按学期持续发布开班和报名通知",
    "contact.introBody": `<p>学校每学期都会发布课程安排、夏令营、基础班招生与文化班招生等信息，方便家长及时了解开课节奏和报名时间。</p><p>本页集中整理学校常用联系入口与近期重点信息，帮助家长更快完成咨询、报名和考试相关联系。</p>`,
    "contact.linksEyebrow": "近期入口",
    "contact.linksTitle": "近一年仍有参考价值的招生和学期信息",
    "contact.link1Title": "2026 秋课程安排",
    "contact.link1Text": "新学期课程通知入口，适合家长查看学期安排和课程节奏。",
    "contact.link2Title": "瑞青中文夏令营报名",
    "contact.link2Text": "学校暑期活动报名入口，便于家长查看时间安排、参与方式与活动说明。",
    "contact.link3Title": "2026 春季安排",
    "contact.link3Text": "保留春季课程与报名邮箱等关键信息，方便家长回看学期安排。",
    "contact.backendEyebrow": "常用信息",
    "contact.backendTitle": "家长最常查看的学校信息集中在这里。",
    "contact.backend1": "学校地址与校园上课地点",
    "contact.backend2": "报名与课程咨询邮箱",
    "contact.backend3": "HSK 考试联系入口",
    "contact.backend4": "近期学期安排与活动报名信息"
  },
  en: {
    "brand.school": "Ruiqing Chinese School Stockholm",
    "nav.about": "About",
    "nav.courses": "Courses",
    "nav.news": "News",
    "nav.students": "Student Work",
    "nav.hsk": "HSK Info",
    "nav.contact": "Admissions",
    "footer.school": "Ruiqing Chinese School Stockholm",
    "footer.address": "Södra Latins Gymnasium · Stockholm",
    "common.readMore": "Read more",
    "common.viewActivity": "View activity",
    "common.viewUpdate": "View update",
    "index.eyebrow": "Ruiqing Chinese School Stockholm",
    "index.heroTitle": "A weekend school in Sweden dedicated to Chinese language and culture.",
    "index.heroText": "Ruiqing Chinese School Stockholm is a non-profit weekend Chinese school under the Qingtian Association in Sweden. Located at Södra Latins Gymnasium, the school combines quality language teaching with dance, art and calligraphy.",
    "index.ctaAbout": "About the School",
    "index.ctaContact": "Admissions",
    "index.stat1": "Founded with the first 150 students",
    "index.stat2": "Stable enrollment of 350-400+ students",
    "index.stat3": "Professional Chinese and CSL teachers",
    "index.stat4": "HSK center relaunched in the Nordics",
    "index.addressLabel": "Campus",
    "index.grid1Title": "Course Path",
    "index.grid1Text": "Preschool, youth, adult and cultural classes",
    "index.grid2Title": "Faculty",
    "index.grid2Text": "30 professional Chinese language teachers",
    "index.grid3Title": "Cultural Life",
    "index.grid3Text": "Recitation, calligraphy, festivals, study trips and camp",
    "index.grid4Title": "HSK Center",
    "index.grid4Text": "HSK services for learners across the Nordics",
    "index.priorityEyebrow": "Key Sections",
    "index.priorityTitle": "Only the most important information stays on the homepage",
    "index.card1Label": "About",
    "index.card1Title": "School identity and history",
    "index.card1Text": "Learn the background, mission, history and faculty of the school.",
    "index.card1Cta": "Open page",
    "index.card2Label": "Courses",
    "index.card2Title": "Classes and learning path",
    "index.card2Text": "See preschool, grade-based, CSL and cultural course structure.",
    "index.card2Cta": "View courses",
    "index.card3Label": "Admissions",
    "index.card3Title": "Registration and contact",
    "index.card3Text": "Find admission email, location and recent enrollment notices.",
    "index.card3Cta": "Contact us",
    "index.card4Label": "HSK",
    "index.card4Title": "Exam information and center details",
    "index.card4Text": "See exam purpose, contact information and recent updates.",
    "index.card4Cta": "View HSK",
    "index.newsEyebrow": "Latest News",
    "index.newsTitle": "Latest News",
    "index.newsText": "The homepage shows only the most important recent updates. More items live in the news section.",
    "index.news1Title": "2026 Ambassador Award Outstanding Recitation Showcase and Ceremony",
    "index.news1Text": "This event continued the idea of bringing classroom learning to the stage, allowing overseas students to feel the beauty and depth of Chinese through recitation.",
    "index.news2Title": "Ruiqing 2026 Autumn Course Plan",
    "index.news2Text": "The autumn plan is now published, covering term rhythm, class structure and the information families care about most.",
    "index.news3Title": "Summer Camp Registration Is Open",
    "index.news3Text": "The school has opened summer registration with outdoor activities, Chinese games and a shared campfire evening.",
    "index.news4Title": "2026 Stockholm Spring HSK Successfully Concluded",
    "index.news4Text": "Candidates from several Nordic countries took part as the school continued to provide stable HSK center services.",
    "index.allNews": "View all news",
    "about.eyebrow": "About",
    "about.heroTitle": "This is Ruiqing Chinese School Stockholm.",
    "about.heroText": "We are a team deeply committed to overseas Chinese education and to sharing the richness of Chinese culture with sincerity and long-term dedication.",
    "about.introLabel": "School Profile",
    "about.introTitle": "A weekend Chinese school at Södra Latins Gymnasium",
    "about.introBody": `<p>Ruiqing Chinese School Stockholm is a non-profit weekend Chinese school under the Qingtian Association in Sweden. Every Saturday, students from different language and cultural backgrounds gather here to learn Chinese and experience Chinese culture through dance, art and calligraphy.</p><p>The school benefits from strong teaching facilities and a calm learning environment. Morning classrooms are filled with reading practice, while the music hall, dance studio and activity rooms stay active throughout the day.</p>`,
    "about.missionLabel": "Mission",
    "about.missionTitle": "A ten-year Chinese learning pathway",
    "about.missionText": "The school has built a long-term system designed for children growing up overseas, with interest in Chinese as the starting point and cultural inheritance as the core.",
    "about.facultyLabel": "Faculty",
    "about.facultyTitle": "30 professional teachers",
    "about.facultyText": "The school has 30 teachers in Chinese language and Chinese as a second language, combining training, experience and strong teaching commitment.",
    "about.programsLabel": "Programs",
    "about.programsTitle": "Preschool, youth and adult classes",
    "about.programsText": "Programs cover multiple age groups, with twice-per-semester evaluation of student progress and teaching quality to maintain continuity and standards.",
    "about.teamEyebrow": "Teaching Team",
    "about.teamTitle": "Faculty and school leadership",
    "about.teamText": "Ruiqing's teaching team has steadily refined overseas Chinese education, materials research, classroom method and cultural programming to form a stable academic ladder.",
    "about.teacher1Title": "Principal Wang Meishuang",
    "about.teacher1Text": "Leads the school's overall academic direction and operations, while advancing curriculum development, HSK center work and inter-school exchange.",
    "about.teacher2Title": "Vice Principal Liu Ruixia",
    "about.teacher2Text": "Supports teaching management and program development, especially classroom coordination, performances and upper-grade expression work.",
    "about.teacher3Title": "Vice Principal Chen Xi",
    "about.teacher3Text": "Works on teaching design and curriculum expansion, balancing classroom instruction with cultural programming and quality improvement.",
    "about.teacher4Title": "Lower Grade Team",
    "about.teacher4Text": "Teachers such as Jiang Ling, Wang Yiqing and Fu Jun have built mature approaches in early literacy, flashcards, reading aloud and bilingual classrooms.",
    "about.teacher5Title": "Middle and Upper Grade Team",
    "about.teacher5Text": "Teachers such as Jia Haiyan, Yang Jie, Yan Jia and Chen Yuehui use layered teaching around poetry, mythology, philosophy and science topics.",
    "about.teacher6Title": "Research and Exchange",
    "about.teacher6Text": "The faculty continuously improves classroom experience through observations, training, team building and exchange with peer schools.",
    "about.historyEyebrow": "History",
    "about.historyTitle": "School milestones",
    "about.history2008": "The school welcomed its first 150 students on opening day and gradually became an important platform for Chinese culture in Stockholm.",
    "about.history2011": "Received the title of Demonstration School for Chinese Education from the Overseas Chinese Affairs Office of the State Council of China.",
    "about.history2015": "Hosted the Chinese Education Master Teachers Tour training event in Stockholm, strengthening exchange and teacher development.",
    "about.history2016": "Introduced the Xīn Shuāngshuāng Chinese textbooks published by Peking University Press to address declining motivation among overseas Chinese learners.",
    "about.history2019": "Worked with Chinese Testing International to relaunch a standardized HSK center in the Nordic region from Stockholm.",
    "about.history2021": "After three semesters of online learning, the school resumed in-person teaching at the Södra Latin campus.",
    "courses.eyebrow": "Courses",
    "courses.heroTitle": "A structured Chinese curriculum supported by culture and activities.",
    "courses.heroText": "The school has developed a model centered on curriculum, supported by cultural learning and activities, balancing language growth, cultural understanding and long-term interest.",
    "courses.introLabel": "What Makes Ruiqing Special",
    "courses.introTitle": "A ten-year Chinese learning system",
    "courses.introBody": `<p>Since its founding in 2008, the school has continued to refine its overseas Chinese education pathway for students of different ages and language backgrounds, from preschool to youth, CSL and adult classes.</p><p>The goal is not short-term drilling, but long-term growth in literacy, reading, writing, expression and cultural understanding.</p>`,
    "courses.classLabel": "Class Structure",
    "courses.class1Title": "Preschool",
    "courses.class1Text": "Designed mainly for children aged 4-5, using songs, stories and early literacy to build listening, speaking and study habits.",
    "courses.class2Title": "Lower, Middle and Upper Grades",
    "courses.class2Text": "For children in Chinese and multilingual families, with emphasis on structured literacy, reading comprehension and classroom expression.",
    "courses.class3Title": "Youth / Adult / CSL Classes",
    "courses.class3Text": "Supports overseas youth, local Swedish learners and adults with content closer to practical communication and cultural understanding.",
    "courses.materialsEyebrow": "Materials and Teaching",
    "courses.materialsTitle": "Core textbooks and leveled learning paths",
    "courses.material1Title": "Preschool",
    "courses.material1Text": "Uses school-developed materials and early-learning content to build listening, speaking, literacy and classroom participation.",
    "courses.material2Title": "Grade 1 to Lower Secondary",
    "courses.material2Text": "Uses the Xīn Shuāngshuāng Chinese series together with age-based content such as idioms, geography and classical stories.",
    "courses.material3Title": "Chinese as a Second Language",
    "courses.material3Text": "Uses Happy Chinese and standard HSK materials for non-native learners progressing step by step.",
    "courses.cultureEyebrow": "Cultural Courses",
    "courses.cultureTitle": "Beyond language learning, the school also values aesthetics, expression and cultural experience.",
    "courses.culture1Title": "Calligraphy / Art / Dance",
    "courses.culture1Text": "Long-term arts classes help students connect with Chinese culture through creative practice.",
    "courses.culture2Title": "Martial Arts / Music Appreciation",
    "courses.culture2Text": "Diverse cultural courses build rhythm, physical awareness and a more dimensional understanding of culture.",
    "courses.culture3Title": "Parent Courses",
    "courses.culture3Text": "The school has also offered taiji and yoga for parents, making waiting time more participatory and community-oriented.",
    "courses.activityEyebrow": "Activities",
    "courses.activityTitle": "Outside class, students continue using Chinese through competitions, study trips, summer camp and cultural events.",
    "courses.activity1": "Recitation, handwriting and book-review contests keep expression training active",
    "courses.activity2": "Festivals, museum visits and cultural events extend learning into real contexts",
    "courses.activity3": "Summer camp and study trips strengthen the connection between language and culture",
    "courses.activity4": "Ongoing activities help students carry classroom learning into real communication and cultural experience",
    "news.eyebrow": "School News",
    "news.heroTitle": "Recent school events, course notices and campus updates",
    "news.heroText": "This page presents important news, course updates, school events and admissions-related information from the past year.",
    "news.item1Title": "2026 Ambassador Award Outstanding Recitation Showcase and Ceremony",
    "news.item1Text": "In late May, the school once again connected classroom learning with the stage, letting students show the beauty of Chinese through recitation while families witnessed their growth.",
    "news.item2Title": "A Peace Journey through Chinese: Finland Study Trip",
    "news.item2Text": "Students used Chinese to record history and discuss peace, turning the language into a tool for understanding the world beyond the classroom.",
    "news.item3Title": "Ruiqing 2026 Autumn Course Plan",
    "news.item3Text": "The autumn term schedule is now available so families can understand the pace and structure of the new semester.",
    "news.item4Title": "Summer Camp Registration Is Open",
    "news.item4Text": "The school's summer activities are now open for registration, with outdoor activities, Chinese games and a campfire evening.",
    "news.item5Title": "Chinese Proficiency Exam at Stockholm Center Completed Successfully",
    "news.item5Text": "The HSK exam in Stockholm welcomed candidates from different Nordic countries and learning backgrounds.",
    "news.item6Title": "2026 Stockholm Spring HSK Successfully Concluded",
    "news.item6Text": "Candidates from different countries and learning backgrounds gathered in Stockholm as the school completed the spring HSK administration smoothly.",
    "news.item7Title": "12th Ambassador Award School Recitation Contest",
    "news.item7Text": "The campus-wide recitation event extended the teaching path from classroom to stage and prepared the way for the final showcase and ceremony.",
    "news.item8Title": "2026 Spring Term Information",
    "news.item8Text": "The recent archive still keeps the spring term schedule and admissions contact information available for families to review.",
    "news.footerNote": "School news archive from the past year",
    "students.eyebrow": "Student Work",
    "students.heroTitle": "Student writing, competitions and activity highlights",
    "students.heroText": "This section brings together reading and writing outcomes as well as highlights from recitation, calligraphy and study trips.",
    "students.introLabel": "Student Work",
    "students.introTitle": "Reading and writing outcomes",
    "students.introText1": "The school consistently encourages students to deepen Chinese expression through reading and writing, building a stable archive of student work.",
    "students.introText2": "This section collects book reviews, writing exercises, competition entries and activity outcomes to show real growth in language learning.",
    "students.readingLabel": "Reading Work",
    "students.work1Title": "Review of The Hotel Mystery",
    "students.work1Text": "By Chen Ruiqi, age 11. Through reading and writing practice, students learn to express ideas and responses more fully.",
    "students.work2Title": "There Is a Small Shop by the Clouds",
    "students.work2Text": "Reading in Chinese strengthens comprehension, summarizing and expression while linking language study to emotional experience.",
    "students.work3Title": "Minecraft: The Legend of the Ghost",
    "students.work3Text": "Student work reflects stronger Chinese ability while also recording personal views of story, character and world-building.",
    "students.eventsEyebrow": "School Achievements",
    "students.eventsTitle": "Competitions and activities are also part of student growth",
    "students.event1Title": "12th Ambassador Award Recitation Contest",
    "students.event1Text": "The recitation contest brings classroom reading, stage expression and Chinese culture together.",
    "students.event2Title": "Handwriting and Calligraphy Contest",
    "students.event2Text": "Writing and calligraphy activities help students understand the structure and aesthetics of Chinese characters.",
    "students.event3Title": "Festival Days / Study Trips / Summer Camp",
    "students.event3Text": "School activities extend language learning into real-life settings and deepen participation and cultural experience.",
    "students.footerNote": "Student work and activity highlights",
    "students.footerSub": "Reading, writing and school activity section",
    "hsk.eyebrow": "HSK / Test Center",
    "hsk.heroTitle": "HSK Test Center Information",
    "hsk.heroText": "Ruiqing Chinese School provides HSK-related guidance, registration information and contact details for learners across the Nordic region.",
    "hsk.infoLabel": "Exam Overview",
    "hsk.infoTitle": "Ruiqing Chinese School / Södra Latins Gymnasium",
    "hsk.infoBody": `<p>Taking the HSK helps learners understand their current Chinese level. It can also support applications for study abroad and scholarships, and serve as proof of language ability in employment.</p><p>Registration: official website <a href="https://www.chinesetest.cn">www.chinesetest.cn</a></p><p>Contact: hsk@kinaskolan.se / Principal Wang Meishuang 0707-203516</p>`,
    "hsk.useLabel": "Why Take HSK",
    "hsk.use1Title": "Learning Assessment",
    "hsk.use1Text": "Students can better understand their current level and use the result for further study planning and teacher guidance.",
    "hsk.use2Title": "Study Abroad and Scholarships",
    "hsk.use2Text": "When applying for study opportunities in China and related scholarships, HSK results are often an important reference.",
    "hsk.use3Title": "Career Development",
    "hsk.use3Text": "In government offices and international companies, HSK can be used as evidence for recruitment, salary review and promotion.",
    "hsk.relatedEyebrow": "Related Updates",
    "hsk.relatedTitle": "Recent exam-related information",
    "hsk.related1Title": "2026 Stockholm HSK Notice",
    "hsk.related1Text": "Exam dates, level arrangements and registration links have already been published so candidates can plan registration and preparation in time.",
    "hsk.related2Title": "2026 Spring Exam Successfully Completed",
    "hsk.related2Text": "The school completed the spring exam administration smoothly, showing its real service capacity as an HSK center in the Nordic region.",
    "hsk.related3Title": "Stockholm Center Completed Successfully",
    "hsk.related3Text": "The school continues to provide clear exam information and support for learners from different language backgrounds.",
    "hsk.footerLabel": "HSK Test Center",
    "contact.eyebrow": "Admissions",
    "contact.heroTitle": "Registration, course inquiries and exam contact",
    "contact.heroText": "This page gathers the contact details families use most often, making it easy to find the school address, email contacts and important recent notices.",
    "contact.card1Label": "School Address",
    "contact.card1Text": "The school currently runs weekend teaching and related activities at Södra Latins Gymnasium in Stockholm.",
    "contact.card2Label": "Admissions Contact",
    "contact.card2Text": "Recent course notices and enrollment updates already use this email as the contact point for new families.",
    "contact.card3Label": "HSK Contact",
    "contact.card3Text": "Questions related to HSK can be handled via the dedicated exam email, separate from general school inquiries.",
    "contact.introLabel": "Recent Admissions Information",
    "contact.introTitle": "The school publishes enrollment and term notices every semester",
    "contact.introBody": `<p>Each term, the school publishes course plans, summer camp information, beginner admissions and cultural class enrollment details so families can keep track of schedules and registration dates.</p><p>This page brings together the most useful contact points and recent notices so families can complete inquiries, registration and exam-related communication more easily.</p>`,
    "contact.linksEyebrow": "Useful Recent Links",
    "contact.linksTitle": "Admissions and term information still worth reviewing",
    "contact.link1Title": "2026 Autumn Course Plan",
    "contact.link1Text": "A practical entry for parents who want to see the semester structure and course rhythm.",
    "contact.link2Title": "Summer Camp Registration",
    "contact.link2Text": "The summer activity registration entry helps families review the schedule, participation options and activity details.",
    "contact.link3Title": "2026 Spring Term Information",
    "contact.link3Text": "Spring course details and admissions contact information remain available here for families who want to review the term plan.",
    "contact.backendEyebrow": "Useful Information",
    "contact.backendTitle": "The school information families check most often is gathered here.",
    "contact.backend1": "School address and campus location",
    "contact.backend2": "Admissions and course inquiry email",
    "contact.backend3": "HSK exam contact entry",
    "contact.backend4": "Recent term updates and activity registration information"
  },
  sv: {
    "brand.school": "Ruiqing kinesiska skola i Stockholm",
    "nav.about": "Om skolan",
    "nav.courses": "Kurser",
    "nav.news": "Nyheter",
    "nav.students": "Elevverk",
    "nav.hsk": "HSK-info",
    "nav.contact": "Antagning",
    "footer.school": "Ruiqing kinesiska skola i Stockholm",
    "footer.address": "Södra Latins Gymnasium · Stockholm",
    "common.readMore": "Läs mer",
    "common.viewActivity": "Visa aktivitet",
    "common.viewUpdate": "Visa uppdatering",
    "index.eyebrow": "Ruiqing kinesiska skola i Stockholm",
    "index.heroTitle": "En helgskola i Sverige för kinesiska språket och kulturen.",
    "index.heroText": "Ruiqing kinesiska skola i Stockholm är en ideell helgskola under Qingtianföreningen i Sverige. Skolan ligger på Södra Latins Gymnasium och kombinerar språkundervisning med dans, konst och kalligrafi.",
    "index.ctaAbout": "Om skolan",
    "index.ctaContact": "Antagning",
    "index.stat1": "Grundad med de första 150 eleverna",
    "index.stat2": "Stabil elevgrupp på 350-400+ elever",
    "index.stat3": "Professionella lärare i kinesiska och kinesiska som främmande språk",
    "index.stat4": "HSK-center återöppnat i Norden",
    "index.addressLabel": "Adress",
    "index.grid1Title": "Kursupplägg",
    "index.grid1Text": "Förskola, ungdomsgrupper, vuxengrupper och kulturklasser",
    "index.grid2Title": "Lärarlag",
    "index.grid2Text": "30 professionella kinesisklärare",
    "index.grid3Title": "Kulturliv",
    "index.grid3Text": "Recitation, kalligrafi, festivaler, studieresor och sommarläger",
    "index.grid4Title": "HSK-center",
    "index.grid4Text": "HSK-service för elever i hela Norden",
    "index.priorityEyebrow": "Viktiga ingångar",
    "index.priorityTitle": "Startsidan visar bara det viktigaste för familjerna",
    "index.card1Label": "Om skolan",
    "index.card1Title": "Skolans identitet och historia",
    "index.card1Text": "Lär känna skolans bakgrund, vision, historia och lärarlag.",
    "index.card1Cta": "Öppna sidan",
    "index.card2Label": "Kurser",
    "index.card2Title": "Klasser och studieväg",
    "index.card2Text": "Se struktur för förskola, årskurser, kinesiska som främmande språk och kulturkurser.",
    "index.card2Cta": "Se kurser",
    "index.card3Label": "Antagning",
    "index.card3Title": "Anmälan och kontakt",
    "index.card3Text": "Hitta anmälningsadress, plats och aktuell information om antagning.",
    "index.card3Cta": "Kontakta oss",
    "index.card4Label": "HSK",
    "index.card4Title": "Provinfo och centerinformation",
    "index.card4Text": "Se provets syfte, kontaktuppgifter och senaste uppdateringar.",
    "index.card4Cta": "Se HSK",
    "index.newsEyebrow": "Senaste nyheter",
    "index.newsTitle": "Senaste nyheter",
    "index.newsText": "Startsidan visar bara de viktigaste aktuella nyheterna. Fler inlägg finns på nyhetssidan.",
    "index.news1Title": "Ambassadorpriset 2026: scenframträdande och prisceremoni",
    "index.news1Text": "Evenemanget fortsatte idén att föra klassrummets lärande till scenen och lät utlandselever uppleva kinesiskans skönhet och djup genom recitation.",
    "index.news2Title": "Ruiqing höstplan 2026",
    "index.news2Text": "Höstplanen är nu publicerad med terminens rytm, klassupplägg och den information familjerna bryr sig mest om.",
    "index.news3Title": "Anmälan till sommarläger är öppen",
    "index.news3Text": "Skolan har öppnat anmälan till sommaraktiviteter med utomhusprogram, kinesiska spel och gemensam lägereldskväll.",
    "index.news4Title": "Vårens HSK 2026 i Stockholm genomfördes framgångsrikt",
    "index.news4Text": "Deltagare från flera nordiska länder deltog när skolan fortsatte att erbjuda stabil service som HSK-center.",
    "index.allNews": "Se alla nyheter",
    "about.eyebrow": "Om skolan",
    "about.heroTitle": "Det här är Ruiqing kinesiska skola i Stockholm.",
    "about.heroText": "Vi är ett team som med engagemang arbetar för kinesisk utbildning utomlands och för att sprida den kinesiska kulturens djup och rikedom.",
    "about.introLabel": "Skolpresentation",
    "about.introTitle": "En kinesisk helgskola på Södra Latins Gymnasium",
    "about.introBody": `<p>Ruiqing kinesiska skola i Stockholm är en ideell kinesisk helgskola under Qingtianföreningen i Sverige. Varje lördag samlas elever med olika språk- och kulturbakgrunder här för att lära sig kinesiska och möta kinesisk kultur genom dans, konst och kalligrafi.</p><p>Skolan har goda undervisningslokaler och en lugn studiemiljö. På morgonen hörs högläsning i klassrummen, och under eftermiddagen används musiksal, danssal och aktivitetsrum flitigt.</p>`,
    "about.missionLabel": "Pedagogisk idé",
    "about.missionTitle": "Ett tioårigt system för kinesisk undervisning",
    "about.missionText": "Skolan har byggt ett långsiktigt system för barn som växer upp utomlands, där intresse för kinesiska är startpunkten och kulturellt arv är kärnan.",
    "about.facultyLabel": "Lärarlag",
    "about.facultyTitle": "30 professionella lärare",
    "about.facultyText": "Skolan har 30 lärare i kinesiska och kinesiska som andraspråk, med både utbildning, erfarenhet och starkt engagemang.",
    "about.programsLabel": "Program",
    "about.programsTitle": "Förskola, ungdoms- och vuxengrupper",
    "about.programsText": "Programmen täcker flera åldersgrupper och följs upp två gånger per termin för att säkra kontinuitet och undervisningskvalitet.",
    "about.teamEyebrow": "Lärarteam",
    "about.teamTitle": "Lärare och skolledning",
    "about.teamText": "Ruiqings lärarlag har under lång tid förfinat undervisning för kinesiska utomlands, läromedel, klassrumsmetoder och kulturprogram till en stabil akademisk struktur.",
    "about.teacher1Title": "Rektor Wang Meishuang",
    "about.teacher1Text": "Ansvarar för skolans övergripande pedagogiska riktning och verksamhet samt utveckling av kursstruktur, HSK-center och skolutbyte.",
    "about.teacher2Title": "Biträdande rektor Liu Ruixia",
    "about.teacher2Text": "Arbetar med undervisningsledning och kursutveckling, särskilt samordning av klassrum, scenframträdanden och högre årskurser.",
    "about.teacher3Title": "Biträdande rektor Chen Xi",
    "about.teacher3Text": "Arbetar med undervisningsdesign och kursutbyggnad och kombinerar klassrumsundervisning med kulturinnehåll och kvalitetsutveckling.",
    "about.teacher4Title": "Lärare i lägre årskurser",
    "about.teacher4Text": "Lärare som Jiang Ling, Wang Yiqing och Fu Jun har utvecklat mogna arbetssätt inom tidig läs- och skrivinlärning, bildkort, högläsning och tvåspråkiga klassrum.",
    "about.teacher5Title": "Lärare i mellan- och högre årskurser",
    "about.teacher5Text": "Lärare som Jia Haiyan, Yang Jie, Yan Jia och Chen Yuehui arbetar nivåanpassat med teman som poesi, mytologi, filosofi och naturvetenskap.",
    "about.teacher6Title": "Didaktik och utbyte",
    "about.teacher6Text": "Lärarlaget förbättrar kontinuerligt undervisningen genom lektionsobservationer, fortbildning, teamarbete och utbyte med andra skolor.",
    "about.historyEyebrow": "Historia",
    "about.historyTitle": "Skolans utveckling",
    "about.history2008": "Skolan tog emot sina första 150 elever på öppningsdagen och växte sedan till en viktig plattform för kinesisk kultur i Stockholm.",
    "about.history2011": "Fick utmärkelsen demonstrationsskola för kinesisk utbildning från Kinas statliga kontor för utlandskinesiska frågor.",
    "about.history2015": "Var värd för lärarfortbildning i Stockholm inom Chinese Education Master Teachers Tour och stärkte därmed utbyte och lärarutveckling.",
    "about.history2016": "Införde Xīn Shuāngshuāng-läromedlen från Peking University Press för att möta minskad motivation hos utlandskinesiska elever.",
    "about.history2019": "Samarbetade med Chinese Testing International för att återstarta ett standardiserat HSK-center i Norden med bas i Stockholm.",
    "about.history2021": "Efter tre terminer med nätundervisning återupptogs fysisk undervisning på Södra Latin.",
    "courses.eyebrow": "Kurser",
    "courses.heroTitle": "En strukturerad kinesisk utbildning med kultur och aktiviteter som stöd.",
    "courses.heroText": "Skolan har utvecklat en modell där kurssystemet står i centrum och kompletteras av kulturinnehåll och aktiviteter för att stödja språk, kulturförståelse och långsiktigt intresse.",
    "courses.introLabel": "Det som utmärker Ruiqing",
    "courses.introTitle": "Ett tioårigt system för kinesiskt lärande",
    "courses.introBody": `<p>Sedan starten 2008 har skolan fortsatt att utveckla sin undervisningsväg för kinesiska utomlands för elever i olika åldrar och med olika språkbakgrunder, från förskola till ungdoms-, andraspråks- och vuxengrupper.</p><p>Målet är inte kortsiktig drill, utan långsiktig utveckling inom läsning, skrivande, uttryck och kulturförståelse.</p>`,
    "courses.classLabel": "Klassupplägg",
    "courses.class1Title": "Förskola",
    "courses.class1Text": "Riktar sig främst till barn i åldern 4-5 år och använder sånger, berättelser och tidig läsinlärning för att bygga lyssnande, tal och studievana.",
    "courses.class2Title": "Lägre, mellan- och högre årskurser",
    "courses.class2Text": "För barn i kinesiska och flerspråkiga familjer, med fokus på strukturerad läsinlärning, läsförståelse och muntligt uttryck.",
    "courses.class3Title": "Ungdoms- / vuxen- / andraspråksklasser",
    "courses.class3Text": "Stödjer ungdomar uppvuxna utomlands, lokala svenska elever och vuxna med innehåll närmare vardagskommunikation och kulturförståelse.",
    "courses.materialsEyebrow": "Läromedel och undervisning",
    "courses.materialsTitle": "Huvudläromedel och nivåanpassade vägar",
    "courses.material1Title": "Förskola",
    "courses.material1Text": "Använder skolutvecklat material och tidigt lärande för att bygga hörförståelse, tal, läskunnighet och klassrumsdeltagande.",
    "courses.material2Title": "Årskurs 1 till högstadiet",
    "courses.material2Text": "Använder serien Xīn Shuāngshuāng tillsammans med åldersanpassat innehåll som idiom, geografi och klassiska berättelser.",
    "courses.material3Title": "Kinesiska som andraspråk",
    "courses.material3Text": "Använder Happy Chinese och standardiserat HSK-material för stegvis progression för icke-modersmålstalare.",
    "courses.cultureEyebrow": "Kulturkurser",
    "courses.cultureTitle": "Utöver språkundervisning värdesätter skolan också estetik, uttryck och kulturell upplevelse.",
    "courses.culture1Title": "Kalligrafi / Konst / Dans",
    "courses.culture1Text": "Långsiktiga estetiska kurser hjälper eleverna att möta kinesisk kultur genom skapande arbete.",
    "courses.culture2Title": "Kampsport / Musikuppskattning",
    "courses.culture2Text": "Mångsidiga kulturkurser utvecklar rytm, kroppskännedom och en mer mångdimensionell kulturförståelse.",
    "courses.culture3Title": "Föräldrakurser",
    "courses.culture3Text": "Skolan har även erbjudit taiji och yoga för föräldrar, vilket gör väntetiden mer deltagande och gemenskapsbyggande.",
    "courses.activityEyebrow": "Aktiviteter",
    "courses.activityTitle": "Utanför klassrummet fortsätter eleverna att använda kinesiska genom tävlingar, studieresor, sommarläger och kulturevenemang.",
    "courses.activity1": "Recitation, handskrift och bokrecensioner håller uttrycksträningen levande",
    "courses.activity2": "Festivaler, museibesök och kulturevenemang förlänger lärandet till verkliga sammanhang",
    "courses.activity3": "Sommarläger och studieresor stärker kopplingen mellan språk och kultur",
    "courses.activity4": "Genom återkommande aktiviteter får eleverna bära med sig klassrummets lärande in i verklig kommunikation och kulturupplevelse",
    "news.eyebrow": "Skolnyheter",
    "news.heroTitle": "Senaste skolaktiviteter, kursmeddelanden och campusnyheter",
    "news.heroText": "Här visas viktiga nyheter, kursinformation, skolaktiviteter och antagningsrelaterad information från det senaste året.",
    "news.item1Title": "Ambassadorpriset 2026: scenframträdande och prisceremoni",
    "news.item1Text": "I slutet av maj knöt skolan åter samman klassrumsundervisning och scenframträdande, så att eleverna kunde visa kinesiskans skönhet genom recitation.",
    "news.item2Title": "En fredsresa genom kinesiska: studieresa till Finland",
    "news.item2Text": "Eleverna använde kinesiska för att dokumentera historia och diskutera fred, så att språket blev ett verktyg för att förstå världen utanför klassrummet.",
    "news.item3Title": "Ruiqing 2026 höstterminsplan",
    "news.item3Text": "Höstterminens plan är nu publicerad så att familjer kan se upplägg och rytm för den nya terminen.",
    "news.item4Title": "Anmälan till sommarläger är öppen",
    "news.item4Text": "Skolans sommaraktiviteter är nu öppna för anmälan med utomhusaktiviteter, kinesiska spel och lägereldskväll.",
    "news.item5Title": "Chinese Proficiency Exam at Stockholm Center Completed Successfully",
    "news.item5Text": "HSK-provet i Stockholm tog emot deltagare från olika nordiska länder och språkbakgrunder.",
    "news.item6Title": "Vårens HSK 2026 i Stockholm genomfördes framgångsrikt",
    "news.item6Text": "Deltagare från olika länder och lärandebakgrunder samlades i Stockholm när skolan genomförde vårens HSK smidigt.",
    "news.item7Title": "12:e Ambassadorpriset: skolans recitationstävling",
    "news.item7Text": "Recitationstävlingen förlängde vägen från klassrum till scen och byggde upp inför den slutliga prisceremonin.",
    "news.item8Title": "Information om vårterminen 2026",
    "news.item8Text": "Det senaste arkivet behåller fortfarande vårterminens schema och kontaktuppgifter för familjer som vill gå tillbaka och se informationen.",
    "news.footerNote": "Skolans nyhetsarkiv från det senaste året",
    "students.eyebrow": "Elevverk",
    "students.heroTitle": "Elevtexter, tävlingar och höjdpunkter från aktiviteter",
    "students.heroText": "Här samlas elevers läs- och skrivresultat samt höjdpunkter från recitation, kalligrafi och studieresor.",
    "students.introLabel": "Elevverk",
    "students.introTitle": "Läs- och skrivresultat",
    "students.introText1": "Skolan uppmuntrar kontinuerligt eleverna att fördjupa sitt kinesiska uttryck genom läsning och skrivning och har byggt upp ett stabilt arkiv av elevverk.",
    "students.introText2": "Här samlas bokrecensioner, skrivövningar, tävlingsbidrag och aktivitetsresultat för att visa verklig utveckling i språkinlärningen.",
    "students.readingLabel": "Läsverk",
    "students.work1Title": "Recension av Hotellmysteriet",
    "students.work1Text": "Av Chen Ruiqi, 11 år. Genom läs- och skrivträning lär sig eleverna att uttrycka idéer och upplevelser mer fullständigt.",
    "students.work2Title": "Det finns en liten butik vid molnen",
    "students.work2Text": "Läsning på kinesiska stärker förståelse, sammanfattning och uttryck, samtidigt som språket kopplas till känslomässig erfarenhet.",
    "students.work3Title": "Minecraft: Spökets legend",
    "students.work3Text": "Elevverk visar både starkare kinesiska färdigheter och personliga tolkningar av berättelser, gestalter och världar.",
    "students.eventsEyebrow": "Skolresultat",
    "students.eventsTitle": "Tävlingar och aktiviteter är också en del av elevens utveckling",
    "students.event1Title": "12:e Ambassadorpriset i recitation",
    "students.event1Text": "Recitationstävlingen för samman högläsning i klassrummet, scenuttryck och kinesisk kultur.",
    "students.event2Title": "Skriv- och kalligrafitävling",
    "students.event2Text": "Skriv- och kalligrafiaktiviteter hjälper elever att förstå kinesiska teckens struktur och estetik.",
    "students.event3Title": "Festdagar / studieresor / sommarläger",
    "students.event3Text": "Skolaktiviteter förlänger språkinlärningen till verkliga miljöer och fördjupar deltagande och kulturupplevelse.",
    "students.footerNote": "Elevverk och aktivitetsresultat",
    "students.footerSub": "Läsning, skrivande och skolaktiviteter",
    "hsk.eyebrow": "HSK / Testcenter",
    "hsk.heroTitle": "Information om HSK testcenter",
    "hsk.heroText": "Ruiqing kinesiska skola erbjuder information om HSK, anmälan och kontakt för elever i Norden.",
    "hsk.infoLabel": "Provöversikt",
    "hsk.infoTitle": "Ruiqing kinesiska skola / Södra Latins Gymnasium",
    "hsk.infoBody": `<p>Att göra HSK hjälper elever att förstå sin nuvarande nivå i kinesiska. Det kan också användas vid ansökningar till studier och stipendier samt som bevis på språkkunskaper i arbetslivet.</p><p>Anmälan: officiell webbplats <a href="https://www.chinesetest.cn">www.chinesetest.cn</a></p><p>Kontakt: hsk@kinaskolan.se / rektor Wang Meishuang 0707-203516</p>`,
    "hsk.useLabel": "Varför ta HSK",
    "hsk.use1Title": "Kunskapsbedömning",
    "hsk.use1Text": "Elever får bättre förståelse för sin nuvarande nivå och kan använda resultatet för fortsatt planering och lärarstöd.",
    "hsk.use2Title": "Studier och stipendier",
    "hsk.use2Text": "Vid ansökan till studier i Kina och relaterade stipendier är HSK-resultat ofta ett viktigt underlag.",
    "hsk.use3Title": "Karriärutveckling",
    "hsk.use3Text": "Inom myndigheter och internationella företag kan HSK användas som underlag vid rekrytering, löneöversyn och befordran.",
    "hsk.relatedEyebrow": "Relaterade uppdateringar",
    "hsk.relatedTitle": "Senaste provrelaterade information",
    "hsk.related1Title": "HSK-notis Stockholm 2026",
    "hsk.related1Text": "Provdatum, nivåer och anmälningslänkar är redan publicerade så att deltagare kan planera anmälan och förberedelser i tid.",
    "hsk.related2Title": "Vårprovet 2026 genomfördes framgångsrikt",
    "hsk.related2Text": "Skolan genomförde vårens prov smidigt och visade sin faktiska servicekapacitet som HSK-center i Norden.",
    "hsk.related3Title": "Stockholm Center Completed Successfully",
    "hsk.related3Text": "Skolan fortsätter att erbjuda tydlig provinformation och stöd för elever med olika språkbakgrunder.",
    "hsk.footerLabel": "HSK Testcenter",
    "contact.eyebrow": "Antagning",
    "contact.heroTitle": "Anmälan, kursfrågor och kontakt för prov",
    "contact.heroText": "Den här sidan samlar den kontaktinformation familjer oftast använder, så att det blir enkelt att hitta skoladress, e-postadresser och viktiga aktuella notiser.",
    "contact.card1Label": "Skoladress",
    "contact.card1Text": "Skolan bedriver för närvarande helgundervisning och relaterade aktiviteter på Södra Latins Gymnasium i Stockholm.",
    "contact.card2Label": "Antagningskontakt",
    "contact.card2Text": "De senaste kursnotiserna och antagningsuppdateringarna använder redan denna e-post som kontaktpunkt för nya familjer.",
    "contact.card3Label": "HSK-kontakt",
    "contact.card3Text": "Frågor om HSK kan hanteras via den särskilda examenseposten, separat från allmänna skolfrågor.",
    "contact.introLabel": "Senaste antagningsinformation",
    "contact.introTitle": "Skolan publicerar antagnings- och terminsinformation varje termin",
    "contact.introBody": `<p>Varje termin publicerar skolan kursplaner, sommarlägerinformation, nybörjarantagning och kulturklassinformation så att familjer kan följa schema och anmälningsdatum.</p><p>Den här sidan samlar de viktigaste kontaktvägarna och aktuella notiserna så att familjer lättare kan hantera frågor, anmälan och provrelaterad kommunikation.</p>`,
    "contact.linksEyebrow": "Nyliga ingångar",
    "contact.linksTitle": "Antagnings- och terminsinformation som fortfarande är relevant",
    "contact.link1Title": "Höstplan 2026",
    "contact.link1Text": "En praktisk ingång för föräldrar som vill se terminens struktur och rytm.",
    "contact.link2Title": "Anmälan till sommarläger",
    "contact.link2Text": "Anmälan till sommaraktiviteter hjälper familjer att se tidsplan, deltagaralternativ och aktivitetsdetaljer.",
    "contact.link3Title": "Information om vårterminen 2026",
    "contact.link3Text": "Vårterminens kursinformation och antagningskontakt finns kvar här för familjer som vill gå tillbaka till terminsplanen.",
    "contact.backendEyebrow": "Vanlig information",
    "contact.backendTitle": "Den skolinformation som familjer oftast söker finns samlad här.",
    "contact.backend1": "Skoladress och campusplats",
    "contact.backend2": "E-post för antagning och kursfrågor",
    "contact.backend3": "Kontaktväg för HSK-prov",
    "contact.backend4": "Senaste terminsuppdateringar och aktivitetsanmälan"
  }
};

let currentLang = "zh";
let newsItemsPromise;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function localizeValue(value, lang) {
  if (value && typeof value === "object") {
    return value[lang] || value.zh || value.sv || value.en || "";
  }
  return value || "";
}

function loadNewsItems() {
  if (!newsItemsPromise) {
    newsItemsPromise = fetch("data/news.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load news feed: ${response.status}`);
        }
        return response.json();
      })
      .then((items) =>
        items
          .filter((item) => item.visible !== false)
          .sort((left, right) => right.date.localeCompare(left.date))
      )
      .catch((error) => {
        newsItemsPromise = null;
        throw error;
      });
  }

  return newsItemsPromise;
}

function renderHomeNews(lang, items) {
  const root = document.getElementById("home-news-root");
  if (!root) {
    return;
  }

  const homeItems = items.filter((item) => item.showOnHome).slice(0, 4);
  if (!homeItems.length) {
    root.innerHTML = "";
    return;
  }

  const [featured, ...rest] = homeItems;
  const readMore = translations[lang]?.["common.readMore"] || translations.zh["common.readMore"];

  root.innerHTML = `
    <article class="news-card news-card-featured">
      <img src="${escapeHtml(featured.image)}" alt="${escapeHtml(localizeValue(featured.title, lang))}" />
      <div class="news-card-copy">
        <span>${escapeHtml(featured.date)}</span>
        <h3>${escapeHtml(localizeValue(featured.title, lang))}</h3>
        <p>${escapeHtml(localizeValue(featured.summary, lang))}</p>
        <a href="${escapeHtml(featured.path)}">${escapeHtml(readMore)}</a>
      </div>
    </article>
    <div class="home-news-list">
      ${rest
        .map(
          (item) => `
            <article class="news-brief">
              <span>${escapeHtml(item.date)}</span>
              <h3>${escapeHtml(localizeValue(item.title, lang))}</h3>
              <p>${escapeHtml(localizeValue(item.summary, lang))}</p>
              <a href="${escapeHtml(item.path)}">${escapeHtml(readMore)}</a>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderNewsList(lang, items) {
  const root = document.getElementById("news-list-root");
  if (!root) {
    return;
  }

  const readMore = translations[lang]?.["common.readMore"] || translations.zh["common.readMore"];
  const [leadOne, leadTwo, ...rest] = items;

  root.innerHTML = `
    ${
      leadOne
        ? `
      <article class="news-row">
        <img src="${escapeHtml(leadOne.image)}" alt="${escapeHtml(localizeValue(leadOne.title, lang))}" />
        <div class="news-row-copy">
          <span>${escapeHtml(leadOne.date)}</span>
          <h2>${escapeHtml(localizeValue(leadOne.title, lang))}</h2>
          <p>${escapeHtml(localizeValue(leadOne.summary, lang))}</p>
          <a href="${escapeHtml(leadOne.path)}">${escapeHtml(readMore)}</a>
        </div>
      </article>
    `
        : ""
    }
    ${
      leadTwo
        ? `
      <article class="news-row">
        <img src="${escapeHtml(leadTwo.image)}" alt="${escapeHtml(localizeValue(leadTwo.title, lang))}" />
        <div class="news-row-copy">
          <span>${escapeHtml(leadTwo.date)}</span>
          <h2>${escapeHtml(localizeValue(leadTwo.title, lang))}</h2>
          <p>${escapeHtml(localizeValue(leadTwo.summary, lang))}</p>
          <a href="${escapeHtml(leadTwo.path)}">${escapeHtml(readMore)}</a>
        </div>
      </article>
    `
        : ""
    }
    <div class="stack-grid">
      ${rest
        .map(
          (item) => `
            <article class="panel-card">
              <span>${escapeHtml(item.date)}</span>
              <h2>${escapeHtml(localizeValue(item.title, lang))}</h2>
              <p>${escapeHtml(localizeValue(item.summary, lang))}</p>
              <a href="${escapeHtml(item.path)}">${escapeHtml(readMore)}</a>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderDynamicContent(lang) {
  loadNewsItems()
    .then((items) => {
      renderHomeNews(lang, items);
      renderNewsList(lang, items);
    })
    .catch(() => {
      const homeRoot = document.getElementById("home-news-root");
      const listRoot = document.getElementById("news-list-root");

      if (homeRoot) {
        homeRoot.innerHTML = "";
      }
      if (listRoot) {
        listRoot.innerHTML = "";
      }
    });
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations.zh;
  currentLang = lang;
  document.documentElement.lang = lang === "sv" ? "sv" : lang === "en" ? "en" : "zh-Hans";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      node.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.dataset.i18nHtml;
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      node.innerHTML = dict[key];
    }
  });

  langOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  renderDynamicContent(lang);
}

const params = new URLSearchParams(window.location.search);
const initialLang = params.get("lang") || localStorage.getItem("kinaskolan-lang") || "zh";

if (langOptions.length) {
  applyTranslations(initialLang);
  langOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLang = button.dataset.lang;
      localStorage.setItem("kinaskolan-lang", nextLang);
      params.set("lang", nextLang);
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
      applyTranslations(nextLang);
    });
  });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
