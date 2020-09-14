<template>
  <div>
    <h2>Category: {{$route.params['subCategory']}}</h2>
    <h2>UID: {{$route.params['id']}}</h2>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "subCategory"
  }
};
</script>