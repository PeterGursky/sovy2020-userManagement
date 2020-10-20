import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [new User("Petra", "petra@gursky.sk", 12),
          new User("Jana", "janka@jano.sk", 18)];
  private serverUrl = "http://localhost:8080/";


  constructor(private http: HttpClient) { }

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
