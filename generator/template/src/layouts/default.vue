<template>
  <div class="main">
    <p class="header">{{$t('layouts.header')}}</p>
    <p class="content">
      <router-view />
    </p>
    <p class="footer">{{$t('layouts.footer')}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    prop: {
      type: String,
      required: false,
    },
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // type your function
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
  filters: {},
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header {
  width: 500px;
  height: 100px;
  line-height: 100px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border: 3px dashed #ccc;
}
.content {
  width: 500px;
  height: 400px;
  border: 3px dashed #666;
}
.footer {
  width: 500px;
  height: 100px;
  line-height: 100px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border: 3px dashed #ccc;
}
</style>
