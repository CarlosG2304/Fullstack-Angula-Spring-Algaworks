import { PessoasService, PessaoasFiltro } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros: number = 0;
  filtro = new PessaoasFiltro;
  pessoas = [];

  ngOnInit(): void {
  }

  constructor(private pessoasService:PessoasService){}
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
}
