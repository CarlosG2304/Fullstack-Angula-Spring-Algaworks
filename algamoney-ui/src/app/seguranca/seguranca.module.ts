import { LogoutService } from './logout.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['https://carlos-algamoney-api.herokuapp.com'],
        disallowedRoutes: ['https://carlos-algamoney-api.herokuapp.com/oauth/token']
      }
    }),

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers:[JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
  AuthGuard,
   LogoutService]
})
export class SegurancaModule { }
