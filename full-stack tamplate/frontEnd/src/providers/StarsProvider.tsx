import  { createContext, ReactNode, useState } from 'react'
import { User } from '../types/Types';

interface ContextProps {
    stars: User[]
    setstars: (stars: User[]) => void
}

export const StarsContext = createContext<ContextProps>({} as ContextProps);

const StarsProvider = ({ children }: { children: ReactNode }) => {
    const [stars, setstars] = useState<User[]>([])
  return (
    <StarsContext.Provider value={{ stars, setstars }}>
     {children}
    </StarsContext.Provider>
    
  )
}

export default StarsProvider
