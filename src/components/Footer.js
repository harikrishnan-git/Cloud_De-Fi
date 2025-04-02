import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
      <footer className="navbar navbar-dark fixed-bottom bg-dark flex-md-nowrap p-1 shadow">
        

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Navbar;
