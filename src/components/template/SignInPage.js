'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/');
        }
    },[status])
    

    const signInHandler = async () => {
        const res = await signIn(
            'credentials',
            {
                redirect: false,
                email,
                password,
            }
        )
        
        console.log("Sign in response:", res);
        
        if (res.error) {
            toast.error("Invalid credentials!");
        } else {
            toast.success("Logged in successfully!");
            router.push('/');
        }
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