import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
                <p>&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Footer