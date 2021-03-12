
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
        <span class="subtitle">Registrations Open</span>
      </p>
      <br>
      <p><a class="typeform-share button" id="register-cta" href="https://form.typeform.com/to/AnwB5Ngz?typeform-medium=embed-snippet" data-mode="popup" data-size="100" target="_blank">Register </a> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script></p>
    </div>
  </div>
</section>

<style type="text/scss">
  .section {
    background-image: linear-gradient(90deg, var(--hero-primary), var(--hero-secondary));
    padding: 60px 30px;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 60vh;
    max-width: 1100px;
    margin: auto;
    text-align: center;
  }

  .title {
    display: flex;
    align-items: center;

    img {
      background-color: var(--bg-lightest);
      border-radius: 50%;
      box-shadow: var(--bxs-lightest) 2px 2px 12px;

      margin-right: 1rem;
      width: 3.5rem;
    }

    h1 {
      font-size: 2.5rem;
      margin: 10px 0;
    }
  }

  .info-group {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.2rem;
    line-height: 2rem;
  }

  #register-cta {
    background-color: var(--accent-secondary);
    border-radius: 3px;
    color: var(--text-inverse);
    text-decoration: none;

    padding: 15px 35px;
  }

  @media (min-width: 512px) {
    .hero {
      align-items: flex-start;
      text-align: left;
    }

    .title {
      img {
        margin-right: 1.5rem;
        width: 4.5rem;
      }

      h1 {
        font-size: 3.5rem;
      }
    }

    .info-group {
      flex-direction: row;
      align-items: flex-start;
      line-height: initial;

      span:not(:last-child) {
        border-right: var(--text-dark) 2px solid;
        padding-right: 20px;
        margin-right: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    .section {
      padding: 60px 20px;
    }

    .title {
      img {
        margin-right: 2rem;
        width: 5.5rem;
      }

      h1 {
        font-size: 5rem;
      }
    }
    
    .info-group {
      font-size: 1.5rem;
    }
  }

</style>
