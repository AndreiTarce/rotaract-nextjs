'use client';

import { errorToast } from '@/components/toasts/error-toast';
import { successToast } from '@/components/toasts/success-toast';
import { MeetingDto } from '@/dtos/meeting.dto';
import { MemberDto } from '@/dtos/member.dto';
import { createMeeting } from '@/lib/entityService';
import { cn } from '@/lib/utils';
import { IMeetingFormSchema, meetingFormSchema } from '@/schemas/meetingSchema';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AlertOctagon, CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../../ui/form';
import { Input } from '../../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { MEETING_TYPES } from '../constants';
import MemberSelect, { IPresentMemberSelect } from '../members/MemberSelect';

export default function AddMeetingForm({ user }: { user: MemberDto }) {
    const [status, setStatus] = useState('');
    const [presentMembers, setPresentMembers] = useState<IPresentMemberSelect[]>([]);

    const queryClient = useQueryClient();

    const statuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error',
    };

    const form = useForm<IMeetingFormSchema>({
        resolver: zodResolver(meetingFormSchema),
        defaultValues: {
            location: 'Facultatea de Business',
            type: MEETING_TYPES[0].name,
            minuteUrl: '',
            start_date: new Date(),
            start_hour: '20:00',
            minuteAuthor: `${user?.first_name} ${user?.last_name}`,
            minuteAuthorId: user.id,
            presentMembers: [],
            highlights: '',
        },
    });

    const getPresentMembersArray = (array: IPresentMemberSelect[]) =>
        array.map((member) => member.value);

    const onSubmit = async (values: IMeetingFormSchema) => {
        const { start_date, start_hour } = values;
        const [hours, minutes] = start_hour.split(':').map(Number);
        start_date.setHours(hours);
        start_date.setMinutes(minutes);
        const presentMembersArray = getPresentMembersArray(presentMembers);

        const meetingToBeCreated: Partial<MeetingDto> = {
            ...values,
            start_date,
            presentMembers: presentMembersArray,
        };

        setStatus(statuses.loading);

        const createdMeeting = await createMeeting(meetingToBeCreated);

        if (!createdMeeting) {
            setStatus(statuses.error);
            errorToast({
                title: 'Adaugare sedinta',
                message: 'Sedinta nu a fost adaugata.',
            });
            return;
        }

        form.reset();
        queryClient.invalidateQueries({
            queryKey: ['meetings'],
            exact: false,
        });
        setPresentMembers([]);
        setStatus(statuses.submitted);
        successToast({
            title: 'Adaugare sedinta',
            message: 'Sedinta a fost adaugata cu succes',
        });
    };

    return (
        <Card className="col-span-1 h-fit">
            <CardHeader className="pb-4">
                <CardTitle>Adaugare sedinta</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Tipul sedintei</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tipul sedintei" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {MEETING_TYPES.map((meeting, index: number) => (
                                                        <SelectItem
                                                            value={meeting.name}
                                                            key={meeting.id}
                                                        >
                                                            {meeting.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {form.formState.errors.type && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.type?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Locatie</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Locatie" {...field} />
                                        </FormControl>
                                        {form.formState.errors.location && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.location?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minuteAuthor"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Autorul minutei</FormLabel>
                                        <FormControl>
                                            <Input disabled placeholder="Autor" {...field} />
                                        </FormControl>
                                        {form.formState.errors.minuteAuthor && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.minuteAuthor?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Data</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[240px] pl-3 text-left font-normal',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, 'PPP')
                                                        ) : (
                                                            <span>Alege o data</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date < new Date('1900-01-01')
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {form.formState.errors.start_date && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.start_date?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="start_hour"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Ora</FormLabel>
                                        <FormControl>
                                            <Input placeholder="(HH:MM)" {...field} />
                                        </FormControl>
                                        {form.formState.errors.start_hour && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.start_hour?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minuteUrl"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Link minuta</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Link" {...field} />
                                        </FormControl>
                                        {form.formState.errors.minuteUrl && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.minuteUrl?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="presentMembers"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Membri prezenti</FormLabel>
                                        <MemberSelect
                                            presentMembers={presentMembers!}
                                            setPresentMembers={setPresentMembers}
                                            setFormValue={form.setValue}
                                            clearErrors={form.clearErrors}
                                        />
                                        {form.formState.errors.presentMembers && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.presentMembers?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="highlights"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Highlights</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Coming soon"
                                                {...field}
                                                disabled
                                            />
                                        </FormControl>
                                        {form.formState.errors.highlights && (
                                            <FormDescription className="text-destructive">
                                                <span className="flex gap-2">
                                                    <AlertOctagon size={20} />
                                                    {form.formState.errors.highlights?.message}
                                                </span>
                                            </FormDescription>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <div className="flex w-full justify-end">
                                <Button type="submit">
                                    {status === statuses.loading ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                            className="dark:fill-dark mr-2 animate-spin fill-white"
                                        >
                                            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                                        </svg>
                                    ) : (
                                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    )}
                                    Adaugare
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    );
}
