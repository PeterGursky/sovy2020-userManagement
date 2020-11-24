import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { defaultIfEmpty, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<User[]>{

  constructor(private usersService: UsersService, private router:Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.usersService.getExtendedUsers().pipe(
      defaultIfEmpty(null),
      mergeMap(users => {
        if (users) {
          return of(users);
        } else {
          this.router.navigateByUrl('/users)');
          return EMPTY;
        }
      }));
  }
}
