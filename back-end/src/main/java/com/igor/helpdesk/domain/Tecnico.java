package com.igor.helpdesk.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igor.helpdesk.domain.dtos.TecnicoDTO;
import com.igor.helpdesk.domain.enums.Perfil;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Tecnico extends Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;  // Serializable para trafegar em rede por bytes
	
	@JsonIgnore // JsonIgnore: ignorar chamados do técnico quando eu fizer a requisição de técnico. Retorna só a tabela de Técnico
	@OneToMany (mappedBy = "tecnico") // MAPPED BY significa que já mapeei na classe Chamado o JoinColumn (name = "tecnico_id") para identificar o id do banco de dados
	private List<Chamado> chamados = new ArrayList<>();

	public Tecnico() {
		super();
		addPerfil(Perfil.TECNICO);
	}

	public Tecnico(Integer id, String nome, String email, String cpf, String senha) {
		super(id, nome, email, cpf, senha);
	}
	
	public Tecnico(TecnicoDTO obj) {
		super();
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.email = obj.getEmail();
		this.cpf = obj.getCpf();
		this.senha = obj.getSenha();
		this.dataCriacao = Objects.isNull(obj.getDataCriacao()) ? LocalDate.now() : obj.getDataCriacao();
		this.perfis = obj.getPerfis().stream().map( i -> i.getCodigo()).collect(Collectors.toSet()); // retornar apenas o id do perfil (id da role)
	}

	public List<Chamado> getChamados() {
		return chamados;
	}

	public void setChamados(List<Chamado> chamados) {
		this.chamados = chamados;
	}
	
	
}
