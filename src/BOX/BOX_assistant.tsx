import { ReactNode } from 'react'

function BOX_assistant({ children }: { children: ReactNode }) {
  return (
    <div 
      className='flex flex-col gap-1 w-3/12 h-full bg-light text-dark rounded-md overflow-hidden'
      data-component="assistant" 
    >
      {children}
    </div>
  )
}

export default BOX_assistant