import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() profile?: Profile;
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;
}
