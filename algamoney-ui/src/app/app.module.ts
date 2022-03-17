import { LancamentoService } from './lancamento/lancamento.service';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoModule } from './lancamento/lancamento.module';

import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    LancamentoModule,

    PessoasModule,

    SharedModule,

    CoreModule,

    HttpClientModule

  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt-BR' },LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
