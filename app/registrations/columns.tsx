'use client';

import { CatrafusaleRegistrationWinter2024Dto } from '@/dtos/registration.dto';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<CatrafusaleRegistrationWinter2024Dto>[] = [
    {
        accessorKey: 'position',
        header: 'Nr.',
    },
    {
        accessorKey: 'first_name',
        header: 'Nume',
    },
    {
        accessorKey: 'last_name',
        header: 'Prenume',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'package',
        header: 'Pachet',
    },
    {
        accessorKey: 'phone_number',
        header: 'Telefon',
    },
    {
        accessorKey: 'shop_name',
        header: 'Nume magazin',
    },
    {
        accessorKey: 'payment_confirmed',
        header: 'Plata confirmata',
    },
];
