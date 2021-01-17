
<script>
  import TeamMember from "../components/TeamMember.svelte";

  const people = [
    {
      name: "Soham",
      image: "/img/team/soham.jpg",
      in: "https://linkedin.com/in/sohamb117/",
      gh: "https://github.com/sohamb117"
    },
    {
      name: "Kyle",
      image: "/img/team/kyle.jpg",
      in: "https://www.linkedin.com/in/sdbagel/",
      gh: "https://github.com/SDBagel"
    },
    {
      name: "Kai",
      image: "/img/team/kai.png",
      in: "https://www.linkedin.com/in/kai-mccormick/",
      gh: "https://github.com/kaidevrim"
    },
    {
      name: "Rohan",
      image: "/img/team/rohan.jpg",
      in: "https://linkedin.com/in/bansal-rohan",
      gh: "https://github.com/rohan-bansal"
    },
    {
      name: "Shreya",
      image: "/img/team/shreya.jpg",
      gh: "https://github.com/shreyaparikh08"
    },
    {
      name: "Aparna",
      image: "/img/team/aparna.jpg",
      in: "https://www.linkedin.com/in/aparna-prabhakar-a8490a1b1/"
    },
    {
      name: "Ginni",
      image: "/img/team/ginni.jpg"
    },
    {
      name: "Chenghao",
      image: "/img/team/chenghao.png",
      in: "https://www.linkedin.com/in/chenghao-li786/",
      gh: "https://github.com/chenghaoli36"
    },
    {
      name: "Chloe",
      image: "/img/team/chloe.jpg",
      in: "https://www.linkedin.com/in/chloewang55/"
    },
    {
      name: "Pradyun",
      image: "/img/team/pradyun.png",
      in: "https://www.linkedin.com/in/pradyun-n-958499b8/",
      gh: "https://github.com/pradyungn/"
    },
  ]
</script>

<a name="team">
<section class="section team">
  <h2>The Team</h2>
  <br>
  <ul class="team-members">
    {#each people as profile}
      <TeamMember profile="{profile}" />
    {/each}
  </ul>
</section>
</a>

<style type="text/scss">
  .team {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;

    max-width: 1100px;
    margin-right: 0;
    margin: auto;
    padding: 60px 10px;
    }
    h2 {
      font-size: 2rem;
      margin: 0;
    }
    @media (min-width: 429px) {

        .team-members {
            /*display: flex;*/
            display: grid;
            align-items: center;
            grid-template-columns: repeat(auto-fit, 180px);
            grid-gap: 50px;
            margin-top: 30px;
            padding: 0;
            padding-left: 25px;
            
            max-width: 100%;
            min-width: 93%;
            overflow: auto;
        }
    }
    .team-members {
        align-self: center;
        align-items: center;
        width: 180px;
        display: block;
        padding-right: 40px;
    }
</style>
