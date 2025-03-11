import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../contexts/Context"

const FilterBar = () => {

    const {
        sortOptions,
        setSortOptions,
        allBreeds,
        getBreeds,
        searchDogs,
        pageForward,
        pagination,
        activeBreeds,
        setActiveBreeds,
    } = useContext(Context)

    useEffect(() => {
        getBreeds()
        searchDogs()
    }, [])


    const createBreedOptions = () => {
        return allBreeds.map((breed) => (
            <option value={breed} key={breed}>
                {breed}
            </option>
        ))
    }

    const handleSort = (e) => {
        if (e.target.name == sortOptions.field) {
            setSortOptions((prev) => {
                return { ...prev, asc: !prev.asc }
            })
        } else {
            setSortOptions({ field: e.target.name, asc: true })
        }
    }

    return (
        <div>
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
            <label>
                Sort Options
                <button onClick={handleSort} name="name">
                    {sortOptions.asc ? "Name ⬆️" : "Name ⬇️"}
                </button>
                <button onClick={handleSort} name="age">
                    {sortOptions.asc ? "Age ⬆️" : "Age ⬇️"}
                </button>
                <button onClick={handleSort} name="breed">
                    {sortOptions.asc ? "Breed ⬆️" : "Breed ⬇️"}
                </button>
            </label>
            <br />
            {pagination.prevUrl ? (
                <button onClick={() => pageForward(false)}>Previous</button>
            ) : null}
            {pagination.nextUrl ? (
                <button onClick={pageForward}>Next</button>
            ) : null}
        </div>
    )
}

export default FilterBar
