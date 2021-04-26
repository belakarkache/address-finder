<template>
  <div>
    <div class="page-header">
      <q-toggle v-model="darkMode" label="Dark mode" />
    </div>
    <Search />
  </div>
</template>

<script>
import Search from "./components/Search";

export default {
  name: "App",
  components: {
    Search,
  },
  data() {
    return {
      darkMode: false,
    };
  },
  watch: {
    darkMode: function (val) {
      this.$q.dark.set(val);
    },
  },
};
</script>
