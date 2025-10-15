'use client'
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInHandler = async () => {
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="signin-form">
            <h3>login form</h3>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={signInHandler}>Sign in</button>
            <div>
                <p>Create an account?</p>
                <Link href='/signUp'>Register</Link>
            </div>
        </div>
    );
};

export default SignInPage;