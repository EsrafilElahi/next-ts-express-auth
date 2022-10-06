import type { NextPage } from 'next'
import Image from 'next/future/image'
import img from '/public/bg.jpg'

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-orange-300">
        Hello world!
      </h1>

      <h1>ornge</h1>

      <h3>h2</h3>

      <button className='btn-blue'>salam</button>

      <Image src={img} className="w-[40em] h-[30em]" />
    </div>
  )
}

export default Home
