import { type ReactNode } from 'react'

const index = ({ children }: { children: ReactNode }) => {
    return (
        <div className='2xl:container mx-auto flex items-center w-full h-full'>
            {children}
        </div>
    )
}

export default index
