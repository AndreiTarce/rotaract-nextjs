'use client';
import { Button } from '@/components/ui/button';
import { MemberDto } from '@/dtos/member.dto';
import { IMemberLinks } from '@/interfaces/member/IMember';
import { getMemberById, updateMember } from '@/lib/entityService';
import { isSecretary } from '@/lib/utils';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MemberForm, { IClientMemberFormSchema } from '../MemberForm';
import { removeUndefinedLinkKeys } from '../utils';

export default function EditMemberForm({
    userId,
    readOnly,
    currentUser,
}: {
    userId: string;
    readOnly?: boolean;
    currentUser: MemberDto;
}) {
    const queryClient = useQueryClient();

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['member', userId],
        queryFn: async () => {
            const member = await getMemberById(userId);
            return member;
        },
    });

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

        const updatedMember = await updateMember(formData);

        if (updatedMember) {
            queryClient.invalidateQueries({ queryKey: ['member', userId] });
            router.refresh();
            setIsReadOnly(true);
        }
    };

    const [isReadOnly, setIsReadOnly] = useState(readOnly);

    if (isLoading) return <p>Loading...</p>;

    if (userInfo)
        return (
            <>
                <p className="text-4xl font-bold">
                    {isReadOnly ? 'Informatii' : 'Editare'} membru
                </p>
                {isReadOnly && (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <p className="text-2xl font-semibold">
                                {userInfo.first_name}
                            </p>
                            <p className="text-2xl font-light">
                                {userInfo.last_name}
                            </p>
                        </div>
                        <Image
                            src={userInfo.picture}
                            alt="Member picture"
                            height={50}
                            width={50}
                            className="rounded"
                            unoptimized
                        />
                    </div>
                )}
                <MemberForm
                    key={JSON.stringify(userInfo)}
                    status={undefined}
                    onSubmit={onSubmit}
                    fieldsContainerClassname="md:grid md:grid-cols-2 md:gap-y-2 md:gap-x-4 md:w-[50vw] flex flex-col gap-4"
                    userInfo={userInfo}
                    readOnly={isReadOnly}
                    setIsReadOnly={setIsReadOnly}
                />
                {isSecretary(currentUser) && isReadOnly && (
                    <Button onClick={() => setIsReadOnly(false)}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="mr-2"
                        />
                        Editare membru
                    </Button>
                )}
            </>
        );
}
