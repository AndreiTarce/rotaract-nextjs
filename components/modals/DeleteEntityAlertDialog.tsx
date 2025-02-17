import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';

interface IDeleteEntityAlertDialogProps {
    onDelete: () => void;
}

export const DeleteEntityAlertDialog = ({ onDelete }: IDeleteEntityAlertDialogProps) => {
    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>Esti sigur(ă)?</AlertDialogTitle>
                <AlertDialogDescription>
                    Acțiunea de ștergere este ireversibilă!
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Anulare</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                    Sterge <FontAwesomeIcon icon={faTrash} className="ml-2" />
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    );
};
