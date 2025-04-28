import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AppservicesService } from '../../services/appservices.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [MatIconModule,MatSlideToggleModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  thememode=true;

  constructor(private appservice:AppservicesService){
     this.thememode=this.appservice.isdarkmode();
  }

  toggletheme(){
    this.appservice.isdarkmode.set(this.thememode);
  }

}
