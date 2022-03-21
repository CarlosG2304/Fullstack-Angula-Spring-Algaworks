import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';

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

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];

  constructor(private categoriaService:CategoriasService,
              private errorHandler:ErrorHandlerService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias= categorias.map((c : any) => ( {label: c.nome , value: c.codigo }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
