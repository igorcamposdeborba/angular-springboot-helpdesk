package com.igor.helpdesk.resources.exceptions;

import java.io.Serializable;

//Classe que eu escolho os campos que quero mostrar na exception
public class FieldMessage implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String fieldName;
	private String message;
	
	public FieldMessage() {
		super();
	}
	
	public FieldMessage(String fieldName, String message) {
		super();
		this.fieldName = fieldName;
		this.message = message;
	}
	
	public String getFieldName() {
		return fieldName;
	}
	public String getMessage() {
		return message;
	}
	
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
