import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private user: any;
  private isAuthenticated!: boolean;
  constructor(private http : HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.isAuthenticated = !!localStorage.getItem('currentUser');
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isAdministrator(): boolean {
    const stored = localStorage.getItem('currentUser');
    if(stored){
      const user = JSON.parse(stored);
      return user && user.role === 'admin';
    } else {
      return false;
    };
  };

  isUser(): boolean{
    const stored = localStorage.getItem('currentUser');
    if(stored){
      const user = JSON.parse(stored);
      return user && user.role === 'user' || user && user.role === 'admin';
    } else {
      return false;
    };
  };

  registerUser(user: any): Observable<any>{
    const detailUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      phone_number: user.phone_number,
      email: user.email,
      password: user.password,
      gender: user.gender,
      birthday: user.birthday
    }
    return this.http.post(`${environment.apiUrl}/users`, detailUser);
  }

  setCredentials(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCredentials(): any | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getUser(): any {
    return this.user;
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          this.user = {
            email,
            role: user.role === 'admin' ? 'admin' : 'user'
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isAuthenticated = true;
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    this.currentUserSubject.next(this.currentUserValue);
    this.user = null ;
    this.isAuthenticated = false;
    this.router.navigate(['/']);
    return of({ success: false });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.user?.role || null;
  }
}
