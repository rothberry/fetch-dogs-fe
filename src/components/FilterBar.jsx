import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../contexts/Context"

const FilterBar = () => {
    const [activeBreeds, setActiveBreeds] = useState("")

    const {
        dogFilter,
        setDogFilter,
        sortAsc,
        setSortAsc,
        allBreeds,
        getBreeds,
        searchDogs,
    } = useContext(Context)

    useEffect(() => {
        getBreeds()
    }, [])

    useEffect(() => {
        // if (!!activeBreeds) {
        searchDogs({ breeds: activeBreeds })
        // }
    }, [activeBreeds])

    const createBreedOptions = () => {
        return allBreeds.map((breed) => <option value={breed}>{breed}</option>)
    }
    return (
        <div>
            FilterBar
            <label for="breeds">Choose a breed:</label>
            {/* <input
                placeholder="Search for breed"
                type="text"
                value={activeBreeds}
                onChange={(e) => setActiveBreeds(e.target.value)}
            /> */}
            <select
                name="breeds"
                id="breeds"
                onChange={(e) => setActiveBreeds(e.target.value)} /* multiple */
            >
                <option disabled selected value>
                    {" "}
                    -- select an option --{" "}
                </option>
                {createBreedOptions()}
            </select>
            {/* <input
                type="text"
                placeholder="search"
                onChange={(e) => setDogFilter(e)}
            /> */}
            {/* <button onClick={handleSearch}>Search</button> */}
            <label>
                Sorting
                <button
                    value={sortAsc ? "ASC" : "DESC"}
                    onClick={(prev) => setSortAsc(!prev)}
                />
            </label>
        </div>
    )
}

export default FilterBar
