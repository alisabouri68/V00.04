import { type ReactNode } from 'react'

const index = ({ children }: { children: ReactNode }) => {
    return (
        <div className='container mx-auto flex items-center min-h-full'>
            {children}
        </div>
    )
}

export default index
