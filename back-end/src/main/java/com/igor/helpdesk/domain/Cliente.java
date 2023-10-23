package com.igor.helpdesk.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igor.helpdesk.domain.dtos.ClienteDTO;
import com.igor.helpdesk.domain.enums.Perfil;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Cliente extends Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;  // Serializable para trafegar em rede por bytes
	
	@JsonIgnore
	@OneToMany(mappedBy = "cliente") // MAPPED BY significa que já mapeei na classe Cliente o JoinColumn (name = "cliente_id") para identificar o id do banco de dados
	private List<Chamado> chamados = new ArrayList<>();

	public Cliente() {
		super();
		addPerfil(Perfil.CLIENTE);
	}
	
	public Cliente(Integer id, String nome, String email, String cpf, String senha) {
		super(id, nome, email, cpf, senha);
	}
	
	public Cliente (ClienteDTO obj) {
		super();
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.email = obj.getEmail();
		this.cpf = obj.getCpf();
		this.senha = obj.getSenha();
		this.dataCriacao = obj.getDataCriacao();
		this.perfis = obj.getPerfis().stream().map( i -> i.getCodigo()).collect(Collectors.toSet()); // retornar apenas o id do perfil (id da role)
	}
	
	public List<Chamado> getChamados() {
		return chamados;
	}

	public void setChamados(List<Chamado> chamados) {
		this.chamados = chamados;
	}

}
