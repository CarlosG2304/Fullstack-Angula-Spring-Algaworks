import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  LancamentoUrl: string;

  constructor(private http: HttpClient) {
    this.LancamentoUrl = `${environment.apiUrl}/lancamentos`
  }
  lancamentosPorCategoria(): Promise<Array<any>> {

    return this.http.get(`${this.LancamentoUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then((response: any) => response);
  }

  lancamentosPorDia(): Promise<Array<any>> {

    return this.http.get(`${this.LancamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then((response: any) => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
