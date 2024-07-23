'use client';
import { IMember } from '@/interfaces/member/IMember';
import { MEMBERS_PATH } from '@/lib/constants';
import Select from 'react-select/async';
import './MemberSelect.css';

export interface IPresentMemberSelect {
    value: IMember;
    label: string;
}

const getOptions = (members: IMember[]) => {
    const options = members.map((member) => ({
        value: member,
        label: `${member.first_name} ${member.last_name}`,
    }));
    return options;
};

const getMembers = async (name: string) => {
    const url = MEMBERS_PATH;
    try {
        const res = await fetch(
            url +
                '?' +
                new URLSearchParams({
                    name: name,
                }),
            { cache: 'no-store' }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch members');
        }
        return res.json();
    } catch (error) {
        console.log('Error loading members: ', error);
    }
};

const promiseOptions = (inputValue: string) =>
    new Promise<IPresentMemberSelect[]>(async (resolve) => {
        const members: IMember[] = await getMembers(inputValue);
        resolve(getOptions(members));
    });

const filterOptions = (
    option: any,
    input: string,
    array: IPresentMemberSelect[]
) => {
    if (array && array.length) {
        for (let element of array) {
            if (element.label === option.label) {
                return false;
            }
        }
    }
    return true;
};

export default function MemberSelect({
    presentMembers,
    setPresentMembers,
    setFormValue,
    clearErrors,
}: {
    presentMembers: IPresentMemberSelect[];
    setPresentMembers: React.Dispatch<
        React.SetStateAction<IPresentMemberSelect[]>
    >;
    setFormValue: any;
    clearErrors: any;
}) {
    return (
        <>
            <Select
                className="member-select"
                classNames={{
                    control: () => 'member-select-control',
                    indicatorSeparator: () =>
                        'member-select-indicator-separator',
                    indicatorsContainer: () =>
                        'member-select-indicator-container',
                    option: () => 'member-select-option',
                    menu: () => 'member-select-menu',
                    multiValue: () => 'member-select-multivalue',
                    placeholder: () => 'member-select-placeholder',
                    input: () => 'member-select-input',
                }}
                value={presentMembers}
                hideSelectedOptions={true}
                loadOptions={promiseOptions}
                closeMenuOnSelect={false}
                isMulti
                isSearchable
                defaultOptions
                onChange={(e: any) => {
                    setPresentMembers(e);
                    setFormValue('presentMembers', e);
                    if (e.length) clearErrors();
                }}
                filterOption={(option, __) =>
                    filterOptions(option, __, presentMembers)
                }
            />
        </>
    );
}
