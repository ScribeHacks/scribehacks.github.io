
<script>
  import TeamMember from "../components/TeamMember.svelte";

  const people = [
    {
      name: "Soham",
      image: "/img/team/soham.jpg",
      in: "https://linkedin.com/in/sohamb117/",
      gh: "https://github.com/sohamb117",
    },
    {
      name: "Kyle",
      image: "/img/team/kyle.jpg",
      in: "https://www.linkedin.com/in/sdbagel/",
      gh: "https://github.com/SDBagel",
    },
    {
      name: "Rohan",
      image: "/img/team/rohan.jpg",
      in: "https://linkedin.com/in/bansal-rohan",
      gh: "https://github.com/rohan-bansal",
    },
    {
      name: "Aparna",
      image: "/img/team/aparna.jpg",
      in: "https://www.linkedin.com/in/aparna-prabhakar-a8490a1b1/",
    },
    {
      name: "Ginni",
      image: "/img/team/ginni.jpg",
    },
    {
      name: "Chenghao",
      image: "/img/team/chenghao.png",
      in: "https://www.linkedin.com/in/chenghao-li786/",
      gh: "https://github.com/chenghaoli36",
    },
    {
      name: "Chloe",
      image: "/img/team/chloe.jpg",
      in: "https://www.linkedin.com/in/chloewang55/",
    },
    {
      name: "Pradyun",
      image: "/img/team/pradyun.png",
      in: "https://www.linkedin.com/in/pradyun-n-958499b8/",
      gh: "https://github.com/pradyungn/",
    },
  ];
</script>

<a name="team">
  <section class="section">
		<div class="team">
			<h2>The Team</h2>
			<br />
			<ul class="team-members">
				{#each people as profile}
					<TeamMember {profile} />
				{/each}
			</ul>
		</div>
  </section>
</a>

<style type="text/scss">
	.section {
    background-color: var(--bg-light);
	}

  .team {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 1100px;
    margin: auto;
    padding: 60px 10px;
  }

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  .team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
    padding: 0;
  }
</style>
