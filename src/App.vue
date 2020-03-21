<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-2 user-part">
        <img src="../public/logo.png" width="220px" />
      </div>
      <div id="nav" class=" col-10 main-nav">
      </div>
    </div>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-nav {
  background-color: #3c5a85;
  z-index: -1;
  position: relative;
}

.user-part {
  background-color: #f9f9f9;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
