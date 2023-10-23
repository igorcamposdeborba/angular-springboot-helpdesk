package com.igor.helpdesk.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.igor.helpdesk.domain.enums.Perfil;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // criar tabela no Banco de dados
public abstract class Pessoa implements Serializable { // Serializable para trafegar em rede por bytes
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Banco de dados gera um id diferente
	protected Integer id;
	protected String nome;
	@Column(unique = true)
	protected String email;
	 // @CPF // Validar CPF
	@Column(unique = true)
	protected String cpf;
	protected String senha;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	protected LocalDate dataCriacao = LocalDate.now(); // LocalDate: dd/MM/yyyy. // Setar data atual automaticamente na criação do objeto
	
	// Composition
	@ElementCollection(fetch = FetchType.EAGER) // EAGER puxa tabelas relacionadas do Banco de dados (Pessoa e Perfis)
	@CollectionTable(name = "PERFIS") // nome da tabela no banco de dados
	protected Set<Integer> perfis = new HashSet<>();// Armazena o número do Perfil (de acesso)
													// Set não aceita repetição, é rápido (comparado ao TreeSet e LinkedHashSet)
													// e precisa do hashCode e equals para comparar valores e não os ponteiros 
													// para não duplicar os valores
	
	protected Pessoa() {
		super();
		addPerfil(Perfil.CLIENTE); // Se eu instanciar um objeto Pessoa, no mínimo ele vai ter um perfil de cliente
	}

	protected Pessoa(Integer id, String nome, String email, String cpf, String senha) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.cpf = cpf;
		this.senha = senha;
		addPerfil(Perfil.CLIENTE); // Se eu instanciar um objeto Pessoa, no mínimo ele vai ter um perfil de cliente
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
	
	public String getCpf() {
		return cpf;
	}

	public void setEmail(String email) {
		this.email = email;
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
		return perfis.stream().map(i -> Perfil.toEnum(i)).collect(Collectors.toSet()); // retornar a lista de Perfils (roles)
	}

	public void addPerfil(Perfil perfil) {
		this.perfis.add(perfil.getCodigo());
	}
	
	
	// Implementado porque usei Set com HashSet para não repetir valores
	@Override
	public int hashCode() {
		return Objects.hash(cpf, id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pessoa other = (Pessoa) obj;
		return Objects.equals(cpf, other.cpf) && Objects.equals(id, other.id);
	}

}
