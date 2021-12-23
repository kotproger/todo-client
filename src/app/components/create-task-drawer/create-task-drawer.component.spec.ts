import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskDrawerComponent } from './create-task-drawer.component';

describe('CreateTaskDrawerComponent', () => {
  let component: CreateTaskDrawerComponent;
  let fixture: ComponentFixture<CreateTaskDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
