import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem('isLoggedIn');
  });

  it('should return true when login with correct username and password', () => {
    authService.login('user', 'password').subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(true);
    });
  });

  it('should return false when login with incorrect username or password', () => {
    authService.login('invalid', 'invalid').subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(false);
    });
  });

  it('should return true when isLogged() is called after login', () => {
    authService.login('user', 'password');
    expect(authService.isLogged()).toBe(true);
  });

  it('should return false when isLogged() is called after logout', () => {
    authService.logout();
    expect(authService.isLogged()).toBe(false);
  });
});
