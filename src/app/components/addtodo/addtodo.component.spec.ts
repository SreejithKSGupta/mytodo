import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtodoComponent } from './addtodo.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddtodoComponent', () => {
  let component: AddtodoComponent;
  let fixture: ComponentFixture<AddtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtodoComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
