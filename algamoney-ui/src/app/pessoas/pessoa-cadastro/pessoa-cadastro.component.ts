import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Contato, Pessoa } from './../../core/model';
import { PessoasService } from './../pessoas.service';





@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa;
  estado: any[] = [];
  estados: any;
  cidades: any[] = [];
  estadoSelecionado?: number;

  constructor(private pessoaService: PessoasService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Pessoa')

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    });
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado!).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    });
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }


  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' })
        form.reset();
        this.pessoa = new Pessoa();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.codigo : undefined;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;
        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' })
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`)
  }
}
