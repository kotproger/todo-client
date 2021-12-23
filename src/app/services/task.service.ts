import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { ResponseHttp } from '../models/http.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasksSubj$ = new ReplaySubject<Task[]>(undefined);
  public tasks$: Observable<Task[]> = this.tasksSubj$.asObservable();
  public tasks!: Task[];


  getTasks() {
    return this.http.get<ResponseHttp<Task[]>>(environment.phpUrl + 'api/tasks').pipe(
      take(1),
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
    .subscribe(response => {
      this.tasks = response;
      this.tasksSubj$.next(this.tasks);
    })
  }
  
  getTask(id: number) : Observable<Task> {
    return this.http.get<ResponseHttp<Task>>(environment.phpUrl + 'api/tasks/' + id).pipe(
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  updateTask(task: Task) : Observable<Task> {
    return this.http.put<ResponseHttp<Task>>(environment.phpUrl + 'api/tasks/' + task.id, task).pipe(
      take(1),
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  deleteTask(id: number) : Observable<Boolean> {
    return this.http.delete<ResponseHttp<Boolean>>(environment.phpUrl + 'api/tasks/' + id).pipe(
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  storeTask(task: Task) : Observable<Task> {
    return this.http.post<ResponseHttp<Task>>(environment.phpUrl + 'api/tasks', task).pipe(
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  updateTasksList(tasks: Task[]){
      this.tasksSubj$.next(tasks);
  }

  constructor(private http: HttpClient) { }
}
