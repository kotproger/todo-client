import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTaskDialogComponent implements OnInit {

  public inProgress: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.inProgress = true;
    this.taskService.deleteTask(this.data.id)
    .pipe(
      take(1)
    )
    .subscribe(result => {
      if(result){
        this.taskService.filterTasksList(this.data);
      }
      this.dialogRef.close();
    });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
