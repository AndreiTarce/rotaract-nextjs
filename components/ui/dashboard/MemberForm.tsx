'use client'

import {
    IMember,
    IMemberLinks,
    IMemberLinksZodSchema,
    memberRoles,
    memberStatus,
} from '@/models/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '../form'
import { Input } from '../input'
import { Label } from '../label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select'
import { Textarea } from '../textarea'
import { removeUndefinedLinkKeys } from './utils'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from '../use-toast'

interface IMemberFormProps {
    userInfo?: IMember
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
})

type MemberFormSchema = z.infer<typeof formSchema>

export default function MemberForm({ userInfo }: IMemberFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userInfo || {
            first_name: '',
            last_name: '',
            role: memberRoles.MEMBER,
            email: '',
            status: memberStatus.ASPIRANT,
        },
    })
    const fileRef = form.register('picture_file')
    const [status, setStatus] = useState('')

    const statuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error',
    }

    const onSubmit = async (values: MemberFormSchema) => {
        const data: MemberFormSchema = { ...values }
        const { picture_file } = data
        removeUndefinedLinkKeys(data.urls as IMemberLinks)
        if (!Object.keys(data.urls as IMemberLinks).length) delete data.urls
        delete data.picture_file

        const formData = new FormData()
        formData.append('member', JSON.stringify(data))

        if (Object.keys(picture_file as FileList).length && picture_file)
            formData.append('picture_file', picture_file[0])

        setStatus(statuses.loading)

        try {
            const response = await fetch('/api/members', {
                method: 'POST',
                body: formData,
            })

            setStatus(statuses.submitted)
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
            })
        } catch (error) {
            console.log(error)
            setStatus(statuses.error)
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
            })
        }
        form.reset()
    }

    return (
        <Card className="h-fit">
            <CardHeader className="pb-4">
                <CardTitle>
                    {userInfo ? 'Editare' : 'Adaugare'} membru
                </CardTitle>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-0">
                        <div>
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Nume</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nume"
                                                {...field}
                                            />
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
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
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
                                                        form.formState.errors
                                                            .email?.message
                                                    }
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            {userInfo && (
                                <FormField
                                    control={form.control}
                                    name="picture_link"
                                    render={({ field }) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>Link poza</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Link"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {form.formState.errors
                                                .picture_link && (
                                                <FormDescription className="text-destructive">
                                                    <span className="flex gap-2">
                                                        <AlertOctagon
                                                            size={20}
                                                        />
                                                        {
                                                            form.formState
                                                                .errors
                                                                .picture_link
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
                                name="picture_file"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Poza profil</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Link"
                                                {...fileRef}
                                            />
                                        </FormControl>
                                        {form.formState.errors.picture_file && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .picture_file
                                                            ?.message
                                                    }
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>
                                            Descriere personala
                                        </FormLabel>
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
                                                            .description
                                                            ?.message
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
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Functie</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Alege o functie" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.values(
                                                            memberRoles
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
                                        {form.formState.errors.role && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .role?.message
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
                                        render={({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormLabel>
                                                    An start mandat
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Start mandat"
                                                        {...field}
                                                        {...form.register(
                                                            'start_mandate',
                                                            {
                                                                setValueAs: (
                                                                    v
                                                                ) =>
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
                                                            <AlertOctagon
                                                                size={20}
                                                            />
                                                            {
                                                                form.formState
                                                                    .errors
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
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
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
                                                        form.formState.errors
                                                            .status?.message
                                                    }
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-start-2 col-end-2">
                            <Label>Linkuri</Label>
                            <FormField
                                control={form.control}
                                name="urls.facebook"
                                render={({ field }) => (
                                    <FormItem className="mb-4 pt-2">
                                        <FormControl>
                                            <Input
                                                placeholder="Facebook"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.urls
                                            ?.facebook && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .urls.facebook
                                                            ?.message
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
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormControl>
                                            <Input
                                                placeholder="Instagram"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.urls
                                            ?.instagram && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .urls.instagram
                                                            ?.message
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
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormControl>
                                            <Input
                                                placeholder="Linkedin"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.urls
                                            ?.linkedin && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .urls.linkedin
                                                            ?.message
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
                                render={({ field }) => (
                                    <FormItem className="mb-4">
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
                                                        form.formState.errors
                                                            .urls.tiktok
                                                            ?.message
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
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormControl>
                                            <Input
                                                placeholder="Website"
                                                {...field}
                                            />
                                        </FormControl>
                                        {form.formState.errors.urls
                                            ?.website && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {
                                                        form.formState.errors
                                                            .urls.website
                                                            ?.message
                                                    }
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full justify-end">
                            <Button type="submit">
                                {status === statuses.loading ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                        className="animate-spin mr-2 fill-white dark:fill-dark"
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
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
