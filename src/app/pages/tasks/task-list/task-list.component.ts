import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { DCFilterBarComponent } from '@dataclouder/core-components';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DCFilterBarComponent, CardModule, ButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  public tasks: any[] = [];
  ngOnInit() {
    this.getTasks();
  }

  onNew() {
    console.log('onNew');
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  public async getTasks() {
    const tasks = await this.tasksService.getTasks();
    this.tasks = tasks;
    this.cdr.detectChanges();
  }

  public editTask(task: any) {
    console.log('editTask', task);

    this.router.navigate(['./edit', task._id], { relativeTo: this.route });
  }

  public async deleteTask(task: any) {
    const isConfirmed = confirm('¿Estás seguro de querer eliminar esta tarea?');
    if (isConfirmed) {
      console.log('deleteTask', task);
      try {
        await this.tasksService.deleteTask(task._id);
        this.tasks = this.tasks.filter(t => t._id !== task._id);
        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  }

  public executeTask(task: any) {
    console.log('executeTask', task);
    this.tasksService.executeTask(task._id);
  }
}
