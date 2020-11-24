import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupsMenuComponent } from './groups-menu/groups-menu.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { GroupResolverService } from 'src/guards/group-resolver.service';


@NgModule({
  declarations: [GroupsComponent, GroupDetailComponent, GroupsMenuComponent, GroupsHomeComponent, GroupEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    GroupsRoutingModule
  ],
  exports: []
})
export class GroupsModule { }
