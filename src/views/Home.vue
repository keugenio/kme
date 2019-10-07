<template>
  <div class="app">
    <Kumbotron />
    <AboutMeCards />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Kumbotron from "@/components/Kumbotron.vue";
import Footer from "@/components/Footer.vue";
import AboutMeCards from "@/components/AboutMeCards.vue";
export default {
  name: "home",
  components: {
    Kumbotron,
    Footer,
    AboutMeCards
  }
};
</script>
