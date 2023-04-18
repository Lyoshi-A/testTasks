import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const login = this.loginForm.value.login;
    const password = this.loginForm.value.password;
    this.authService.login(login, password).subscribe({
      next: (isLogged) => {
        // Navigate to task list component
        if (isLogged) this.router.navigate(['/tasks']);
      },
      error: () => {
        this.errorMessage = 'Invalid login or password';
      }
    });
  }
}
