package com.algaworks.algamoney.api.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "estado")
@Getter
@Setter
public class Estado {

  @Id
  private Long codigo;

  private String nome;

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Estado other = (Estado) obj;
    if (codigo == null) {
      if (other.codigo != null)
        return false;
    } else if (!codigo.equals(other.codigo))
      return false;
    return true;
  }

}
