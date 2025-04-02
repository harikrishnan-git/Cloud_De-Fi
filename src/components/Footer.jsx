import React from 'react';

const Navbar = ({ account }) => {
  return (
    <footer className="navbar navbar-dark fixed-bottom bg-dark flex-md-nowrap p-1 shadow">
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-secondary">
            <small id="account" className='text-grey'>{account}</small>
          </small>
        </li>
      </ul>
    </footer>
  );
};

export default Navbar;
