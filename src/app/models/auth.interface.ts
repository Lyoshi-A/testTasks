import { Observable } from 'rxjs';
export interface IAuthServiceInterface {
  login(username: string, password: string): Observable<boolean>;
  logout(): void;
  isLogged(): boolean;
}
