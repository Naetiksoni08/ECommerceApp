import React from 'react'

const Register = () => {
    return (
        <div>
             <fieldset className="mx-auto fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-4">
                <legend className="fieldset-legend text-xl">Register</legend>

                <label className="label p-2">Email</label>
                <input type="email" className="input" placeholder="Email" />

                <label className="label p-2">Password</label>
                <input type="password" className="input" placeholder="Password" />

                <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
        </div>
    )
}

export default Register