import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Lancamento, Page } from './../core/model';
import { firstValueFrom } from 'rxjs';

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

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http:HttpClient,
              private datePipe: DatePipe) { }


  pesquisar(filtro: LancamentoFiltro): Promise<Page<Lancamento>>{

    let params = new HttpParams();
  const headers = new HttpHeaders()
  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

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
return firstValueFrom(this.http.get<Page<Lancamento>>(`${this.lancamentosUrl}?resumo`, { headers, params }));
  }

  excluir(codigo:number): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return firstValueFrom(this.http.delete<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers }))
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return firstValueFrom(this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers }));
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return firstValueFrom(this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers }));
  }

buscarPorCodigo(codigo:number){
  const headers = new HttpHeaders()
  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
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
