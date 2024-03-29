package com.igor.helpdesk.domain.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.igor.helpdesk.domain.Cliente;
import com.igor.helpdesk.domain.enums.Perfil;

import jakarta.validation.constraints.NotNull;

public class ClienteDTO implements Serializable {
	private static final long serialVersionUID = 1L; // Serializable para trafegar em rede por bytes

	protected Integer id;
	@NotNull(message = "Campo NOME é obrigatório")
	protected String nome;
	@NotNull (message = "Campo EMAIL é obrigatório")
	protected String email;
	@NotNull (message = "Campo CPF é obrigatório")
	protected String cpf;
	@NotNull (message = "Campo SENHA é obrigatório")
	protected String senha;

	protected LocalDate dataCriacao = LocalDate.now(); // LocalDate: dd/MM/yyyy  // Setar data atual automaticamente na criação do objeto

	// Composition
	@JsonFormat(pattern = "dd/MM/yyyy")
	protected Set<Integer> perfis = new HashSet<>();// Armazena o número do Perfil (de acesso)
													// Set não aceita repetição, é rápido (comparado ao TreeSet e
													// LinkedHashSet)
													// e precisa do hashCode e equals para comparar valores e não os
													// ponteiros
													// para não duplicar os valores

	public ClienteDTO() {
		super();
		addPerfil(Perfil.CLIENTE);  // Se eu instanciar um objeto ClienteDTO, no mínimo ele vai ter um perfil de cliente
	}

	public ClienteDTO(Cliente obj) {
		super();
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.email = obj.getEmail();
		this.cpf = obj.getCpf();
		this.senha = obj.getSenha();
		this.dataCriacao = obj.getDataCriacao();
		this.perfis = obj.getPerfis().stream().map( i -> i.getCodigo()).collect(Collectors.toSet()); // retornar apenas o id do perfil (id da role)
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public LocalDate getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(LocalDate dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public Set<Perfil> getPerfis() {
		return perfis.stream().map( i -> Perfil.toEnum(i)).collect(Collectors.toSet());
	}

	public void addPerfil(Perfil perfil) {
		this.perfis.add(perfil.getCodigo());
	}
	
}
