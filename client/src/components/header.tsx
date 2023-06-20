import { Link, useNavigate } from 'react-router-dom'

import { Logo } from './logo'

export function Header({ title }: { title?: string }) {
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="relative py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h1 className="m-0 text-xl font-bold uppercase leading-none">
            <Link to="/" className="flex items-center no-underline">
              <Logo className="mr-2" /> {title}
            </Link>
            <button
              className="leading-1 font-small -mt-px inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 px-6 py-2 text-center text-sm text-white no-underline shadow-lg"
              // type="submit"
              onClick={handleLogOut}
            >
              {'Logout'}
            </button>
          </h1>
        </div>
      </div>
    </header>
  )
}
