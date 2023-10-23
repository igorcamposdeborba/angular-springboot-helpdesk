package com.igor.helpdesk.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.helpdesk.domain.Chamado;
import com.igor.helpdesk.domain.Cliente;
import com.igor.helpdesk.domain.Tecnico;
import com.igor.helpdesk.domain.dtos.ChamadoDTO;
import com.igor.helpdesk.domain.enums.Prioridade;
import com.igor.helpdesk.domain.enums.Status;
import com.igor.helpdesk.repositories.ChamadoRepository;
import com.igor.helpdesk.services.exceptions.ObjectNotFoundException;

import jakarta.validation.Valid;

@Service
public class ChamadoService {
	
	@Autowired
	private ChamadoRepository repository;
	
	@Autowired
	private TecnicoService tecnicoService;
	@Autowired
	private ClienteService clienteService;
	
	public Chamado findById(Integer id) {
		Optional<Chamado> obj = repository.findById(id);
		
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado id " + id));
	}

	public List<Chamado> findAll() {
		return repository.findAll();
	}

	public Chamado create(@Valid ChamadoDTO obj) { // @Valid valida se os campos @NotNull estão preenchidos no objeto
		return repository.save(newChamado(obj));
	}
	
	// Add e Update Chamado
	private Chamado newChamado(ChamadoDTO obj) {
		Tecnico tecnico = tecnicoService.findById(obj.getTecnico());
		Cliente cliente = clienteService.findById(obj.getCliente());
		
		Chamado chamado = new Chamado();
		if (obj.getId() != null) { // UPDATE: se existe chamado, pegar o id. Se for ADD, ele só pula essa linha e seta as config do obj sem id (o id o banco de dados cria)
			chamado.setId(obj.getId());
		}
		if (obj.getStatus().equals(2)) { // UPDATE: 2 = encerrar chamado para atualizar a data de encerramento do chamado.
			chamado.setDataFechamento(LocalDate.now());
		}
		
		chamado.setTecnico(tecnico);
		chamado.setCliente(cliente);
		chamado.setPrioridade(Prioridade.toEnum(obj.getPrioridade()));
		chamado.setStatus(Status.toEnum(obj.getStatus()));
		chamado.setTitulo(obj.getTitulo());
		chamado.setObservacoes(obj.getObservacoes());
		
		return chamado;
	}
	
	public Chamado update(Integer id, @Valid ChamadoDTO objDTO) {
		objDTO.setId(id); // validação: garantir que o id do objeto que recebi no objeto é o mesmo id do parâmetro
		
		Chamado oldObj = findById(id); // verifica se há o id no banco de dados
		oldObj = newChamado(objDTO); // atualiza o Chamado no banco de dados
		
		return repository.save(oldObj);
	}
}
