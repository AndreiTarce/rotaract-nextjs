import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { toast } from '../ui/use-toast';

export interface IToastProps {
    title: string;
    message: string;
    duration?: number;
    icon?: React.ReactElement | React.ReactNode;
}

export const successToast = ({
    title,
    message,
    duration = 5000,
    icon,
}: IToastProps) =>
    toast({
        title,
        description: (
            <div className="flex gap-2">
                {icon ? (
                    icon
                ) : (
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-green-500"
                    />
                )}
                <span className="self-center">{message}</span>
            </div>
        ),
        duration,
    });
