'use client';
import double from '@/assets/images/double.png';
import table from '@/assets/images/masa.png';
import mixt from '@/assets/images/masa_stander.png';
import single from '@/assets/images/single.png';
import { useState } from 'react';
import { CATRAFUSALE_PACKAGES } from '../payments/constants';
import { CatrafusaleRegistrationForm } from './CatrafusaleRegistrationForm';
import { CatrafusalePackageCard } from './PackageCard';

export default function CatrafusalePackages({
    singlePackageRegistrations,
}: {
    singlePackageRegistrations?: number;
}) {
    const [productId, setProductId] = useState<string | undefined>();

    if (productId) return <CatrafusaleRegistrationForm productId={productId} />;

    return (
        <div className="mt-4 grid w-full grid-cols-1 gap-8 md:w-1/2 md:grid-cols-2 md:gap-8">
            <CatrafusalePackageCard
                title="SINGLE"
                description={
                    <span>
                        1 stander
                        <br />
                        50 price tags
                        <br />
                        10 umerașe
                    </span>
                }
                price={250}
                dimensions={
                    <span>
                        <b>Dimensiuni stander</b>
                        <br />
                        Înălțime: 130cm
                        <br />
                        Lungime: 120cm
                    </span>
                }
                productId={CATRAFUSALE_PACKAGES.SINGLE}
                setProductId={setProductId}
                image={single}
            />
            <CatrafusalePackageCard
                title="DOUBLE"
                description={
                    <span>
                        2 standere
                        <br />
                        100 price tags
                        <br />
                        20 umerașe
                    </span>
                }
                price={400}
                dimensions={
                    <span>
                        <b>Dimensiuni stander</b>
                        <br />
                        Înălțime: 130cm
                        <br />
                        Lungime: 120cm
                    </span>
                }
                productId={CATRAFUSALE_PACKAGES.DOUBLE}
                setProductId={setProductId}
                image={double}
            />
            <CatrafusalePackageCard
                title="SINGLE TABLE"
                description={
                    <span>
                        1 masă (tip cocktail)
                        <br />
                        50 price tags
                    </span>
                }
                price={150}
                dimensions={
                    <span>
                        <b>Dimensiuni masă</b>
                        <br />
                        Diametru: 80cm
                        <br />
                        Înălțime: 110cm
                    </span>
                }
                productId={CATRAFUSALE_PACKAGES.SINGLE_TABLE}
                setProductId={setProductId}
                image={table}
                sold_out={(singlePackageRegistrations as number) > 5}
            />
            <CatrafusalePackageCard
                title="MIXT"
                description={
                    <span>
                        1 stander
                        <br />
                        1 masă (tip cocktail)
                        <br />
                        100 price tags
                        <br />
                        10 umerașe
                    </span>
                }
                price={350}
                dimensions={
                    <span>
                        <b>Dimensiuni stander</b>
                        <br />
                        Înălțime: 130cm
                        <br />
                        Lungime: 120cm
                        <br />
                        <b>Dimensiuni masă</b>
                        <br />
                        Diametru: 80cm
                        <br />
                        Înălțime: 110cm
                    </span>
                }
                productId={CATRAFUSALE_PACKAGES.MIXT}
                setProductId={setProductId}
                image={mixt}
                sold_out={(singlePackageRegistrations as number) > 5}
            />
        </div>
    );
}
