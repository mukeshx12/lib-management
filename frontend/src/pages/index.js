import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
    <div className='bg-white h-screen'>
    <h1 className='text-center p-8 text-4xl text-bold'>Welcome to the Library Management System</h1>
    <div className="flex items-center justify-center p-4 text-2xl">
      <div className="text-center ">
        <Link href="/login/user">
          <div className="bg-blue-500 border-2 border-gray-400 p-4  m-5 rounded text-2xl w-80 cursor-pointer ">User Login</div>
        </Link>
        <Link href="/login/vendor">
          <div className="bg-blue-500 border-2 border-gray-400 p-4  m-5 rounded  text-2xl w-80 cursor-pointer">Vendor Login</div>
        </Link>
        <Link href="/login/admin">
          <div className="bg-blue-500 border-2 border-gray-400 p-4  m-5 rounded text-2xl w-80 cursor-pointer">Admin Login</div>
        </Link>
      </div>
    </div>
  </div>
  </main>
  )
}
