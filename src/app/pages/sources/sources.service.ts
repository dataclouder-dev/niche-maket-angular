import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Endpoints } from '../../core/enums';
import { ISourceLLM } from './models/sources.model';
import { FiltersConfig, IFilterQueryResponse } from '@dataclouder/core-components';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(private httpService: HttpService) {}

  public async getSources() {
    return this.httpService.getDataFromService<ISourceLLM[]>(Endpoints.Sources.Source);
  }

  public async getFilteredSources(filterConfig: FiltersConfig) {
    return this.httpService.postDataToService<IFilterQueryResponse<ISourceLLM>>(Endpoints.Sources.QuerySources, filterConfig);
  }

  public async getSource(id: string) {
    return this.httpService.getDataFromService<ISourceLLM>(`${Endpoints.Sources.Source}/${id}`);
  }

  public async saveSource(source: ISourceLLM) {
    return this.httpService.postDataToService<ISourceLLM>(Endpoints.Sources.Source, source);
  }

  public async deleteSource(id: string) {
    return this.httpService.deleteDataFromService(`${Endpoints.Sources.Source}/${id}`);
  }

  public async getYoutubeContent(url: string) {
    return this.httpService.getDataFromService<string>(`${Endpoints.Sources.YoutubeTranscript}?url=${url}`);
  }
}
