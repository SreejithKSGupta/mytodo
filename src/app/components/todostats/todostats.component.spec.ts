import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodostatsComponent } from './todostats.component';

describe('TodostatsComponent', () => {
  let component: TodostatsComponent;
  let fixture: ComponentFixture<TodostatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodostatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodostatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
