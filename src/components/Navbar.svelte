
<nav class="nav">
  <a class="nav-link" href="#about">About</a>
  <a class="nav-link" href="#faq">FAQ</a>
  <a class="nav-link" href="#schedule">Schedule</a>
  <a class="nav-link" href="#venue">Map</a>
  <a class="nav-link" href="#team">Team</a>
  <a class="nav-link" href="#contact">Contact</a>
</nav>

<style type="text/scss">
  .nav {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: #555a 2px 2px 10px;
    display: flex;

    padding: 0 25px;
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 10;
    
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