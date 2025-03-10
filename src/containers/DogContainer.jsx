import React, { useContext } from "react"
import DogCard from "../components/DogCard"
import { Context } from "../contexts/Context"

const DogContainer = () => {
    const { displayDogs, pageForward } = useContext(Context)
    const mappedDogs = displayDogs.map((d) => <DogCard dogData={d} />)

    return (
        <div>
            DogContainer
            <br />
            {mappedDogs}
            <button onClick={() => pageForward(false)}>Previous</button>
            <button onClick={pageForward}>Next</button>
        </div>
    )
}

export default DogContainer
