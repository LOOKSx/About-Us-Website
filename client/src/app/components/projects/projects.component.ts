import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItem } from '../../models/api.models';
import { Language, TranslationDictionary } from '../../constants/translations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Input() projects: ProjectItem[] = [];
  @Input() selectedProjectCategory = 'all';
  @Input() selectedProject: ProjectItem | null = null;
  @Input() lang: Language = 'TH';
  @Input() dict!: TranslationDictionary;

  @Output() filterCategory = new EventEmitter<string>();
  @Output() selectProject = new EventEmitter<ProjectItem>();
  @Output() closeModal = new EventEmitter<void>();

  onFilter(cat: string) {
    this.filterCategory.emit(cat);
  }

  onOpenModal(proj: ProjectItem) {
    this.selectProject.emit(proj);
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
