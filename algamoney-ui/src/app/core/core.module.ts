import { ErrorHandlerService } from './error-handler.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NavbarComponent } from './navbar/navbar.component';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

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
