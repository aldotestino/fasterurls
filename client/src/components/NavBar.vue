<template>
  <nav class="navbar">
    <h1>FasterUrls</h1>
  </nav>
</template>

<script>
</script>

<style lang="scss" scoped>
$accent: #EE8434;
$background: #F3F5FA;
$dark: #333333;
$disable: #d3d3d3;

.navbar{
  height: 80px;
  box-shadow: 0px 10px 30px rgba($color: #000000, $alpha: 0.4);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5%;
  background-color: $accent;
  color: #fff;
  h1{
    font-size: 32px;
    user-select: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
  }
}

@media screen and (max-width: 1000px) {
  .navbar {
    justify-content: center;
  }
}
</style>