'use client';

import { CatrafusaleWorkshopRegistrationWinter2024Dto } from '@/dtos/registration.dto';
import { ColumnDef } from '@tanstack/react-table';

export const catrafusaleWorkshopColumns: ColumnDef<CatrafusaleWorkshopRegistrationWinter2024Dto>[] =
    [
        {
            accessorKey: 'position',
            header: 'Nr.',
        },
        {
            accessorKey: 'first_name',
            header: 'Prenume',
        },
        {
            accessorKey: 'last_name',
            header: 'Nume',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'package',
            header: 'Atelier',
        },
        {
            accessorKey: 'phone_number',
            header: 'Telefon',
        },
        {
            accessorKey: 'payment_confirmed',
            header: 'Plata confirmata',
        },
    ];
