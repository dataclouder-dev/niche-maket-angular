import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAgentCard, ProviderSelectorComponent } from '@dataclouder/conversation-system';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

import { TextareaModule } from 'primeng/textarea';

import { IAgentTask, AgentTaskOptions, AgentTaskStatus, AgentTaskStatusOptions, AgentTaskType, ISourceTask } from '../models/tasks-models';
import { TasksService } from '../services/tasks.service';
import { AgentCardService } from 'src/app/services/conversation-cards-ai-service';
import { NotionService } from '../services/notion.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ToastAlertService } from 'src/app/services/toast.service';
import { SourceService } from '../../sources/sources.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    SelectModule,
    TextareaModule,
    AutoCompleteModule,
    ChipModule,
    TooltipModule,
    ProviderSelectorComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  public task: IAgentTask | null = null;
  public sourceSuggestions: ISourceTask[] = [];
  public selectedSource: string = '';
  public selectedAssets: any = null;
  public id = this.route.snapshot.params['id'];

  public sources: ISourceTask[] = [];
  public dbOptions: any[] = [];

  public taskForm = this.fb.group({
    _id: [''],
    agentCards: this.fb.control<any[]>([]),
    notionOutput: this.fb.control<any>({}),
    name: ['', Validators.required],
    description: [''],
    status: [AgentTaskStatus.ACTIVE],
    taskType: [AgentTaskType.POST_NOTION],
    sources: this.fb.control<any[]>([]),
    provider: ['openai'],
    modelName: ['gpt-3.5-turbo'],
  });

  public taskTypes = AgentTaskOptions;

  public statuses = AgentTaskStatusOptions;
  private sourcesOptions: ISourceTask[] = [];
  public agentOptions: IAgentCard[] = [];

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private agentCardService: AgentCardService,
    private notionService: NotionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastAlertService,
    private sourceService: SourceService
  ) {}

  async ngOnInit() {
    await this.getTaskIfIdParam();
    this.getAgentCards();
    // this.getNotionDBs();
    // this.getSources();
    this.getAgentSources();
  }

  private async getTaskIfIdParam() {
    if (this.id) {
      this.task = await this.tasksService.getTaskById(this.id);
      if (this.task.notionOutput) {
        this.dbOptions = [this.task.notionOutput];
      }
      this.taskForm.patchValue(this.task as any);
      console.log('Task:', this.taskForm.value);
      debugger;
      this.cdr.detectChanges();
    }
  }

  // TODO: Deprecated
  // private async getSources() {
  //   const sources = await this.notionService.getPagesAvailable();
  //   this.sourcesOptions = sources.pages.map((page: any) => ({ id: page.id, name: page.title, type: 'notion' }));

  //   this.toastService.success({ title: 'Fuentes encontradas', subtitle: 'Intenta de nuevo' });
  //   this.cdr.detectChanges();
  // }

  public addSourceToTask(event: { originalEvent: any; value: ISourceTask }) {
    debugger;
    this.taskForm.patchValue({
      sources: [...(this.taskForm.controls.sources.value || []), event.value],
    });
    console.log('Sources:', this.taskForm.controls.sources.value);
    this.cdr.detectChanges();
  }

  private async getAgentSources() {
    this.sources = await this.sourceService.getSources();
    this.cdr.detectChanges();
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      const taskData: IAgentTask = this.taskForm.value as any;
      console.log('Task submitted:', taskData);
      const task = await this.tasksService.saveTask(taskData);
      if (!this.id) {
        this.router.navigate([task._id], { relativeTo: this.route });
      } else {
        this.toastService.success({ title: 'Tarea actualizada', subtitle: 'Tarea actualizada correctamente' });
      }
    }
  }

  private async getAgentCards() {
    const agentCards = await this.agentCardService.findAgentCards({});

    this.agentOptions = agentCards.rows.map((card: IAgentCard) => ({
      title: card.title || 'Untitled Card',
      id: card.id,
      assets: card.assets,
      name: card?.characterCard?.data?.name,
    }));
    debugger;

    this.cdr.detectChanges();
  }

  public async getNotionDBs() {
    const notionDBs = await this.notionService.getDBAvailible();
    this.dbOptions = notionDBs.databases.map((db: any) => ({ name: db.title, id: db.id, type: 'database' }));

    console.log('DBs:', this.dbOptions);
    this.toastService.success({ title: 'Bases encontradas', subtitle: 'Selecciona alguna' });
    this.cdr.detectChanges();
  }

  addSource() {
    // fix this to filter selectedSource
    if (this.selectedSource) {
      const currentSources = this.taskForm.get('sources')?.value || [];
      // if (!currentSources.includes(this.selectedSource)) {
      //   this.taskForm.patchValue({
      //     sources: [...currentSources, this.selectedSource],
      //   });
      //   this.selectedSource = '';
      //   this.cdr.detectChanges();
      // }
    }
  }

  public removeSource(sourceToRemove: string) {
    const currentSources = this.taskForm.get('sources')?.value || [];
    this.cdr.detectChanges();
  }

  selectSource(event: any) {
    debugger;
    this.selectedSource = event.value;
    const currentSources = this.taskForm.controls.sources.value ?? [];

    this.taskForm.patchValue({
      sources: [...currentSources, this.selectedSource],
    });
  }

  onAgentCardChange(event: any) {
    debugger;
    // let agentCard: any = this.agentOptions.find(option => option.id === event.value);
    // agentCard = { ...agentCard, id: event.value };
    this.taskForm.patchValue({
      agentCards: [...(this.taskForm.controls.agentCards.value || []), event.value],
    });
    console.log('Agent cards:', this.taskForm.controls.agentCards.value);
  }

  removeAgentCard(agentCard: any) {
    const currentAgentCards = this.taskForm.controls.agentCards.value || [];
    this.taskForm.patchValue({
      agentCards: currentAgentCards.filter((card: any) => card.id !== agentCard.id),
    });
  }
}
