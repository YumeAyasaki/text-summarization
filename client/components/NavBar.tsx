'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { NavBarConstant } from '@/constants/NavBar'

export const NavBar = () => {
    const pathname = usePathname()
    return (
    <div className="fixed top-0 left-0 w-full h-10 px-3 flex items-center bg-violet-500">
        <nav className="flex space-x-4">
            {NavBarConstant.map((navItem) => (
                <Link href={navItem.url} className={`rounded-md px-4 py-2 font-bold text-white hover:bg-violet-600 ${pathname === navItem.url ? 'bg-violet-700' : ''}`}>
                    {navItem.name}
                </Link>))
            }
        </nav>
    </div>)
}