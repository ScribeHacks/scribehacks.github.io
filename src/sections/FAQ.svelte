<section class="section">
  <h2>Frequently Asked Questions</h2>
  <br />
  <div class="faq">
    <div class="faq-row">
      <div class="faq-item">
        <div class="accordion">
          <div class="accordion-item">
            <button id="accordion-button-1" aria-expanded="false"
              ><span class="accordion-title">Who can participate?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                We allow those in middle school to join us, but with added
                parental permission. If you are in college you are welcome to
                mentor or give speeches at the hackathon. If you want to be a
                mentor, you can <a
                  target="_blank"
                  href="https://sohamb117.typeform.com/to/pq7eingx"
                  >sign up here</a
                >
                or if you want to sponsor you can email us at
                <a href="mailto:sponsorship@scribehacks.tech"
                  >sponsorship@scribehacks.tech</a
                >
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button id="accordion-button-2" aria-expanded="false"
              ><span class="accordion-title">What can we make?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                At ScribeHacks we want you to pioneer with what you make. While
                there's no strict guidelines on what you can make, we urge
                participants to make something that looks towards the future of
                technology or solves a problem, no matter how small.
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button id="accordion-button-3" aria-expanded="false"
              ><span class="accordion-title">What is a hackathon?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                A hackathon is an event where participants use their knowledge
                and skills to create, develop, design, and create a full product
                in a certain amount of time. They’re open not just to
                programmers and engineers, but to anyone who’s interested in
                working together to find answers to the world’s most pressing
                problems, or just making something fun.
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button id="accordion-button-4" aria-expanded="false"
              ><span class="accordion-title">What if I can't code?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                No matter what your skills are, we'll try to make this event fun
                for you. We believe that solutions are better when they
                integrate diverse ways of thinking. There will be many
                opportunities to learn new skills or ideas at workshops and from
                the people around you. We’ll also be holding team building
                events where you can meet new people. Just come eager to learn!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="faq-item">
        <div class="accordion">
          <div class="accordion-item">
            <button id="accordion-button-1" aria-expanded="false"
              ><span class="accordion-title">Does it cost anything?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                ScribeHacks is absolutely free! There is no entry fee,
                ScribeHacks will provide you with plenty of food, snacks, swag,
                and prizes throughout the 24 hours. We can provide all of this
                due to our wonderful sponsors!
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button id="accordion-button-2" aria-expanded="false"
              ><span class="accordion-title">What should I bring?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                Please bring a valid form of identification like a student id or
                driver's license, a computer (preferably a laptop), chargers,
                and any hardware you will use for your hack. You can also bring
                a sleeping bag, pillow, toiletries, and a couple changes of
                clothes. Food will be provided at the event. No firearms,
                weapons, alcohol, or illegal drugs are allowed on campus.
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button id="accordion-button-3" aria-expanded="false"
              ><span class="accordion-title">How do I prepare?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                While you are not allowed to start coding or making the art for
                your project until the hackathon starts, you can always find a
                team, register for the hackathon, make mockups in Figma, XD,
                Sketch, and get the materials needed to make your project.
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button id="accordion-button-4" aria-expanded="false"
              ><span class="accordion-title">What are the rules?</span><span
                class="icon"
                aria-hidden="true"
              /></button
            >
            <div class="accordion-content">
              <p>
                All participants are expected to follow the Hack Club Code of
                Conduct to ensure that everyone stays safe and has a fun time.
                In addition, plagiarism, copying code off the internet, or
                hardcoding values and not disclosing them, and other dishonesty
                may disqualify your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style type="text/scss">
  .section {
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 60px 10px;

    h2 {
      font-size: 2rem;
      margin: 0;
    }
  }

  .faq {
    display: flex;
    max-width: 1100px;
    margin: auto;
    margin-top: 30px;

    .accordion {
      padding-left: 0;
      padding-right: 0;
    }

    .accordion .accordion-item {
      background-color: #fff;
      border-radius: 5px;
      box-shadow: #ddd 2px 2px 10px;

      margin: 5px;
      margin-bottom: 15px;
      padding: 5px;
    }
    .accordion .accordion-item button[aria-expanded="true"] {
      border-bottom: 1px solid#92dce5;
    }
    .accordion button {
      font-family: "CircularStd", sans-serif;
      position: relative;
      display: block;
      text-align: left;
      width: 100%;
      padding: 15px;
      color: #2b2d42;
      font-size: 18px;
      font-weight: 400;
      border: none;
      background: none;
      outline: none;
    }
    .accordion button:hover,
    .accordion button:focus {
      cursor: pointer;
      color: #92dce5;
    }
    .accordion button:hover::after,
    .accordion button:focus::after {
      cursor: pointer;
      color: #92dce5;
      border: 1px solid #92dce5;
    }
    .accordion button .accordion-title {
      padding: 1em 1.5em 1em 0;
    }
    .accordion button .icon {
      display: inline-block;
      position: absolute;
      top: 25%;
      right: 15px;
      width: 22px;
      height: 22px;
      border: 1px solid;
      border-radius: 22px;
      padding-right: 15px;
    }
    .accordion button .icon::before {
      display: block;
      position: absolute;
      content: "";
      top: 9px;
      left: 5px;
      width: 10px;
      height: 2px;
      background: currentColor;
    }
    .accordion button .icon::after {
      display: block;
      position: absolute;
      content: "";
      top: 5px;
      left: 9px;
      width: 2px;
      height: 10px;
      background: currentColor;
    }
    .accordion button[aria-expanded="true"] {
      color: #92dce5;
    }
    .accordion button[aria-expanded="true"] .icon::after {
      width: 0;
    }
    .accordion button[aria-expanded="true"] + .accordion-content {
      opacity: 1;
      max-height: 20em;
      transition: all 200ms linear;
      will-change: opacity, max-height;
    }
    .accordion .accordion-content {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transition: opacity 200ms linear, max-height 200ms linear;
      will-change: opacity, max-height;
      border-radius: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
    .accordion .accordion-content p {
      font-size: 15px;
      font-weight: 300;
      margin: 2em 0;
    }

    @media only screen and (max-width: 951px) {
      .question {
        width: 100%;
        margin-left: 5%;
        margin-right: 5%;
      }

      .accordion[style] {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      .accordion {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  }
</style>
