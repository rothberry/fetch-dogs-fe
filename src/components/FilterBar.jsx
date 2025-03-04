import React from "react"

const FilterBar = () => {
    return (
        <div>
            FilterBar
            <input type="text" placeholder="search" />
            <label>
                Sorting
                <input type="checkbox" />
            </label>
        </div>
    )
}

export default FilterBar
