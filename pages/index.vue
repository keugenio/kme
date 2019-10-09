<template>
  <div class="container-fluid d-flex flex-column my-auto justify-content-center align-items-center position-relative">
    <Kumbotron />
    <AboutMeCards />
    <Footer />
  </div>
</template>

<script>
import Kumbotron from '../components/Kumbotron'
import AboutMeCards from '../components/AboutMeCards'
import Footer from '../components/Footer'

export default {
  components: {
    Kumbotron,
    AboutMeCards,
    Footer
  }
}
</script>

<style lang="scss">
$color-primary:#0d47a1;
$color-primary-light:#4285F4;
$color-off-white: #fafafa;
$color-info:#42B3F4;
$color-black: #000000;
$color-white: #FFFFFF;
$color-dark:#263238;
$color-light-blue: #e1f5fe;
$color-dark-blue:#0d47a1;
$color-gray-light-1:#f7f7f7;
$color-yellow:#ffeb3b;

$color-success: #00C851;
$color-info:#33b5e5;

$text-dark: #263238;

$fade-primary: linear-gradient(to right, rgba($color-primary, .25), rgba($color-primary, .75));
$background-image: url('../assets/images/bg_main.jpg');

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
body {
    background:$color-light-blue;
    position:relative;
    display: block;
    width:100%;
    background-image: $background-image;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
}
</style>
