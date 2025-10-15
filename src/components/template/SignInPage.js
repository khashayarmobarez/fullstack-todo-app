import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="signin-form">
            <h3>Registration form</h3>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={signUpHandler}>register</button>
            <div>
                <p>Have an account?</p>
                <Link href='/signin'>Sign in</Link>
            </div>
        </div>
    );
};

export default SignInPage;