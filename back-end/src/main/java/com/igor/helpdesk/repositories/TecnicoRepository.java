package com.igor.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igor.helpdesk.domain.Tecnico;

//Repository com métodos pré-implementados que se comunicam com o banco de dados
public interface TecnicoRepository extends JpaRepository<Tecnico, Integer> { // classe, ID

}
