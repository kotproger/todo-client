import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
    .pipe(
      take(1)
    )
    .subscribe(
      result => {
        this.inProgress = false;
        //this.dialogRef.close(result);
      },
      err => {
        this.inProgress = false;
        this.snackBar.open(err, 'error');
      }
    );
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
