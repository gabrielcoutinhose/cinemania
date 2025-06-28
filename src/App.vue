<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";

export default {
  components: { Header, Main },
};
</script>
