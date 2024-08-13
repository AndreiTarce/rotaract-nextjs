'use client';

import { successToast } from '@/components/toasts/success-toast';
import { Button } from '@/components/ui/button';
import { PartnerDto } from '@/dtos/partner.dto';
import { ProjectDto } from '@/dtos/project.dto';
import { updateProject } from '@/lib/entityService';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ProjectForm, { IClientProjectFormSchema } from './ProjectForm';

const prepareProjectData = (values: IClientProjectFormSchema) => {
    const projectInfo = { ...values };
    projectInfo.partners = values.partners.map((partner: any) => ({
        partnerId: partner.value.id,
    }));
    const { thumbnailImg, coverImg } = projectInfo;
    delete projectInfo.coverImg;
    delete projectInfo.thumbnailImg;

    const formData = new FormData();
    formData.append('project', JSON.stringify(projectInfo));

    if (Object.keys(thumbnailImg as FileList).length && thumbnailImg)
        formData.append('thumbnailImg', thumbnailImg[0]);

    if (Object.keys(coverImg as FileList).length && coverImg)
        formData.append('coverImg', coverImg[0]);

    return formData;
};

export default function DashboardProjectDetails({
    project,
    partners,
}: {
    project: ProjectDto;
    partners: PartnerDto[];
}) {
    const [readOnly, setReadOnly] = useState<boolean>(true);

    const onSubmit = async (values: IClientProjectFormSchema) => {
        const dataToBeSaved = prepareProjectData(values);
        await updateProject(dataToBeSaved);
        setReadOnly(true);
        successToast({
            title: 'Editare proiect',
            message: 'Proiectul a fost editat cu succes',
        });
    };

    return (
        <div className="relative max-h-[80vh] overflow-auto">
            <ProjectForm
                key={JSON.stringify(project)}
                project={project}
                partners={partners}
                readOnly={readOnly}
                setReadOnly={setReadOnly}
                onSubmit={onSubmit}
            />
            {readOnly && (
                <Button className="mt-4" onClick={() => setReadOnly(false)}>
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-2 " />
                    Editare proiect
                </Button>
            )}
        </div>
    );
}
