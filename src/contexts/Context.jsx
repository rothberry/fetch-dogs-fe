import { createContext, useDebugValue, useEffect, useState } from "react"

export const Context = createContext(null)

const ContextProvider = ({ children }) => {
    // * State Store across App
    const [displayDogs, setDisplayDogs] = useState([])
    const [allBreeds, setAllBreeds] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [dogFilter, setDogFilter] = useState("")
    const [sortAsc, setSortAsc] = useState(true)

    // * Constants
    const BASE_URL = "https://frontend-take-home-service.fetch.com"
    const BASE_REQ_OBJ = {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    }

    const postAuth = async ({ loginData = {}, isLogin = true }) => {
        try {
            const resData = {
                ...BASE_REQ_OBJ,
                method: "POST",
                body: JSON.stringify(loginData),
            }
            const res = await fetch(
                `${BASE_URL}/auth/${isLogin ? "login" : "logout"}`,
                resData
            )

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
            setLoggedIn(isLogin)
        } catch (error) {
            console.error("Error in Fetch:", error)
            throw error
        }
    }

    const getBreeds = async () => {
        try {
            const res = await fetch(
                `${BASE_URL}${"/dogs/breeds"}`,
                BASE_REQ_OBJ
            )

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
            const resJson = await res.json()
            console.log(resJson)
            setAllBreeds(resJson)
            return resJson
        } catch (err) {
            console.error("Error in Fetch:", err)
            throw err
        }
    }

    const searchDogs = async ({ search = {} }) => {
        try {
            const queryString = createURLQueryString(search)
            const res = await fetch(
                `${BASE_URL}/dogs/search/?${queryString}`,
                BASE_REQ_OBJ
            )

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

    const createURLQueryString = (searchOptions) => {
        const urlQueryOutput = []
        for (let k in searchOptions) {
            console.log(k, searchOptions[k])
            const query = k + "=" + searchOptions[k]
            console.log(query)
            urlQueryOutput.push(query)
        }
        return urlQueryOutput.join("&").replace(" ", "%20")
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
        displayDogs,
        setDisplayDogs,
        isLoggedIn,
        setLoggedIn,
        dogFilter,
        setDogFilter,
        postAuth,
        getBreeds,
        handleLogout,
        sortAsc,
        setSortAsc,
        allBreeds,
        searchDogs,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}

export default ContextProvider
