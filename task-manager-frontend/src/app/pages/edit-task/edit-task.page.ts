import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  taskForm: FormGroup;
  taskId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire avec les 4 champs requis
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],  // Champ pour la date d'échéance
      priority: ['normal', [Validators.required]]  // Champ pour la priorité
    });
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id')!; // Récupération de l'ID de la tâche à partir de l'URL
    this.loadTask(); // Chargement des données de la tâche
  }

  // Charger la tâche existante dans le formulaire
  loadTask() {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task) => {
        if (task) {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority
          });
        }
      },
      (error) => {
        console.error('Error loading task:', error);
      }
    );
  }

  // Méthode appelée lorsque le formulaire est soumis
  submit() {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(
        (response) => {
          console.log('Task updated:', response);
          this.router.navigate(['/task-list']); // Redirection après mise à jour
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }
}
