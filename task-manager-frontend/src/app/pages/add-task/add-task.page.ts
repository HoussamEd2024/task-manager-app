import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    // Initialisation du formulaire avec les 4 champs requis
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],  // Ajoute la date d'échéance
      priority: ['normal', [Validators.required]]  // Ajoute la priorité avec 'normal' par défaut
    });
  }

  ngOnInit() {}

  // Méthode appelée lorsque le formulaire est soumis
  submit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe(
        (response) => {
          console.log('Task added:', response);
          this.router.navigate(['/task-list']); // Redirection après l'ajout
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }
}
