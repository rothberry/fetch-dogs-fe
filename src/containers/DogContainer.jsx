import React, { useContext } from "react"
import DogCard from "../components/DogCard"
import { Context } from "../contexts/Context"

const DogContainer = () => {
    const { displayDogs, pageForward, sortAsc, pagination } =
        useContext(Context)
    const mappedDogs = displayDogs.map((d) => (
        <DogCard dogData={d} key={d.id} />
    ))

    return (
        <div>
            DogContainer
            <br />
            {sortAsc ? mappedDogs : mappedDogs.reverse()}
            {pagination.prevUrl ? (
                <button onClick={() => pageForward(false)}>Previous</button>
            ) : null}
            {pagination.nextUrl ? (
                <button onClick={pageForward}>Next</button>
            ) : null}
        </div>
    )
}

export default DogContainer
