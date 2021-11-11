import React from "react";

const MyPageLayout = ({active, children}: PropTypes) => <div className="columns width-full">
<div className="column is-narrow">
<aside className="menu">
  <p className="menu-label">
    My Page
  </p>
  <ul className="menu-list">
    <li><a className={active === "settings" ? 'is-active' : ''} href="settings">Settings</a></li>
    <li><a className={active === "closet" ? 'is-active' : ''} href="closet">My Closet</a></li>
  </ul>
</aside>
</div>
<div className="column">
  {children}
  </div>
  </div>

type PropTypes = {
  active: string,
  children: any,
}

export default MyPageLayout;