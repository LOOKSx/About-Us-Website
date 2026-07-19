import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatItem } from '../../models/api.models';
import { Language } from '../../constants/translations';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  @Input() stats: StatItem[] = [];
  @Input() lang: Language = 'TH';
}
