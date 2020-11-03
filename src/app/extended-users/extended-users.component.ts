import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';

declare var $: any;

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit {
  users: User[];
  editedUser: User;
  actionWithUser: string;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getExtendedUsers().subscribe(u => this.users = u);
  }

  saveUser(user:User) {
    this.usersService.saveUser(user).subscribe(savedUser => {
      if(savedUser instanceof User) {
        this.users = [...this.users, savedUser];
      }
    });
  }

  onNewUserButtonClick() {
    this.editedUser = new User('','');
    this.actionWithUser = "Pridanie nového používateľa";
    $("#edit-user-modal").modal('show');
  }
}
