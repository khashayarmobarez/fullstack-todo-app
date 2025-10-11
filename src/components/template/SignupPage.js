import Link from "next/link"


function SignupPage() {
  return (
    <div className="signin-form">
      <h3>Registration form</h3>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>register</button>
      <div>
        <p>Have an account?</p>
        <Link>Sign in</Link>
      </div>
    </div>
  )
}

export default SignupPage
