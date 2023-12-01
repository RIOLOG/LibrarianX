import { Injectable, EventEmitter } from '@angular/core';
import {signin, signup, User }  from '../models/model'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private users: any[] = [];
private currentUser: any = null;

constructor(private http: HttpClient, private route: Router) { }

private baseUrl = 'https://localhost:7193/api';

signIn(username: string, password: string): Observable<any> {
  const user = { Username: username, Password: password };
  return this.http.post(`${this.baseUrl}/User/signin?username=${username}&password=${password}`, user);
}

getCurrentUser(): any {
  return this.currentUser;
}

isLoggedIn(): boolean {
  return this.currentUser !== null;
}

signOut(): void {
  this.currentUser = null;
}
}
