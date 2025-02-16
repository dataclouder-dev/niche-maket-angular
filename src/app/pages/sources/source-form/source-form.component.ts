import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISourceLLM } from '../models/sources.model';
import { SourceService } from '../sources.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Textarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-source-form',
  imports: [ReactiveFormsModule, CardModule, InputTextModule, DropdownModule, Textarea, ButtonModule],
  templateUrl: './source-form.component.html',
  styleUrl: './source-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceFormComponent implements OnInit {
  sourceForm: FormGroup;
  types: { label: string; value: string }[] = [
    { label: 'Document', value: 'document' },
    { label: 'Website', value: 'website' },
    { label: 'API', value: 'api' },
  ];

  constructor(private route: ActivatedRoute, private sourceService: SourceService, private fb: FormBuilder, private router: Router) {
    this.sourceForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      content: ['', Validators.required],
      img: [''],
    });
  }

  public source: ISourceLLM | null = null;
  public sourceId = this.route.snapshot.params['id'];

  async ngOnInit(): Promise<void> {
    if (this.sourceId) {
      this.source = await this.sourceService.getSource(this.sourceId);
      if (this.source) {
        this.sourceForm.patchValue(this.source);
      }
    }
  }

  async onSubmit() {
    if (this.sourceForm.valid) {
      const source = await this.sourceService.saveSource(this.sourceForm.value);
      debugger;
      this.router.navigate(['../', source.id], { relativeTo: this.route });
    }
  }
}
