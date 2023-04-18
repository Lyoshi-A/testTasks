import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHeaderComponent } from './app-header.component';
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

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderComponent ],
      imports: [
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
      providers: [ AuthService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isLoggedIn', () => {
    it('should return true if user is logged in', () => {
      spyOn(authService, 'isLogged').and.returnValue(true);
      expect(component.isLoggedIn()).toBeTrue();
    });

    it('should return false if user is not logged in', () => {
      spyOn(authService, 'isLogged').and.returnValue(false);
      expect(component.isLoggedIn()).toBeFalse();
    });
  });

  describe('onLogout', () => {
    it('should call authService.logout() and navigate to login page', () => {
      const authServiceSpy = spyOn(authService, 'logout');
      const routerNavigateSpy = spyOn(component.router, 'navigate');
      component.onLogout();
      expect(authServiceSpy).toHaveBeenCalled();
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
