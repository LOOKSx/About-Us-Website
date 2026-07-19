import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactSubmission } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() contactForm!: ContactSubmission;
  @Input() contactSubmitting = false;
  @Input() contactSuccessMessage = '';
  @Input() contactErrorMessage = '';
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;

  @Output() submitForm = new EventEmitter<void>();

  onSubmit() {
    this.submitForm.emit();
  }
}
