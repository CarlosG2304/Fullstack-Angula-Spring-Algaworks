import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log(this.auth.temPermissao('ROLE_CADASTRAR_LANCAMENTO'))

      if(this.auth.isAccessTokenInvalido()){
       console.log('Navegação com access token inválido. Obtendo novo token...');

       return this.auth.obterNovoAccessToken()
       .then(() => {
        if(this.auth.isAccessTokenInvalido()){
          this.router.navigate(['/login']);
          return false;
        }

        return true;
       });
      }

      if (!this.auth.temQualquerPermissao(next.data['roles'])) {

        this.router.navigate(['/nao-autorizado']);
        return false;

      }
    console.log(this.auth.temQualquerPermissao(next.data['roles']));
      return true;

  }

}
