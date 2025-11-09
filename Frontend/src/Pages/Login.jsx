import React, { useState ,useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';


const Login = (props) => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const { login } = useContext(AuthContext);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", {
                username,
                password
            });


            const token = res.data.data.token;
            const LoggedInUsername = res.data.data.user.username;

            // localStorage.setItem('token', token);
            // localStorage.setItem('username', LoggedInUsername);

            login(LoggedInUsername, token);

            // props.setUsername(LoggedInUsername);
            toast.success(`Welcome ${LoggedInUsername}!!`);
            navigate("/")

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");

        }

    }


    return (
        <form onSubmit={handleLogin} className="flex justify-center items-start min-h-screen bg-gray-20">
            <fieldset className="mt-50 mx-auto fieldset bg-gray-800 border-base-300 rounded-box w-xs shadow-xl p-6">
                <legend className="fieldset-legend text-xl">Log in</legend>

                <label className="label p-2">Username</label>
                <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label className="label p-2">Password</label>
                <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />


                <button className="btn btn-neutral mt-4 w-full">Login</button>

                <p className='text-center text-sm text-gray-300 mt-3'>New here?{" "}
                    <a href="/register" className='text-blue-600 hover:underline'>Create an account</a>
                </p>
            </fieldset>
        </form>

    )
}

export default Login