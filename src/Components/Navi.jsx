import React from 'react'
import './style.css'
function Navi() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">BlogL</a>
        <form className="d-flex" role="search">
                <div className='pt-2 pb-2 ps-3 pe-3 d-flex' style={{border:'1px solid #ccc',borderRadius:'25px'}}>
                    <input type="text" style={{width:'400px',border:'0',outline:"0",background:'transparent'}} placeholder='Search'/>
                    <div className='icn'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
        </form>
      </div>
    </nav>
  )
}

export default Navi