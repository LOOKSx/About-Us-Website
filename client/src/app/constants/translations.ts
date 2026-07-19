export type Language = 'TH' | 'EN';

export interface TranslationDictionary {
  navAbout: string;
  navSkills: string;
  navProjects: string;
  navJourney: string;
  navServices: string;
  navFaq: string;
  navContact: string;
  apiOnline: string;
  apiOffline: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroViewProjects: string;
  heroGetInTouch: string;
  statsTitle: string;
  skillsBadge: string;
  skillsTitle: string;
  skillsSub: string;
  projectsBadge: string;
  projectsTitle: string;
  projectsSub: string;
  tabAll: string;
  tabFullstack: string;
  tabBackend: string;
  tabFrontend: string;
  tabAI: string;
  viewProjectDetail: string;
  modalProjectInfo: string;
  modalGithubLink: string;
  modalDemoLink: string;
  valuesBadge: string;
  valuesTitle: string;
  visionTitle: string;
  missionTitle: string;
  servicesBadge: string;
  servicesTitle: string;
  servicesSub: string;
  journeyBadge: string;
  journeyTitle: string;
  journeySub: string;
  testimonialsBadge: string;
  testimonialsTitle: string;
  faqBadge: string;
  faqTitle: string;
  contactBadge: string;
  contactTitle: string;
  contactSub: string;
  labelName: string;
  labelEmail: string;
  labelSubject: string;
  labelMessage: string;
  phName: string;
  phEmail: string;
  phSubject: string;
  phMessage: string;
  btnSend: string;
  btnSending: string;
  footerSub: string;
  footerRights: string;
}

