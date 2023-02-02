import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"

 

 
export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element= { <JournalPage /> } />

        {/* // si entro a esta ruta y no stoy en el / */}
        <Route path="/*" element= { <Navigate to="/" /> } />


    </Routes>
  )
}
