import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [new User("Peter", "peter@gursky.sk", 1),
          new User("Jano", "janko@jano.sk", 10)];
  selectedUser:User;
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
//    this.users = this.usersService.getUsers();
    this.users$ = this.usersService.getUsers();
    this.usersService.getUsers().subscribe(
      usersFromService => {
        console.log("Prišli dátat zo servera: ", usersFromService);
        this.users = usersFromService
      },
      ()=> console.log("Spracovanie dát zo servera ukončené"));
  }

  selectUser(user:User) {
    this.selectedUser = user;
  }

}
