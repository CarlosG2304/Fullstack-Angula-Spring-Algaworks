import { HttpClient, HttpParams } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { firstValueFrom } from 'rxjs';

import { Lancamento, Page } from './../core/model';

import { environment } from './../../environments/environment';

export class LancamentoFiltro {
  descricao: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = '';

  constructor(private http:HttpClient,
              private datePipe: DatePipe) {
                this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
               }


  pesquisar(filtro: LancamentoFiltro): Promise<Page<Lancamento>>{

    let params = new HttpParams();

  params = params.set('page',filtro.pagina.toString());
  params = params.set('size',filtro.itensPorPagina.toString());


  if(filtro.descricao){
 params = params.set('descricao',filtro.descricao);
  }

  if (filtro.dataVencimentoInicio) {
    params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
}

if (filtro.dataVencimentoFim) {
    params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
}
return firstValueFrom(this.http.get<Page<Lancamento>>(`${this.lancamentosUrl}?resumo`, {  params }));
  }

  excluir(codigo:number): Promise<Lancamento> {


    return firstValueFrom(this.http.delete<Lancamento>(`${this.lancamentosUrl}/${codigo}`))
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

      return firstValueFrom(this.http.post<Lancamento>(this.lancamentosUrl, lancamento));
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

      return firstValueFrom(this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento));
  }

buscarPorCodigo(codigo:number){


  return this.http.get(`${this.lancamentosUrl}/${codigo}`)
  .toPromise()
  .then((response:any) => {
    this.converterStringsParaDatas([response]);

    return response;
  });

}

private converterStringsParaDatas(lancamentos: any[]) {

  for (const lancamento of lancamentos) {

    lancamento.dataVencimento = new Date(lancamento.dataVencimento);

    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = new Date(lancamento.dataPagamento);
    }
  }
}


}
