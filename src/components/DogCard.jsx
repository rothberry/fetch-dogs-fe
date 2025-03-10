import { useEffect } from "react"

const DogCard = ({ dogData: { id, name, age, breed, img, zip_code } }) => {
    // useEffect(() => {
    //     console.log(props)
    // })
    return (
        <>
            <span>
                id: {id}
                name: {name}
                age: {age}
                breed: {breed}
            </span>
            <br />
        </>
    )
}

export default DogCard
