import React from 'react'

const Login = () => {
    return (
        <div>
            <fieldset className=" mx-auto fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-4">
                <legend className="fieldset-legend text-xl">Login</legend>

                <label className="label p-2">Username</label>
                <input type="email" className="input" placeholder="Username" />

                <label className="label p-2">Password</label>
                <input type="password" className="input" placeholder="Password" />

                <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </div>
    )
}

export default Login