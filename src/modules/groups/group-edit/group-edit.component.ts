import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Group } from 'src/app/entities/group';
import { MessageService } from 'src/app/services/message.service';
import { UsersService } from 'src/app/services/users.service';
import { CanDeactivateComponent } from 'src/guards/can-deactivate.guard';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit, CanDeactivateComponent {
  group:Group;
  permString: string;
  
  originalPermString: string;
  groupName: string;
  buttonPressed = false;

  constructor(private route: ActivatedRoute, 
    private usersService: UsersService, 
    private messageService: MessageService,
    private router: Router) { }

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
        this.originalPermString = this.permString;
      });
  }

  onSubmit() {
    this.group.permissions = 
      this.permString
          .split(',')
          .map(perm => perm.trim())
          .filter(el => el);
    this.buttonPressed = true;
    this.usersService.saveGroup(this.group).subscribe(group => {
      this.messageService.sendMessage("Skupina " + group.name + " úspešne uložená", false);
      this.buttonPressed = false;
      this.group = group;
      this.groupName = group.name;
      this.originalPermString = group.permissions.join(', ');
    });
  }

  cancel() {
    this.buttonPressed = true;
    this.router.navigateByUrl("groups/list");
  }

  canDeactivate(): boolean | Observable<boolean> {
    console.log("Deactivate guard v login komponente použitý");
    if (this.groupName === this.group.name && 
        this.originalPermString === this.permString)
      return true;
    if (this.buttonPressed)
      return true;
    return window.confirm("Vyplnili ste údaje. Naozaj chcete odísť?");
  }
}
