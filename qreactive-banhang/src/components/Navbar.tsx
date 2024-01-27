import { NAV_LINKS } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { getServerSideUser } from '@/lib/qrload-util'
import {cookies} from 'next/headers'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'


const Navbar = async () => {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
        <header className='relative bg-white'>
        <MaxWidthWrapper>
        <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
                <div className='flex h-14 items-center justify-between border-zinc-200'>
                    <MobileNav/>
                    <div className='ml-4 flex lg:ml-0 pr-20'>
                        <Link href="/">
                            <Image src="/hilink-logo.svg" width={74} height={29} alt={'logo'} className=''/>
                        </Link>
                    </div>
                        
                    <ul className="hidden h-full gap-12 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link href={link.href}  key={link.key}
                            className='regular-16 text-black flexCenter
                            cursor-pointer pb-1.5 transition-all hover:font-bold'>
                                {link.label}
                            </Link>
                        ))}
                    </ul>
                    </div>

                
                    <div className='ml-auto flex items-center pl-20'>
                            <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                            {user ? null : (
                                <Link
                                href='/sign-in'
                                >
                                Sign in
                                </Link>
                            )}

                            {user ? null : (
                                <span
                                className='h-6 w-px bg-gray-200'
                                aria-hidden='true'
                                />
                            )}

                            {user ? (
                                <UserAccountNav user={user} />
                            ) : (
                                <Link
                                href='/sign-up'
                                >
                                Create account
                                </Link>
                            )}
                            
                            {user ? (
                                <span
                                className='h-6 w-px bg-gray-200'
                                aria-hidden='true'
                                />
                            ) : null}

                            {user ? null : (
                                <div className='flex lg:ml-6'>
                                <span
                                    className='h-6 w-px bg-gray-200'
                                    aria-hidden='true'
                                />
                                </div>
                            )}
                    </div>

                </div>
            </div>
            </div>
        </MaxWidthWrapper>
        </header>
    </div>
  )
}

export default Navbar