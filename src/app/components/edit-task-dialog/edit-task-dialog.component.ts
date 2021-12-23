import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskDialogComponent implements OnInit {

  public inProgress: Boolean = false;
  public editedTask: Task;


  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { 
    this.editedTask = {
      id: data.id,
      text: data.text,
      created_at: data.created_at
    };
  }

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.inProgress = true;
    this.taskService.updateTask(this.editedTask)
    
    .subscribe(
      response => {
        this.inProgress = false;
        this.taskService.updateTasksList(response);
        this.dialogRef.close();
      },
      err => {
        this.inProgress = false;
        this.ref.markForCheck();
        if(err.error!.errors!)
          this.snackBar.open(err.error.errors[0], 'Error');
      }
    );
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
