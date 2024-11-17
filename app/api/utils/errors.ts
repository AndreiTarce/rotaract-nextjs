export class ValidationError extends Error {
    constructor(message?: string, options?: ErrorOptions) {
        super(`Validation error${message ? `: ${message}` : ''}`, options);
        Error.captureStackTrace(this, ValidationError);
    }
}

export class NotFoundError extends Error {
    constructor() {
        super();
    }
}

export class RegistrationNotAvailableError extends Error {
    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
        Error.captureStackTrace(this, ValidationError);
    }
}
