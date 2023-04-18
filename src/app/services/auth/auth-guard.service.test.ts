import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access to the route for authenticated users', () => {
    spyOn(authService, 'isLogged').and.returnValue(true);

    guard.canActivate(null, null).subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it('should redirect unauthorized users to the login page', () => {
    spyOn(authService, 'isLogged').and.returnValue(false);
    spyOn(router, 'navigate');

    guard.canActivate(null, null).subscribe(result => {
      expect(result).toBeInstanceOf(UrlTree);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
