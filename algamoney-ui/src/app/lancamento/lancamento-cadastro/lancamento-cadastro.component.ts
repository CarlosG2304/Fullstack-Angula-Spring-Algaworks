import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { Lancamento } from './../../core/model';
import { PessoasService } from './../../pessoas/pessoas.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento;

  constructor(private categoriaService:CategoriasService,
              private pessoasService:PessoasService,
              private lancamentoService:LancamentoService,
              private messageService:MessageService,
              private errorHandler:ErrorHandlerService) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm){
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
       this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })
       form.reset();
       this.lancamento = new Lancamento();
      }).catch(erro => this.errorHandler.handle(erro)) ;
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias= categorias.map((c : any) => ( {label: c.nome , value: c.codigo }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    return this.pessoasService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map((p:any) => ({ label: p.nome, value: p.codigo}));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
