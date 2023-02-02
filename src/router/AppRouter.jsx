import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hook/useCheckAuth"
import { CheckingAuth } from "../interface/components"
import { JournalRoutes } from "../journal/routes/JournalRoutes"


export const AppRouter = () => {

    const { status } = useCheckAuth();

    if (status === 'checking') {
        // sirve para mostrar el icono de CircularProgress
        return <CheckingAuth />
    }

    return (
        <Routes>
            {/* condicional para mostrar las rutas */}
{
    (status === 'authenticated')
    // la parte del si
    ? <Route path="/*" element={<JournalRoutes />} />
    // esta es la parte del no
    : <Route path="/auth/*" element={<AuthRoutes />} />
}

{/* esta seria la ruta por defecto */}
<Route path="/*" element={<Navigate to='/auth/login' />} />

            {/* login y registro */}
            {/* cualquier path que entre por auth va a mostrar */}
            {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

            {/* JournalApp */}
            {/* // <Route path="/*" element={<JournalRoutes />} /> */}

            <Route />
        </Routes>
    )
}
