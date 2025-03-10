import { useEffect } from "react"

const DogCard = ({ dogData: { id, name, age, breed, img, zip_code } }) => {
    // useEffect(() => {
    //     console.log(props)
    // })
    return (
        <>
            <span>
                name: {name}
                age: {age}
                breed: {breed}
                {/* <img src={img} alt={name} /> */}
            </span>
            <br />
        </>
    )
}

export default DogCard
