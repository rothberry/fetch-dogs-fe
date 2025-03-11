import React, { useContext } from "react"
import DogCard from "../components/DogCard"
import { Context } from "../contexts/Context"

const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    justifyContent: "center",
    padding: "16px",
}
const DogContainer = () => {
    const { displayDogs, sortOptions } = useContext(Context)
    const mappedDogs = displayDogs.map((dogData) => (
        <DogCard {...dogData} key={dogData.id} />
    ))

    return (
        <div style={containerStyle}>
            {sortOptions.asc ? mappedDogs : mappedDogs.reverse()}
        </div>
    )
}

export default DogContainer
