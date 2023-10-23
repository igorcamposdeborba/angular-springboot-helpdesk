package com.igor.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igor.helpdesk.domain.Cliente;

//Repository com métodos pré-implementados que se comunicam com o banco de dados
public interface ClienteRepository extends JpaRepository<Cliente, Integer>{ // classe, ID

}
