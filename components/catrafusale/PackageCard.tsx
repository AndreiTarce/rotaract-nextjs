import Image, { StaticImageData } from 'next/image';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface IPackageCard {
    title: string;
    description: string | ReactElement;
    price: number;
    dimensions: string | ReactElement;
    productId: string;
    setProductId: Dispatch<SetStateAction<string | undefined>>;
    image: StaticImageData;
    sold_out?: boolean;
}

export const CatrafusalePackageCard = ({
    title,
    description,
    price,
    dimensions,
    productId,
    setProductId,
    image,
    sold_out = false,
}: IPackageCard) => (
    <Card className="relative mx-auto flex h-full w-full flex-col items-center rounded-lg border p-6 text-center text-gray-900 dark:text-white xl:p-8">
        <h3 className="mb-4 text-4xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-500 dark:text-gray-400 sm:text-lg">
            {description}
            <br />
        </p>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {dimensions}
        </p>
        <Image
            src={image}
            alt="package picture"
            height={800}
            width={800}
            quality={100}
            className="mt-4"
        />
        <div className="my-8 flex items-baseline justify-center">
            <span className="mr-2 text-5xl font-extrabold">{price} RON</span>
        </div>
        <div className="mt-8 flex h-full w-full items-end justify-end">
            <Button
                className="w-full bg-[#eda298] text-base font-semibold"
                onClick={() => {
                    setProductId(productId);
                }}
                disabled={sold_out}
            >
                {sold_out ? 'SOLD OUT' : 'Înscrie-te'}
            </Button>
        </div>
    </Card>
);
