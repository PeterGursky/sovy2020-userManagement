import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { defaultIfEmpty, mergeMap } from 'rxjs/operators';
import { Group } from 'src/app/entities/group';
import { UsersService } from 'src/app/services/users.service';

 @Injectable({
   providedIn: 'root'
 })
export class GroupResolverService implements Resolve<Group>{

  constructor(private usersService: UsersService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group> {
    return this.usersService.getGroup(+route.paramMap.get("id")).pipe(
      defaultIfEmpty(null),
      mergeMap(group => {
        if (group) {
          return of(group);
        } else {
          this.router.navigateByUrl('/groups');
          return EMPTY;
        }
      })
    );
  }
}
