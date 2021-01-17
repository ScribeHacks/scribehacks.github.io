
<a name="about">
<section class="section about">
  <div class="section-left">
      <h2>Write the code of the future.</h2>
  </div>
  <div class="section-right">
    <p><b>Coding gives us the power to make things.</b><br>
    Every Facebook, Google, and Microsoft started with just a bit of code, so we want to encourage each person to learn to make something impactful or through technology.</p>
  </div>
</section>
</a>

<style type="text/scss">
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;

    .section-left, .section-right {
      flex: 1 1;
      padding: 10px 30px;
    }
    
    .section-left {
      display: flex;
      justify-content: flex-end;
    }

    .section-right {
      background-color: var(--bg-inverse);
      display: flex;
      justify-content: flex-start;
    }

    h2, p {
      max-width: 400px;
    }

    h2 {
      font-size: 2.5rem;
    }

    p {
      background-color: var(--bg-inverse);
      border-radius: 5px;
      color: var(--text-inverse);
      font-size: 1rem;
      font-weight: 300;
      line-height: 2rem;
    }
  }

  @media (min-width: 512px) {
    .about {
      .section-left, .section-right {
        padding: 30px 60px;
      }

      h2 {
        font-size: 3.3rem;
      }

      p {
        font-size: 1.2rem;
        line-height: 3rem;
      }
    }
  }

  @media (min-width: 768px) {
    .about {
      flex-direction: row;
    }
  }
</style>