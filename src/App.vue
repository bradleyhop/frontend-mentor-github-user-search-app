<script>
import UserCard from "./components/UserCard.vue";

export default {
  components: {
    UserCard,
  },
};
</script>

<template>
  <header>
    <h1 class="header-title">devfinder</h1>
    <div class="d-l-mode"></div>
  </header>

  <main>
    <div class="wrapper-search-bar">
      <span
        ><img
          src="@/assets/img/icon-search.svg"
          alt="search icon"
          class="search-icon"
        />
      </span>
      <input
        type="text"
        placeholder="Search GitHub username..."
        class="input-search"
      />
      <button class="search-button">Search</button>
    </div>

    <UserCard />
  </main>
</template>

<style lang="scss">
.header-title {
  font-size: 26px;
  line-height: 39px;
  font-weight: 700;
}
.search-icon {
  height: 1.33rem;
  width: 1.33rem;
}

.input-search {
  font-size: 13px;
  line-height: 25px;
}

.search-button {
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
}
</style>
