import React, { createContext, useState, ChangeEvent, ReactNode, useContext } from 'react';
interface InputContextType {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputContext = createContext<InputContextType | undefined>(undefined);
export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('errorrrrrrrrr');
  }
  return context;
};
interface InputProviderProps {
  children: ReactNode;
}
export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <InputContext.Provider value={{ value, onChange }}>
      {children}
    </InputContext.Provider>
  );
};
