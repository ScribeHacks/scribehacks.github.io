
<section class="section">
  <h2>Schedule and Activities</h2>

  <div class="mu-schedule-content-area">
    <!-- Tab panes -->
    <div class="tab-content mu-schedule-content">
      <div
        role="tabpanel"
        class="tab-pane fade mu-event-timeline active in"
        id="first-day"
      >
        <ul>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">8.00 AM</p>
              <h3>Doors Open, Check In</h3>
              <span>Event</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">9.00 AM</p>
              <h3>Opening Ceremony</h3>
              <span>Event</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">10.00 AM</p>
              <h3>Hacking Begins</h3>
              <span>Event</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">1.00 P.M</p>
              <h3>Lunch</h3>
              <span>By Food Co 1</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">4.00 P.M</p>
              <h3>Capture the Flag (Digital)</h3>
              <span>Event</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">7.00 P.M</p>
              <h3>Dinner</h3>
              <span>By Food Co. 2</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">8.00 P.M</p>
              <h3>Super Smash Bros. Ultimate Tournament</h3>
              <span>Event</span>
            </div>
          </li>
          <li>
            <div class="mu-single-event">
              <p class="mu-event-time">Midnight</p>
              <h3>Midnight Snack</h3>
              <span>By Food Co. 3</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style type="text/scss">
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 10px;

    h2 {
      font-size: 2rem;
      margin: 0;
    }
  }

  .mu-schedule-content-area {
    display: inline;
    margin-top: 50px;
    width: 100%;
  }

  .mu-schedule-content {
    margin-top: 50px;
  }

  .mu-event-timeline ul li {
    list-style-type: none;
    position: relative;
    width: 2px;
    margin: 0 auto;
    padding-top: 50px;
    background-color: #ddd;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .mu-event-timeline ul li::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: inherit;
  }

  .mu-event-timeline ul li .mu-single-event {
    background-color: #fff;
    -webkit-box-shadow: 0 0 16px 0 rgba(32, 32, 47, 0.16);
    -moz-box-shadow: 0 0 16px 0 rgba(32, 32, 47, 0.16);
    box-shadow: 0 0 16px 0 rgba(32, 32, 47, 0.16);
    position: relative;
    top: 0;
    width: 400px;
    padding: 15px;
    text-align: left;
  }

  .mu-event-timeline ul li:nth-child(2n) .mu-single-event {
    left: 50px;
  }

  .mu-event-timeline ul li:nth-child(2n + 1) .mu-single-event {
    left: -450px;
    text-align: right;
  }

  .mu-event-timeline ul li .mu-single-event::before {
    content: "";
    position: absolute;
    top: 23px;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .mu-event-timeline ul li:nth-child(2n + 1) .mu-single-event::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent #fff;
  }

  .mu-event-timeline ul li:nth-child(2n) .mu-single-event::before {
    left: -16px;
    border-width: 8px 16px 8px 0;
    border-color: transparent #fff transparent transparent;
  }

  .mu-event-timeline ul li .mu-single-event h3 {
    margin-bottom: 5px;
    font-size: 16px;
  }

  .mu-event-timeline ul li .mu-single-event p {
    margin-bottom: 5px;
  }

  .mu-event-timeline ul li .mu-single-event span {
    font-size: 12px;
  }
</style>
