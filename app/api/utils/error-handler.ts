import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { NotFoundError, RegistrationNotAvailableError, ValidationError } from './errors';

export const errorHandler = (error: unknown) => {
    console.log(error);

    if (error instanceof ZodError) {
        const messages = error.errors.map((error) => `${error.path}:${error.message}`);
        return NextResponse.json({ message: messages }, { status: 400 });
    }

    if (error instanceof Error && error.name === 'CastError') {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof ValidationError) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof NotFoundError) {
        return new NextResponse(null, { status: 404 });
    }

    if (error instanceof RegistrationNotAvailableError) {
        return NextResponse.json({ message: error.message }, { status: 409 });
    }

    return NextResponse.json({ message: 'Server error' }, { status: 500 });
};
