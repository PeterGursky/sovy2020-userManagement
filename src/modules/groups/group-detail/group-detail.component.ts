import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Group } from 'src/app/entities/group';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
//  groupId: string;
  group: Group;
  header: string;
  
  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.header = data.header);
    this.route.paramMap.pipe(
        switchMap(paramMap => this.usersService.getGroup(+paramMap.get("id"))))
        .subscribe(group => this.group = group);
//  this.route.paramMap.pipe(
//      map(paramMap => paramMap.get("id")))
        // .subscribe(id => {
        //   this.groupId = id;
        //   this.usersService.getGroup(+this.groupId).subscribe(group => this.group = group);
        // });
  }

}
