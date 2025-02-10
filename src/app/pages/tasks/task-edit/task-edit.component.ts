import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AgentTask } from '../models/tasks-models';
import { TextareaModule } from 'primeng/textarea';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, CardModule, DropdownModule, TextareaModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;

  statuses: any[] = [
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
  ];

  constructor(private fb: FormBuilder, private tasksService: TasksService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.taskForm = this.fb.group({
      id: [''],
      idAgentCard: [''],
      idNotionDB: [''],
      name: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
    });
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      const taskData: AgentTask = this.taskForm.value;
      console.log('Task submitted:', taskData);
      await this.tasksService.saveTask(taskData);
    }
  }
}
