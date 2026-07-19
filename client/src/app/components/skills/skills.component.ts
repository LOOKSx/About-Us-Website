import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillItem } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  @Input() skills: SkillItem[] = [];
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;
}
