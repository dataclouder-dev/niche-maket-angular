import { Injectable } from '@angular/core';
import { UserDataExchange, UserDataExchangeAbstractService } from '@dataclouder/conversation-system';
import { Endpoints } from 'src/app/core/enums';
import { HttpService } from 'src/app/services/http.service';
import { AgentTask } from '../models/tasks-models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpService: HttpService) {}

  public getTasks() {
    return this.httpService.getDataFromService(Endpoints.Tasks.List);
  }

  public saveTask(task: AgentTask) {
    return this.httpService.postDataToService(Endpoints.Tasks.Save, task);
  }
}
