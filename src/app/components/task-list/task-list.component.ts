import { Component, OnInit, ChangeDetectionStrategy, ComponentFactoryResolver } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'text', 'created_at', 'action'];

  constructor(
    public taskService: TaskService,
    public dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.taskService.getTasks();
  }

  onDelete(task:Task){
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '350px',
      data: task,
      hasBackdrop: true,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
  
    });
  }
  
  onEdit(task:Task){
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '350px',
      data: task,
      hasBackdrop: true,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
  
    });
  }

}
