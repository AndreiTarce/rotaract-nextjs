import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { DeleteEntityAlertDialog } from './DeleteEntityAlertDialog';

interface IDeleteEntityWithConfirmationButtonProps {
    onDelete: (...args: any) => any;
    children: React.ReactNode;
    className?: string;
}

export const DeleteEntityWithConfirmationButton = ({
    onDelete,
    children,
    className,
}: IDeleteEntityWithConfirmationButtonProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className={className}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    {children}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <DeleteEntityAlertDialog onDelete={onDelete} />
            </AlertDialogContent>
        </AlertDialog>
    );
};
