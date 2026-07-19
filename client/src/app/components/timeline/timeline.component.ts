import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItem } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  @Input() timeline: TimelineItem[] = [];
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;
}
