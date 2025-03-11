import { useContext } from "react"
import { Navigate } from "react-router"
import { Context } from "./contexts/Context"

const ProtectedRoute = ({ children, redirectPath }) => {
    const { isLoggedIn } = useContext(Context)
    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default ProtectedRoute
