import React from 'react';

function Nav(props) {
  const toggleNav = () => {
    let nav = document.querySelector('nav');
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      nav.classList.add('nav-background');
    } else if (window.scrollY < 100 && navbar.classList.contains('show')) {
      nav.classList.add('nav-background');
    } else {
      nav.classList.remove('nav-background');
    }
  };

  window.addEventListener('scroll', toggleNav);

  const toggleMenu = () => {
    let menu = document.querySelector('.menu');
    if (menu.innerHTML === '&lt;nav&gt;') {
      menu.innerHTML = '&lt;/nav&gt;';
      let navbar = document.querySelector('.navbar');
      navbar.classList.toggle('show');
      let nav = document.querySelector('nav');
      nav.classList.add('nav-background');
    } else if (menu.innerHTML === '&lt;/nav&gt;' && window.scrollY < 100) {
      let navbar = document.querySelector('.navbar');
      navbar.classList.toggle('show');
      menu.innerHTML = '&lt;nav&gt;';
      let nav = document.querySelector('nav');
      nav.classList.remove('nav-background');
    } else {
      let navbar = document.querySelector('.navbar');
      navbar.classList.toggle('show');
      menu.innerHTML = '&lt;nav&gt;';
    }
  };
  return (
    <div id="home">
      <div className="fixed-nav" onScroll={toggleNav}>
        <nav>
          <a href="#home">
            <h1 className="title">coders lounge</h1>
          </a>
          <h3 className="menu" onClick={toggleMenu}>
            &#60;nav&#62;
          </h3>
        </nav>
      </div>
      <div className="navbar">
        <ul onClick={toggleMenu}>
          <li>
            <a href="#home">home</a>
          </li>
          <li>
            <a href="#about">about</a>
          </li>
          <li>
            <a href="#posts">posts</a>
          </li>
          <li>
            <a href="#create-post">create</a>
          </li>
          <li>
            <a href="#login">login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
