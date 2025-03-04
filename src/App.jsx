import { useState, useContext, useEffect } from "react"
import { Routes, Route } from "react-router"
import "./App.css"
import { Context } from "./contexts/Context"
import Navigation from "./containers/Navigation"
import Login from "./components/Login"
import DogContainer from "./containers/DogContainer"
import Home from "./containers/Home"

function App() {
    const { isLoggedIn } = useContext(Context)
    useEffect(() => {
        console.clear()
        console.log("loaded")

    }, [])

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Home />} />
                {/* <Route path="favorites" element={<DogContainer />} /> */}
            </Routes>
        </>
    )
}

export default App
