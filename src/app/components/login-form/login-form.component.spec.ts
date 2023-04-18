import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from './login-form.component';
import { AuthService } from '../../services/auth/auth.service';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let loginSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatDividerModule,
        MatCardModule
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    loginSpy = spyOn(authService, 'login').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error message if the login fails', () => {
    const errorMessage = 'Invalid login or password';
    loginSpy.and.returnValue(of(false));
    component.onSubmit();
    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should navigate to the tasks page if the login succeeds', () => {
    const login = 'user';
    const password = 'password';
    component.loginForm.controls['login'].setValue(login);
    component.loginForm.controls['password'].setValue(password);
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks']);
  });

  it('should call the authService login method with the login and password entered', () => {
    const login = 'user';
    const password = 'password';
    component.loginForm.controls['login'].setValue(login);
    component.loginForm.controls['password'].setValue(password);
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalledWith(login, password);
  });

  it('should disable the form submit button when the form is invalid', () => {
    component.loginForm.controls['login'].setValue('');
    component.loginForm.controls['password'].setValue('');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable the form submit button when the form is valid', () => {
    component.loginForm.controls['login'].setValue('user');
    component.loginForm.controls['password'].setValue('password123');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  });
});
