import { useContext, useState } from "react"
import { NavLink } from "react-router"
import { Context } from "../contexts/Context"

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState("/")

    const { isLoggedIn, handleLogout } = useContext(Context)

    if (isLoggedIn) {
        return (
            <nav>
                <NavLink to="/">Home</NavLink>
                <button as="NavLink" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        )
    } else {
        return (
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
        )
    }
}

export default Navigation
