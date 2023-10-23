package com.igor.helpdesk.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igor.helpdesk.domain.Pessoa;

// Repository com métodos pré-implementados que se comunicam com o banco de dados
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> { // classe, ID

	
	Optional<Pessoa> findByCpf(String cpf); // retorna um Optional porque o banco de dados pode ou não encontrar esse CPF
	Optional<Pessoa> findByEmail(String email);
}
