import { Component, inject } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TodobodyComponent } from "./components/todobody/todobody.component";
import { AppservicesService } from './services/appservices.service';
import {  MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddtodoComponent } from './components/addtodo/addtodo.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,  MatDialogModule, FooterComponent, TodobodyComponent,MatIconModule, MatFabButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddtodoComponent,{
    width: '500px',
    panelClass: 'todo-dialog',
    enterAnimationDuration:200,


  }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  title = 'mytodo';
     constructor(public appservices:AppservicesService){
    }


    toggleaddtodo(){
      this.openDialog();
    }
}
