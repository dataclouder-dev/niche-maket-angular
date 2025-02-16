import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Endpoints } from '../../core/enums';
import { ISourceLLM } from './models/sources.model';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(private httpService: HttpService) {}

  public async getSources() {
    return this.httpService.getDataFromService<ISourceLLM[]>(Endpoints.Sources.Source);
  }

  public async getSource(id: string) {
    return this.httpService.getDataFromService<ISourceLLM>(`${Endpoints.Sources.Source}/${id}`);
  }

  public async saveSource(source: ISourceLLM) {
    return this.httpService.postDataToService<ISourceLLM>(Endpoints.Sources.Source, source);
  }
}
