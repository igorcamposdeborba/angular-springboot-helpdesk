package com.igor.helpdesk.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.helpdesk.domain.Pessoa;
import com.igor.helpdesk.domain.Tecnico;
import com.igor.helpdesk.domain.dtos.TecnicoDTO;
import com.igor.helpdesk.repositories.PessoaRepository;
import com.igor.helpdesk.repositories.TecnicoRepository;
import com.igor.helpdesk.services.exceptions.DataIntegrityViolationException;
import com.igor.helpdesk.services.exceptions.ObjectNotFoundException;

import jakarta.validation.Valid;

@Service
public class TecnicoService {
	@Autowired
	private TecnicoRepository repository; // Acessa repository para o banco de dados (que se comunica com o banco de dados por meio do JPARepository)
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	public Tecnico findById(Integer id) {
		Optional<Tecnico> obj = repository.findById(id); // Optional: pode ou não encontrar o valor no banco de dados. Ele não admite null
		
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado pelo id " + id)); // orElse é um else de um if
	}

	
	public List<Tecnico> findAll() {
		return repository.findAll();
	}


	public Tecnico create(TecnicoDTO objDTO) { // método para criar um registro no banco de dados
		objDTO.setId(null); // garantir que o objDTO do parâmetro que estou adicionando não tenha id (evita alterar outro registro se tiver id na requisição)
		
		validaPorCpfEEmail(objDTO);
		
		Tecnico newobj = new Tecnico(objDTO);
		return repository.save(newobj);
	}
	
	private void validaPorCpfEEmail(TecnicoDTO objDTO) {
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


	public Tecnico update(Integer id, @Valid TecnicoDTO objDTO) { // recebi por parâmetro os novos dados
		objDTO.setId(id); // garantir que o id do objeto que recebi no objeto é o mesmo id do parâmetro
		
		// Encontrar pelo ID e validar exceptions
		Tecnico oldObj = findById(id);
		validaPorCpfEEmail(objDTO);
		
		// Criar objeto que vou atualizar no banco de dados
		oldObj = new Tecnico(objDTO);
		return repository.save(oldObj); // UPDATE: atualizar no banco de dados
	}


	public void delete(Integer id) {
		Tecnico obj = findById(id);
		
		// Exception se o Tecnico tiver Chamado (outro objeto/tabela) em seu nome
		if (obj.getChamados().size() > 0) {
			throw new DataIntegrityViolationException("Técnico possui ordens de serviço e não pode ser deletado");
		}
		repository.deleteById(id);
	}
	
}
