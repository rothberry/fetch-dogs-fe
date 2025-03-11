import { useContext, useEffect } from "react"
import { Context } from "../contexts/Context"

const cardStyle = {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
}

const imageStyle = {
    width: "100%",
    height: "auto",
    maxHeight: "200px",
    objectFit: "cover",
}

const contentStyle = {
    padding: "16px",
    flexGrow: 1,
}

const cardStyleMatch = {
    ...cardStyle,
    maxWidth: "100%",
    boxShadow: "0 8px 12px blue",
    border: "5px solid",
    textAlign: "centered",
}

const imageStyleMatch = {
    ...imageStyle,
    maxHeight: "100%",
}

const DogCard = ({
    id,
    name,
    age,
    breed,
    img,
    zip_code,
    showResult = false,
}) => {
    const { handleMatch, matchIds } = useContext(Context)

    return (
        <div style={showResult ? cardStyleMatch : cardStyle}>
            {showResult ? (
                <h1>CONGRATS ON YOUR NEW MEMBER OF THE FAMILY</h1>
            ) : null}
            <img
                src={img}
                alt={name}
                style={showResult ? imageStyleMatch : imageStyle}
            />
            <div style={contentStyle}>
                {showResult ? null : (
                    <span>
                        Check for match:{" "}
                        <span onClick={() => handleMatch(id)}>
                            {matchIds.includes(id) ? "❤️" : "🤍"}
                        </span>
                    </span>
                )}
                <h2 style={{ fontWeight: "bold" }}>{name}</h2>
                <p>Age: {age}</p>
                <p>Breed: {breed}</p>
                <p>ZipCode: {zip_code}</p>
            </div>
        </div>
    )
}

export default DogCard
