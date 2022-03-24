import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamento/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { CategoriasService } from './categorias/categorias.service';
import { PessoasService } from './pessoas/pessoas.service';
import { LancamentoService } from './lancamento/lancamento.service';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoModule } from './lancamento/lancamento.module';


import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch:'full'},
  { path: 'lancamentos', component: LancamentosPesquisaComponent},
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
  { path: 'pessoas', component: PessoasPesquisaComponent}

];


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

    HttpClientModule,
    RouterModule.forRoot(routes)


  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt-BR' },LancamentoService, PessoasService, CategoriasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
