'use client';

import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MemberDto } from '@/dtos/member.dto';
import {
    IMemberLinksZodSchema,
    memberRoles,
    memberStatus,
} from '@/interfaces/member/IMember';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertOctagon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '../form';
import { Input } from '../input';
import { Label } from '../label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select';
import { Textarea } from '../textarea';

export interface IMemberFormProps {
    userInfo?: MemberDto;
    onSubmit: (values: MemberFormSchema) => Promise<void> | void;
    status: memberFormStatuses | undefined;
    fieldsContainerClassname?: string;
    readOnly?: boolean;
    setIsReadOnly?: Dispatch<SetStateAction<boolean | undefined>>;
}

export enum memberFormStatuses {
    LOADING = 'loading',
    SUBMITTED = 'submitted',
    ERROR = 'error',
}

const formSchema = z.object({
    id: z.number().optional(),
    first_name: z.string().min(1, { message: 'First name is required.' }),
    last_name: z.string().min(1, { message: 'Last name is required.' }),
    picture_link: z.string().optional(),
    picture_file: z.instanceof(FileList).optional(),
    description: z.string().optional(),
    role: z.nativeEnum(memberRoles),
    urls: IMemberLinksZodSchema.optional(),
    start_mandate: z.number().optional(),
    email: z
        .string()
        .email('This is not a valid email')
        .min(1, { message: 'Email is required' }),
    status: z.nativeEnum(memberStatus),
    isBoard: z.boolean().optional(),
});

export type MemberFormSchema = z.infer<typeof formSchema>;

export default function MemberForm({
    userInfo,
    onSubmit,
    status,
    fieldsContainerClassname,
    readOnly = false,
    setIsReadOnly,
}: IMemberFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userInfo || {
            first_name: '',
            last_name: '',
            role: memberRoles.MEMBER,
            email: '',
            status: memberStatus.ASPIRANT,
        },
    });

    const handleSubmit = async (values: MemberFormSchema) => {
        onSubmit(values);
        form.reset();
    };

    const fileRef = form.register('picture_file');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div
                    className={
                        fieldsContainerClassname || 'flex flex-col gap-4'
                    }
                >
                    {!readOnly && (
                        <FormField
                            control={form.control}
                            name="last_name"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nume</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nume" {...field} />
                                    </FormControl>
                                    {form.formState.errors.last_name && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors
                                                        .last_name?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                    )}
                    {!readOnly && (
                        <FormField
                            control={form.control}
                            name="first_name"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prenume</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Prenume"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.first_name && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors
                                                        .first_name?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email (pe care il foloseste si pe drive)"
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.email && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {
                                                form.formState.errors.email
                                                    ?.message
                                            }
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                    {userInfo && !readOnly && (
                        <FormField
                            control={form.control}
                            name="picture_link"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link poza</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link" {...field} />
                                    </FormControl>
                                    {form.formState.errors.picture_link && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors
                                                        .picture_link?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                    )}
                    {!readOnly && (
                        <FormField
                            control={form.control}
                            name="picture_file"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Poza profil</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="Link"
                                            {...fileRef}
                                            disabled={readOnly}
                                        />
                                    </FormControl>
                                    {form.formState.errors.picture_file && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors
                                                        .picture_file?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="description"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descriere personala</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Descriere..."
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.description && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {
                                                form.formState.errors
                                                    .description?.message
                                            }
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Functie</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={readOnly}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Alege o functie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(memberRoles).map(
                                                    (item) => (
                                                        <SelectItem
                                                            value={item}
                                                            key={item}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {form.formState.errors.role && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {
                                                form.formState.errors.role
                                                    ?.message
                                            }
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                    {form.getValues('role') &&
                        form.watch('role') !== 'member' && (
                            <FormField
                                control={form.control}
                                name="start_mandate"
                                disabled={readOnly}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>An start mandat</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Start mandat"
                                                {...field}
                                                {...form.register(
                                                    'start_mandate',
                                                    {
                                                        setValueAs: (v) =>
                                                            v === ''
                                                                ? undefined
                                                                : parseInt(
                                                                      v,
                                                                      10
                                                                  ),
                                                    }
                                                )}
                                            />
                                        </FormControl>
                                        {form.formState.errors
                                            .start_mandate && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .start_mandate
                                                            ?.message
                                                    }
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                        )}
                    <FormField
                        control={form.control}
                        name="status"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={readOnly}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Alege un status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(
                                                    memberStatus
                                                ).map((item) => (
                                                    <SelectItem
                                                        value={item}
                                                        key={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {form.formState.errors.status && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {
                                                form.formState.errors.status
                                                    ?.message
                                            }
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                    <div>
                        <Label>Linkuri</Label>
                        <FormField
                            control={form.control}
                            name="urls.facebook"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem className="mb-2 pt-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Facebook"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.urls?.facebook && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors.urls
                                                        .facebook?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="urls.instagram"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Instagram"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.urls?.instagram && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors.urls
                                                        .instagram?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="urls.linkedin"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Linkedin"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.urls?.linkedin && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors.urls
                                                        .linkedin?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="urls.tiktok"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Tiktok"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.urls?.tiktok && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors.urls
                                                        .tiktok?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="urls.website"
                            disabled={readOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Website"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.urls?.website && (
                                        <FormDescription className="text-destructive">
                                            <span className="flex gap-2">
                                                <AlertOctagon size={20} />
                                                {
                                                    form.formState.errors.urls
                                                        .website?.message
                                                }
                                            </span>
                                        </FormDescription>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {!readOnly && (
                    <div className="mt-4 flex w-full justify-end">
                        {!userInfo && (
                            <Button type="submit">
                                {status === memberFormStatuses.LOADING ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                        className="mr-2 animate-spin fill-white dark:fill-dark"
                                    >
                                        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                                    </svg>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    />
                                )}
                                Adaugare
                            </Button>
                        )}
                        {userInfo && setIsReadOnly && (
                            <div className="flex w-full gap-2">
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() => setIsReadOnly(true)}
                                >
                                    Anuleaza
                                </Button>
                                <Button className="w-full">
                                    <FontAwesomeIcon
                                        icon={faFloppyDisk}
                                        className="mr-2"
                                    />
                                    Salveaza modificarile
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </Form>
    );
}
