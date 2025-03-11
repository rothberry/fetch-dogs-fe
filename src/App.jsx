import { useState, useContext, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router"
import "./App.css"
import { Context } from "./contexts/Context"
import Navigation from "./containers/Navigation"
import Login from "./components/Login"
import Home from "./containers/Home"
import PageNotFound from "./components/PageNotFound"
import ProtectedRoute from "./ProtectedRoute"

function App() {
    // const { isLoggedIn } = useContext(Context)
    useEffect(() => {
        // console.clear()
        console.log("app loaded")
    }, [])

    return (
        <>
            <Navigation />
            <br />
            <Routes>
                <Route
                    index
                    element={
                        <ProtectedRoute redirectPath={"login"}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="login" element={<Login />} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default App
