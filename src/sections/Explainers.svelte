
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
				[ Placeholder text about scoring ]
			</RevealItem>
			<RevealItem
				title="Prize Pool" tag="Choose Your Own Prize"
				imgHref="img/scribehacks/funding.png">
				We put the prizing in your hands. Winners will be allowed to choose prizes from our pool. Higher ranked projects will get first pick. For more details go to the page on it here.
			</RevealItem>
			<RevealItem
				title="Mentor Tracks" tag="Helping Beginners Start"
				imgHref="img/scribehacks/hash.png">
				[ Placeholder text about mentor tracks ]
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
	}
</style>
