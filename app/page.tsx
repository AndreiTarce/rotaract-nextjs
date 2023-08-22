import Image from 'next/image'
import background from '../assets/images/bg.png'

export default function Home() {
  return (
    <main className='h-screen flex items-center'>
      <div className='z-10 mb-60 mx-16 max-md:mx-4'>
        <h1 className="text-7xl font-bold max-md:text-5xl leading-none">
          Rotaract Visio
        </h1>
        <span className='font-normal text-5xl max-md:text-4xl'>
          Cluj-Napoca
        </span>
      </div>
      <Image src={background} alt="background" quality={100} className='fixed object-cover h-full top-0 z-0 brightness-75' />
    </main>
  )
}
