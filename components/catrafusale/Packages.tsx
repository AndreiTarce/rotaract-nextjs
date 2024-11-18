'use client';
import double from '@/assets/images/double.png';
import table from '@/assets/images/masa.png';
import mixt from '@/assets/images/masa_stander.png';
import single from '@/assets/images/single.png';
import { useState } from 'react';
import { getStripePrices } from '../payments/constants';
import { CatrafusaleRegistrationForm } from './CatrafusaleRegistrationForm';
import { CatrafusalePackageCard } from './PackageCard';

export default function CatrafusalePackages({
    remainingStanders,
    remainingTables,
}: {
    remainingStanders: number;
    remainingTables: number;
}) {
    const [productId, setProductId] = useState<string | undefined>();
    const { CATRAFUSALE_2024_WINTER_EDITION_PACKAGES } = getStripePrices();

    if (productId) return <CatrafusaleRegistrationForm productId={productId} />;

    return (
        <div className="mt-4 grid w-full grid-cols-1 gap-8 md:w-1/2 md:grid-cols-2 md:gap-8">
            <CatrafusalePackageCard
                title="SINGLE"
                description={
                    <span>
                        1 stander
                        <br />
                        25 price tags
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
                productId={CATRAFUSALE_2024_WINTER_EDITION_PACKAGES.SINGLE}
                setProductId={setProductId}
                image={single}
                sold_out={!remainingStanders}
            />
            <CatrafusalePackageCard
                title="DOUBLE"
                description={
                    <span>
                        2 standere
                        <br />
                        50 price tags
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
                productId={CATRAFUSALE_2024_WINTER_EDITION_PACKAGES.DOUBLE}
                setProductId={setProductId}
                image={double}
                sold_out={remainingStanders < 2}
            />
            <CatrafusalePackageCard
                title="SINGLE TABLE"
                description={
                    <span>
                        1 masă (tip cocktail)
                        <br />
                        25 price tags
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
                productId={
                    CATRAFUSALE_2024_WINTER_EDITION_PACKAGES.SINGLE_TABLE
                }
                setProductId={setProductId}
                image={table}
                sold_out={!remainingTables}
            />
            <CatrafusalePackageCard
                title="MIXT"
                description={
                    <span>
                        1 stander
                        <br />
                        1 masă (tip cocktail)
                        <br />
                        50 price tags
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
                productId={CATRAFUSALE_2024_WINTER_EDITION_PACKAGES.MIXT}
                setProductId={setProductId}
                image={mixt}
                sold_out={!remainingTables || !remainingStanders}
            />
        </div>
    );
}
