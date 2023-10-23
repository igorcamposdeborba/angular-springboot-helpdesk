package com.igor.helpdesk.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.igor.helpdesk.services.DBService;

@Configuration
@Profile(value = "test")
public class TestConfig {
	
	@Autowired
	private DBService dbService;
	
	
	@Bean // sobe método automaticamente ao chamad a classe TestConfig
	public void instanciaDB() {
		this.dbService.instanciaDB();
	}

}
