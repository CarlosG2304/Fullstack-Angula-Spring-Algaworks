import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros: number = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid!:Table;

  constructor(private lancamentoService:LancamentoService,
              private errorHandler: ErrorHandlerService,
              private messageService: MessageService,
              private confirmation:ConfirmationService,
              private auth:AuthService,
              private title:Title){}

ngOnInit(): void {
 this.title.setTitle('Pesquisa de lançamentos');
}
NaotemPermissao(pemissao: string){
  return !this.auth.temPermissao(pemissao)
}

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.totalElements;
      this.lancamentos = resultado.content;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent){
   const pagina = event!.first! / event!.rows!;
   this.pesquisar(pagina)

  }
  confirmarExclusao(lancamento: any){
    this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
    this.excluir(lancamento);
    }
  });
  }

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() =>{
      this.grid.reset()
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
    }).catch(erro => this.errorHandler.handle(erro));
  }
}
