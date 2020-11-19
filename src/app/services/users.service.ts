import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, observable, Observable, of, scheduled, Subscriber, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth } from '../entities/auth';
import { Group } from '../entities/group';
import { User } from '../entities/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [new User("Petra", "petra@gursky.sk", 12),
          new User("Jana", "janka@jano.sk", 18)];
  private serverUrl = "http://localhost:8080/";
  private loggedUserSubscriber: Subscriber<string>;
  
  private defaultRedirect = "/extended-users";
  public redirectAfterLogin =  this.defaultRedirect;

  public setDefaultRedirect() {
    this.redirectAfterLogin = this.defaultRedirect;
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private set token(value:string) {
    if (value)
      localStorage.setItem('token', value);
    else
      localStorage.removeItem('token');  
  }

  private get token() {
    return localStorage.getItem('token');
  }

  set user(value:string) {
    this.loggedUserSubscriber.next(value);
    if (value)
      localStorage.setItem('user', value);
    else
      localStorage.removeItem('user');  
  }

  get user() {
    return localStorage.getItem('user');
  }

  getUserObservable():Observable<string> {
    return new Observable(subscriber => {
      this.loggedUserSubscriber = subscriber;
      subscriber.next(this.user);
    });
  }

  login(auth:Auth): Observable<boolean | void> {
    return this.http.post(this.serverUrl + "login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.user = auth.name;
        this.messageService.sendMessage(`Nahlásenie používateľa ${auth.name} úspešné`,false);
        return true;
      }),
      catchError(error => {
        this.logout();
        return this.processHttpError(error);
      })
    );
  }

  logout() {
    this.token = null;
    this.user = null;
  }

  getUsersSynchronne():User[] {
    return this.users;
  }

  getUsersAsynchronne():Observable<User[]> {
    return of(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.serverUrl + "users").pipe(
      map(usersFromServer => this.mapToUsers(usersFromServer),
      catchError(error => this.processHttpError(error)))
    );
  }

  mapToUsers(usersFromServer:Array<any>):User[] {
    return usersFromServer.map(u => new User(u.name, u.email, u.id));    
  }

  getExtendedUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.serverUrl + "users/" + this.token).pipe(
      map(usersFromServer => this.mapToExtendedUsers(usersFromServer),
      catchError(error => this.processHttpError(error)))
    );
  }

  mapToExtendedUsers(usersFromServer:Array<any>):User[] {
    return usersFromServer.map(u => User.clone(u));    
  }

  saveUser(user:User): Observable<User | void> {
    return this.http.post<User>(this.serverUrl + "users/" + this.token, user).pipe(
      map(userFromServer => User.clone(userFromServer)),
      catchError(error => this.processHttpError(error))
    );
  }

  deleteUser(user:User) {
    return this.http.delete(this.serverUrl + "user/" + user.id + "/" + this.token).pipe(
      map(_ => true),
      catchError(error => this.processHttpError(error))
    );
  }

  getGroups():Observable<Group[] | void> {
    return this.http.get<Group[]>(this.serverUrl + "groups/").pipe(
      catchError(error => this.processHttpError(error)));
  }

  getGroup(groupId: number):Observable<Group> {
    return this.http.get<Group>(this.serverUrl + "group/" + groupId).pipe(
      catchError(error => this.processHttpError(error)));
  }
  
  saveGroup(group:Group): Observable<Group> {
    return this.http.post<Group>(this.serverUrl + "groups/" + this.token, group).pipe(
      catchError(error => this.processHttpError(error))
    );
  }
  processHttpError(error) {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.messageService.sendMessage("Server je nedostupný");
          } else {
            if (error.status >= 400 && error.status < 500) {  
              // const message = error.error.errorMessage 
              //                 ? error.error.errorMessage 
              //                 : JSON.parse(error.error).errorMessage;
              const message = error.error.errorMessage ?? JSON.parse(error.error).errorMessage;
              this.messageService.sendMessage(message);
            } else {
              this.messageService.sendMessage("chyba servera: " + error.message);
            }
          }
        } else {
          this.messageService.sendMessage("Chyba programátora : " + JSON.stringify(error));
        }
        console.error("Chyba zo servera: ", error);
        return EMPTY;
      }
}
