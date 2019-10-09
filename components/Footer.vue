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
  $color-light-blue: #e1f5fe;
  $color-dark-blue:#0d47a1;
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
