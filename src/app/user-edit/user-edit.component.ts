import { Component, OnInit } from '@angular/core';
import { Group } from '../entities/group';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User("","");
  groups: Group[] | void;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getGroups().subscribe(groups => this.groups = groups);
  }

  get printUser() {
    return JSON.stringify(this.user);
  }
}
