import  { ReactNode } from 'react'

const Main = ({ children }: { children: ReactNode}) => {
  return (
    <div className="main-container">
      
      {children}
    </div>
  )
}

export default Main
