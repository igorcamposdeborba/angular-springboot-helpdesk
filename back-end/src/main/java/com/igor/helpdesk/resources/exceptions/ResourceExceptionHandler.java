package com.igor.helpdesk.resources.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.igor.helpdesk.services.exceptions.DataIntegrityViolationException;
import com.igor.helpdesk.services.exceptions.ObjectNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice // controller das mensagens de exception (manipulador de exceções)
public class ResourceExceptionHandler {
	
	@ExceptionHandler(ObjectNotFoundException.class) // manipulador de exceções da classe ObjectNotFoundException - para findById não encontrado
	public ResponseEntity<StandardError> objectNotFoundException(ObjectNotFoundException exception, HttpServletRequest request) {
		
		StandardError error = new StandardError(System.currentTimeMillis(), 
												HttpStatus.NOT_FOUND.value(),
												"Object not found",
												exception.getMessage(),
												request.getRequestURI());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
		
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class) // manipulador de exceções da classe dataIntegrityViolationException - para evitar duplicação no banco de POST
	public ResponseEntity<StandardError> dataIntegrityViolationException(DataIntegrityViolationException exception, HttpServletRequest request) {
		
		StandardError error = new StandardError(System.currentTimeMillis(), 
												HttpStatus.BAD_REQUEST.value(),
												"Violação de dados",
												exception.getMessage(),
												request.getRequestURI());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class) // manipulador de exceções da classe dataIntegrityViolationException - para validar se vieram todos os campos obrigatórios
	public ResponseEntity<StandardError> validationErrors(MethodArgumentNotValidException exception, HttpServletRequest request) {
		
		ValidationError errors = new ValidationError(System.currentTimeMillis(), 
												HttpStatus.BAD_REQUEST.value(), 
												"Erro na validação dos campos", 
												exception.getMessage(), 
												request.getRequestURI());
		
		for(FieldError i : exception.getBindingResult().getFieldErrors()) {
			errors.addError(i.getField(), i.getDefaultMessage());
		}
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors); 
	}
}
