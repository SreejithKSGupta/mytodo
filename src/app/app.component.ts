import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TodobodyComponent } from "./components/todobody/todobody.component";
import { TodomanagerService } from './services/todomanager.service';
import { AppservicesService } from './services/appservices.service';
import {  MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,  FooterComponent, TodobodyComponent,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mytodo';
     constructor(public appservices:AppservicesService){
    }


    toggleaddtodo(){
      this.appservices.isaddtodoshown.update(currentstate=>!currentstate);
    }
}
