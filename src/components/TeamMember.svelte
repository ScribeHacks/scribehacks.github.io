
<script>
  export let profile;
</script>

<li class="team-member">
  <img class="pfp" src="{profile.image}" alt="Team Member">
  <div class="info">
    <p><b>{profile.name}</b></p>
    <div class="socials">
      <a href="{profile.github}">
        <img src="/img/social/github.png" alt="GitHub">
      </a>
      <a href="{profile.linkedin}">
        <img src="/img/social/linkedin.png" alt="LinkedIn">
      </a>
    </div>
  </div>
</li>

<style type="text/scss">
  .team-member {
    box-shadow: var(--bxs-light) 2px 2px 10px;
    border-radius: 5px;

    margin: 0.5rem;
    min-width: 130px;

    display: inline-flex;
    flex-direction: column;
    list-style: none;
    overflow: hidden;

    .pfp {
      height: 180px;
      width: 180px;
      display: block;
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

  @media (min-width: 768px) {
    .team-member {
      margin: 1rem;
      min-width: 180px;
    }
  }
</style>
