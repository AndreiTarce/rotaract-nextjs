import Image from 'next/image'
import background from '../assets/images/bg.png'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className='relative z-0'>
      <div className='h-screen flex flex-col mt-28 justify-between'>
        <div className='z-10 mx-16 max-md:mx-4'>
          <h1 className="text-7xl font-extrabold max-md:text-5xl leading-none">
            Rotaract Visio
          </h1>
          <span className='font-normal text-5xl max-md:text-4xl'>
            Cluj-Napoca
          </span>
        </div>
        <div className='z-10 mx-16 max-md:mx-4 text-4xl flex flex-col gap-2 mb-36 text-white'>
          <span>
            Vrei să te implici?
          </span>
          <Button className='w-44 text-lg bg-rotaract-cranberry text-white hover:bg-[#020817BB]'>
            Contactează-ne
          </Button>
        </div>
        <Image src={background} alt="background" quality={100} className='brightness-75 object-cover absolute h-screen right-0' />
      </div>
      <div>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    </main>
  )
}
