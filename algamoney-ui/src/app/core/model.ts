export class Pessoa{
  codigo?:number;
  ativo:boolean = true;
  nome?:string;
  endereco = new Endereco;

}
export class Endereco{
  logradouro?:string;
  numero?:number;
  complemento?:string;
  bairro?:string;
  cep?:number;
  cidade?:string;
  estado?:string;
}
export class Categoria{
 codigo?:number;
}

export class Lancamento {
  codigo?: number;
  tipo = 'Receita';
  descricao?:string
  dataVencimento?:Date;
  dataPagamento?:Date;
  valor?:number;
  observacao?:string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
