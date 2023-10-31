package com.igor.helpdesk.services.exceptions;

public class UnexpectedTypeException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public UnexpectedTypeException(String message, Throwable cause) {
		super(message, cause);
	}

	public UnexpectedTypeException(String message) {
		super(message);
	}
}