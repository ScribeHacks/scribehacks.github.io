
<script lang="ts">
	import RevealItem from "../components/RevealItem.svelte";
</script>

<a name="speakers">
	<section class="section">
		<h2>Event Speakers</h2>
		<div class="speakers">
			<RevealItem
				title="Zach Latta" tag="Founding Hack Club"
				imgHref="img/scribehacks/zach.png">
				Q&A and a talk with Zach Latta, the founder of Hack Club. <br> <b> September 18 - 5 PM
			</RevealItem>
		</div>
	</section>
</a>

<style type="text/scss">
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 20px;

    h2 {
      font-size: 2rem;
      margin: 0;
    }
  }

	.speakers {
		display: flex;
		flex-direction: row;
    margin: 30px 0;
		grid-gap: 50px;
	}
</style>
