import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public opened:boolean = false;

  createTask(){
    this.opened = true;
  }

  cancelTask(){
    this.opened = false;
  }
}
