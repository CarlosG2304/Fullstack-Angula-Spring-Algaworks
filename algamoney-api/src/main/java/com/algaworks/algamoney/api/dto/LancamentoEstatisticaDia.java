package com.algaworks.algamoney.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.algaworks.algamoney.api.model.TipoLancamento;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LancamentoEstatisticaDia {
	
	private TipoLancamento tipo;
	
	private LocalDate dia;
	
	private BigDecimal total;

}
