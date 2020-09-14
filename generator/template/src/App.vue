<template>
  <div id="app">
    <div id="nav">
      <p>
        <language-switcher v-slot="{ links }">
          <router-link :to="link.url" v-for="link in links" :key="link.langIndex">
            <span class="item">{{ link.langName }}</span>
          </router-link>
        </language-switcher>
      </p>
      <p>
        <localized-link to="/">{{$t('home.nav')}}</localized-link>&nbsp;|&nbsp;
        <localized-link to="/about">{{$t('about.nav')}}</localized-link>&nbsp;|&nbsp;
        <localized-link to="/user/1">{{$t('user.nav')}}</localized-link>&nbsp;|&nbsp;
        <localized-link to="/category/1/profile">profile</localized-link>&nbsp;|&nbsp;
        <localized-link to="/category/1/education">education</localized-link>&nbsp;|&nbsp;
        <router-link :to="{path: '/' + $i18n.locale + '/about'}"></router-link>
      </p>
      <h3>当前路由： {{$route.path}}</h3>
    </div>
    <router-view />
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.item {
  padding: 0 20px;
}
</style>
