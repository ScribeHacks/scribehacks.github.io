
<script lang="ts">
  import FaqItem from "../components/FaqItem.svelte";

  const faq = [
    {
      title: "Who can participate?",
      content: "We allow those in middle school to join us, but only with parental permission. If you are in college, you are welcome to mentor or give speeches at the hackathon. If you want to be a mentor, you can <a target=\"_blank\" href=\"https://sohamb117.typeform.com/to/pq7eingx\">sign up here</a> or if you want to sponsor you can email us at <a href=\"mailto:sponsorship@scribehacks.tech\">sponsorship@scribehacks.tech</a>"
    },
    {
      title: "What can we make?",
      content: "At ScribeHacks we want you to pioneer with what you make. While there's no strict guidelines on what you can make, we urge participants to make something that looks towards the future of technology or solves a problem, no matter how small."
    },
    {
      title: "What is a hackathon?",
      content: "A hackathon is an event where participants use their knowledge and skills to create, develop, design, and create a full product in a certain amount of time. They’re open not just to programmers and engineers, but to anyone who’s interested in working together to find answers to the world’s most pressing problems, or just making something fun."
    },
    {
      title: "What if I can't code?",
      content: "No matter what your skills are, we'll try to make this event fun for you. We believe that solutions are better when they integrate diverse ways of thinking. There will be many opportunities to learn new skills or ideas at workshops and from the people around you. We’ll also be holding team building events where you can meet new people. Just come eager to learn!"
    },
    {
      title: "Does it cost anything?",
      content: "ScribeHacks is absolutely free! There is no entry fee, ScribeHacks will provide you with plenty of food, snacks, swag, and prizes throughout the 24 hours. We can provide all of this due to our wonderful sponsors!"
    },
    {
      title: "What should I bring?",
      content: "Please bring a valid form of identification like a student id or driver's license, a computer (preferably a laptop), chargers, and any hardware you will use for your hack. You can also bring a sleeping bag, pillow, toiletries, and a couple changes of clothes. Food will be provided at the event. No firearms, weapons, alcohol, or illegal drugs are allowed on campus."
    },
    {
      title: "How do I prepare?",
      content: "While you are not allowed to start coding or making the art for your project until the hackathon starts, you can always find a team, register for the hackathon, make mockups in Figma, XD, Sketch, and get the materials needed to make your project."
    },
    {
      title: "What are the rules?",
      content: "All participants are expected to follow the Hack Club Code of Conduct to ensure that everyone stays safe and has a fun time. In addition, plagiarism, copying code off the internet, or hardcoding values and not disclosing them, and other dishonesty may disqualify your project."
    }
  ]
</script>

<a name="faq">
<section class="section">
  <h2>Frequently Asked Questions</h2>
  <br />
  <div class="faq">
    {#each faq as item}
      <FaqItem faq="{item}" />
    {/each}
  </div>
</section>
</a>

<style type="text/scss">
  .section {
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 20px;

    h2 {
      font-size: 1.5rem;
      margin: 0;
    }
  }

  .faq {
    display: flex;
    max-width: 1100px;
    margin: auto;
    margin-top: 30px;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    .section {
      padding: 60px 20px;

      h2 {
        font-size: 2rem;
        margin: 0;
      }
    }
  }
</style>
