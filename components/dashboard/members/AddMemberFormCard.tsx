'use client';

import { errorToast } from '@/components/toasts/error-toast';
import { successToast } from '@/components/toasts/success-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberDto } from '@/dtos/member.dto';
import { IMemberLinks } from '@/interfaces/member/IMember';
import { createMember } from '@/lib/entityService';
import { memberFormStatuses } from '@/schemas/memberSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { removeUndefinedLinkKeys } from '../utils';
import MemberForm, { IClientMemberFormSchema } from './MemberForm';

export default function AddMemberFormCard({
    userInfo,
}: {
    userInfo?: MemberDto;
}) {
    const [status, setStatus] = useState<memberFormStatuses | undefined>();
    const router = useRouter();

    const onSubmit = async (values: IClientMemberFormSchema) => {
        const data = { ...values };
        const { picture_file } = data;
        removeUndefinedLinkKeys(data.urls as IMemberLinks);
        if (!Object.keys(data.urls as IMemberLinks).length) delete data.urls;
        delete data.picture_file;

        const formData = new FormData();
        formData.append('member', JSON.stringify(data));

        if (Object.keys(picture_file as FileList).length && picture_file)
            formData.append('picture_file', picture_file[0]);

        setStatus(memberFormStatuses.LOADING);

        const createdMember = await createMember(formData);

        if (!createdMember) {
            setStatus(memberFormStatuses.ERROR);
            errorToast({
                title: 'Adaugare membru',
                message: 'Membrul nu a fost adaugat.',
            });
            return;
        }

        setStatus(memberFormStatuses.SUBMITTED);
        successToast({
            title: 'Adaugare membru',
            message: `Membrul ${data.first_name} ${data.last_name} a fost
                        adaugat cu success!`,
        });
        router.refresh();
    };

    return (
        <Card className="h-fit">
            <CardHeader className="pb-4">
                <CardTitle>
                    {userInfo ? 'Editare' : 'Adaugare'} membru
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MemberForm
                    userInfo={userInfo}
                    onSubmit={onSubmit}
                    status={status}
                />
            </CardContent>
        </Card>
    );
}
