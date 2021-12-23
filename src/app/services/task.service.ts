import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { ResponseHttp } from '../models/http.model';
import 'rxjs/add/observable/throw';

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

  updateTask(task: Task) : Observable<Task> {
    return this.http.put<ResponseHttp<Task>>(environment.phpUrl + 'api/tasks/' + task.id, task).pipe(
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

  constructor(private http: HttpClient) { }
}
