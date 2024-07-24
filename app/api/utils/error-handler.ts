import { NextResponse } from 'next/server';
import { NotFoundError, ValidationError } from './errors';

export const errorHandler = (error: unknown) => {
    console.log(error);

    if (error instanceof Error && error.name === 'CastError') {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof ValidationError) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof NotFoundError) {
        return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json({ message: 'Server error' }, { status: 500 });
};
