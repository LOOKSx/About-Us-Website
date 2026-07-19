import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-values',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent {
  @Input() profile?: Profile;
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;
}
