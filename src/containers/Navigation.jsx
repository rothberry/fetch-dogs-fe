import { useContext, useState } from "react"
import { NavLink } from "react-router"
import { Context } from "../contexts/Context"

const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#333",
    color: "white",
    padding: "16px",
    textAlign: "center",
    zIndex: 1000,
}

const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "background 0.3s",
}

const activeLinkStyle = {
    backgroundColor: "red",
}

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState("/")

    const { isLoggedIn, handleLogout } = useContext(Context)

    // const handleActive = () => {
    //     active
    // }
    return (
        <nav style={navStyle}>
            <NavLink style={linkStyle} activeStyle={activeLinkStyle} to="/">
                Home
            </NavLink>
            {isLoggedIn ? (
                <>
                    <NavLink
                        to="/matches"
                        style={linkStyle}
                        actiiveStyle={activeLinkStyle}
                    >
                        Check Matches
                    </NavLink>

                    <button style={linkStyle} onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <NavLink
                    to="/login"
                    style={linkStyle}
                    actiiveStyle={activeLinkStyle}
                >
                    Login
                </NavLink>
            )}
        </nav>
    )

    // if (isLoggedIn) {
    //     return (
    //         <nav style={navStyle}>
    //             <NavLink to="/">Home</NavLink>
    //             <button as="NavLink" onClick={handleLogout}>
    //                 Logout
    //             </button>
    //         </nav>
    //     )
    // } else {
    //     return (
    //         <nav>
    //             <NavLink to="/">Home</NavLink>
    //             <NavLink to="/login">Login</NavLink>
    //         </nav>
    //     )
    // }
}

export default Navigation
