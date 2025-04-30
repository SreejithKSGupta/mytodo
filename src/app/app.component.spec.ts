import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppservicesService } from './services/appservices.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let appServicesStub: Partial<AppservicesService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    appServicesStub = {
      isdarkmode: signal(true)
    };




    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatDialogModule,AppComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: AppservicesService, useValue: appServicesStub }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' }; // Optional
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

});
