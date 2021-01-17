
<a name="schedule">
<section class="section">
  <h2>Schedule and Activities</h2>

  <div class="schedule">
    <ul>
      <h3>Saturday</h3>
      <li class="schedule-item">
        <div class="col-1">8:00 AM</div>
        <div class="col-2">Doors Open, Check In</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">9:00 AM</div>
        <div class="col-2">Opening Ceremony</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">10:00 AM</div>
        <div class="col-2">Hacking Begins</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">1:00 PM</div>
        <div class="col-2">Lunch</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">4:00 PM</div>
        <div class="col-2">Capture The Flag (Digital)</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">7:00 PM</div>
        <div class="col-2">Dinner</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">8:00 PM</div>
        <div class="col-2">Super Smash Bros. Tournament</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-item">
        <div class="col-1">12:00 AM</div>
        <div class="col-2">Midnight Snack</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
    </ul>
    <ul class="traveller" aria-hidden="true">
      <li class="stop"></li>
      <li class="stop"></li>
      <li class="stop"></li>
      <li class="stop"></li>
      <li class="stop"></li>
      <li class="stop"></li>
      <li class="stop"></li>
      <li class="stop"></li>
    </ul>
    <ul>
      <h3>Sunday</h3>
      <li class="schedule-gap"></li>
      <li class="schedule-item">
        <div class="col-1">9:00 AM</div>
        <div class="col-2">Project Submissions</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-gap"></li>
      <li class="schedule-item">
        <div class="col-1">1:00 PM</div>
        <div class="col-2">Closing Ceremony</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
      <li class="schedule-gap"></li>
      <li class="schedule-item">
        <div class="col-1">7:00 PM</div>
        <div class="col-2">Virtual Afterparty</div>
        <div class="col-3 nav-right">Pending</div>
      </li>
    </ul>
  </div>
</section>
</a>

<style type="text/scss">
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 1100px;
    margin: auto;
    padding: 60px 10px;

    h2 {
      font-size: 2rem;
      margin: 0;
    }
  }

  .schedule {
    display: flex;
    margin-top: 30px;
    width: 100%;

    ul {
      flex: 1 1;
      margin: 5px;
      padding: 0;
      text-align: center;
    }

    ul li {
      list-style-type: none;
    }

    .traveller {
      flex: none;
      margin: 5px 30px;
      margin-top: 4rem;
      padding: 0;
      position: relative;

      .stop {
        background-color: #0af;
        border-radius: 50%;
        display: block;

        margin-top: 30px;
        margin-bottom: 4.44rem;
        height: 20px;
        width: 20px;
        position: relative;

        &:nth-child(1) {
          background-color: #ffe764;
        }
        &:nth-child(2) {
          background-color: #ffe077;
        }
        &:nth-child(3) {
          background-color: #ffd88b;
        }
        &:nth-child(4) {
          background-color: #ffcfa1;
        }
        &:nth-child(5) {
          background-color: #e3bfaa;
        }
        &:nth-child(6) {
          background-color: #a5a2aa;
        }
        &:nth-child(7) {
          background-color: #6986aa;
        }
        &:nth-child(8) {
          background-color: #2e6aaa;
        }

        &::after {
          background-color: #fff;
          border-radius: 50%;
          content: "";
          position: absolute;
          top: 4px;
          right: 4px;
          left: 4px;
          bottom: 4px;
          z-index: 2;
        }
      }

      &::after {
        background-image: linear-gradient(180deg, #fe5, #fca, #05a);
        content: "";
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        margin: auto;
        width: 4px;
        height: 780px;
      }
    }

    .schedule-item {
      box-shadow: #ccc 2px 2px 10px;
      display: flex;
      justify-content: space-between;

      margin-bottom: 20px;
      padding: 25px 50px;
    }

    .schedule-gap {
      height: 71.3px;
      margin-bottom: 20px;
    }
  }
</style>
