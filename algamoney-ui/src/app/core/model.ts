export class Pessoa{
  codigo?:number;
}

export class Categoria{
 codigo?:number;
}

export class Lancamento {
  codigo?: number;
  tipo = 'Receita';
  descricao = '';
  dataVencimento?:Date;
  dataPagamento?:Date;
  valor?:number;
  observacao = '';
  pessoa = new Pessoa();
  categoria = new Categoria();
}
