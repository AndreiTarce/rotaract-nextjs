import React from 'react';

export interface IEmailData {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    react?: React.ReactElement<any> | React.ReactNode | null;
}
