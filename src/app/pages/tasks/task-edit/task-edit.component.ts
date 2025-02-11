import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { IAgentTask, AgentTaskOptions, AgentTaskStatus, AgentTaskStatusOptions, AgentTaskType, ISourceTask } from '../models/tasks-models';
import { TextareaModule } from 'primeng/textarea';
import { TasksService } from '../services/tasks.service';
import { AgentCardService } from 'src/app/services/conversation-cards-ai-service';
import { NotionService } from '../services/notion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ToastAlertService } from 'src/app/services/toast.service';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

interface AgentCardOption {
  label: string;
  value: string;
  assets: Record<string, any>;
}

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
    TextareaModule,
    AutoCompleteModule,
    ChipModule,
    TooltipModule,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent implements OnInit {
  public task: IAgentTask | null = null;
  public sourceSuggestions: ISourceTask[] = [];
  public selectedSource: string = '';
  public selectedAssets: any = null;
  public id = this.route.snapshot.params['id'];

  public taskForm = this.fb.group({
    _id: [''],
    agentCard: this.fb.group({
      id: [''],
      assets: [{}],
    }),
    idNotionDB: [''],
    name: ['', Validators.required],
    description: [''],
    status: [AgentTaskStatus.ACTIVE],
    taskType: [AgentTaskType.POST_NOTION],
    sources: this.fb.control<any[]>([]),
  });

  public taskTypes = AgentTaskOptions;

  public statuses = AgentTaskStatusOptions;
  private sourcesOptions: ISourceTask[] = [];

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private agentCardService: AgentCardService,
    private notionService: NotionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastAlertService
  ) {}

  async ngOnInit() {
    await this.getTaskIfIdParam();
    this.getAgentCards();
    this.getNotionDBs();
    // this.getSources();
  }

  private async getTaskIfIdParam() {
    if (this.id) {
      this.task = await this.tasksService.getTaskById(this.id);
      this.taskForm.patchValue(this.task as any);
      this.cdr.detectChanges();
    }
  }

  private async getSources() {
    const sources = await this.notionService.getPagesAvailable();
    this.sourcesOptions = sources.pages.map((page: any) => ({ id: page.id, name: page.title, type: 'notion' }));

    this.toastService.success({ title: 'Fuentes encontradas', subtitle: 'Intenta de nuevo' });
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

  public agentOptions: AgentCardOption[] = [];

  private async getAgentCards() {
    const agentCards = await this.agentCardService.findAgentCards({});

    this.agentOptions = agentCards.rows.map((card: any) => ({
      label: card.title || 'Untitled Card',
      value: card.id,
      assets: card.assets,
    }));

    this.showAgentImage(this.task?.agentCard?.id as string);

    this.cdr.detectChanges();
  }

  public dbOptions: any[] = [];

  private async getNotionDBs() {
    const notionDBs = await this.notionService.getDBAvailible();
    console.log('Notion DBs:', notionDBs);
    this.dbOptions = notionDBs.databases.map((db: any) => ({ label: db.title, value: db.id }));
    console.log('DBs:', this.dbOptions);

    // this.notionDBOptions = notionDBs.map((db: any) => ({ label: db.name, value: db.id }));
    // console.log('Notion DBs:', this.notionDBOptions);
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

  removeSource(sourceToRemove: string) {
    const currentSources = this.taskForm.get('sources')?.value || [];
    // tODO fix this
    // this.taskForm.patchValue({
    //   sources: currentSources.filter((source: string) => source !== sourceToRemove),
    // });
    this.cdr.detectChanges();
  }

  search(event: AutoCompleteCompleteEvent) {
    if (this.sourcesOptions.length === 0) {
      this.toastService.info({ title: 'Buscando', subtitle: 'Espera buscando fuentes...' });
      this.getSources();
    }

    this.sourceSuggestions = this.sourcesOptions.filter(item => item.name.toLowerCase().includes(event.query.toLowerCase()));
  }

  selectSource(event: any) {
    this.selectedSource = event.value;
    const currentSources = this.taskForm.controls.sources.value ?? [];

    this.taskForm.patchValue({
      sources: [...currentSources, this.selectedSource],
    });
  }

  onAgentCardChange(event: any) {
    this.showAgentImage(event.value);
  }

  showAgentImage(id: string) {
    const agentCard = this.agentOptions.find(option => option.value === id);
    console.log('Agent card:', agentCard);
    this.selectedAssets = agentCard?.assets;
    this.cdr.detectChanges();
  }
}
