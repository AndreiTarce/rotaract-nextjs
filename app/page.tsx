import Image from 'next/image'
import background from '../assets/images/bg.png'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className='h-[80vh] flex flex-col mt-28'>
      <div className='z-10 mx-16 max-md:mx-4'>
        <h1 className="text-7xl font-extrabold max-md:text-5xl leading-none">
          Rotaract Visio
        </h1>
        <span className='font-normal text-5xl max-md:text-4xl'>
          Cluj-Napoca
        </span>
      </div>
      <div className='z-10 mx-16 max-md:mx-4 mt-20 max-md:mt-96 text-4xl flex flex-col gap-2'>
        <span>
          Vrei să te implici?
        </span>
        <Button className='w-44 text-lg bg-rotaract-cranberry text-white hover:bg-[#020817BB]'>
          Contactează-ne
        </Button>
      </div>
      <Image src={background} alt="background" quality={100} className='fixed object-cover h-full top-0 z-0 brightness-75' />
    </main>
  )
}
