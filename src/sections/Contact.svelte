
<a name="contact">
<section class="section">
  <div class="contact">
    <h2>Contact Us</h2>
    <p>Send us a message at <a href="mailto:support@scribehacks.tech">support@scribehacks.tech</a> or use this form to submit an inquiry.</p>
    <form align="center" id="contact-form" action="mailto:support@scribehacks.tech">
      <input name="subject" type="text" placeholder="Subject..."><br>
      <textarea name="body" placeholder="Message..."></textarea>
      <input class="button" type="submit" value="Send" />
    </form>
  </div>
</section>
</a>

<style type="text/scss">
  .section {
    background-color: var(--bg-light);
  }

  .contact {
    max-width: 700px;
    margin: auto;
    padding: 50px 30px;
    
    h2 {
      font-size: 2rem;
      text-align: center;
      margin: 0;
    }

    p {
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    input, textarea {
      border-radius: 5px;
      border: transparent 2px solid;
      background-color: var(--bg-lightest);
      box-shadow: var(--bxs-light) 2px 2px 10px;

      flex: 1 1;
      margin-bottom: 15px;
      padding: 5px;
      font-size: 14px;
      font-family: "CircularStd", sans-serif;
      font-weight: 400;
      outline: none;
      padding: 15px;
    }

    textarea {
      min-height: 25vh;
      resize: vertical;
    }

    form {
      margin: 0 auto;
      text-align: center;
    }

    .button {
      background-color: var(--bg-lightest);
      border-radius: 3px;
      margin-top: 30px;
      text-decoration: none;
    }

    .button:hover {
      background-color: var(--accent-secondary);
      color: var(--text-inverse);
    }
  }
</style>
