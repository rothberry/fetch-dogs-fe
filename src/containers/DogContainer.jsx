import React, { useContext, useEffect } from "react"
import DogCard from "../components/DogCard"
import { Context } from "../contexts/Context"

const DogContainer = ({ showMatches = false, showResult = false }) => {
    const { displayDogs, checkMatch, sortOptions, matchIds, getDogs } =
        useContext(Context)

    const containerStyle = {
        display: "grid",
        gridTemplateColumns:
            displayDogs.length === 1 ? "1fr" : "repeat(4, 1fr)",
        gap: "16px",
        justifyContent: "center",
        padding: "16px",
    }
    useEffect(() => {
        if (showMatches) {
            getDogs(matchIds)
        }
    }, [matchIds])

    const mappedDogs = displayDogs.map((dogData) => (
        <DogCard {...dogData} key={dogData.id} showResult={showResult} />
    ))

    if (showMatches && matchIds.length === 0) {
        return <div>No dogs being checked for a match yet</div>
    } else {
        return (
            <div style={containerStyle}>
                {showMatches && matchIds.length > 1 ? (
                    <button onClick={checkMatch}>Check for a match</button>
                ) : null}
                {sortOptions.asc ? mappedDogs : mappedDogs.reverse()}
            </div>
        )
    }
}

export default DogContainer
