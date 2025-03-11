import { createContext, useDebugValue, useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const Context = createContext(null)

const ContextProvider = ({ children }) => {
    // * State Store across App
    const [displayDogs, setDisplayDogs] = useState([])
    const [allBreeds, setAllBreeds] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [sortOptions, setSortOptions] = useState({
        field: "breed",
        asc: true,
    })
    const [activeBreeds, setActiveBreeds] = useState(null)
    const [matchIds, setMatchIds] = useState([])

    const [pagination, setPagination] = useState({
        nextUrl: null,
        prevUrl: null,
    })

    const navigate = useNavigate()

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
            isLoggedIn ? navigate("/") : navigate("login")
            // debugger
            // localStorage.setItem("fetch-access-token")
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

    const searchDogs = async (searchOptions = {}, queryBypassStr = null) => {
        console.log("SEARCHING FOR DOG IDS AND PAGES", searchOptions)
        // query for breeds returns an array of
        // next, prev, resultIds: Array, total: int
        try {
            let queryString
            let fullUrl
            if (queryBypassStr) {
                fullUrl = `${BASE_URL}${queryBypassStr}`
            } else {
                queryString = createURLQueryString(searchOptions)
                fullUrl = `${BASE_URL}/dogs/search/?${queryString}`
            }
            console.log(fullUrl)
            const resultsData = await fetch(fullUrl, BASE_REQ_OBJ)

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

    const getDogs = async (dogResultsIds = [], matchDogs = false) => {
        console.log("GETTING DOG OBJECTS")
        try {
            const dogResData = {
                ...BASE_REQ_OBJ,
                method: "POST",
                body: JSON.stringify(dogResultsIds),
            }
            const dogRes = await fetch(
                `${BASE_URL}/dogs${matchDogs ? "/match" : ""}`,
                dogResData
            )
            if (!dogRes.ok) {
                throw new Error(
                    `Error ${resultsData.status}: ${resultsData.statusText}`
                )
            }
            const dogResJson = await dogRes.json()
            console.log({ dogResJson })
            if (matchDogs) {
                await setDisplayDogs(
                    displayDogs.filter(({ id }) => id == dogResJson.match)
                )
                return
            }
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
            console.log(
                urlQueryOutput.join("&").replace(" ", "%20") +
                    createSortOptions(sortOptions)
            )
            return (
                urlQueryOutput.join("&").replace(" ", "%20") +
                "&" +
                createSortOptions(sortOptions)
            )
        } else {
            // if no search is given return string to get breeds in alphbetical order
            console.log("DEFAULT QUERY STR")
            return createSortOptions(sortOptions)
        }
    }

    const handleMatch = (matchId) => {
        setMatchIds((previousMatches) => {
            if (previousMatches.includes(matchId)) {
                console.log("REMOVING POTENTIAL MATCH")
                return previousMatches.filter((id) => id !== matchId)
            } else {
                console.log("ADDING POTENTIAL MATCH")
                return [...previousMatches, matchId]
            }
        })
    }

    const checkMatch = async () => {
        const matchId = await getDogs(matchIds, true)
        navigate("result")
    }

    const createSortOptions = () => {
        return `sort=${sortOptions.field}:${sortOptions.asc ? "asc" : "desc"}`
    }

    const handleLogout = () => {
        postAuth({ isLogin: false })
    }

    const pageForward = (direction = true) => {
        console.log(`TURNING THE PAGE ${direction ? "FORWARD" : "BACKWARD"}`)
        console.log(pagination)
        if (direction) {
            searchDogs({}, pagination.nextUrl)
        } else {
            searchDogs({}, pagination.prevUrl)
        }
    }

    useEffect(() => {
        console.log("context loaded")
    }, [])

    useEffect(() => {
        if (activeBreeds) {
            searchDogs({ breeds: activeBreeds })
        } else {
            searchDogs()
        }
    }, [activeBreeds, sortOptions])

    const store = {
        testing: "testing",
        displayDogs,
        setDisplayDogs,
        isLoggedIn,
        setLoggedIn,
        postAuth,
        getBreeds,
        handleLogout,
        sortOptions,
        setSortOptions,
        allBreeds,
        searchDogs,
        pagination,
        pageForward,
        activeBreeds,
        setActiveBreeds,
        handleMatch,
        matchIds,
        getDogs,
        checkMatch,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}

export default ContextProvider
