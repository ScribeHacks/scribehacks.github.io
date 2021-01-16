
<script>
  export let faq;
</script>

<details class="accordion">
  <summary>
    <span class="title">{faq.title}</span>
    <span class="icon" aria-hidden="true" />
  </summary>
  <div class="content">
    <p>
      {@html faq.content}
    </p>
  </div>
</details>

<style type="text/scss">
  .accordion {
    background-color: #fff;
    border: transparent 2px solid;
    border-radius: 5px;
    box-shadow: #ddd 2px 2px 10px;

    flex: 1 1;
    margin: 5px;
    margin-bottom: 15px;
    padding: 5px;
    min-width: 35%;
    max-width: 50%;
    position: relative;

    transition-duration: 0.2s;
    transition-timing-function: ease-out;

    summary {
      color: #2b2d42;
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-family: "CircularStd", sans-serif;
      font-size: 18px;
      font-weight: 400;
      text-align: left;
      outline: none;

      padding: 15px;

      .icon {
        border: #333 1px solid;
        border-radius: 50%;
        display: block;
        height: 20px;
        width: 20px;
        transition-duration: 0.2s;
      }
    }

    &[open] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border: #92dce5 2px solid;
      border-bottom: none;
      box-shadow: none;
      transform: scale(1.05);
      z-index: 100;

      .icon {
        background-color: #92dce5;
        border-color: #92dce5;
      }

      .content {
        opacity: 1;
      }
    }

    .content {
      background-color: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: #92dce5 2px solid;
      border-top: none;
      opacity: 0;

      padding: 15px;
      padding-top: 0;

      position: absolute;
      top: 100%;
      left: -2px;
      right: -2px;
      z-index: 99;

      transition-duration: 0.2s;
    }
  }
</style>