export const DICTIONARY: Record<Language, TranslationDictionary> = {
  TH: {
    navAbout: 'เกี่ยวกับผม',
    navSkills: 'ทักษะ & ความเชี่ยวชาญ',
    navProjects: 'ผลงาน & ความสำเร็จ',
    navJourney: 'เส้นทางของผม',
    navServices: 'สิ่งที่ผมรับทำ',
    navFaq: 'คำถามที่พบบ่อย',
    navContact: 'ติดต่องาน / ทักทาย',
    apiOnline: 'Go Backend ออนไลน์',
    apiOffline: 'Go Backend ออฟไลน์',
    heroBadge: '👑 เว็บไซต์ส่วนตัว & คลังรวมผลงาน',
    heroTitle1: 'ยินดีต้อนรับสู่เว็บของผม',
    heroTitle2: 'สร้างสรรค์ด้วย Angular & Golang',
    heroViewProjects: 'ดูผลงาน & ความสำเร็จ ➔',
    heroGetInTouch: 'ติดต่อ / พูดคุย',
    statsTitle: 'ความสำเร็จและผลงานย่อ',
    skillsBadge: 'ทักษะความเชี่ยวชาญ',
    skillsTitle: 'เทคโนโลยีและความสามารถหลัก',
    skillsSub: 'ระดับความเชี่ยวชาญในภาษาเขียนโปรแกรม เครื่องมือ และสถาปัตยกรรมระบบ',
    projectsBadge: 'ผลงานเด่น',
    projectsTitle: 'คลังรวมผลงานและความสำเร็จ (My Projects)',
    projectsSub: 'รวบรวมโปรเจกต์ ใบรับรอง และผลงานที่ผมได้พัฒนาขึ้น',
    tabAll: 'ผลงานทั้งหมด',
    tabFullstack: 'Full-Stack',
    tabBackend: 'Backend (Go)',
    tabFrontend: 'Frontend (Angular)',
    tabAI: 'AI & Tools',
    viewProjectDetail: 'ดูรายละเอียดโปรเจกต์ ➔',
    modalProjectInfo: 'ข้อมูลโปรเจกต์',
    modalGithubLink: 'ดู Source Code บน GitHub ↗',
    modalDemoLink: 'ทดลองใช้งานระบบ ↗',
    valuesBadge: 'ปรัชญาการทำงาน',
    valuesTitle: 'หลักการและความมุ่งมั่นของผม',
    visionTitle: 'วิสัยทัศน์ของผม',
    missionTitle: 'เป้าหมายของผม',
    servicesBadge: 'บริการของผม',
    servicesTitle: 'สิ่งที่ผมสามารถช่วยพัฒนาได้',
    servicesSub: 'รับพัฒนาเว็บแอปพลิเคชัน ออกแบบ REST API และที่ปรึกษาระบบ',
    journeyBadge: 'เส้นทางชีวิต',
    journeyTitle: 'หมุดหมายสำคัญและการเติบโต',
    journeySub: 'เส้นทางการเรียนรู้และผลงานในแต่ละช่วงเวลา',
    testimonialsBadge: 'การยอมรับ',
    testimonialsTitle: 'ความคิดเห็นจากผู้ร่วมงานและลูกค้า',
    faqBadge: 'คำถามน่ารู้',
    faqTitle: 'คำถามที่พบบ่อยเกี่ยวกับเว็บไซต์นี้ (FAQ)',
    contactBadge: 'ติดต่อผม',
    contactTitle: 'ส่งข้อความถึงผมโดยตรง (Direct Message)',
    contactSub: 'ข้อความจะถูกส่งตรงเข้าสู่ระบบ Golang Backend API endpoint /api/v1/contact',
    labelName: 'ชื่อของคุณ *',
    labelEmail: 'อีเมลของคุณ *',
    labelSubject: 'หัวข้อข้อความ',
    labelMessage: 'รายละเอียดข้อความ *',
    phName: 'เช่น สมชาย ใจดี',
    phEmail: 'somchai@example.com',
    phSubject: 'สนใจจ้างงาน / สอบถามโปรเจกต์',
    phMessage: 'พิมพ์ข้อความที่ต้องการส่งถึงผม...',
    btnSend: 'ส่งข้อความ 🚀',
    btnSending: 'กำลังส่งไปยังเซิร์ฟเวอร์...',
    footerSub: 'เว็บไซต์ส่วนตัวพัฒนาด้วย Angular 19 & Golang REST API',
    footerRights: 'สงวนลิขสิทธิ์ 2026 Personal Portfolio Showcase'
  },
  EN: {
    navAbout: 'About Me',
    navSkills: 'Skills',
    navProjects: 'Achievements & Projects',
    navJourney: 'My Journey',
    navServices: 'What I Do',
    navFaq: 'FAQ',
    navContact: 'Contact Me',
    apiOnline: 'Go Backend Online',
    apiOffline: 'Go Backend Offline',
    heroBadge: '👑 Personal Showcase & Portfolio Hub',
    heroTitle1: 'Welcome to My Personal Website',
    heroTitle2: 'Powered by Angular & Golang',
    heroViewProjects: 'Explore My Work ➔',
    heroGetInTouch: 'Get in Touch',
    statsTitle: 'My Achievements at a Glance',
    skillsBadge: 'Technical Proficiency',
    skillsTitle: 'Skills & Capabilities',
    skillsSub: 'My proficiency in programming languages, frameworks, and cloud architecture.',
    projectsBadge: 'Portfolio Showcase',
    projectsTitle: 'Projects & Key Accomplishments',
    projectsSub: 'A showcase of my recent projects, applications, and certifications.',
    tabAll: 'All Projects',
    tabFullstack: 'Full-Stack',
    tabBackend: 'Backend (Go)',
    tabFrontend: 'Frontend (Angular)',
    tabAI: 'AI & Tools',
    viewProjectDetail: 'View Project Details ➔',
    modalProjectInfo: 'Project Overview',
    modalGithubLink: 'View Source Code on GitHub ↗',
    modalDemoLink: 'Live Demonstration ↗',
    valuesBadge: 'My Philosophy',
    valuesTitle: 'Driven by Excellence & Code Quality',
    visionTitle: 'My Vision',
    missionTitle: 'My Mission',
    servicesBadge: 'Services',
    servicesTitle: 'How I Can Help You Build',
    servicesSub: 'Full-stack web application development, REST API engineering, and cloud setup.',
    journeyBadge: 'Career Timeline',
    journeyTitle: 'Key Milestones & Journey',
    journeySub: 'My learning roadmap, growth, and milestones over the years.',
    testimonialsBadge: 'Endorsements',
    testimonialsTitle: 'What Collaborators & Clients Say',
    faqBadge: 'Got Questions?',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    contactBadge: 'Get in Touch',
    contactTitle: 'Send Me a Direct Message',
    contactSub: 'This form submits live POST requests to my Golang backend REST endpoint at /api/v1/contact.',
    labelName: 'Your Name *',
    labelEmail: 'Your Email *',
    labelSubject: 'Subject',
    labelMessage: 'Message *',
    phName: 'e.g. John Doe',
    phEmail: 'john@example.com',
    phSubject: 'Project Collaboration / Hiring',
    phMessage: 'Type your message here...',
    btnSend: 'Send Message 🚀',
    btnSending: 'Submitting to Server...',
    footerSub: 'Personal Portfolio Website built with Angular 19 & Golang REST API.',
    footerRights: '© 2026 Personal Portfolio Showcase. All rights reserved.'
  }
};
