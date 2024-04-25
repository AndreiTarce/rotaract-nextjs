'use client'
import { IMember } from '@/models/interfaces'
import MemberForm, { MemberFormSchema, memberFormStatuses } from './MemberForm'
import { isSecretary } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function EditMemberForm({
    userInfo,
    readOnly,
    currentUser,
}: {
    userInfo: IMember
    readOnly?: boolean
    currentUser: IMember
}) {
    const onSubmit = (values: MemberFormSchema) => {}
    const [isReadOnly, setIsReadOnly] = useState(readOnly)

    return (
        <>
            <p className="text-4xl font-bold">
                {isReadOnly ? 'Informatii' : 'Editare'} membru
            </p>
            {isReadOnly && (
                <div className="flex gap-4 items-center">
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
                    />
                </div>
            )}
            <MemberForm
                status={undefined}
                onSubmit={onSubmit}
                fieldsContainerClassname="md:grid md:grid-cols-2 md:gap-y-2 md:gap-x-4 md:w-[50vw] flex flex-col gap-4"
                userInfo={userInfo}
                readOnly={isReadOnly}
                setIsReadOnly={setIsReadOnly}
            />
            {/* {isSecretary(currentUser) && isReadOnly && (
                <Button onClick={() => setIsReadOnly(false)}>
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                    Editare membru
                </Button>
            )} */}
        </>
    )
}
