<template>
<div class="container">
  <NavBar />

  <div class="form-container">
    <form class="form" @submit.prevent="createUrl">
      <div class="input">
        <i class="fas fa-signature"></i>
        <input v-model="userInput.alias" type="text" name="alias" placeholder="Alias" />
      </div>
      <div class="input">
        <i class="fas fa-link"></i>
        <input v-model="userInput.url" type="url" name="url" required placeholder="Url" />
      </div>
      <div class="button-group">
        <button type="submit">Create</button>
      </div>
    </form>
  </div>

  <Result v-if="response.createdUrl" :url="response.createdUrl" />

  <div v-if="response.loading" class="loading-container">
    <img src="./assets/loading.gif" alt="" srcset="">
  </div>

</div>

</template>

<script setup>
import {reactive} from 'vue';
import NavBar from './components/NavBar';
import Result from './components/Result';

const base_url = document.URL;

const response = reactive({
  loading: false,
  givenURL: ''
});

const userInput = reactive({
  alias: '',
  url: ''
});

async function createUrl() {
  response.loading = true;
  const alias = userInput.alias.trim();
  const url = userInput.url;
  userInput.alias = '';
  userInput.url = '';
  const res = await fetch('/urls', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({alias, url})
  });
  const json = await res.json();
  if(json.error) {
    alert(json.error);
  }else {
    response.createdUrl = `${base_url}${json.alias}`;
  }
  response.loading = false;
}

export{
  NavBar,
  Result,
  createUrl,
  userInput,
  response,
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&display=swap');
$accent: #EE8434;
$background: #F3F5FA;
$dark: #333;
$disable: #d3d3d3;

.container{
  min-height: 100vh;
  background-color: $dark;

  .loading-container{
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      width: 50px;
      height: 50px;
    }
  }

  .form-container{
    display: flex;
    justify-content: center;
    padding-top: 100px;

    .form{
      border-radius: 10px;
      width: 90%;
      max-width: 400px;
      background-color: lighten($dark, $amount: 10);
      padding: 30px 10px;
      box-shadow: 10px 10px 30px rgba($color: #000000, $alpha: 0.4);
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      row-gap: 20px;

      .input{
        display: flex;
        align-items: center;
        padding: 5px 15px;
        border-bottom: 3px solid transparent;
        transition: border-bottom-color .2s linear;
        &:focus-within{
          border-bottom-color: $accent;
          
          i{
            color: $accent;
          }
        }

        i{
          color: $disable;
          transition: color .2s linear;
        }

        input{
          background: none;
          caret-color: $accent;
          color: #fff;
          border: none;
          outline: none;
          margin-left: 15px;
          flex: 1;
          font-size: 20px;
          font-family: 'Montserrat', sans-serif;
          &::selection {
            background-color: lighten($accent, $amount: 30);
          }
        }
      }

      .button-group {
        display: flex;
        justify-content: center;
        align-items: center;

        button{
          user-select: none;
          cursor: pointer;
          border: none;
          outline: none;
          font-size: 24px;
          padding: 5px 20px;
          color: #fff;
          background-color: $accent;
          border-radius: 10px;
          transition: all .2s linear;
          &:hover{
            background-color: lighten($color: $accent, $amount: 10);
          }
          &:active{
            transform: scale(1.1,1);
          }
        }
      }
    }
  }
}
</style>
