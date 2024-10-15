import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://192.168.1.104:5000/api/tasks';  
  private tasksSubject = new BehaviorSubject<any[]>([]); // Subject pour stocker les tâches
  tasks$ = this.tasksSubject.asObservable(); // Observable pour s'abonner aux tâches

  constructor(private http: HttpClient) {
    this.loadTasks(); // Charger les tâches au démarrage
  }

  // Charger les tâches depuis l'API et émettre les résultats
  private loadTasks() {
    this.getTasks().subscribe((tasks) => {
      this.tasksSubject.next(tasks); // Émettre les tâches aux abonnés
    });
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); // Nouvelle méthode pour récupérer une tâche par ID
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, task).pipe(
      tap(() => this.loadTasks()) // Recharger les tâches après ajout
    );
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => this.loadTasks()) // Recharger les tâches après mise à jour
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTasks()) // Recharger les tâches après suppression
    );
  }
}
