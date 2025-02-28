import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/core/enums';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class VideoAnalizerService {
  constructor(private httpService: HttpService) {}

  public startAnalyzeVideo(url: string) {
    return this.httpService.postDataToService('api/video-analizer', { url }, 'python');
  }

  public extractInfo(urls: string[]) {
    return this.httpService.postDataToService('api/video-analizer/extract-tiktok-data', { urls }, 'python');
  }
}
