package com.igor.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igor.helpdesk.domain.Chamado;

//Repository com métodos pré-implementados que se comunicam com o banco de dados
public interface ChamadoRepository extends JpaRepository<Chamado, Integer> { // classe, ID

}
