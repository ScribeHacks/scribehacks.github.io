
<script>
  // MLH OAuth information
  let client_id = "f3f66e487f904efac28b5e7102003df0c471ffdb534d3116b828d8c6927f7cf1";
  let redirect_uri = "https://scribehacks.tech/success";
  let scopes = "email+demographics+birthday+education+event";
</script>

<section class="section">
  <div class="hero">
    <div>
      <div class="title">
        <img src="img/scribehacks/logo.png" alt="ScribeHacks Logo">
        <h1 class="fadeInDown">ScribeHacks I</h1>
      </div>

      <p class="info-group">
        <span class="subtitle">California Bay Area</span>
        <span class="subtitle">September 18-19</span>
        <span class="subtitle">Registrations Closed</span>
      </p>
      <br>
      <p><a id="register-cta" href="https://my.mlh.io/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=token&scope={scopes}">
        Register Now
      </a></p>
    </div>
  </div>
</section>

<style type="text/scss">
  .section {
    background-image: linear-gradient(90deg, #fca, #f88);
    padding: 60px 10px;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 60vh;
    max-width: 1000px;
    margin: auto;
  }

  .title {
    display: flex;
    align-items: center;

    img {
      background-color: #fff;
      border-radius: 50%;
      box-shadow: #fffa 3px 3px 15px;

      margin-right: 2rem;
      width: 90px;
    }

    h1 {
      font-size: 5rem;
      margin: 10px 0;
    }
  }

  .info-group {
    display: flex;
    font-size: 1.5rem;

    span:not(:last-child) {
      border-right: #333 2px solid;
      padding-right: 20px;
      margin-right: 20px;
    }
  }

  #register-cta {
    background-color: #f70;
    border-radius: 3px;
    color: #fff;
    text-decoration: none;

    padding: 15px 35px;
  }

</style>