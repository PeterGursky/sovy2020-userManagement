import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';
import { faEdit, faUserTimes, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

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
  faEdit = faEdit;
  faUserTimes = faUserTimes;
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( (data: { users: User[]}) => {
      this.users = data.users;
    });
//    this.usersService.getExtendedUsers().subscribe(u => this.users = u);
  }

  saveUser(user: User) {
    this.usersService.saveUser(user).subscribe(savedUser => {
      if (savedUser instanceof User) {
        if (user.id) { //UPDATE
          //this.users = this.users.map(u => u.id === user.id ? savedUser : u);
          this.users[this.users.findIndex(u => u.id === user.id)] = savedUser;
        } else { //INSERT
          if (savedUser instanceof User) {
            this.users = [...this.users, savedUser];
          }
        }
      }
    });
  }

  onNewUserButtonClick() {
    this.editedUser = new User('', '');
    this.actionWithUser = "Pridanie nového používateľa";
    $("#edit-user-modal").modal('show');
  }

  editUser(user: User) {
    this.editedUser = User.clone(user);
    this.actionWithUser = "Editácia používateľa";
    $("#edit-user-modal").modal('show');
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user).subscribe(ok => {
      //this.users = this.users.filter(u => u.id !== user.id);
      this.users.splice(this.users.findIndex(u => u.id === user.id), 1);
    });
  }
}
