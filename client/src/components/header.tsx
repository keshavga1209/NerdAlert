import { Link, useNavigate } from 'react-router-dom'

import { Logo } from './logo'
import LogoutIcon from '@mui/icons-material/Logout';

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
            
          </h1>
          {/* <LogoutIcon onClick={handleLogOut} style={{ zIndex: 99999 }}>Logout </LogoutIcon> */}
          {/* <button
              className="leading-1 font-small absolute top-3 right-0 cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 px-6 py-2 text-center text-sm text-white no-underline shadow-lg"
              style={{ zIndex: 99999 }}
              onClick={handleLogOut}
            >
              {'Logout '}
              <LogoutIcon/>
          </button> */}
        </div>
        <button
              className="leading-1 font-small absolute top-3 right-3 cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 px-6 py-2 text-center text-sm text-white no-underline shadow-lg"
              style={{ zIndex: 99999 }}
              onClick={handleLogOut}
            >
              {'Logout '}
              <LogoutIcon/>
          </button>
      </div>
    </header>
  )
}
