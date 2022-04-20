<script>
// component rendered after successful user search
import UserCard from "./components/UserCard.vue";
// access GitHub user api
import { Octokit } from "@octokit/core";

export default {
  components: {
    UserCard,
  },

  data() {
    return {
      light: true, // light or dark theme
      userSearch: "", // user input search
      data: null, // data returned by GitHub api
      error: false, // check if error returned
      errorMessage: "Not found", // default error message
    };
  },

  methods: {
    // call on the octokit tool to access public user info;
    // will take an argument as defined in the input below later
    fetchApi(searchUser) {
      // setup octokit object
      const octokit = new Octokit();

      // reset error
      this.error = false;

      // fetch user data
      octokit
        .request("Get /users/{username}", {
          username: searchUser,
        })
        .then((result) => {
          // See the following for returned object
          // console.log(result.data);
          this.data = result.data;
        })
        // Will catch status 404, etc
        .catch(() => {
          this.error = true;
        });
    },

    // change user theme from light to dark as defined by the 'data-theme'
    // attribute on the <html> tag; also changes component data to indicate
    // light or dark theme applied, which will change button state
    changeTheme() {
      // conditionally render button content on click
      this.light = this.light ? false : true;

      // html tag has attribute with which to set the app theme
      const currentTheme = document.documentElement.getAttribute("data-theme");
      document.documentElement.setAttribute(
        "data-theme",
        currentTheme === "light" ? "dark" : "light"
      );
    },
  },
};
</script>

<template>
  <header class="header-wrapper">
    <h1 class="header-title">devfinder</h1>

    <button v-if="light" class="theme-button" @click="changeTheme">
      <span class="button-text">Dark&nbsp;</span
      ><span class="button-img-container"
        ><img class="button-img" src="@/assets/img/icon-moon.svg"
      /></span>
    </button>
    <button v-else class="theme-button" @click="changeTheme">
      <span class="button-text">Light&nbsp;</span
      ><span class="button-img-container">
        <img src="@/assets/img/icon-sun.svg" class="button-img"
      /></span>
    </button>
    <!-- /v-iv /v-else -->
  </header>

  <main>
    <div class="search-bar-wrapper">
      <span>
        <img
          src="@/assets/img/icon-search.svg"
          alt="search icon"
          class="search-icon"
        />
      </span>
      <input
        type="text"
        placeholder="Search GitHub username..."
        class="input-search"
        v-model="userSearch"
        @keyup.enter="fetchApi(userSearch)"
      />
      <span v-if="error" class="error-not-found">{{ errorMessage }}</span>
      <button @click="fetchApi(userSearch)" class="search-button">
        Search
      </button>
    </div>

    <div v-if="data">
      <UserCard
        :name="data.name"
        :avatar="data.avatar_url"
        :login="data.login"
        :gitHubUrl="data.html_url"
        :dateJoined="data.created_at"
        :bio="data.bio"
        :repos="data.public_repos"
        :followers="data.followers"
        :followIng="data.following"
        :location="data.location"
        :website="data.blog"
        :twitter="data.twitter_username"
        :company="data.company"
      />
    </div>
  </main>
</template>

<style lang="scss">
body {
  background-color: var(--primary-bg);
}

.header-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  margin: 2rem 0 2.4rem 0;
}

.theme-button {
  background-color: var(--primary-bg);
  border: none;
  color: var(--primary-text);
  cursor: pointer;
  justify-self: end;
  display: flex;
}

.button-text {
  align-self: center;
}

.button-img-container {
  display: flex;
}

.button-img {
  align-self: center;
}

.search-bar-wrapper {
  background-color: var(--secondary-bg);
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
}

.header-title {
  color: var(--secondary-text);
  font-size: 26px;
  line-height: 39px;
  font-weight: 700;
}

.search-icon {
  height: 1.33rem;
  width: 1.33rem;
}

.error-not-found {
  color: $error-red;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
}

.input-search {
  font-size: 13px;
  line-height: 25px;
}

.search-button {
  // same colors for both themes
  background-color: $bright-blue;
  color: #fff;
  border-style: none;
  border-radius: 0.67rem;
  font-weight: 700;
  // mobile
  font-size: 14px;
  line-height: 21px;
  padding: 0.83rem 1.2rem;

  &:hover {
    cursor: pointer;
  }
}
</style>
