'use client'

import {
    IMember,
    IMemberLinks,
    IMemberLinksZodSchema,
    memberRoles,
    memberStatus,
} from '@/models/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertOctagon, Facebook } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '../form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select'
import { Input } from '../input'
import { Button } from '../button'
import { Textarea } from '../textarea'
import { Label } from '../label'
import { removeUndefinedLinkKeys } from './utils'

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
        defaultValues: userInfo || {},
    })
    const fileRef = form.register('picture_file')

    const onSubmit = async (values: MemberFormSchema) => {
        const data = { ...values }
        const { picture_file } = data
        removeUndefinedLinkKeys(data.urls as IMemberLinks)
        if (!Object.keys(data.urls as IMemberLinks).length) delete data.urls
        delete data.picture_file

        const formData = new FormData()
        formData.append('member', JSON.stringify(data))
        if (Object.keys(picture_file as FileList).length && picture_file)
            formData.append('picture_file', picture_file[0])

        try {
            const response = await fetch('/api/members', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            console.log(data.status)
        } catch (error) {
            console.log(error)
        }
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
                        <Button type="submit">send</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
