
<script lang="ts">
	import RevealItem from "../components/RevealItem.svelte";
</script>

<a name="explainers">
	<section class="section">
		<h2>How Does It Work?</h2>
		<div class="explainers">
			<RevealItem
				title="Scoring System" tag="Encouraging Originality and Quality"
				imgHref="img/scribehacks/hash.png">
				Our scoring system is designed to encourage original and creative scoring. We'll be using a rubric based system to allow our judges to really look at which projects are best. Read more.
			</RevealItem>
			<RevealItem
				title="Prize Pool" tag="Choose Your Own Prize"
				imgHref="img/scribehacks/funding.png">
				We put the prizing in your hands. Winners will be allowed to choose prizes from our pool. Higher ranked projects will get first pick. For more details go to the page on it here.
			</RevealItem>
			<RevealItem
				title="Mentor Tracks" tag="Helping Beginners Start"
				imgHref="img/scribehacks/hash.png">
				We'll be pairing beginner teams with mentors so that each attendee has someone to contact for help. We'll also be providing a separate prize for beginners. Read more here.
			</RevealItem>
		</div>
	</section>
</a>

<style type="text/scss">
  .section {
    background-color: var(--bg-light);
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 20px;

    h2 {
      font-size: 2rem;
      margin: 0;
    }
  }

	.explainers {
		display: flex;
		flex-direction: row;
    margin: 30px 0;
		grid-gap: 50px;

		@media (max-width: 768px) {
			flex-direction: column;
		}
	}
</style>
