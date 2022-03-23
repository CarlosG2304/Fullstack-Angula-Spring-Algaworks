import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';

registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
      })

  ],
  exports:[NavbarComponent,
    ToastModule,
    ConfirmDialogModule],
  providers: [TranslateService,MessageService ,ConfirmationService,
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' }, ErrorHandlerService
  ]
})
export class CoreModule { }
