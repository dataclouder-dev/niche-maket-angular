import { Injectable } from '@angular/core';
import { IAgentCard } from '@dataclouder/conversation-system';
import { Endpoints } from 'src/app/core/enums';
import { HttpService } from 'src/app/services/http.service';

export type NotionDBResponse = {
  success: boolean;
  databases: { id: string; title: string; url: string; created_time: string }[];
  error?: string;
  count: number;
};

export type NotionPageResponse = {
  success: boolean;
  pages: { id: string; title: string; url: string; created_time: string }[];
  error?: string;
  count: number;
};

@Injectable({
  providedIn: 'root',
})
export class NotionService {
  constructor(private httpService: HttpService) {}

  public getDBAvailible(): Promise<NotionDBResponse> {
    return this.httpService.getDataFromService(Endpoints.Notion.ListDBs);
  }

  public getPagesAvailable(): Promise<NotionPageResponse> {
    return this.httpService.getDataFromService(Endpoints.Notion.ListPages);
  }

  public createNotionPage(card: IAgentCard): Promise<{ success: boolean; error: string; page: any }> {
    return this.httpService.getDataFromService(`${Endpoints.Notion.CreatePage}/${card.id}`);
  }
}
