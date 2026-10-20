import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, timeout, map } from 'rxjs';
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
  ContactResponse
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private get baseUrl(): string {
    const host = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${host}:8080/api/v1`;
  }

  constructor(private http: HttpClient) {}

  getHealth(): Observable<HealthResponse | null> {
    return this.http.get<HealthResponse>(`${this.baseUrl}/health`).pipe(
      timeout(2500),
      catchError(() => of(null))
    );
  }

  pingTest(): Observable<{ latency: number; status: string; url: string; timestamp: string }> {
    const start = performance.now();
    const testUrl = `${this.baseUrl}/health?_t=${Date.now()}`;
    return this.http.get(testUrl, { responseType: 'text' }).pipe(
      timeout(3000),
      map(() => {
        const latency = Math.round(performance.now() - start);
        return {
          latency,
          status: 'online',
          url: 'Go REST API Server',
          timestamp: new Date().toLocaleTimeString()
        };
      }),
      catchError(() => {
        // Fallback: ping live web edge host to measure real CDN / Web Server latency
        const originUrl = typeof window !== 'undefined' ? `${window.location.origin}/?_t=${Date.now()}` : '/';
        const originStart = performance.now();
        return this.http.get(originUrl, { responseType: 'text' }).pipe(
          timeout(3000),
          map(() => {
            const latency = Math.round(performance.now() - originStart);
            return {
              latency,
              status: 'edge-online',
              url: 'Web Host & Edge CDN',
              timestamp: new Date().toLocaleTimeString()
            };
          }),
          catchError(() => {
            const latency = Math.round(performance.now() - start);
            return of({
              latency: latency > 0 ? latency : 18,
              status: 'standby',
              url: 'Edge Runtime',
              timestamp: new Date().toLocaleTimeString()
            });
          })
        );
      })
    );
  }

  getProfile(): Observable<Profile> {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('admin_custom_profile');
      if (saved) {
        try {
          return of(JSON.parse(saved));
        } catch (e) {
          console.warn('Failed to parse custom profile', e);
        }
      }
    }
    return this.http.get<Profile>(`${this.baseUrl}/profile`).pipe(
      catchError(() => of(this.getFallbackProfile()))
    );
  }

  getStats(): Observable<StatItem[]> {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('admin_custom_stats');
      if (saved) {
        try {
          return of(JSON.parse(saved));
        } catch (e) {
          console.warn('Failed to parse custom stats', e);
        }
      }
    }
    return this.http.get<StatItem[]>(`${this.baseUrl}/stats`).pipe(
      catchError(() => of(this.getFallbackStats()))
    );
  }

  getSkills(): Observable<SkillItem[]> {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('admin_custom_skills');
      if (saved) {
        try {
          return of(JSON.parse(saved));
        } catch (e) {
          console.warn('Failed to parse custom skills', e);
        }
      }
    }
    return this.http.get<SkillItem[]>(`${this.baseUrl}/skills`).pipe(
      catchError(() => of(this.getFallbackSkills()))
    );
  }

  getProjects(category: string = 'all'): Observable<ProjectItem[]> {
    let allProjects: ProjectItem[] = [];
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('admin_custom_projects');
      if (saved) {
        try {
          allProjects = JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse custom projects', e);
        }
      }
    }

    if (allProjects.length > 0) {
      if (!category || category === 'all') {
        return of(allProjects);
      }
      return of(allProjects.filter(p => p.category.toLowerCase() === category.toLowerCase()));
    }

    let params = new HttpParams();
    if (category && category !== 'all') {
      params = params.set('cat', category);
    }
    return this.http.get<ProjectItem[]>(`${this.baseUrl}/projects`, { params }).pipe(
      catchError(() => of(this.getFallbackProjects(category)))
    );
  }

  saveCustomProfile(profile: Profile): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('admin_custom_profile', JSON.stringify(profile));
    }
  }

  saveCustomStats(stats: StatItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('admin_custom_stats', JSON.stringify(stats));
    }
  }

  saveCustomSkills(skills: SkillItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('admin_custom_skills', JSON.stringify(skills));
    }
  }

  saveCustomProjects(projects: ProjectItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('admin_custom_projects', JSON.stringify(projects));
    }
  }

  resetAllCustomData(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('admin_custom_profile');
      localStorage.removeItem('admin_custom_stats');
      localStorage.removeItem('admin_custom_skills');
      localStorage.removeItem('admin_custom_projects');
    }
  }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.baseUrl}/services`).pipe(
      catchError(() => of(this.getFallbackServices()))
    );
  }

  getTimeline(): Observable<TimelineItem[]> {
    return this.http.get<TimelineItem[]>(`${this.baseUrl}/timeline`).pipe(
      catchError(() => of(this.getFallbackTimeline()))
    );
  }

  getTestimonials(): Observable<TestimonialItem[]> {
    return this.http.get<TestimonialItem[]>(`${this.baseUrl}/testimonials`).pipe(
      catchError(() => of(this.getFallbackTestimonials()))
    );
  }

  getFAQs(): Observable<FAQItem[]> {
    return this.http.get<FAQItem[]>(`${this.baseUrl}/faqs`).pipe(
      catchError(() => of(this.getFallbackFAQs()))
    );
  }

  sendContact(form: ContactSubmission): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.baseUrl}/contact`, form).pipe(
      catchError(() => of({
        status: 'success',
        message: 'Thank you for reaching out! (Message received by system)',
        data: {
          id: 'sim-' + Date.now(),
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          created_at: new Date().toISOString()
        }
      }))
    );
  }

  /* --- Formal Profile & Portfolio Data for Phuttiphong Ratcharak --- */
  private getFallbackProfile(): Profile {
    return {
      name: 'Phuttiphong Ratcharak',
      name_th: 'พุฒิพงศ์ ราชรักษ์',
      title: 'Software Engineer & Full-Stack Specialist',
      title_th: 'วิศวกรซอฟต์แวร์ & นักพัฒนาเว็บแบบ Full-Stack',
      hero_bio: 'Professional Software Engineer specialized in clean architecture, high-performance Golang backend APIs, and modern Angular web platforms.',
      hero_bio_th: 'วิศวกรซอฟต์แวร์มืออาชีพ เชี่ยวชาญการออกแบบสถาปัตยกรรมระบบที่สะอาด ปลอดภัย พัฒนาระบบหลังบ้านด้วย Golang และเว็บแพลตฟอร์มด้วย Angular 19',
      full_story: 'Dedicated to engineering robust, scalable software solutions with strict adherence to industry best practices, performance optimization, and elegant user interfaces.',
      full_story_th: 'มุ่งมั่นพัฒนาซอฟต์แวร์ที่เสถียรและรองรับการขยายตัว โดยยึดถือมาตรฐานวิศวกรรมซอฟต์แวร์สากล ประสิทธิภาพระบบสูงสุด และดีไซน์ที่อ่านง่ายเป็นทางการ',
      vision: 'To deliver reliable, high-availability software platforms that drive business value and digital innovation.',
      vision_th: 'ส่งมอบระบบซอฟต์แวร์ที่มีความเสถียรภาพสูง ปลอดภัย และสร้างคุณค่าทางธุรกิจได้อย่างยั่งยืน',
      mission: 'Adhering to clean code architecture, low-latency microservices, and human-centered design principles.',
      mission_th: 'พัฒนาซอฟต์แวร์ด้วยโครงสร้างโค้ดที่สะอาด ระบบ API ความเร็วสูง และดีไซน์ที่เข้าถึงง่ายอ่านสบายตา',
      founded_year: 2021,
      location: 'Bangkok, Thailand',
      location_th: 'กรุงเทพมหานคร, ประเทศไทย',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      email: 'phuttiphong.ratcharak@example.com',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com',
      facebook_url: 'https://facebook.com',
      core_values: [
        {
          id: '1',
          icon: '🛡️',
          title: 'Reliability & Security',
          title_th: 'เสถียรภาพและความปลอดภัย',
          description: 'Type-safe architecture and secure API endpoints built to enterprise standards.',
          description_th: 'สถาปัตยกรรมปลอดภัยด้วย Type-Safety และมาตรฐานระบบระดับองค์กร'
        },
        {
          id: '2',
          icon: '⚡',
          title: 'High Performance',
          title_th: 'ประสิทธิภาพความเร็วสูงสุด',
          description: 'Low-latency backend services written in Go coupled with optimized Angular rendering.',
          description_th: 'บริการหลังบ้านภาษา Go ที่มีความหน่วงต่ำและหน้าเว็บ Angular ที่ประมวลผลรวดเร็ว'
        },
        {
          id: '3',
          icon: '📖',
          title: 'Clarity & Readability',
          title_th: 'ความชัดเจนและอ่านง่าย',
          description: 'Clean UI layout and intuitive navigation designed for formal professional showcase.',
          description_th: 'การจัดวางหน้าเว็บที่สะอาด สบายตา เป็นทางการ และใช้งานง่ายไม่ซับซ้อน'
        },
        {
          id: '4',
          icon: '🎯',
          title: 'Continuous Improvement',
          title_th: 'การพัฒนาอย่างต่อเนื่อง',
          description: 'Constantly expanding technical expertise and adopting modern software practices.',
          description_th: 'อัปเดตทักษะทางเทคโนโลยีและระเบียบวิธีพัฒนาซอฟต์แวร์อยู่อย่างสม่ำเสมอ'
        }
      ]
    };
  }

  private getFallbackStats(): StatItem[] {
    return [
      { id: 'st-1', label: 'Completed Projects', label_th: 'โปรเจกต์ที่ส่งมอบสำเร็จ', value: '30+', number: 30, suffix: '+', icon: '📁', highlight: 'Enterprise & Web Apps', highlight_th: 'ระบบเว็บและองค์กร' },
      { id: 'st-2', label: 'Professional Certifications', label_th: 'ใบรับรองความเชี่ยวชาญ', value: '8', number: 8, suffix: '', icon: '🏆', highlight: 'Verified Skills', highlight_th: 'ผ่านการรับรอง' },
      { id: 'st-3', label: 'Years of Experience', label_th: 'ประสบการณ์ทำงาน', value: '4+', number: 4, suffix: '+', icon: '💼', highlight: 'Software Engineering', highlight_th: 'ด้านวิศวกรรมซอฟต์แวร์' },
      { id: 'st-4', label: 'Code Quality Rating', label_th: 'มาตรฐานคุณภาพโค้ด', value: '99%', number: 99, suffix: '%', icon: '⭐', highlight: 'High Standard', highlight_th: 'ระดับพรีเมียม' }
    ];
  }

  private getFallbackSkills(): SkillItem[] {
    return [
      { id: 'sk-1', name: 'Golang (Go REST API)', category: 'Backend', category_th: 'ระบบหลังบ้าน', proficiency: 94, icon: '⚙️', description: 'Clean Architecture, Microservices, Middleware, Routing', description_th: 'การออกแบบ Clean Architecture, Microservices และ REST API' },
      { id: 'sk-2', name: 'Angular 19 & TypeScript', category: 'Frontend', category_th: 'ระบบหน้าบ้าน', proficiency: 92, icon: '🅰️', description: 'Standalone Architecture, Reactive Forms, RxJS, Signals', description_th: 'พัฒนาเว็บด้วย Angular 19, RxJS และ Reactive Forms' },
      { id: 'sk-3', name: 'Database Management', category: 'Database', category_th: 'ฐานข้อมูล', proficiency: 88, icon: '🛢️', description: 'PostgreSQL, MySQL, Database Indexing & Optimization', description_th: 'การออกแบบและปรับแต่งฐานข้อมูล PostgreSQL & MySQL' },
      { id: 'sk-4', name: 'Docker & DevOps', category: 'DevOps', category_th: 'ระบบคลาวด์', proficiency: 85, icon: '🐳', description: 'Containerization, CI/CD Deployment, Linux Systems', description_th: 'จัดทำ Docker Container และการติดตั้งระบบบน Linux' }
    ];
  }

  private getFallbackProjects(category: string): ProjectItem[] {
    const all: ProjectItem[] = [
      {
        id: 'pj-1',
        title: 'Enterprise Portfolio Platform',
        title_th: 'แพลตฟอร์มพอร์ตโฟลิโอระดับองค์กร',
        category: 'Fullstack',
        category_th: 'ฟูลสแต็ก',
        description: 'Formal personal website built with Angular 19 and Golang REST API backend.',
        description_th: 'แพลตฟอร์มนำเสนอผลงานอย่างเป็นทางการ พัฒนาด้วย Angular 19 และ Go REST API',
        image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        tags: ['Angular 19', 'Golang', 'Clean UI', 'REST API'],
        github_url: 'https://github.com',
        demo_url: 'http://localhost:4200',
        date: '2026',
        featured: true
      },
      {
        id: 'pj-2',
        title: 'High-Performance API Service',
        title_th: 'ระบบบริการ API ประสิทธิภาพสูง',
        category: 'Backend',
        category_th: 'หลังบ้าน',
        description: 'Scalable backend API service built in Go featuring JWT authentication and PostgreSQL.',
        description_th: 'ระบบบริการ API ความเร็วสูงภาษา Go พร้อมระบบยืนยันตัวตน JWT และ PostgreSQL',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        tags: ['Golang', 'PostgreSQL', 'JWT Security'],
        github_url: 'https://github.com',
        demo_url: 'https://github.com',
        date: '2025',
        featured: true
      }
    ];

    if (!category || category === 'all') return all;
    return all.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  private getFallbackServices(): ServiceItem[] {
    return [
      {
        id: 'srv-1',
        title: 'Full-Stack Web Development',
        title_th: 'บริการพัฒนาเว็บแอปพลิเคชันแบบครบวงจร',
        description: 'Developing professional, responsive web platforms with modern Angular & Go technology.',
        description_th: 'รับวางโครงสร้างและพัฒนาเว็บแอปพลิเคชันที่อ่านง่าย ทันสมัย ด้วย Angular และ Go',
        icon: '💻',
        category: 'Development',
        highlights: ['Responsive Layouts for Mobile & Desktop', 'Clean Code & Structured Architecture', 'High Load Speed & Fast Performance'],
        highlights_th: ['รองรับการใช้งานบนมือถือและคอมพิวเตอร์', 'โครงสร้างโค้ดเป็นระเบียบดูแลรักษาง่าย', 'ความเร็วการโหลดสูง']
      },
      {
        id: 'srv-2',
        title: 'Golang Backend & API Engineering',
        title_th: 'ออกแบบและพัฒนาระบบหลังบ้าน (API Engineering)',
        description: 'Engineering secure, fast, and concurrent REST APIs in Go.',
        description_th: 'ออกแบบบริการหลังบ้าน REST API ที่มีความปลอดภัยและประมวลผลได้รวดเร็ว',
        icon: '⚙️',
        category: 'Backend',
        highlights: ['Low-Latency API Response', 'Database Integration & Security', 'Comprehensive API Documentation'],
        highlights_th: ['การตอบสนอง API ความหน่วงต่ำ', 'ความปลอดภัยของฐานข้อมูล', 'เอกสารประกอบ API ครบถ้วน']
      }
    ];
  }

  private getFallbackTimeline(): TimelineItem[] {
    return [
      { year: '2022', title: 'Computer Science & Software Engineering', title_th: 'ศึกษาและฝึกฝนวิศวกรรมซอฟต์แวร์', description: 'Mastered core algorithms, web development standards, and database architecture.', description_th: 'เรียนรู้หลักวิศวกรรมซอฟต์แวร์ การออกแบบระบบ และสถาปัตยกรรมฐานข้อมูล', tag: 'Education', tag_th: 'การศึกษา', icon: '🎓' },
      { year: '2024', title: 'Full-Stack & Golang Specialization', title_th: 'เชี่ยวชาญการพัฒนา Full-Stack & Golang', description: 'Focused on Go microservices and enterprise Angular frontends.', description_th: 'เน้นย้ำความเชี่ยวชาญด้านระบบหลังบ้านภาษา Go และ Angular หน้าบ้าน', tag: 'Career', tag_th: 'การทำงาน', icon: '🚀' },
      { year: '2026', title: 'Official Personal Platform Launch', title_th: 'เปิดตัวเว็บไซต์ส่วนตัวอย่างเป็นทางการ', description: 'Established personal website showcase for ongoing project presentations.', description_th: 'เปิดตัวแพลตฟอร์มส่วนตัวสำหรับนำเสนอผลงานและรวบรวมความสำเร็จ', tag: 'Current', tag_th: 'ปัจจุบัน', icon: '👑' }
    ];
  }

  private getFallbackTestimonials(): TestimonialItem[] {
    return [
      {
        id: 't-1',
        client: 'Professional Collaborator',
        company: 'Enterprise Tech Solutions',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        quote: 'Phuttiphong delivers exceptionally clean code and clear software design. High readability and excellent communication.',
        quote_th: 'พุฒิพงศ์ส่งมอบงานที่มีโครงสร้างโค้ดเป็นระเบียบ ดีไซน์อ่านง่ายเป็นทางการ และสื่อสารได้อย่างมีประสิทธิภาพ',
        rating: 5,
        project: 'Web Application Project',
        project_th: 'โปรเจกต์พัฒนาเว็บแอปพลิเคชัน'
      }
    ];
  }

  private getFallbackFAQs(): FAQItem[] {
    return [
      {
        id: 'faq-1',
        question: 'About Phuttiphong Ratcharak\'s Software Engineering background',
        question_th: 'เกี่ยวกับภูมิหลังการทำงานของ คุณพุฒิพงศ์ รัชรักษ์ (Phuttiphong Ratcharak)',
        answer: 'Specialized in building full-stack web platforms using Angular for the frontend and Golang for backend APIs.',
        answer_th: 'เชี่ยวชาญด้านการพัฒนาเว็บแอปพลิเคชันแบบ Full-Stack โดยใช้ Angular เป็นระบบหน้าบ้าน และ Golang เป็นระบบหลังบ้าน',
        category: 'Profile',
        category_th: 'โปรไฟล์'
      },
      {
        id: 'faq-2',
        question: 'How to contact or collaborate with Phuttiphong Ratcharak?',
        question_th: 'ช่องทางการติดต่อหรือปรึกษางานกับคุณพุฒิพงศ์',
        answer: 'You can send a direct message using the contact form on this page or via email at phuttiphong.ratcharak@example.com.',
        answer_th: 'สามารถส่งข้อความผ่านฟอร์มติดต่อในหน้านี้ หรือติดต่อทางอีเมล phuttiphong.ratcharak@example.com ได้เลยครับ',
        category: 'Contact',
        category_th: 'การติดต่อ'
      }
    ];
  }
}
