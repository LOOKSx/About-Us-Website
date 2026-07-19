import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItem } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  @Input() services: ServiceItem[] = [];
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;
}
