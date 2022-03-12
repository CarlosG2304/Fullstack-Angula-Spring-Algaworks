import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoModule } from './lancamento/lancamento.module';

import { NgModule } from '@angular/core';
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

    CoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
