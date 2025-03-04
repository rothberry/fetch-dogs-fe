import { useState } from "react"
import { NavLink } from "react-router"
// import styles from "./Navigation.css"

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState('/')

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dogs">Dogs</NavLink>
            {/* <NavLink to="/favorites">Favs</NavLink> */}
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default Navigation
