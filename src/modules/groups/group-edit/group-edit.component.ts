import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/entities/group';
import { MessageService } from 'src/app/services/message.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  group:Group;
  permString: string;
  groupName: string;

  constructor(private route: ActivatedRoute, private usersService: UsersService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        if (paramMap.has("id")) {
          return this.usersService.getGroup(+paramMap.get("id"));
        } else {
          return of(new Group())
        }
      }))
      .subscribe(group => {
        this.group = group
        this.groupName = group.name;
        this.permString = group.permissions.join(', ');
      });
  }

  onSubmit() {
    this.group.permissions = 
      this.permString
          .split(',')
          .map(perm => perm.trim())
          .filter(el => el);
    this.usersService.saveGroup(this.group).subscribe(group => {
      this.messageService.sendMessage("Skupina " + group.name + " úspešne uložená", false);
    });
  }
}
