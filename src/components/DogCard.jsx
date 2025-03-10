import { useEffect } from "react"

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

const DogCard = ({ id, name, age, breed, img, zip_code }) => {
    return (
        <div style={cardStyle}>
            <img src={img} alt={name} style={imageStyle} />
            <div style={contentStyle}>
                <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{name}</h2>
                <p style={{ fontSize: "14px", color: "#555" }}>Age: {age}</p>
                <p style={{ fontSize: "14px", color: "#555" }}>
                    Breed: {breed}
                </p>
            </div>
        </div>
    )
}

export default DogCard
