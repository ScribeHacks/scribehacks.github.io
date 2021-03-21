<script>
  import { run } from "tripetto-runner-autoscroll";
  import Services from "tripetto-services";

  const {
    definition,
    styles,
    l10n,
    locale,
    translations,
    snapshot,
    attachments,
    onSubmit,
    onPause,
  } = Services.init({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic1oxMlNZU3BiM1JQcHE0d3QxMlovdUk5ZVZUaDVjTUR1SDVtNU1JSUwxZz0iLCJkZWZpbml0aW9uIjoicEJqMlJNZHJpeE9qWkRJeDlvanYwK3FWSTl2N0dFcDV5K09qU05tM2YwOD0iLCJ0eXBlIjoiY29sbGVjdCJ9._RGSXj3FB2-5cc2xZqUJXyaMCfrFbdFJc4Ns4MFZZhc",
  });

  function register() {
    const formArea = document.getElementById("formArea");
    if (formArea.style.display == "none") {
      formArea.style.display = "unset";
      run({
        element: formArea /* Or supply your own element here */,
        definition,
        styles,
        l10n,
        locale,
        translations,
        attachments,
        onSubmit,
      });
    } else {
      formArea.style.display = "none";
    }
  }
</script>

<section class="section">
  <div class="hero">
    <div>
      <div class="title">
        <img src="img/scribehacks/logo.png" alt="ScribeHacks Logo" />
        <h1 class="fadeInDown">ScribeHacks I</h1>
      </div>

      <p class="info-group">
        <span class="subtitle">California Bay Area</span>
        <span class="subtitle">September 18-19</span>
        <span class="subtitle">Registrations Open</span>
      </p>
      <br />
      <button
        id="register-cta"
        class="button typeform-share"
        onClick="register()">Register Here!</button
      >
      <div id="formArea" style="display: none" />
    </div>
  </div>
</section>

<!--       <p><a class="typeform-share button" id="register-cta" href="https://form.typeform.com/to/AnwB5Ngz?typeform-medium=embed-snippet" data-mode="popup" data-size="100" target="_blank">Register </a> <script ✂prettier:content✂="IChmdW5jdGlvbigpIHsgdmFyIHFzLGpzLHEscyxkPWRvY3VtZW50LCBnaT1kLmdldEVsZW1lbnRCeUlkLCBjZT1kLmNyZWF0ZUVsZW1lbnQsIGd0PWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUsIGlkPSJ0eXBlZl9vcm1fc2hhcmUiLCBiPSJodHRwczovL2VtYmVkLnR5cGVmb3JtLmNvbS8iOyBpZighZ2kuY2FsbChkLGlkKSl7IGpzPWNlLmNhbGwoZCwic2NyaXB0Iik7IGpzLmlkPWlkOyBqcy5zcmM9YisiZW1iZWQuanMiOyBxPWd0LmNhbGwoZCwic2NyaXB0IilbMF07IHEucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMscSkgfSB9KSgpIA==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script></p> -->
<style type="text/scss">
  .section {
    background-image: linear-gradient(
      90deg,
      var(--hero-primary),
      var(--hero-secondary)
    );
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
