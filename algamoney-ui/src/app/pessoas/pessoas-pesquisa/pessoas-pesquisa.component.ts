import { Title } from '@angular/platform-browser';
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

  constructor(private pessoasService:PessoasService,
              private messageService:MessageService,
              private errorHandler: ErrorHandlerService,
              private confirmation:ConfirmationService,
              private title:Title){}
  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas')
              }

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

excluir(pessoa: any){
  this.pessoasService.excluir(pessoa.codigo)
  .then(() =>{
    this.grid.reset();
    this.messageService.add({ severity: 'success', detail: 'Pessoa excluído com sucesso!' })
  }).catch(erro => this.errorHandler.handle(erro));
}

mudarStatus(pessoa: any){
  const novoStatus = !pessoa.ativo;
  this.pessoasService.mudarStatus(pessoa.codigo,novoStatus)
  .then(() =>{
    const acao = novoStatus ? 'ativada' : 'desativada';

    pessoa.ativo = novoStatus;
    this.messageService.add({ severity: 'success', detail: `Pessoa ${acao}  com sucesso!` })
  }).catch(erro => this.errorHandler.handle(erro));

}
}
