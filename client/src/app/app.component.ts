import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import {
  HealthResponse,
  Profile,
  StatItem,
  SkillItem,
  ProjectItem,
  ServiceItem,
  TimelineItem,
  TestimonialItem,
  FAQItem,
  ContactSubmission
} from './models/api.models';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Phuttiphong Ratcharak | Official Website';

  // Language State (Default TH)
  lang: 'TH' | 'EN' = 'TH';

  // Theme State (Default Light)
  theme: 'light' | 'dark' = 'light';

  // API Live Status
  apiOnline = false;
  apiHealth: HealthResponse | null = null;
  apiLatency = 0;
  private healthSub?: Subscription;

  // App Data State
  profile?: Profile;
  stats: StatItem[] = [];
  skills: SkillItem[] = [];
  projects: ProjectItem[] = [];
  services: ServiceItem[] = [];
  timeline: TimelineItem[] = [];
  testimonials: TestimonialItem[] = [];
  faqs: FAQItem[] = [];

  // Interactive UI State
  mobileMenuOpen = false;
  selectedProjectCategory = 'all';
  activeFaqId: string | null = 'faq-1';
  selectedProject: ProjectItem | null = null;

  // Contact Form State
  contactForm: ContactSubmission = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  contactSubmitting = false;
  contactSuccessMessage = '';
  contactErrorMessage = '';

  // Dictionary UI Static Texts
  dict = {
    TH: {
      navAbout: 'เกี่ยวกับผม',
      navSkills: 'ความเชี่ยวชาญ',
      navProjects: 'ผลงาน',
      navJourney: 'ประวัติการทำงาน',
      navServices: 'บริการ',
      navFaq: 'คำถามที่พบบ่อย',
      navContact: 'ติดต่อ',
      apiOnline: 'ระบบออนไลน์',
      apiOffline: 'ระบบออฟไลน์',
      themeLight: '☀️ สว่าง',
      themeDark: '🌙 มืด',
      heroBadge: 'เว็บไซต์อย่างเป็นทางการ',
      heroTitle1: 'พุฒิพงศ์ ราชรักษ์',
      heroTitle2: 'วิศวกรซอฟต์แวร์ & นักพัฒนาเว็บแบบ Full-Stack',
      heroViewProjects: 'ดูผลงานทั้งหมด ➔',
      heroGetInTouch: 'ส่งข้อความติดต่อ',
      statsTitle: 'ภาพรวมความสำเร็จและผลงาน',
      skillsBadge: 'ทักษะทางเทคนิค',
      skillsTitle: 'ความเชี่ยวชาญและเทคโนโลยีหลัก',
      skillsSub: 'สรุปทักษะความสามารถในภาษาโปรแกรม สถาปัตยกรรมระบบ และเครื่องมือพัฒนาซอฟต์แวร์',
      projectsBadge: 'คลังผลงาน',
      projectsTitle: 'ผลงานที่ผ่านการพัฒนา',
      projectsSub: 'รวบรวมโปรเจกต์สำคัญและระบบซอฟต์แวร์ที่พัฒนาขึ้น',
      tabAll: 'ทั้งหมด',
      tabFullstack: 'Full-Stack',
      tabBackend: 'Backend',
      tabFrontend: 'Frontend',
      viewProjectDetail: 'รายละเอียดผลงาน ➔',
      modalProjectInfo: 'ข้อมูลโปรเจกต์',
      modalGithubLink: 'ดู Source Code บน GitHub ↗',
      modalDemoLink: 'ทดลองใช้งานระบบ ↗',
      valuesBadge: 'หลักการทำงาน',
      valuesTitle: 'วิสัยทัศน์และมาตรฐานการทำงาน',
      visionTitle: 'วิสัยทัศน์',
      missionTitle: 'พันธกิจ',
      servicesBadge: 'บริการ',
      servicesTitle: 'บริการพัฒนาซอฟต์แวร์',
      servicesSub: 'ให้บริการรับพัฒนาเว็บแอปพลิเคชัน ออกแบบระบบหลังบ้าน และให้คำปรึกษาด้านไอที',
      journeyBadge: 'ประวัติการทำงาน',
      journeyTitle: 'เส้นทางและความก้าวหน้า',
      journeySub: 'หมุดหมายสำคัญในการเรียนรู้และการพัฒนาผลงาน',
      testimonialsBadge: 'การยอมรับ',
      testimonialsTitle: 'ความคิดเห็นและผลตอบรับ',
      faqBadge: 'คำถามน่ารู้',
      faqTitle: 'คำถามที่พบบ่อย (FAQ)',
      contactBadge: 'ติดต่อ',
      contactTitle: 'ส่งข้อความติดต่อโดยตรง',
      contactSub: 'กรอกข้อมูลด้านล่างเพื่อส่งข้อความโดยตรงเข้าสู่ระบบ',
      labelName: 'ชื่อ-นามสกุล *',
      labelEmail: 'อีเมลติดต่อ *',
      labelSubject: 'หัวข้อเรื่อง',
      labelMessage: 'ข้อความรายละเอียด *',
      phName: 'กรอกชื่อ-นามสกุลของคุณ',
      phEmail: 'yourname@example.com',
      phSubject: 'ระบุหัวข้อเรื่องที่ต้องการติดต่อ',
      phMessage: 'พิมพ์รายละเอียดข้อความของคุณที่นี่...',
      btnSend: 'ส่งข้อความ 🚀',
      btnSending: 'กำลังส่งข้อมูล...',
      footerSub: 'เว็บไซต์อย่างเป็นทางการของ พุฒิพงศ์ ราชรักษ์ (Phuttiphong Ratcharak)',
      footerRights: '© 2026 Phuttiphong Ratcharak. All rights reserved.'
    },
    EN: {
      navAbout: 'About',
      navSkills: 'Skills',
      navProjects: 'Portfolio',
      navJourney: 'Experience',
      navServices: 'Services',
      navFaq: 'FAQ',
      navContact: 'Contact',
      apiOnline: 'System Online',
      apiOffline: 'System Offline',
      themeLight: '☀️ Light',
      themeDark: '🌙 Dark',
      heroBadge: 'Official Website',
      heroTitle1: 'Phuttiphong Ratcharak',
      heroTitle2: 'Software Engineer & Full-Stack Developer',
      heroViewProjects: 'View Portfolio ➔',
      heroGetInTouch: 'Contact Me',
      statsTitle: 'Key Achievements & Metrics',
      skillsBadge: 'Technical Skills',
      skillsTitle: 'Core Capabilities & Stack',
      skillsSub: 'Summary of technical proficiency in programming, architecture, and systems.',
      projectsBadge: 'Portfolio',
      projectsTitle: 'Featured Projects & Systems',
      projectsSub: 'Selected software applications and engineering accomplishments.',
      tabAll: 'All',
      tabFullstack: 'Full-Stack',
      tabBackend: 'Backend',
      tabFrontend: 'Frontend',
      viewProjectDetail: 'View Details ➔',
      modalProjectInfo: 'Project Details',
      modalGithubLink: 'View Source Code on GitHub ↗',
      modalDemoLink: 'Live Demo ↗',
      valuesBadge: 'Philosophy',
      valuesTitle: 'Vision & Work Standards',
      visionTitle: 'Vision',
      missionTitle: 'Mission',
      servicesBadge: 'Services',
      servicesTitle: 'Software Engineering Services',
      servicesSub: 'Full-stack web application development, API design, and IT consultation.',
      journeyBadge: 'Timeline',
      journeyTitle: 'Professional Experience & Journey',
      journeySub: 'Key milestones, growth, and achievements over the years.',
      testimonialsBadge: 'Endorsements',
      testimonialsTitle: 'Feedback & Collaborations',
      faqBadge: 'Questions',
      faqTitle: 'Frequently Asked Questions (FAQ)',
      contactBadge: 'Contact',
      contactTitle: 'Send a Direct Message',
      contactSub: 'Fill out the form below to send a message directly.',
      labelName: 'Full Name *',
      labelEmail: 'Email Address *',
      labelSubject: 'Subject',
      labelMessage: 'Message *',
      phName: 'Enter your full name',
      phEmail: 'yourname@example.com',
      phSubject: 'Specify the subject of inquiry',
      phMessage: 'Type your message details here...',
      btnSend: 'Send Message 🚀',
      btnSending: 'Submitting...',
      footerSub: 'Official Website of Phuttiphong Ratcharak',
      footerRights: '© 2026 Phuttiphong Ratcharak. All rights reserved.'
    }
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load saved language
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('nexus_lang') as 'TH' | 'EN';
      if (savedLang === 'TH' || savedLang === 'EN') {
        this.lang = savedLang;
      }

      // Load saved theme
      const savedTheme = localStorage.getItem('nexus_theme') as 'light' | 'dark';
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.theme = savedTheme;
      }
    }
    this.applyTheme();

    this.checkHealth();
    this.healthSub = interval(10000).subscribe(() => this.checkHealth());
    this.loadAllData();
  }

  ngOnDestroy(): void {
    if (this.healthSub) {
      this.healthSub.unsubscribe();
    }
  }

  toggleLang(): void {
    this.lang = this.lang === 'TH' ? 'EN' : 'TH';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('nexus_lang', this.lang);
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('nexus_theme', this.theme);
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-theme', this.theme);
    }
  }

  checkHealth(): void {
    const startTime = performance.now();
    this.apiService.getHealth().subscribe(res => {
      const endTime = performance.now();
      this.apiLatency = Math.round(endTime - startTime);
      if (res && res.status === 'OK') {
        this.apiOnline = true;
        this.apiHealth = res;
      } else {
        this.apiOnline = false;
        this.apiHealth = null;
      }
    });
  }

  loadAllData(): void {
    this.apiService.getProfile().subscribe(p => this.profile = p);
    this.apiService.getStats().subscribe(s => this.stats = s);
    this.apiService.getSkills().subscribe(sk => this.skills = sk);
    this.apiService.getServices().subscribe(srv => this.services = srv);
    this.apiService.getTimeline().subscribe(t => this.timeline = t);
    this.apiService.getTestimonials().subscribe(test => this.testimonials = test);
    this.apiService.getFAQs().subscribe(f => this.faqs = f);
    this.filterProjects('all');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  filterProjects(category: string): void {
    this.selectedProjectCategory = category;
    this.apiService.getProjects(category).subscribe(p => this.projects = p);
  }

  toggleFaq(id: string): void {
    this.activeFaqId = this.activeFaqId === id ? null : id;
  }

  openProjectModal(proj: ProjectItem): void {
    this.selectedProject = proj;
  }

  closeProjectModal(): void {
    this.selectedProject = null;
  }

  submitContact(): void {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.contactErrorMessage = this.lang === 'TH' ? 'กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน (ชื่อ, อีเมล, ข้อความ)' : 'Please fill out all required fields (Name, Email, Message).';
      return;
    }

    this.contactSubmitting = true;
    this.contactErrorMessage = '';
    this.contactSuccessMessage = '';

    this.apiService.sendContact(this.contactForm).subscribe({
      next: (res) => {
        this.contactSubmitting = false;
        this.contactSuccessMessage = this.lang === 'TH' ? 'ขอบคุณสำหรับข้อความ! ได้รับข้อมูลเรียบร้อยแล้วครับ' : (res.message || 'Message sent successfully!');
        this.contactForm = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => this.contactSuccessMessage = '', 6000);
      },
      error: () => {
        this.contactSubmitting = false;
        this.contactErrorMessage = this.lang === 'TH' ? 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง' : 'Failed to send message. Please try again.';
      }
    });
  }
}
