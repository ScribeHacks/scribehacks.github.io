
<script lang="ts">
	export let title: string;
	export let tag: string;
	export let imgHref: string;
</script>

<section class="reveal-item">
	<img src="{imgHref}" alt="{title}">
	<h3>{title}</h3>
	<div class="text-container">
		<p class="pre-reveal">{tag}</p>
		<p class="post-reveal">
			<slot></slot>
		</p>
	</div>
</section>

<style lang="scss">
	.reveal-item {
		background-color: var(--bg-lightest);
		border-radius: 5px;
		box-shadow: var(--bxs-lightest) 2px 2px 10px;

		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 30px 15px;
		height: 250px;
		width: 225px;

		overflow: hidden;

		h3 {
			font-size: 1.5rem;
		}

		h3, p {
			margin: 0;
		}

		.post-reveal, .pre-reveal {
			transition-timing-function: ease-in-out;
		}

		.post-reveal {
			text-align: left;
			max-height: 0;
			opacity: 0;
			overflow: hidden;
			transition: opacity 0.3s;
		}

		.pre-reveal {
			max-height: 80px;
		}

		&:hover {
			.post-reveal {
				max-height: 115px;
				opacity: 1;
			}

			.pre-reveal {
				max-height: 0;
				opacity: 0;
			}

			img {
				max-height: 25%;
			}
		}
	}

	img {
		border-radius: 5px;
		box-sizing: border-box;
		max-height: 60%;
		margin-top: 10px;
		margin-bottom: 20px;
		flex: 1 1;
		transition-duration: 0.3s;
	}

	.text-container {
		display: flex;
		flex-direction: column-reverse;
		flex: 1 1;
		text-align: center;
		font-size: 14px;
	}
</style>