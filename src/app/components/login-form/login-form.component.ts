import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

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
    public router: Router,
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
    this.authService.login(login, password).subscribe(
     (isLogged) => {
        // Navigate to task list component
        if (isLogged) {
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = 'Invalid login or password';
        }
    });
  }
}
