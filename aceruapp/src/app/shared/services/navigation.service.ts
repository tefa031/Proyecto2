import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  redirect(page: string, parameter?: any) {
    console.log(page);

    if (parameter)
      this.router.navigate([page, parameter])
    else
      this.router.navigate([page])
  }

  getActualPage(page: string) {
    return window.location.href.includes(page)
  }
}
