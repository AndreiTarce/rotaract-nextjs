import {
    IProjectArticle,
    IProjectArticleDocument,
} from '@/interfaces/projectArticle/IProjectArticle';

export interface ProjectArticleDto extends IProjectArticle {
    id: string;
}

export function toProjectArticleDto(
    projectArticle: IProjectArticleDocument
): ProjectArticleDto {
    return {
        id: projectArticle.id,
        projectId: projectArticle.projectId,
        year: projectArticle.year,
        start_date: projectArticle.start_date,
        end_date: projectArticle.end_date,
        location: projectArticle.location,
        summary: projectArticle.summary,
        coverImg: projectArticle.coverImg,
        images: projectArticle.images,
        articleBody: projectArticle.articleBody,
        partners: projectArticle.partners,
    };
}
