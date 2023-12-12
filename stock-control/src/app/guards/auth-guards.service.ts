import { Injectable } from '@angular/core';
import { UserService } from '../modules/services/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService {

  constructor(private userService: UserService, private router: Router) {}

    canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);

      return false; //não passou no critério para logar
    }

    this.userService.isLoggedIn();

    return true; //usuário está logado na aplicação
  }
}
