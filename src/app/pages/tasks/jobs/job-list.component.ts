import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  public id = this.route.snapshot.params['id'];
  public displayJobDetails = false;
  jobs: any[] = []; // Replace 'any' with your job interface/type
  public selectedJob: any;
  constructor(private route: ActivatedRoute, private jobsService: JobsService) {}

  ngOnInit(): void {
    // Initialize component data
    this.loadJobs();
  }

  async loadJobs() {
    if (this.id) {
      const jobs = await this.jobsService.getJobsByTaskId(this.id);
      this.jobs = jobs;
      debugger;
    } else {
      alert('You need your task id to load jobs');
    }
    // TODO: Implement job loading logic
    // This would typically involve a service call
  }

  addJob(): void {
    // TODO: Implement add job logic
  }

  editJob(job: any): void {
    // TODO: Implement edit job logic
  }

  deleteJob(job: any): void {
    // TODO: Implement delete job logic
  }

  viewJobDetails(job: any): void {
    this.selectedJob = job;
    this.displayJobDetails = true;
    debugger;
    // TODO: Implement view job details logic
  }
}
