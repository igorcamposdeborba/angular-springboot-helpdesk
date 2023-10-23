package com.igor.helpdesk.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.igor.helpdesk.domain.Cliente;
import com.igor.helpdesk.domain.dtos.ClienteDTO;
import com.igor.helpdesk.services.ClienteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteResource {
	
	@Autowired
	protected ClienteService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> findById(@PathVariable Integer id){ // controla resposta http do servidor (eu especifico header e body)
																		  // retorna o DTO
		Cliente obj = this.service.findById(id);
		
		return ResponseEntity.ok().body(new ClienteDTO(obj)); // header: ok()  body: objeto
	}
	
	@GetMapping (value = {"/", ""}) // aceita duas rotas no endpoint
	public ResponseEntity<List<ClienteDTO>> findAll(){
		List<Cliente> list = service.findAll();
		
		List<ClienteDTO> listDTO = list.stream().map(obj -> new ClienteDTO(obj)).collect(Collectors.toList()); // lista de Clientes
		
		return ResponseEntity.ok().body(listDTO);
	}
	
	
	@PostMapping
	public ResponseEntity<ClienteDTO> create(@Valid @RequestBody ClienteDTO objDTO) { // endpoint aceita o JSON do formato DTO da classe ClienteDTO
																					  // @Valid valida as annotations @NotNull do ClienteDTO
		Cliente newObj = service.create(objDTO);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newObj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	
	@PutMapping (value = "/{id}")
	public ResponseEntity<ClienteDTO> update(@PathVariable Integer id, @Valid @RequestBody ClienteDTO objDTO){ // endpoint aceita o JSON do formato DTO da classe ClienteDTO
																					// @Valid valida as annotations @NotNull do ClienteDTO
		Cliente newObj = service.update(id, objDTO);
		
		return ResponseEntity.ok().body(new ClienteDTO(newObj)); // Response para o usuário de que atualizou o objeto
	}
	
	
	@DeleteMapping (value = "/{id}")
	public ResponseEntity<ClienteDTO> delete(@PathVariable Integer id){
		
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
}
