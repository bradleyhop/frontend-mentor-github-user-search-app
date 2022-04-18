<script>
import UserCard from "./components/UserCard.vue";
// access GitHub user api
import { Octokit } from "@octokit/core";

export default {
  components: {
    UserCard,
  },

  data() {
    return {
      userSearch: "",
      data: "",
      error: false,
      errorMessage: "",
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
          this.errorMessage = "Not found";
        });
    },
  },
};
</script>

<template>
  <header>
    <h1 class="header-title">devfinder</h1>
    <div class="d-l-mode"></div>
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
        :followIng="data.folowing"
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

.search-bar-wrapper {
  background-color: var(--secondary-bg);
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
