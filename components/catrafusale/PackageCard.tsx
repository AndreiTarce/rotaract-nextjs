import { Dispatch, ReactElement, SetStateAction } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Image, { StaticImageData } from 'next/image'

interface IPricingCardProps {
    title: string
    description: string
    price: number
    lunchIncluded?: boolean
    productId: string
    setPackageChosen: Dispatch<SetStateAction<string | undefined>>
    setProductId: Dispatch<SetStateAction<string>>
}

interface IPackageCard {
    title: string
    description: string | ReactElement
    price: number
    dimensions: string
    productId: string
    setProductId: Dispatch<SetStateAction<string>>
    image: StaticImageData
}

export const CatrafusalePackageCard = ({
    title,
    description,
    price,
    dimensions,
    productId,
    setProductId,
    image,
}: IPackageCard) => (
    <Card className="w-full relative h-full flex flex-col items-center p-6 mx-auto text-center text-gray-900 rounded-lg border xl:p-8 dark:text-white">
        <h3 className="mb-4 text-4xl font-semibold">{title}</h3>
        <p className="text-gray-500 sm:text-lg dark:text-gray-400 mb-4">
            {description}
            <br />
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
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
        <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">{price} RON</span>
        </div>
        <div className="h-full w-full flex justify-end items-end mt-8">
            <Button
                className="font-semibold w-full bg-[#eda298] text-base"
                onClick={() => {
                    setProductId(productId)
                }}
            >
                Înscrie-te
            </Button>
        </div>
    </Card>
)
