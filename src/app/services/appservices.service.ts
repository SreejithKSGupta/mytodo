import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AppservicesService {
  isdarkmode = signal(
    typeof window !== 'undefined' &&
      document.body.classList.contains('dark-mode')
  );

  constructor() {
    effect(() => {
      if (typeof window != 'undefined') {
        let themeMode = this.isdarkmode() ? 'dark-mode' : 'light-mode';
        localStorage.setItem('thememode', themeMode);
        if (this.isdarkmode()) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
    });
  }
}
