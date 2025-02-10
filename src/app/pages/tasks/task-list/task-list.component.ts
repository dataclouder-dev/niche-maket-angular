import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { DCFilterBarComponent } from '@dataclouder/core-components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DCFilterBarComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.tasksService.getTasks().then(tasks => {
      console.log(tasks);
      debugger;
    });
  }

  onNew() {
    console.log('onNew');
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }
}
