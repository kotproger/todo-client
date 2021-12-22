import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { ResponseHttp } from '../models/http.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp<Task[]>>(environment.phpUrl + 'api/tasks').pipe(
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
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

  updateTask(Task: Task) : Observable<Task> {
    return this.http.put<ResponseHttp<Task>>(environment.phpUrl + 'api/tasks/' + Task.id, Task).pipe(
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }
  storeTask(Task: Task) : Observable<Task> {
    return this.http.post<ResponseHttp<Task>>(environment.phpUrl + 'api/tasks', Task).pipe(
      map((responce) => {
        return responce.data!;
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  constructor(private http: HttpClient) { }
}
