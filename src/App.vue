<script>
import UserCard from ".components/UserCard.vue";

export default {
  components: {
    UserCard,
  },
};
</script>

<template>
  <header>
    <h1>devfinder</h1>
    <div class="dl-mode"></div>
  </header>

  <main>
    <UserCard />
  </main>
</template>

<style lang="scss"></style>
