
<script>
  export let profile;
</script>

<li class="team-member">
  <img class="pfp" src="{profile.image}" alt="Team Member">
  <div class="info">
    <p><b>{profile.name}</b></p>
    <div class="socials">
      <a href="https://linkedin.com/in/sohamb117/">
        <img src="/img/social/github.png" alt="GitHub">
      </a>
      <a href="https://github.com/sohamb117">
        <img src="/img/social/linkedin.png" alt="LinkedIn">
      </a>
    </div>
  </div>
</li>

<style type="text/scss">
  .team-member {
    box-shadow: #aaa 2px 2px 10px;
    border-radius: 5px;

    margin-right: 2rem;
    margin-bottom: 2rem;
    min-width: 180px;

    display: inline-flex;
    flex-direction: column;
    list-style: none;
    overflow: hidden;

    .pfp {
      height: 180px;
      width: 180px;
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
    }

    .socials {
      display: flex;

      img {
        margin-left: 5px;
        width: 25px;
      }
    }
  }
</style>