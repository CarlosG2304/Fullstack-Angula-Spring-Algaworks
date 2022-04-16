package com.algaworks.algamoney.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.algaworks.algamoney.api.model.TipoLancamento;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LancamentoEstatisticaDia {
	
	private TipoLancamento tipo;
	
	private LocalDate dia;
	
	private BigDecimal total;

	public LancamentoEstatisticaDia(TipoLancamento tipo, LocalDate dia, BigDecimal total) {
		super();
		this.tipo = tipo;
		this.dia = dia;
		this.total = total;
	}

	

}
