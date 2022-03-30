import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Pessoa } from '../core/model';
import { environment } from './../../environments/environment';


export class PessaoasFiltro{
  nome = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {


 pessoasUrl = ''

  constructor(private http:HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
   }

  pesquisar(filtro:PessaoasFiltro): Promise<any>{
    let params = new HttpParams();


    params = params.set('page',filtro.pagina.toString());
    params = params.set('size',filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome',filtro.nome);
       }


    return this.http.get(`${this.pessoasUrl}?resumo`, { params })
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
  return this.http.get(this.pessoasUrl)
    .toPromise()
    .then((response: any) => response['content']);
}

 excluir(codigo:number): Promise<any>{
  return this.http.delete(`${this.pessoasUrl}/${codigo}`)
  .toPromise();
 }

 mudarStatus(codigo:number, ativo:boolean): Promise<any>{
  return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
  .toPromise();
 }
 adicionar(pessoa: Pessoa): Promise<any> {
  return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
    .toPromise();
}

atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return firstValueFrom(this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa));
}

buscarPorCodigo(codigo:number): Promise<Pessoa>{
  return firstValueFrom(this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`));
}


}
