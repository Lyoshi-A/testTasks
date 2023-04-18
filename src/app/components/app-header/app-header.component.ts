import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  constructor(
    private authService: AuthService,
    public router: Router,
  ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLogged();
  }
}
