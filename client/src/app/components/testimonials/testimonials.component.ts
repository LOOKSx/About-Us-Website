import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialItem } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  @Input() testimonials: TestimonialItem[] = [];
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;
}
