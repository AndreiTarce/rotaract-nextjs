'use client';

import { DeleteEntityWithConfirmationButton } from '@/components/modals/DeleteEntityWithConfirmationButton';
import MultiSelect from '@/components/multi-select/MultiSelect';
import { errorToast } from '@/components/toasts/error-toast';
import { successToast } from '@/components/toasts/success-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Textarea } from '@/components/ui/textarea';
import { PartnerDto } from '@/dtos/partner.dto';
import { ProjectDto } from '@/dtos/project.dto';
import { PARTNERS_PATH } from '@/lib/constants';
import { deleteProject } from '@/lib/entityService';
import { projectFormSchema } from '@/schemas/projectSchema';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';
import { AlertOctagon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../../ui/form';
import { MarkdownEditor } from '../markdown-editor/MarkdownEditor';

const clientProjectFormSchema = projectFormSchema.extend({
    thumbnailImg: z.instanceof(FileList).optional(),
    coverImg: z.instanceof(FileList).optional(),
});

export type IClientProjectFormSchema = z.infer<typeof clientProjectFormSchema>;

interface IProjectFormProps {
    project?: ProjectDto;
    partners?: PartnerDto[];
    readOnly?: boolean;
    setReadOnly?: Dispatch<SetStateAction<boolean>>;
    onSubmit: (values: IClientProjectFormSchema) => Promise<void> | void;
}

export default function ProjectForm({
    project,
    partners,
    readOnly,
    setReadOnly,
    onSubmit,
}: IProjectFormProps) {
    const form = useForm<IClientProjectFormSchema>({
        resolver: zodResolver(clientProjectFormSchema),
        defaultValues: {
            ...project,
            partners: partners?.map((partner) => ({
                label: partner.name,
                value: partner,
            })),
            thumbnailImg: undefined,
            coverImg: undefined,
        },
    });
    const thumbnailRef = form.register('thumbnailImg');
    const coverRef = form.register('coverImg');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onDelete = async (projectId: string) => {
        const response = await deleteProject(projectId);

        router.refresh();

        if (response.ok) {
            successToast({
                title: 'Stergere proiect',
                message: 'Proiectul a fost sters cu succes!',
            });
            return;
        }

        errorToast({
            title: 'Stergere proiect',
            message: 'Proiectul nu a putut fi sters.',
        });
    };

    const handleSubmit = async (values: IClientProjectFormSchema) => {
        setIsLoading(true);
        await onSubmit(values);
        router.refresh();
        form.reset();
        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <p className="mb-4 text-4xl font-bold">
                    {readOnly ? 'Detalii' : 'Editare'} proiect
                </p>
                <div className="mb-4 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nume</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nume" {...field} />
                                </FormControl>
                                {form.formState.errors.name && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {form.formState.errors.name?.message}
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="thumbnailImg"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        placeholder="Thumbnail"
                                        {...thumbnailRef}
                                        disabled={readOnly}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="coverImg"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        placeholder="Cover"
                                        {...coverRef}
                                        disabled={readOnly}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="URL" {...field} />
                                </FormControl>
                                {form.formState.errors.url && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {form.formState.errors.url?.message}
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="partners"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Parteneri</FormLabel>
                                <MultiSelect
                                    disabled={readOnly}
                                    values={form.getValues('partners')}
                                    entityPath={PARTNERS_PATH}
                                    labelKey="name"
                                    setFormValue={form.setValue}
                                    fieldName={field.name}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="shortDescription"
                        disabled={readOnly}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Scurta descriere</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Scurta descriere" {...field} />
                                </FormControl>
                                {form.formState.errors.shortDescription && (
                                    <FormDescription className="text-destructive">
                                        <span className="flex gap-2">
                                            <AlertOctagon size={20} />
                                            {form.formState.errors.shortDescription?.message}
                                        </span>
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="body"
                    disabled={readOnly}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body</FormLabel>
                            <FormControl>
                                {readOnly ? (
                                    <MDEditor.Markdown
                                        {...field}
                                        className="max-h-56 overflow-auto"
                                        source={field.value}
                                    />
                                ) : (
                                    <MarkdownEditor
                                        {...field}
                                        onChange={(value) => form.setValue('body', value)}
                                    />
                                )}
                            </FormControl>
                        </FormItem>
                    )}
                />
                {!readOnly && project && (
                    <div className="mt-4">
                        <div className="flex w-full flex-col-reverse gap-2 md:flex-row">
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => setReadOnly && setReadOnly(true)}
                                type="button"
                            >
                                Anuleaza
                            </Button>
                            <DeleteEntityWithConfirmationButton
                                className="w-full"
                                onDelete={() => onDelete(project.id)}
                            >
                                Sterge proiectul
                            </DeleteEntityWithConfirmationButton>
                            <Button className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <LoadingSpinner className="mr-2" />
                                ) : (
                                    <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                                )}
                                Salveaza modificarile
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    );
}
