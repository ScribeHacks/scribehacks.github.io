<script lang="ts">
  import Navbar from "./components/Navbar.svelte";

  import Hero from "./sections/Hero.svelte";
  import About from "./sections/About.svelte";
  import FAQ from "./sections/FAQ.svelte";
  import Schedule from "./sections/Schedule.svelte";
  import Venue from "./sections/Venue.svelte";
	import Explainers from "./sections/Explainers.svelte";
	import Speakers from "./sections/Speakers.svelte";
  import Team from "./sections/Team.svelte";
  import Contact from "./sections/Contact.svelte";
  import Footer from "./sections/Footer.svelte";
</script>

<main>
  <Navbar />
  <Hero />
  <About />
	<Explainers />
  <Schedule />
  <Venue />
  <FAQ />
	<Speakers />
  <Team />
  <Contact />
  <Footer />
</main>

<style type="text/scss">
</style>
