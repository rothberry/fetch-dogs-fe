import { useState, useContext, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router"
import "./App.css"
import { Context } from "./contexts/Context"
import Navigation from "./containers/Navigation"
import Login from "./components/Login"
import DogContainer from "./containers/DogContainer"
import Home from "./containers/Home"
import PageNotFound from "./components/PageNotFound"

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
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default App
