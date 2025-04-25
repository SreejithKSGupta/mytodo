import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppservicesService {
  isaddtodoshown=signal(false);
  constructor() {

   }

}
