import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { CanDeactivateGuard } from 'src/guards/can-deactivate.guard';
import { UsersResolverService } from 'src/guards/users-resolver.service';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';

const routes: Routes =[
  { path: 'users', component: UsersComponent },
  { path: 'extended-users', 
    component: ExtendedUsersComponent,
    canActivate: [AuthGuard],
    resolve: {
      users : UsersResolverService
    } 
  },
  { path: 'groups', 
    loadChildren: () => 
      import('../modules/groups/groups.module').then(mod => mod.GroupsModule),
    canLoad: [AuthGuard]
  },
  { path: 'login', 
    component: LoginComponent,
    canDeactivate: [CanDeactivateGuard] },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
