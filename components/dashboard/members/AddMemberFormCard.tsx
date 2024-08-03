'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { MemberDto } from '@/dtos/member.dto';
import { IMemberLinks } from '@/interfaces/member/IMember';
import { createMember } from '@/lib/entityService';
import { memberFormStatuses } from '@/schemas/memberSchema';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import MemberForm, { IClientMemberFormSchema } from '../MemberForm';
import { removeUndefinedLinkKeys } from '../utils';

export default function AddMemberFormCard({
    userInfo,
}: {
    userInfo?: MemberDto;
}) {
    const [status, setStatus] = useState<memberFormStatuses | undefined>();

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

        console.log(formData);

        const createdMember = await createMember(formData);

        if (!createdMember) {
            setStatus(memberFormStatuses.ERROR);
            toast({
                title: 'Eroare la adaugare',
                variant: 'destructive',
                description: (
                    <div className="flex gap-2">
                        <span className="self-center">
                            Membrul nu a fost adaugat.
                        </span>
                    </div>
                ),
                duration: 10000,
            });
            return;
        }

        setStatus(memberFormStatuses.SUBMITTED);
        toast({
            title: 'Membru adaugat',
            description: (
                <div className="flex gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="self-center">
                        Membrul {data.first_name} {data.last_name} a fost
                        adaugat cu success!
                    </span>
                </div>
            ),
            duration: 10000,
        });
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
