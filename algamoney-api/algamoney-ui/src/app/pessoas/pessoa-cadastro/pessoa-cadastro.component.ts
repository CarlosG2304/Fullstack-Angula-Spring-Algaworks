import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { Pessoa } from './../../core/model';
import { PessoasService } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa;

  constructor(private pessoaService:PessoasService,
              private messageService:MessageService,
              private errorHandler:ErrorHandlerService,
              private title:Title,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const codigoPessoa =  this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Pessoa')

    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa);
    }

  }
  get editando(){
    return Boolean(this.pessoa.codigo)
  }

  salvar(form: NgForm){
      if(this.editando){
        this.atualizarPessoa(form);
      }else{
        this.adicionarPessoa(form);
      }


  }

  adicionarPessoa(form: NgForm){
       this.pessoaService.adicionar(this.pessoa)
     .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' })
      form.reset();
      this.pessoa = new Pessoa();
     }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number){
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm){
    this.pessoaService.atualizar(this.pessoa)
    .then((pessoa:Pessoa) => {
      this.pessoa = pessoa;
      this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' })
      this.atualizarTituloEdicao();
     })
    .catch(erro => this.errorHandler.handle(erro));
   }
   atualizarTituloEdicao(){
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`)
  }
}
