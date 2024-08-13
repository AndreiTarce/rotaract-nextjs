import Markdown from 'react-markdown';
import './ProjectArticleBody.scss';

export const ProjectArticleBody = ({ body }: { body: string }) => {
    return <Markdown className="project-article-body">{body}</Markdown>;
};
