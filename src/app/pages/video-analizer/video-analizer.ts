import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

import { TOAST_ALERTS_TOKEN, ToastAlertsAbstractService } from '@dataclouder/core-components';
import { VideoAnalizerService } from './video-analizer.service';

@Component({
  selector: 'app-source-form',
  imports: [ReactiveFormsModule, CardModule, TextareaModule, DropdownModule, ButtonModule, SelectModule, InputTextModule, ChipModule, TooltipModule],
  templateUrl: './video-analizer.html',
  styleUrl: './video-analizer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoAnalizerComponent implements OnInit {
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
    // Initialize form control
    this.url.reset();
  }

  public async analyzeVideo() {
    if (this.url.invalid) {
      this.toastAlerts.error({ title: 'error', subtitle: 'Error please enter a valid url' });
      return;
    }
    this.toastAlerts.info({ title: 'info', subtitle: 'Analyzing video...' });
    await this.videoAnalizerService.startAnalyzeVideo(this.url.value as string);
    this.toastAlerts.success({ title: 'success', subtitle: 'Video analyzed successfully' });
  }

  public async extractInfo() {
    if (this.urls.invalid) {
      this.toastAlerts.error({ title: 'error', subtitle: 'Error please enter a valid url' });
      return;
    }
    const urls = this.urls.value?.split('\n');

    console.log(urls);
    debugger;
    const res = await this.videoAnalizerService.extractInfo(urls as string[]);
    // for (const url of urls) {
    //   await this.videoAnalizerService.startAnalyzeVideo(url);
    // }
  }

  public navigateTo(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  public navigateToGenerator() {
    this.router.navigate(['../video-generator'], { relativeTo: this.route });
  }
}
