package com.igor.helpdesk.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.helpdesk.domain.Cliente;
import com.igor.helpdesk.domain.Pessoa;
import com.igor.helpdesk.domain.dtos.ClienteDTO;
import com.igor.helpdesk.repositories.ClienteRepository;
import com.igor.helpdesk.repositories.PessoaRepository;
import com.igor.helpdesk.services.exceptions.DataIntegrityViolationException;
import com.igor.helpdesk.services.exceptions.ObjectNotFoundException;

import jakarta.validation.Valid;

@Service
public class ClienteService {
	@Autowired
	private ClienteRepository repository; // Acessa repository para o banco de dados (que se comunica com o banco de dados por meio do JPARepository)
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	
	public Cliente findById(Integer id) {
		Optional<Cliente> obj = repository.findById(id); // Optional: pode ou não encontrar o valor no banco de dados. Ele não admite null
		
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado pelo id " + id)); // orElse é um else de um if
	}

	
	public List<Cliente> findAll() {
		return repository.findAll();
	}


	public Cliente create(ClienteDTO objDTO) { // método para criar um registro no banco de dados
		objDTO.setId(null); // garantir que o objDTO do parâmetro que estou adicionando não tenha id (evita alterar outro registro se tiver id na requisição)
		
		validaPorCpfEEmail(objDTO);
		
		Cliente newobj = new Cliente(objDTO);
		return repository.save(newobj);
	}
	
	private void validaPorCpfEEmail(ClienteDTO objDTO) {
		Optional<Pessoa> obj = this.pessoaRepository.findByCpf(objDTO.getCpf());
		
		// Exception se já tiver cadastrado no sistema o usuário que estou tentando cadastrar novamente
		if(obj.isPresent() && obj.get().getId() != objDTO.getId()) {
			throw new DataIntegrityViolationException("CPF já cadastrado no sistema");
		}
		
		obj = pessoaRepository.findByEmail(objDTO.getEmail());
		if(obj.isPresent() && obj.get().getId() != objDTO.getId()) {
			throw new DataIntegrityViolationException("E-mail já cadastrado no sistema");
		}
	}


	public Cliente update(Integer id, @Valid ClienteDTO objDTO) { // recebi por parâmetro os novos dados
		objDTO.setId(id); // validação: garantir que o id do objeto que recebi no objeto é o mesmo id do parâmetro
		
		// Encontrar pelo ID e validar exceptions
		Cliente oldObj = findById(id);
		validaPorCpfEEmail(objDTO);
		
		// Criar objeto que vou atualizar no banco de dados
		oldObj = new Cliente(objDTO);
		return repository.save(oldObj); // UPDATE: atualizar no banco de dados
	}


	public void delete(Integer id) {
		Cliente obj = findById(id);
		
		// Exception se o Cliente tiver Chamado (outro objeto/tabela) em seu nome
		if (obj.getChamados().size() > 0) {
			throw new DataIntegrityViolationException("Cliente possui ordens de serviço e não pode ser deletado");
		}
		repository.deleteById(id);
	}
	
}
