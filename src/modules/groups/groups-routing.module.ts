import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { GroupsMenuComponent } from './groups-menu/groups-menu.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  { path: "groups", component: GroupsMenuComponent,
    children: [
      { path: '', component: GroupsHomeComponent },
      { path: 'list', component: GroupsComponent },
      { path: 'detail/:id', component: GroupDetailComponent, data: {header: "Skupina"} },
      { path: 'edit/:id', component: GroupEditComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
