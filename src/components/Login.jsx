import { useContext, useState } from "react"
import { Context } from "../contexts/Context"

const Login = () => {
    const [formData, setFormData] = useState({
        name: "test",
        email: "test@test.com",
    })

    const { postAuth, isLoggedIn, getBreeds } = useContext(Context)

    const handleChange = (e) =>
        setFormData((prevFormData) => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log("LOGGING IN")
        await postAuth({ loginData: formData })
        // debugger
    }
    return (
        <div>
            Login
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
            <button onClick={getBreeds}>Test Breeds</button>
            <button onClick={() => postAuth({ isLogin: false })}>logout</button>
        </div>
    )
}

export default Login
