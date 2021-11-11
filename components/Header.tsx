import React, { useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/client'

const Header = () => {
  const [session, loading] = useSession();

return(<header className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      My Kei Collection
    </a>
  </div>
  <div className="navbar-menu">
  <div className="navbar-end">
    <div className="navbar-item">
      <form
        method="get"
        action="/"
      >
        <input className="input is-rounded" type="text" placeholder="Search" name="search" />
      </form>
    </div>
    {!loading && session &&
    <div className="navbar-item has-dropdown is-hoverable">
      <a href="/my-page/settings" className="navbar-link">
      <figure className="image"><img src={session?.user?.image || ""} className="is-rounded"/></figure>
      </a>
      <div className="navbar-dropdown is-boxed is-right">
        <a href="/my-page/settings" className="navbar-item button is-link is-inverted">My Page</a>
        <hr className="navbar-divider" />
        <button className="navbar-item button is-link is-inverted" onClick={() => {signOut()}}>
          Log Out
        </button>
      </div>
    </div>
    }
    {!loading && !session &&
    <div className="navbar-item">
       <button className="button is-primary" onClick={() => {signIn()}}>Log in</button>
    </div>
    }
  </div>
  </div>
</header>)}

export default Header;