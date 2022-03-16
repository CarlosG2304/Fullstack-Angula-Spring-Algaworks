import { MessageModule } from 'primeng/message';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';



import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';



@NgModule({
  declarations: [
  LancamentoCadastroComponent,
  LancamentosPesquisaComponent,
  LancamentosGridComponent],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    MessageModule,

    HttpClientModule
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ]
})
export class LancamentoModule { }
