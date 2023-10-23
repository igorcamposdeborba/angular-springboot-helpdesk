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

import com.igor.helpdesk.domain.Tecnico;
import com.igor.helpdesk.domain.dtos.TecnicoDTO;
import com.igor.helpdesk.services.TecnicoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/tecnicos")
public class TecnicoResource {
	
	@Autowired
	protected TecnicoService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<TecnicoDTO> findById(@PathVariable Integer id){ // controla resposta http do servidor (eu especifico header e body)
																		  // retorna o DTO
		Tecnico obj = this.service.findById(id);
		
		return ResponseEntity.ok().body(new TecnicoDTO(obj)); // header: ok()  body: objeto
	}
	
	@GetMapping (value = {"/", ""}) // aceita duas rotas no endpoint
	public ResponseEntity<List<TecnicoDTO>> findAll(){
		List<Tecnico> list = service.findAll();
		
		List<TecnicoDTO> listDTO = list.stream().map(obj -> new TecnicoDTO(obj)).collect(Collectors.toList()); // lista de Tecnicos
		
		return ResponseEntity.ok().body(listDTO);
	}
	
	
	@PostMapping
	public ResponseEntity<TecnicoDTO> create(@Valid @RequestBody TecnicoDTO objDTO) { // endpoint aceita o JSON do formato DTO da classe TecnicoDTO
																					  // @Valid valida as annotations @NotNull do TecnicoDTO
		Tecnico newObj = service.create(objDTO);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newObj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	
	@PutMapping (value = "/{id}")
	public ResponseEntity<TecnicoDTO> update(@PathVariable Integer id, @Valid @RequestBody TecnicoDTO objDTO){ // endpoint aceita o JSON do formato DTO da classe TecnicoDTO
																					// @Valid valida as annotations @NotNull do TecnicoDTO
		Tecnico newObj = service.update(id, objDTO);
		
		return ResponseEntity.ok().body(new TecnicoDTO(newObj)); // Response para o usuário de que atualizou o objeto
	}
	
	@DeleteMapping (value = "/{id}")
	public ResponseEntity<TecnicoDTO> delete(@PathVariable Integer id){
		
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
}
