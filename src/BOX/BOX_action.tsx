interface BOXActionnProps {
  children?: React.ReactNode;
  className?: string;
}

function BOX_actionn({ children, className = "" }: BOXActionnProps) {
  return (
    <div className={`flex items-center w-full h-full gap-1 ${className}`}>
      {children}
    </div>
  );
}

export default BOX_actionn;
