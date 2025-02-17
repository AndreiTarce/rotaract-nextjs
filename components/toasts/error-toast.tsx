import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from '../ui/use-toast';
import { IToastProps } from './success-toast';

export const errorToast = ({ title, message, duration = 5000, icon }: IToastProps) =>
    toast({
        title,
        variant: 'destructive',
        description: (
            <div className="flex gap-2">
                {icon ? icon : <FontAwesomeIcon icon={faCircleXmark} />}
                <span className="self-center">{message}</span>
            </div>
        ),
        duration,
    });
