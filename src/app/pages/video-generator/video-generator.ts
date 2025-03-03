import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_ALERTS_TOKEN, ToastAlertsAbstractService } from '@dataclouder/core-components';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { VideoAnalizerService } from '../video-analizer/video-analizer.service';

@Component({
  selector: 'app-source-form',
  imports: [ReactiveFormsModule, ButtonModule, SelectModule, InputTextModule],
  templateUrl: './video-generator.html',
  styleUrl: './video-generator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoGeneratorComponent implements OnInit {
  url = this.formBuilder.control('', [Validators.required]);
  urls = this.formBuilder.control('');

  constructor(
    @Inject(TOAST_ALERTS_TOKEN) private toastAlerts: ToastAlertsAbstractService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private videoAnalizerService: VideoAnalizerService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
