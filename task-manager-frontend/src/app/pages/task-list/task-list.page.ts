import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    // S'abonner aux tâches pour mettre à jour la liste automatiquement
    this.taskService.tasks$.subscribe((data) => {
      this.tasks = data; // Met à jour la liste des tâches
    });
  }

  addTask() {
    this.router.navigate(['/add-task']);
  }

  editTask(task: any) {
    this.router.navigate(['/edit-task', task.id]);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      // Pas besoin d'appeler getTasks ici, car la liste se met à jour automatiquement
    });
  }
}
