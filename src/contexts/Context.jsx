import { createContext, useDebugValue, useEffect, useState } from "react"

export const Context = createContext(null)

const ContextProvider = ({ children }) => {
    // * State Store across App
    const [displayDogs, setDisplayDogs] = useState([])
    const [allBreeds, setAllBreeds] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [dogFilter, setDogFilter] = useState("")
    const [sortAsc, setSortAsc] = useState(true)
    const [pagination, setPagination] = useState({
        nextUrl: null,
        prevUrl: null,
    })

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
        console.log("GETTING ALL BREEDS")
        try {
            const res = await fetch(
                `${BASE_URL}${"/dogs/breeds"}`,
                BASE_REQ_OBJ
            )

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }
            const resJson = await res.json()
            setAllBreeds(resJson)
            return resJson
        } catch (err) {
            console.error("Error in Fetch:", err)
            throw err
        }
    }

    const searchDogs = async (searchOptions = {}) => {
        console.log("SEARCHING FOR DOG IDS AND PAGES", searchOptions)
        // query for breeds returns an array of
        // next, prev, resultIds: Array, total: int
        try {
            const queryString = createURLQueryString(searchOptions)
            const resultsData = await fetch(
                `${BASE_URL}/dogs/search/?${queryString}`,
                BASE_REQ_OBJ
            )

            if (!resultsData.ok) {
                throw new Error(
                    `Error ${resultsData.status}: ${resultsData.statusText}`
                )
            }
            const resultsDataJson = await resultsData.json()
            console.log(resultsDataJson)
            setPagination({
                nextUrl: resultsDataJson.next || null,
                prevUrl: resultsDataJson.prev || null,
            })
            await getDogs(resultsDataJson.resultIds)
            return
        } catch (err) {
            console.error("Error in Fetch:", err)
            throw err
        }
    }

    const getDogs = async (dogResultsIds = []) => {
        console.log("GETTING DOG OBJECTS")
        try {
            const dogResData = {
                ...BASE_REQ_OBJ,
                method: "POST",
                body: JSON.stringify(dogResultsIds),
            }
            const dogRes = await fetch(`${BASE_URL}/dogs`, dogResData)
            if (!dogRes.ok) {
                throw new Error(
                    `Error ${resultsData.status}: ${resultsData.statusText}`
                )
            }
            const dogResJson = await dogRes.json()
            console.log({ dogResJson })
            setDisplayDogs(dogResJson)
            return
        } catch (err) {
            console.error("Error in Fetch:", err)
            throw err
        }
    }
    const createURLQueryString = (searchOptions) => {
        console.log("CREATING QUERY STR for ", searchOptions)
        if (Object.entries(searchOptions).length > 0) {
            const urlQueryOutput = []
            for (let k in searchOptions) {
                console.log(k, searchOptions[k])
                const query = k + "=" + searchOptions[k]
                console.log(query)
                urlQueryOutput.push(query)
            }
            console.log(urlQueryOutput.join("&").replace(" ", "%20"))
            return urlQueryOutput.join("&").replace(" ", "%20")
        } else {
            // if no search is given return string to get breeds in alphbetical order
            console.log("DEFAULT QUERY STR")
            return "sort=breed:asc"
        }
    }

    const handleLogout = () => {
        postAuth({ isLogin: false })
    }

    const pageForward = (direction = true) => {
        console.log(`TURNING THE PAGE ${direction ? "FORWARD" : "BACKWARD"}`)
        console.log(pagination)
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
        pagination,
        pageForward,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}

export default ContextProvider
