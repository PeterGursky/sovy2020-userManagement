import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, scheduled, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth } from '../entities/auth';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [new User("Petra", "petra@gursky.sk", 12),
          new User("Jana", "janka@jano.sk", 18)];
  private serverUrl = "http://localhost:8080/";
  private token: string = null;

  constructor(private http: HttpClient) { }

  login(auth:Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + "login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 ) {
          return of(false);
        }
        return throwError(error);
      })
    );
  }

  getUsersSynchronne():User[] {
    return this.users;
  }

  getUsersAsynchronne():Observable<User[]> {
    return of(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.serverUrl + "users/abc").pipe(
      map(usersFromServer => this.mapToUsers(usersFromServer))
    );
  }

  mapToUsers(usersFromServer:Array<any>):User[] {
    return usersFromServer.map(u => new User(u.name, u.email, u.id));    
  }
}
