import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AgentTask, AgentTaskOptions, AgentTaskStatus, AgentTaskStatusOptions, AgentTaskType } from '../models/tasks-models';
import { TextareaModule } from 'primeng/textarea';
import { TasksService } from '../services/tasks.service';
import { AgentCardService } from 'src/app/services/conversation-cards-ai-service';
import { NotionService } from '../services/notion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ToastAlertService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, CardModule, DropdownModule, TextareaModule, AutoCompleteModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent implements OnInit {
  sourceSuggestions: any[] = [];

  value: any;

  search(event: AutoCompleteCompleteEvent) {
    if (this.sourcesOptions.length === 0) {
      this.toastService.info({ title: 'Buscando', subtitle: 'Espera buscando fuentes...' });
      this.getSources();
    }

    this.sourceSuggestions = this.sourcesOptions.filter(item => item.label.toLowerCase().includes(event.query.toLowerCase()));
  }
  // ---
  public id = this.route.snapshot.params['id'];
  taskForm!: FormGroup;
  taskTypes = AgentTaskOptions;

  statuses = AgentTaskStatusOptions;
  private sourcesOptions: any[] = [];

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

  ngOnInit() {
    this.initForm();
    this.getTaskIfIdParam();
    this.getAgentCards();
    // this.getNotionDBs();
    // this.getSources();
  }

  private async getTaskIfIdParam() {
    if (this.id) {
      const task = await this.tasksService.getTaskById(this.id);
      this.taskForm.patchValue(task);
      this.cdr.detectChanges();
    }
  }

  private async getSources() {
    const sources = await this.notionService.getPagesAvailable();
    this.sourcesOptions = sources.pages.map((page: any) => ({ label: page.title, value: page.id }));
    this.toastService.success({ title: 'Fuentes encontradas', subtitle: 'Intenta de nuevo' });
    this.cdr.detectChanges();
  }

  private initForm() {
    this.taskForm = this.fb.group({
      _id: [''],
      idAgentCard: [''],
      idNotionDB: [''],
      name: ['', Validators.required],
      description: [''],
      status: [AgentTaskStatus.ACTIVE],
      taskType: [AgentTaskType.POST_NOTION],
      sources: [[]],
    });
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      const taskData: AgentTask = this.taskForm.value;
      console.log('Task submitted:', taskData);
      const task = await this.tasksService.saveTask(taskData);
      this.router.navigate([task._id], { relativeTo: this.route });
    }
  }

  public agentOptions: any[] = [];

  private async getAgentCards() {
    const agentCards = await this.agentCardService.findAgentCards({});
    this.agentOptions = agentCards.rows.map((card: any) => ({ label: card.title, value: card.id }));
    console.log('Agent cards:', this.agentOptions);
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
}
