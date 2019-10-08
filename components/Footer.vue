<template>
  <!-- ***************  FOOTER ******************* -->
  <div class="container-fluid footer">
    <div class="copyright w-100">
      <p>© 2019, Kui Eugenio, All rights reserved</p>
    </div>
  </div>
</template>

export default {
    name:'Footer'
}
<script>
</script>

<style lang="scss" scoped >
  @import '../sass/main.scss';
    .footer {
      position: absolute;
      bottom:0;
      width: 100%;
      padding:0;
      font-size: 1.5rem;
      text-align: center;
      & .copyright {
          padding:1rem;
          background:$color-dark-blue;
          color: $color-light-blue;
      }
    }
</style>
