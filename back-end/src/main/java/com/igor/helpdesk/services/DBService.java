package com.igor.helpdesk.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.helpdesk.domain.Chamado;
import com.igor.helpdesk.domain.Cliente;
import com.igor.helpdesk.domain.Tecnico;
import com.igor.helpdesk.domain.enums.Perfil;
import com.igor.helpdesk.domain.enums.Prioridade;
import com.igor.helpdesk.domain.enums.Status;
import com.igor.helpdesk.repositories.ChamadoRepository;
import com.igor.helpdesk.repositories.ClienteRepository;
import com.igor.helpdesk.repositories.TecnicoRepository;

@Service  // injetar instancias (injeção de dependências) em outras partes do código
public class DBService {
	
	@Autowired // spring intancia objeto injetando dependência
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private ChamadoRepository chamadoRepository;
	
	public void instanciaDB() {
		Tecnico tec1 = new Tecnico(null, "Igor Borba", "igor@hotmail.com", "201.132.470-01", "123");
		tec1.addPerfil(Perfil.ADMIN);
		Tecnico tec2 = new Tecnico(null, "John Lennon", "john@gmail.com", "095.695.630-01", "987");
		Tecnico tec3 = new Tecnico(null, "Joana das Graças", "joana@yahoo.com", "021.976.080-29", "456");
		Tecnico tec4 = new Tecnico(null, "Richard Stallman", "stallman@mail.com", "903.347.070-56", "123");
		Tecnico tec5 = new Tecnico(null, "Claude Elwood Shannon", "shannon@mail.com", "271.068.470-54", "123");
		Tecnico tec6 = new Tecnico(null, "Tim Berners-Lee", "lee@mail.com", "162.720.120-39", "123");
		Tecnico tec7 = new Tecnico(null, "Linus Torvalds", "linus@mail.com", "778.556.170-27", "123");
		
		Cliente cli1 = new Cliente(null, "Linus Torvalds", "torvalds@hotmail.com", "91459876210", "123");
		Cliente cli2 = new Cliente(null, "Marie Curie", "curie@mail.com", "322.429.140-06", "123");
		Cliente cli3 = new Cliente(null, "Charles Darwin", "darwin@mail.com", "792.043.830-62", "123");
		Cliente cli4 = new Cliente(null, "Stephen Hawking", "hawking@mail.com", "177.409.680-30", "123");
		Cliente cli5 = new Cliente(null, "Max Planck", "planck@mail.com", "081.399.300-83", "123");
		
		Chamado c1 = new Chamado(null, Prioridade.MEDIA, Status.ANDAMENTO, "Chamado 01", "Primeiro chamado descrição", tec1, cli1);
		Chamado c2 = new Chamado(null, Prioridade.ALTA, Status.ABERTO, "Chamado 02", "Segundo chamado descrição", tec2, cli3);
		Chamado c3 = new Chamado(null, Prioridade.ALTA, Status.ABERTO, "Chamado 2", "Teste chamado 2", tec1, cli2);
		Chamado c4 = new Chamado(null, Prioridade.BAIXA, Status.ENCERRADO, "Chamado 3", "Teste chamado 3", tec2, cli3);
		Chamado c5 = new Chamado(null, Prioridade.ALTA, Status.ABERTO, "Chamado 4", "Teste chamado 4", tec3, cli3);
		Chamado c6 = new Chamado(null, Prioridade.MEDIA, Status.ANDAMENTO, "Chamado 5", "Teste chamado 5", tec2, cli1);
		Chamado c7 = new Chamado(null, Prioridade.BAIXA, Status.ENCERRADO, "Chamado 7", "Teste chamado 6", tec1, cli5);
		
		tecnicoRepository.saveAll(Arrays.asList(tec1, tec2, tec3, tec4, tec5, tec6, tec7));
		clienteRepository.saveAll(Arrays.asList(cli1, cli2, cli3, cli4, cli5));
		chamadoRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5, c6, c7));
	}
}
