import { SegurancaModule } from './seguranca/seguranca.module';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CategoriasService } from './categorias/categorias.service';
import { PessoasService } from './pessoas/pessoas.service';
import { LancamentoService } from './lancamento/lancamento.service';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    SharedModule,
    CoreModule,
    SegurancaModule,

    HttpClientModule,
    AppRoutingModule

  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt-BR' },LancamentoService, PessoasService, CategoriasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
