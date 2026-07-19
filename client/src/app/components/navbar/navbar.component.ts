import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() profile?: Profile;
  @Input() lang: Language = 'TH';
  @Input() apiOnline = false;
  @Input() apiLatency = 0;
  @Input() dict!: TranslationDictionary;
  @Input() mobileMenuOpen = false;

  @Output() langToggle = new EventEmitter<void>();
  @Output() mobileMenuToggle = new EventEmitter<void>();
  @Output() mobileMenuClose = new EventEmitter<void>();

  onToggleLang() {
    this.langToggle.emit();
  }

  onToggleMobileMenu() {
    this.mobileMenuToggle.emit();
  }

  onCloseMobileMenu() {
    this.mobileMenuClose.emit();
  }
}
