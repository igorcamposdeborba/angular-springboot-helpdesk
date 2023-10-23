package com.igor.helpdesk.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.igor.helpdesk.services.DBService;

@Configuration
@Profile(value = "dev")
public class DevConfig {
	
	@Autowired
	private DBService dbService;
	
	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String value;
	
	
	@Bean // sobe método automaticamente a chamada classe TestConfig
	public boolean instanciaDB() {
		if (value.equals("create")) { // criar as tabelas (zerar dados)
			this.dbService.instanciaDB();			
		}
		return false; // não cria tabelas porque já foram criadas
	}

}
