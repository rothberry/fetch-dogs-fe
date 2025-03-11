import { useContext, useState } from "react"
import { Context } from "../contexts/Context"
import { useNavigate } from "react-router"

const Login = () => {
    const [formData, setFormData] = useState({
        name: "test",
        email: "test@test.com",
    })

    const { postAuth, isLoggedIn, getBreeds } = useContext(Context)
    const navigate = useNavigate()

    const handleChange = (e) =>
        setFormData((prevFormData) => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log("LOGGING IN")
        await postAuth({ loginData: formData })
        console.log("LOGGED IN")
        navigate("/")
    }

    return (
        <div>
            Please Login
            <form onSubmit={handleLogin}>
                <label>
                    name
                    <input
                        id="name"
                        placeholder="name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </label>
                <label>
                    email
                    <input
                        id="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
