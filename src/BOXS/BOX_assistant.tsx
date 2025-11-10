import { ReactNode } from 'react'


interface AssistantProps {
  children?: ReactNode;

}

function BOX_assistant({ children }: AssistantProps) {
  return (
    <div className='flex flex-col w-full h-full bg-light text-dark overflow-y-auto custom-scrollbar rounded-md gap-1'>
      {children}
    </div>
  )
}

export default BOX_assistant