import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = (props) => {

    const navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // console.log("Sending:", { username, email, password });
            const res = await axios.post("http://localhost:5001/api/auth/register", {
                username,
                email,
                password
            })

            const registeredUsername = res.data.data.user.username;
            localStorage.setItem('username', registeredUsername);

            props.setUsername(registeredUsername);

            toast.success("Registered Successfully !!");

            setUsername("");
            setemail("");
            setPassword("");
            navigate("/login")

        } catch (error) {
            
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");

        }

    }


    return (
        <form onSubmit={handleRegister} className="flex justify-center items-start min-h-screen bg-gray-20">
            <fieldset className="mt-50 mx-auto fieldset bg-gray-800 border-base-300 rounded-box w-xs p-6">
                <legend className="fieldset-legend text-xl">Register</legend>

                <label className="label p-2">Username</label>
                <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label className="label p-2">Email</label>
                <input type="email" className="input" value={email} onChange={(e) => setemail(e.target.value)} />

                <label className="label p-2">Password</label>
                <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />


                <button className="btn btn-neutral mt-4 w-full">Register</button>


                <p className='text-center text-sm text-gray-300 mt-3'> Already have an account?{" "}
                    <a href="/login" className='text-blue-600 hover:underline'>Sign in</a>
                </p>
            </fieldset>
        </form>
    )
}

export default Register