import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { take } from 'rxjs/operators';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().pipe(
      take(1)
    )
    .subscribe(result => {
      console.log(result);
    })
  }

}
