import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { DCFilterBarComponent } from '@dataclouder/core-components';
import { SourceService } from '../sources.service';
import { ISourceLLM } from '../models/sources.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-source-list',
  imports: [CardModule, ButtonModule, DCFilterBarComponent],
  templateUrl: './source-list.component.html',
  styleUrl: './source-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent implements OnInit {
  sources: ISourceLLM[] = [];

  constructor(private sourceService: SourceService, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.sources = await this.sourceService.getSources();
    this.cdr.detectChanges();
  }

  onNew() {
    console.log('onNew');
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }
}
