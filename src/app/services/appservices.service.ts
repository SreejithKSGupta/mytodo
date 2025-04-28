import { Injectable, signal, effect, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppservicesService  {

  isdarkmode :signal<any>;

  constructor() {
    if (typeof window != 'undefined') {
      const themeMode = localStorage.getItem('thememode') ?? '"dark-theme"';
      this.isdarkmode = signal(themeMode);
    }
    else{
      this.isdarkmode=signal(false);
    }
    effect(() => {
      if (typeof window != 'undefined') {
        localStorage.setItem('thememode', JSON.stringify(this.isdarkmode()));
        if (this.isdarkmode()) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
        console.log('theme set :', this.isdarkmode());
      }
    });
  }

  // ngOnInit() {
  //   this.setthemeonload();
  // }

  // setthemeonload() {
  //   if (typeof window != 'undefined') {
  //     const themeMode = localStorage.getItem('thememode') ?? '"dark-theme"';
  //     this.isdarkmode.set(JSON.parse(themeMode));
  //   }
  // }
}
