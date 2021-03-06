import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentoUrl: string;

  constructor(private http: HttpClient
  ) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatoriosLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
      .set('inicio', moment(inicio).format('YYYY-MM-DD'))
      .set('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentoUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' })
      .toPromise();
  }
}
