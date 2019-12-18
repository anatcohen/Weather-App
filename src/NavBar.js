import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ opacity: 0.8 }}>
      <p className="navbar-brand">Weather App</p>
      <div className="navBtns">
        <div className="individualNavBtn"><Link to="/anat-cohen-29-11-2019/"><button type="button" className="btn btn-outline-dark">Home</button></Link></div>
        <div className="individualNavBtn"><Link to='/Favourites'><button type="button" className="btn btn-outline-dark">Favourites</button></Link></div>
      </div>
    </nav >
  );
}
