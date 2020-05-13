import React from 'react';

function Nav() {
  const toggleNav = () => {
    let nav = document.querySelector('nav');
    nav.classList.add('nav-background');
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
    } else {
      let navbar = document.querySelector('.navbar');
      navbar.classList.toggle('show');
      menu.innerHTML = '&lt;nav&gt;';
      let nav = document.querySelector('nav');
      nav.classList.remove('nav-background');
    }
  };
  return (
    <div>
      <div className="fixed-nav">
        <nav>
          <p className="title">coders lounge</p>
          <p className="menu" onClick={toggleMenu}>
            &#60;nav&#62;
          </p>
        </nav>
        <div className="navbar">
          <ul>
            <li>
              <a href="#home">home</a>
            </li>
            <li>
              <a href="#top-posts">top posts</a>
            </li>
            <li>
              <a href="#create-post">create post</a>
            </li>
            <li>
              <a href="#about">about</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
