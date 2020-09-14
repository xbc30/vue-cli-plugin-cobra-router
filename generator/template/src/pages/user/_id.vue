<template>
  <div class="container">
    <h1>{{$t('user.title')}}</h1>
    <h2>UID: {{$route.params['id']}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'Cobra'
      }
    }
  },
  metaInfo() {
    return {
      title: this.$t('user.title') + ' - ' + this.user.name,
    };
  },
};
</script>