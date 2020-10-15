import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [new User("Peter", "peter@gursky.sk", 1),
          new User("Jano", "janko@jano.sk", 10)];
  selectedUser:User;

  constructor() { }

  ngOnInit(): void {
  }

  selectUser(user:User) {
    this.selectedUser = user;
  }

}
