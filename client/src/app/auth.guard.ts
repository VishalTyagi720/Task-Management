import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const toast = inject(NgToastService)

  let loggedInUser = localStorage.getItem('id')

  if (loggedInUser == null) {
    toast.warning("Plz... Login to get User Data", 'WARNING', 3000)
    router.navigate(['login'])
    return false;
  }

  return true;
};


export const loggedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const toast = inject(NgToastService)

  let loggedInUser = localStorage.getItem('id')

  if (loggedInUser != null) {
    // toast.warning("Already logged in", 'WARNING', 3000)
    router.navigate([''])
    return false;
  }

  return true;
};
