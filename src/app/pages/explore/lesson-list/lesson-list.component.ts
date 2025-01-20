import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DCLessonListComponent } from '@dataclouder/lessons';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [DCLessonListComponent],
  template: `<p>lesson-list works!</p>
    <dc-lesson-list></dc-lesson-list> `,
  styleUrl: './lesson-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent {}
