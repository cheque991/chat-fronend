import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceGuard implements CanActivate, CanActivateChild {
  public token;

  constructor(private userService: UserServiceService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(next, state);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(next, state);
  }

  private check(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.token = this.userService.getToken();

    if (this.token === null) {
      console.log('no se cuenta con token de acceso');
      //this.messageService.printStatus('Se ha expirado tu sesión, favor de ingresar de nuevo', 'error');
      this.userService.logout();
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }

  }

}
