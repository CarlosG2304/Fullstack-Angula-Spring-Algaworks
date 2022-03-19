import { MessageModule } from 'primeng/message';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';


import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import {InputMaskModule} from 'primeng/inputmask';





@NgModule({
  declarations: [
    PessoasGridComponent,
    PessoaCadastroComponent ,
    PessoasPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,


    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    MessageModule,

  ],
 exports:[
  PessoaCadastroComponent,
  PessoasPesquisaComponent
 ]
})
export class PessoasModule { }
