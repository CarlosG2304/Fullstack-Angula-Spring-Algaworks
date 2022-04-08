package com.algaworks.algamoney.api.repository.lancamento;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import com.algaworks.algamoney.api.dto.LancamentoEstatisticaCategoria;
import com.algaworks.algamoney.api.dto.LancamentoEstatisticaPessoa;
import com.algaworks.algamoney.api.dto.LancamentoEstatisticaDia;
import com.algaworks.algamoney.api.model.Categoria_;
import com.algaworks.algamoney.api.model.Lancamento;
import com.algaworks.algamoney.api.model.Lancamento_;
import com.algaworks.algamoney.api.model.Pessoa_;
import com.algaworks.algamoney.api.repository.filter.LancamentoFilter;
import com.algaworks.algamoney.api.repository.projection.ResumoLancamento;

public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<LancamentoEstatisticaPessoa> porPessoa(LocalDate inicio, LocalDate fim) {
		CriteriaBuilder criteriaBuider = manager.getCriteriaBuilder();
		
		CriteriaQuery<LancamentoEstatisticaPessoa> criteriaQuery = criteriaBuider
				.createQuery(LancamentoEstatisticaPessoa.class);
		
		Root<Lancamento> root = criteriaQuery.from(Lancamento.class);
		
		criteriaQuery.select(criteriaBuider.construct(LancamentoEstatisticaPessoa.class, 
				 root.get(Lancamento_.tipo),
				 root.get(Lancamento_.pessoa),
				 criteriaBuider.sum(root.get(Lancamento_.valor))));

	
		criteriaQuery.where(
      criteriaBuider.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), inicio),
			criteriaBuider.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), 
			fim));

	  criteriaQuery.groupBy(root.get(Lancamento_.tipo),
		                      root.get(Lancamento_.pessoa));

		TypedQuery<LancamentoEstatisticaPessoa> typedQuery = manager.createQuery(criteriaQuery);

		return typedQuery.getResultList();
	}
	


	

	@Override
	public List<LancamentoEstatisticaCategoria> porCategoria(LocalDate mesReferencia) {
		CriteriaBuilder criteriaBuider = manager.getCriteriaBuilder();
		
		CriteriaQuery<LancamentoEstatisticaCategoria> criteriaQuery = criteriaBuider
				.createQuery(LancamentoEstatisticaCategoria.class);
		
		Root<Lancamento> root = criteriaQuery.from(Lancamento.class);
		
		criteriaQuery.select(criteriaBuider.construct(LancamentoEstatisticaCategoria.class, 
				 root.get(Lancamento_.categoria)
				 ,criteriaBuider.sum(root.get(Lancamento_.valor))));

		LocalDate primeiroDia = mesReferencia.withDayOfMonth(1);
		LocalDate ultimoDia = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());
		
		criteriaQuery.where(
      criteriaBuider.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), primeiroDia),
			criteriaBuider.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), 
			ultimoDia));

	  criteriaQuery.groupBy(root.get(Lancamento_.categoria));

		TypedQuery<LancamentoEstatisticaCategoria> typedQuery = manager.createQuery(criteriaQuery);

		return typedQuery.getResultList();
	}

	@Override
	public List<LancamentoEstatisticaDia> porDia(LocalDate mesReferencia) {
		CriteriaBuilder criteriaBuider = manager.getCriteriaBuilder();
		
		CriteriaQuery<LancamentoEstatisticaDia> criteriaQuery = criteriaBuider
				.createQuery(LancamentoEstatisticaDia.class);
		
		Root<Lancamento> root = criteriaQuery.from(Lancamento.class);
		
		criteriaQuery.select(criteriaBuider.construct(LancamentoEstatisticaDia.class, 
				 root.get(Lancamento_.tipo),
				 root.get(Lancamento_.dataVencimento),
				 criteriaBuider.sum(root.get(Lancamento_.valor))));

		LocalDate primeiroDia = mesReferencia.withDayOfMonth(1);
		LocalDate ultimoDia = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());
		
		criteriaQuery.where(
      criteriaBuider.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), primeiroDia),
			criteriaBuider.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), 
			ultimoDia));

	  criteriaQuery.groupBy(root.get(Lancamento_.tipo),
		                      root.get(Lancamento_.dataVencimento));

		TypedQuery<LancamentoEstatisticaDia> typedQuery = manager.createQuery(criteriaQuery);

		return typedQuery.getResultList();
	}
	
	@Override
	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable) {
   
		CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Lancamento> criteria = builder.createQuery(Lancamento.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);
        
		
		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);;
		
		criteria.where(predicates);
		
        TypedQuery<Lancamento> query = manager.createQuery(criteria);
        adicinarRestricoesDePaginacao(query, pageable);
        
        return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
	}

	
	@Override
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable) {
     CriteriaBuilder builder = manager.getCriteriaBuilder();
     CriteriaQuery<ResumoLancamento> criteria = builder.createQuery(ResumoLancamento.class);
     Root<Lancamento> root = criteria.from(Lancamento.class);
     
     criteria.select(builder.construct(ResumoLancamento.class, root.get(Lancamento_.codigo), root.get(Lancamento_.descricao)
				, root.get(Lancamento_.dataVencimento), root.get(Lancamento_.dataPagamento)
				, root.get(Lancamento_.valor), root.get(Lancamento_.tipo)
				, root.get(Lancamento_.categoria).get(Categoria_.nome)
				, root.get(Lancamento_.pessoa).get(Pessoa_.nome)));
     
     Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		criteria.where(predicates);
     
     TypedQuery<ResumoLancamento> query = manager.createQuery(criteria);
     adicinarRestricoesDePaginacao(query, pageable);
      
     
     return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
	}
	



	private Predicate[] criarRestricoes(LancamentoFilter lancamentoFilter, CriteriaBuilder builder,
			Root<Lancamento> root) {
        List<Predicate> predicates = new ArrayList<>();
       
        if (!StringUtils.isEmpty(lancamentoFilter.getDescricao())) {
			predicates.add(builder.like(
					builder.lower(root.get(Lancamento_.descricao)), "%" + lancamentoFilter.getDescricao().toLowerCase() + "%"));
		}
		
		if (lancamentoFilter.getDataVencimentoDe() != null) {
			predicates.add(
					builder.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), lancamentoFilter.getDataVencimentoDe()));
		}
		
		if (lancamentoFilter.getDataVencimentoAte() != null) {
			predicates.add(
					builder.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), lancamentoFilter.getDataVencimentoAte()));
		}
		
		return predicates.toArray(new Predicate[predicates.size()]);
	}
private void adicinarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
		int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;
		
		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}
private Long total(LancamentoFilter lancamentoFilter) {
	CriteriaBuilder builder = manager.getCriteriaBuilder();
	CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
	Root<Lancamento> root = criteria.from(Lancamento.class);
	
	Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
	criteria.where(predicates);
	
	criteria.select(builder.count(root));
	return manager.createQuery(criteria).getSingleResult();
	}








}
