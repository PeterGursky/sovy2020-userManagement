import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private usersService: UsersService,
    private router: Router) {}
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("load strážca auth testuje URL " + route.path);
    return this.canAnything(route.path);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("activate strážca auth testuje URL " + state.url);
      return this.canAnything(state.url);
  }
  
  private canAnything(url: string): Observable<boolean> {
    return this.usersService.checkLoggedIn().pipe(
      tap(decision => {
        if (!decision) {
          this.usersService.redirectAfterLogin = url;
          this.router.navigateByUrl("/login");
        }
      })
    );
    // if (this.usersService.user) {
    //   return true;
    // }
    // this.usersService.redirectAfterLogin = url;
    // this.router.navigateByUrl("/login");
    // return false;
  }
}
