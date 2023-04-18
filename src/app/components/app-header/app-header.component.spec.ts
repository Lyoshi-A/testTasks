import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHeaderComponent } from './app-header.component';
import { AuthService } from '../../services/auth/auth.service';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderComponent ],
      imports: [ RouterTestingModule ],
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
