import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAdministrator()) {
      return true;
    } else {
      console.log('User is not admin.');
      this.router.navigate(['/']);
      return false;
    }
  }
}