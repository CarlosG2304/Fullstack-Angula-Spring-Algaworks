import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessaoasFiltro{
  nome = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

 pessoasUrl = 'http://localhost:8080/pessoas'

  constructor(private http:HttpClient) { }

  pesquisar(filtro:PessaoasFiltro): Promise<any>{
    let params = new HttpParams();
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page',filtro.pagina.toString());
    params = params.set('size',filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome',filtro.nome);
       }


    return this.http.get(`${this.pessoasUrl}?resumo`, { headers, params })
    .toPromise()
    .then((response : any) => {
      const pessoas = response['content'];

      const resultado = {
        pessoas,
        total: response['totalElements']
      }
      return resultado
    });

}

listarTodas() : Promise<any> {
  const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  return this.http.get(this.pessoasUrl, { headers })
    .toPromise()
    .then((response: any) => response['content']);
}

}