
<nav class="nav">
  <a class="nav-link" href="#about">About</a>
  <a class="nav-link" href="#schedule">Schedule</a>
  <a class="nav-link" href="#map">Map</a>
  <a class="nav-link" href="#faq">FAQ</a>
  <a class="nav-link" href="#team">Team</a>
  <a class="nav-link" href="#contact">Contact</a>
</nav>

<style type="text/scss">
  .nav {
    background-color: #fff;
    border-radius: 30px;
    display: flex;

    padding: 0 25px;
    position: fixed;
    top: 30px;
    right: 30px;
    
    overflow: hidden;
  }

  .nav-link {
    color: #f00;
    text-decoration: none;
    padding: 20px;
    transition-duration: 0.2s;

    &:hover {
      background-color: #f50;
      color: #fff;
    }
  }
</style>