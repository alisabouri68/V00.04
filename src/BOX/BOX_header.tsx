import { ReactNode } from "react";

interface PropsBoxHeader {
  slots?: Record<string, ReactNode>;
  consolName: string
}

function BOX_header({ slots = {}, consolName }: PropsBoxHeader) {
  return (
    <header className="flex items-center min-h-16 max-h-16 bg-light text-dark w-full *:grow rounded-md">
      <div className="flex items-center px-5">
        <div >
          {consolName}
        </div>
        <div >
          {slots.slot0}
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <div>{slots.slot1}</div>
        <div>{slots.slot2}</div>
        <div>{slots.slot3}</div>
      </div>
    </header>
  );
}

export default BOX_header;