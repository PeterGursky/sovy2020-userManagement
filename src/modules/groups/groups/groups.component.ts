import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/entities/group';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] | void;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getGroups().subscribe(groups => this.groups = groups);
  }

}
