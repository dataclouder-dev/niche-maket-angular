import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-source-detail',
  imports: [],
  template: `<p>source-detail works!</p>`,
  styleUrl: './source-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceDetailComponent { }
