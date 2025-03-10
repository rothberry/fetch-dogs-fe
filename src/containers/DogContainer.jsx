import React, { useContext } from "react"
import DogCard from "../components/DogCard"
import { Context } from "../contexts/Context"

const DogContainer = () => {
    const { displayDogs, pageForward, sortAsc } = useContext(Context)
    const mappedDogs = displayDogs.map((d) => (
        <DogCard dogData={d} key={d.id} />
    ))

    return (
        <div>
            DogContainer
            <br />
            {sortAsc ? mappedDogs : mappedDogs.reverse()}
            <button onClick={() => pageForward(false)}>Previous</button>
            <button onClick={pageForward}>Next</button>
        </div>
    )
}

export default DogContainer
