import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-task-drawer',
  templateUrl: './create-task-drawer.component.html',
  styleUrls: ['./create-task-drawer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskDrawerComponent implements OnInit {

  @Output() cancelTask = new EventEmitter<boolean>();

  public taskText:string = '';
  public inProgress:boolean = false;

  constructor(
    public taskService: TaskService,
    public snackBar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  addNewTask(){
    this.inProgress = true;
    this.taskService.createTask(this.taskText).subscribe(
      response => {
        this.inProgress = false;
        this.taskService.addTaskToList(response);
        this.taskText = '';
        this.ref.markForCheck();
        this.cancelTask.emit(true);
      },
      err => {
        this.inProgress = false;
        this.ref.markForCheck();
        if(err.error!.errors!)
          this.snackBar.open(err.error.errors[0], 'Error');
      });
  }

}
