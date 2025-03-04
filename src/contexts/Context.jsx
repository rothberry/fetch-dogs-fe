import { createContext, useEffect, useState } from "react"

export const Context = createContext(null)

const ContextProvider = ({ children }) => {
    const [dogs, setDogs] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [dogFilter, setDogFilter] = useState("")
    const [sortAsc, setSortAsc] = useState(true)

    const BASE_URL = "https://frontend-take-home-service.fetch.com"

    const fetchData = async (
        endpoint,
        method = "GET",
        options = {},
        search = {}
    ) => {
        try {
            const resData = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const res = await fetch(`${BASE_URL}${endpoint}`, resData)

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
            return await res.json()
        } catch (err) {
            console.error("Error in Fetch:", err)
            throw err
        }
    }

    const postAuth = async ({ loginData = {}, isLogin = true }) => {
        try {
            const resData = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(loginData),
            }
            const res = await fetch(
                `${BASE_URL}/auth/${isLogin ? "login" : "logout"}`,
                resData
            )

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
        } catch (error) {
            console.error("Error in Fetch:", error)
            throw error
        }
    }

    const getBreeds = async () => {
        try {
            const resData = {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
            const res = await fetch(`${BASE_URL}${"/dogs/breeds"}`, resData)

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
            const resJson = await res.json()
            console.log(resJson)
            return resJson
        } catch (err) {
            console.error("Error in Fetch:", err)
            throw err
        }
    }

    const handleLogout = () => {
        postAuth({ isLogin: false })
    }

    useEffect(() => {
        console.log("context loaded")
        // postAuth({ name: "test1", email: "test@test.com" })
        // debugger
    }, [])

    const store = {
        testing: "testing",
        dogs,
        isLoggedIn,
        setLoggedIn,
        dogFilter,
        setDogFilter,
        postAuth,
        getBreeds,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}

export default ContextProvider
