import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PessoasService, PessaoasFiltro } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros: number = 0;
  filtro = new PessaoasFiltro;
  pessoas = [];
  @ViewChild('tabela') grid!:Table;
  ngOnInit(): void {
  }

  constructor(private pessoasService:PessoasService,
              private messageService:MessageService,
              private errorHandler: ErrorHandlerService,
              private confirmation:ConfirmationService){}
pesquisar(pagina = 0){
  this.filtro.pagina = pagina;

  this.pessoasService.pesquisar(this.filtro)
  .then(resultado => {this.pessoas = resultado.pessoas
    this.totalRegistros = resultado.total
    });

}
aoMudarPagina(event: LazyLoadEvent){
  const pagina = event!.first! / event!.rows!;
  this.pesquisar(pagina)

 }

 confirmarExclusao(pessoa: any){
  this.confirmation.confirm({
  message: 'Tem certeza que deseja excluir?',
  accept: () => {
  this.excluir(pessoa);
  }
});
}

excluir(lancamento: any){
  this.pessoasService.excluir(lancamento.codigo)
  .then(() =>{
    this.grid.reset();
    this.messageService.add({ severity: 'success', detail: 'Pessoa excluído com sucesso!' })
  }).catch(erro => this.errorHandler.handle(erro));
}
}
