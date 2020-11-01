<template>

  <div class="result">
    <a id="link" :href="url">{{url}}</a>
    <i class="far fa-clipboard fa-2x" @click="copyToClipboard"></i>
  </div>

</template>

<script>
export default {
  props: {
    url: String
  },
  methods: {
    copyToClipboard() {
      const range = document.createRange();
      range.selectNode(document.getElementById('link'));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }
  }
}

</script>

<style lang="scss" scoped>
$accent: #EE8434;
$dark: #333;
$disable: #d3d3d3;
  
.result{
  margin-top: 50px;
  background-color: lighten($dark, 10);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 10px 10px 30px rgba($color: #000000, $alpha: 0.4);
  display: flex;
  align-items: center;
  i{
    color: $disable;
    cursor: pointer;
    transition: all .2s linear;
    &:hover{
      color: $accent;
    }
    &:active{
      transform: scale(1.1,1.1);
    }
  }
  a{
    word-break: break-all;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    font-size: 24px;
    margin-right: 20px;
    width: auto;
    &::selection {
            background-color: lighten($accent, $amount: 30);
    }
  }
}
</style>