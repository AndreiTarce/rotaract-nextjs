'use client'
import { useState } from 'react'
import { CatrafusalePackageCard } from './PackageCard'

export default function CatrafusalePackages() {
    const [productId, setProductId] = useState('')

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-8 md:gap-8 mt-12">
            <CatrafusalePackageCard
                title="SIMPLU"
                description={
                    <span>
                        1 stander
                        <br />
                        50 price tags
                    </span>
                }
                price={250}
                dimensions="Dimensiune stander: 100x20x30cm"
                productId="pId"
                setProductId={setProductId}
            />
        </div>
    )
}
