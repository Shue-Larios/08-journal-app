import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* sino estamos en una de las paginas de arriba lo redireccionamos */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />


    </Routes>
  )
}
