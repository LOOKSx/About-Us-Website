import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQItem } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  @Input() faqs: FAQItem[] = [];
  @Input() activeFaqId: string | null = 'faq-1';
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;

  @Output() faqToggle = new EventEmitter<string>();

  onToggleFaq(id: string) {
    this.faqToggle.emit(id);
  }
}
