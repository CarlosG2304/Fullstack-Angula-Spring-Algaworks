import { AuthService } from './../seguranca/auth.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      console.log('erro refresh');

      msg = 'Sua sessão expirou!';
      this.authService.login();

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Voce não tem permissão para executar esta ação';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) {

      }
    } else {
      msg = 'Error ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg })
  }
}
