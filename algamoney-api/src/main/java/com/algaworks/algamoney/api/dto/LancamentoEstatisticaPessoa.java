package com.algaworks.algamoney.api.dto;

import java.math.BigDecimal;

import com.algaworks.algamoney.api.model.Pessoa;
import com.algaworks.algamoney.api.model.TipoLancamento;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LancamentoEstatisticaPessoa{

  private TipoLancamento tipo;

  private Pessoa pessoa;

  private BigDecimal total;
}