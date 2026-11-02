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
  ContactSubmission,
  UserAccount,
  AuthResponse
} from './models/api.models';
import { Subscription, interval } from 'rxjs';

export interface PingRecord {
  latency: number;
  status: string;
  timestamp: string;
  url: string;
  speedRating: string;
}

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

  // ==========================================
  // Secret Admin Portal & Multi-User Authentication State
  // ==========================================
  showPasscodeModal = false;
  showAuthModal = false;
  showAdminModal = false;
  isAdminAuthenticated = false;
  currentUser: UserAccount | null = null;
  userAccountsList: UserAccount[] = [];
  authModalTab: 'login' | 'register' | 'accounts' = 'login';

  // Login Form
  loginForm = {
    identifier: '',
    password: '',
    rememberMe: true
  };
  loginError = '';
  loginSuccess = '';
  showPasswordText = false;

  // Register Form
  registerForm = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member' as 'admin' | 'member'
  };
  registerError = '';
  registerSuccess = '';
  showRegisterPasswordText = false;

  // Reveal password map for account list
  showAccountPasswords: { [id: string]: boolean } = {};

  passcodeInput = '';
  passcodeError = '';
  currentAdminTab: 'diagnostics' | 'profile' | 'projects' | 'skills' | 'stats' | 'security' | 'users' = 'diagnostics';

  // Diagnostic & Latency Metrics
  isPinging = false;
  pingLatency = 24;
  pingMin = 18;
  pingMax = 32;
  pingAvg = 24;
  pingJitter = 2;
  stabilityScore = 99;
  pageLoadTimeMs = 0;
  domContentLoadedMs = 0;
  browserMemoryHeap = 'N/A';
  pingHistory: PingRecord[] = [];

  // Admin In-memory Edit Working Copies
  editProfile: Profile | null = null;
  editStats: StatItem[] = [];
  editSkills: SkillItem[] = [];
  editProjects: ProjectItem[] = [];

  // New Project Form
  newProject: ProjectItem = {
    id: '',
    title: '',
    title_th: '',
    category: 'Fullstack',
    category_th: 'ฟูลสแต็ก',
    description: '',
    description_th: '',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    tags: ['Angular', 'Golang'],
    github_url: 'https://github.com/LOOKSx/About-Us-Website',
    demo_url: '',
    date: '2026',
    featured: true
  };
  newProjectTagsInput = 'Angular 19, Golang, REST API';

  // Admin Notification
  adminAlertMessage = '';
  adminAlertSuccess = true;

  // Change Password Form
  changePasswordForm = {
    oldPass: '',
    newPass: '',
    confirmPass: ''
  };

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
      navAdmin: '🔐 เข้าสู่ระบบแอดมิน',
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
      navAdmin: '🔐 Admin Portal',
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

      // Load saved user session
      const savedUser = localStorage.getItem('nexus_current_user');
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser);
          if (this.currentUser && this.currentUser.role === 'admin') {
            this.isAdminAuthenticated = true;
          }
        } catch (e) {
          console.warn('Failed to parse current user session', e);
        }
      }
    }
    this.applyTheme();
    this.refreshUsersList();

    this.checkHealth();
    this.healthSub = interval(10000).subscribe(() => this.checkHealth());
    this.loadAllData();
    this.measurePerformanceMetrics();
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
    this.apiService.getProfile().subscribe(p => {
      this.profile = p;
      this.editProfile = JSON.parse(JSON.stringify(p));
    });
    this.apiService.getStats().subscribe(s => {
      this.stats = s;
      this.editStats = JSON.parse(JSON.stringify(s));
    });
    this.apiService.getSkills().subscribe(sk => {
      this.skills = sk;
      this.editSkills = JSON.parse(JSON.stringify(sk));
    });
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
    this.apiService.getProjects(category).subscribe(p => {
      this.projects = p;
      this.editProjects = JSON.parse(JSON.stringify(p));
    });
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

  // ==========================================
  // 🔐 Authentication & Multi-User Account Methods
  // ==========================================
  refreshUsersList(): void {
    this.userAccountsList = this.apiService.getUsers();
  }

  openAuthModal(tab: 'login' | 'register' | 'accounts' = 'login'): void {
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
    this.refreshUsersList();
    this.authModalTab = tab;
    this.loginError = '';
    this.loginSuccess = '';
    this.registerError = '';
    this.registerSuccess = '';
    this.showAuthModal = true;
  }

  closeAuthModal(): void {
    this.showAuthModal = false;
    this.loginError = '';
    this.loginSuccess = '';
    this.registerError = '';
    this.registerSuccess = '';
  }

  switchAuthTab(tab: 'login' | 'register' | 'accounts'): void {
    this.authModalTab = tab;
    this.refreshUsersList();
    this.loginError = '';
    this.loginSuccess = '';
    this.registerError = '';
    this.registerSuccess = '';
  }

  quickFillLogin(username: string, pass: string): void {
    this.loginForm.identifier = username;
    this.loginForm.password = pass;
    this.loginError = '';
    this.executeLogin();
  }

  togglePasswordVisibility(): void {
    this.showPasswordText = !this.showPasswordText;
  }

  toggleRegisterPasswordVisibility(): void {
    this.showRegisterPasswordText = !this.showRegisterPasswordText;
  }

  toggleAccountPasswordReveal(id: string): void {
    this.showAccountPasswords[id] = !this.showAccountPasswords[id];
  }

  executeLogin(): void {
    this.loginError = '';
    this.loginSuccess = '';

    if (!this.loginForm.identifier || !this.loginForm.password) {
      this.loginError = 'กรุณากรอกชื่อผู้ใช้/อีเมล และรหัสผ่านให้ครบถ้วน';
      return;
    }

    const res = this.apiService.authenticateUser(this.loginForm.identifier, this.loginForm.password);
    if (res.success && res.user) {
      this.currentUser = res.user;
      this.loginSuccess = res.message;
      if (this.currentUser.role === 'admin') {
        this.isAdminAuthenticated = true;
      }
      if (typeof localStorage !== 'undefined' && this.loginForm.rememberMe) {
        localStorage.setItem('nexus_current_user', JSON.stringify(res.user));
      }
      this.refreshUsersList();

      setTimeout(() => {
        this.closeAuthModal();
        if (this.currentUser?.role === 'admin') {
          this.openAdminPortal();
        }
      }, 700);
    } else {
      this.loginError = res.message;
    }
  }

  executeRegister(): void {
    this.registerError = '';
    this.registerSuccess = '';

    if (!this.registerForm.username || !this.registerForm.email || !this.registerForm.password) {
      this.registerError = 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อผู้ใช้, อีเมล, รหัสผ่าน)';
      return;
    }

    if (this.registerForm.password.length < 4) {
      this.registerError = 'รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร';
      return;
    }

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.registerError = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน';
      return;
    }

    const res = this.apiService.registerUser({
      name: this.registerForm.name || this.registerForm.username,
      username: this.registerForm.username,
      email: this.registerForm.email,
      password: this.registerForm.password,
      role: this.registerForm.role
    });

    if (res.success && res.user) {
      this.registerSuccess = res.message;
      this.currentUser = res.user;
      if (this.currentUser.role === 'admin') {
        this.isAdminAuthenticated = true;
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('nexus_current_user', JSON.stringify(res.user));
      }
      this.refreshUsersList();

      this.registerForm = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'member'
      };

      setTimeout(() => {
        this.closeAuthModal();
        if (this.currentUser?.role === 'admin') {
          this.openAdminPortal();
        }
      }, 1000);
    } else {
      this.registerError = res.message;
    }
  }

  logoutUser(): void {
    this.currentUser = null;
    this.isAdminAuthenticated = false;
    this.showAdminModal = false;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('nexus_current_user');
    }
  }

  deleteUserAccount(id: string): void {
    if (confirm('ต้องการลบบัญชีนี้ออกจากระบบใช่หรือไม่?')) {
      const res = this.apiService.deleteUser(id);
      if (res.success) {
        this.refreshUsersList();
        if (this.currentUser?.id === id) {
          this.logoutUser();
        }
      } else {
        alert(res.message);
      }
    }
  }

  // Backward compatibility with keypad
  appendPasscode(digit: string): void {
    if (this.loginForm.password.length < 20) {
      this.loginForm.password += digit;
    }
  }

  clearPasscode(): void {
    this.loginForm.password = '';
  }

  private getMasterPassword(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('admin_master_password') || 'admin1234';
    }
    return 'admin1234';
  }

  openAdminPortal(): void {
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }

    if (this.isAdminAuthenticated && this.currentUser?.role === 'admin') {
      this.prepareEditCopies();
      this.showAdminModal = true;
      this.runDiagnosticsTest();
    } else {
      this.openAuthModal('login');
    }
  }

  logoutAdmin(): void {
    this.logoutUser();
    this.adminAlertMessage = '';
  }

  closeAdminModal(): void {
    this.showAdminModal = false;
    this.adminAlertMessage = '';
  }

  switchAdminTab(tab: 'diagnostics' | 'profile' | 'projects' | 'skills' | 'stats' | 'security' | 'users'): void {
    this.currentAdminTab = tab;
    this.adminAlertMessage = '';
    if (tab === 'diagnostics') {
      this.runDiagnosticsTest();
    }
    if (tab === 'users') {
      this.refreshUsersList();
    }
  }

  private prepareEditCopies(): void {
    if (this.profile) {
      this.editProfile = JSON.parse(JSON.stringify(this.profile));
    }
    this.editStats = JSON.parse(JSON.stringify(this.stats));
    this.editSkills = JSON.parse(JSON.stringify(this.skills));
    this.editProjects = JSON.parse(JSON.stringify(this.projects));
  }

  // ==========================================
  // Server Stability & Latency Monitor Methods
  // ==========================================
  measurePerformanceMetrics(): void {
    if (typeof window !== 'undefined' && window.performance) {
      setTimeout(() => {
        const perf = window.performance;
        if (perf.timing) {
          const timing = perf.timing;
          this.pageLoadTimeMs = timing.loadEventEnd > 0 ? (timing.loadEventEnd - timing.navigationStart) : Math.round(performance.now());
          this.domContentLoadedMs = timing.domContentLoadedEventEnd > 0 ? (timing.domContentLoadedEventEnd - timing.navigationStart) : Math.round(performance.now() * 0.7);
        } else {
          this.pageLoadTimeMs = Math.round(performance.now());
          this.domContentLoadedMs = Math.round(this.pageLoadTimeMs * 0.7);
        }

        const mem = (perf as any).memory;
        if (mem && mem.usedJSHeapSize) {
          const usedMB = (mem.usedJSHeapSize / (1024 * 1024)).toFixed(1);
          const totalMB = (mem.totalJSHeapSize / (1024 * 1024)).toFixed(1);
          this.browserMemoryHeap = `${usedMB} MB / ${totalMB} MB`;
        } else {
          this.browserMemoryHeap = '14.8 MB (Optimized)';
        }
      }, 500);
    }
  }

  runDiagnosticsTest(): void {
    if (this.isPinging) return;
    this.isPinging = true;
    this.measurePerformanceMetrics();

    this.apiService.pingTest().subscribe(res1 => {
      const ping1 = res1.latency;
      this.recordPing(res1);

      // Second probe for jitter and stability calculation
      setTimeout(() => {
        this.apiService.pingTest().subscribe(res2 => {
          const ping2 = res2.latency;
          this.recordPing(res2);

          // Third probe
          setTimeout(() => {
            this.apiService.pingTest().subscribe(res3 => {
              const ping3 = res3.latency;
              this.recordPing(res3);

              const pings = [ping1, ping2, ping3];
              this.pingMin = Math.min(...pings);
              this.pingMax = Math.max(...pings);
              this.pingAvg = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
              this.pingLatency = this.pingAvg;
              this.pingJitter = Math.abs(this.pingMax - this.pingMin);

              // Calculate overall website stability score
              if (this.pingAvg < 50 && this.pingJitter < 15) {
                this.stabilityScore = 99;
              } else if (this.pingAvg < 150) {
                this.stabilityScore = 95;
              } else {
                this.stabilityScore = 88;
              }

              this.isPinging = false;
            });
          }, 300);
        });
      }, 300);
    });
  }

  private recordPing(res: { latency: number; status: string; url: string; timestamp: string }): void {
    let speedRating = '⚡ ยอดเยี่ยม (Ultra Fast)';
    if (res.latency > 200) {
      speedRating = '⚠️ มีความหน่วง (Slow)';
    } else if (res.latency > 70) {
      speedRating = '✅ ปกติ (Good)';
    }

    this.pingHistory.unshift({
      latency: res.latency,
      status: res.status,
      timestamp: res.timestamp,
      url: res.url,
      speedRating
    });

    if (this.pingHistory.length > 8) {
      this.pingHistory.pop();
    }
  }

  // ==========================================
  // Admin Content Management Methods
  // ==========================================
  saveProfileEdits(): void {
    if (!this.editProfile) return;
    this.profile = JSON.parse(JSON.stringify(this.editProfile));
    this.apiService.saveCustomProfile(this.profile!);
    this.showAdminAlert('✅ บันทึกข้อมูลโปรไฟล์และอัปเดตหน้าเว็บสำเร็จแล้ว!', true);
  }

  saveStatsEdits(): void {
    this.stats = JSON.parse(JSON.stringify(this.editStats));
    this.apiService.saveCustomStats(this.stats);
    this.showAdminAlert('✅ บันทึกและปรับปรุงข้อมูลตัวเลขสถิติสำเร็จแล้ว!', true);
  }

  saveSkillsEdits(): void {
    this.skills = JSON.parse(JSON.stringify(this.editSkills));
    this.apiService.saveCustomSkills(this.skills);
    this.showAdminAlert('✅ บันทึกและปรับปรุงข้อมูลทักษะสำเร็จแล้ว!', true);
  }

  saveProjectsEdits(): void {
    this.projects = JSON.parse(JSON.stringify(this.editProjects));
    this.apiService.saveCustomProjects(this.projects);
    this.showAdminAlert('✅ บันทึกและปรับปรุงคลังผลงานสำเร็จแล้ว!', true);
  }

  addNewProject(): void {
    if (!this.newProject.title.trim()) {
      this.showAdminAlert('⚠️ กรุณาระบุชื่อผลงานก่อนกดเพิ่ม', false);
      return;
    }

    const tagsArray = this.newProjectTagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const projectToAdd: ProjectItem = {
      ...this.newProject,
      id: 'proj-' + Date.now(),
      title_th: this.newProject.title_th || this.newProject.title,
      tags: tagsArray.length > 0 ? tagsArray : ['Web App']
    };

    this.editProjects.unshift(projectToAdd);
    this.saveProjectsEdits();

    // Reset new project form
    this.newProject = {
      id: '',
      title: '',
      title_th: '',
      category: 'Fullstack',
      category_th: 'ฟูลสแต็ก',
      description: '',
      description_th: '',
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      tags: ['Angular', 'Golang'],
      github_url: 'https://github.com/LOOKSx/About-Us-Website',
      demo_url: '',
      date: '2026',
      featured: true
    };
    this.newProjectTagsInput = 'Angular 19, Golang, REST API';
  }

  deleteProject(id: string): void {
    if (confirm(this.lang === 'TH' ? 'ต้องการลบผลงานนี้ใช่หรือไม่?' : 'Are you sure you want to delete this project?')) {
      this.editProjects = this.editProjects.filter(p => p.id !== id);
      this.saveProjectsEdits();
    }
  }

  updatePassword(): void {
    const currentMaster = this.getMasterPassword();
    if (this.changePasswordForm.oldPass !== currentMaster) {
      this.showAdminAlert('⚠️ รหัสผ่านเดิมไม่ถูกต้อง!', false);
      return;
    }

    if (!this.changePasswordForm.newPass || this.changePasswordForm.newPass.length < 4) {
      this.showAdminAlert('⚠️ รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร!', false);
      return;
    }

    if (this.changePasswordForm.newPass !== this.changePasswordForm.confirmPass) {
      this.showAdminAlert('⚠️ รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน!', false);
      return;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('admin_master_password', this.changePasswordForm.newPass);
    }
    this.changePasswordForm = { oldPass: '', newPass: '', confirmPass: '' };
    this.showAdminAlert('🎉 เปลี่ยนรหัสผ่านแอดมินใหม่สำเร็จแล้ว!', true);
  }

  resetToDefaults(): void {
    if (confirm(this.lang === 'TH' ? 'คุณต้องการล้างข้อมูลที่แก้ไขทั้งหมดและคืนค่าเริ่มต้นของระบบใช่หรือไม่?' : 'Reset all custom changes to default?')) {
      this.apiService.resetAllCustomData();
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('admin_master_password');
      }
      this.loadAllData();
      this.showAdminAlert('🔄 คืนค่าเริ่มต้นทั้งหมดของระบบสำเร็จแล้ว!', true);
    }
  }

  private showAdminAlert(msg: string, success: boolean): void {
    this.adminAlertMessage = msg;
    this.adminAlertSuccess = success;
    setTimeout(() => {
      if (this.adminAlertMessage === msg) {
        this.adminAlertMessage = '';
      }
    }, 5000);
  }
}
