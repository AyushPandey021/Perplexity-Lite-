import { Link, useNavigate } from 'react-router-dom'

const AuthHome = () => {
  const navigate = useNavigate()
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ee] px-5 py-10 text-slate-950">
      <section className="w-full max-w-2xl rounded-[8px] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Perplexity Lite
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">You are signed in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {user
            ? `Welcome back, ${user.username}. Your session token is stored for frontend requests.`
            : 'Your account session is ready.'}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            className="h-12 rounded-[8px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="button"
            onClick={handleLogout}
          >
            Sign out
          </button>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-[8px] border border-slate-200 px-5 text-sm font-semibold text-slate-950 transition hover:border-slate-950"
            to="/login"
          >
            Back to login
          </Link>
        </div>
      </section>
    </main>
  )
}

export default AuthHome
