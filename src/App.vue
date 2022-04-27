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
      errorMessage: "No results", // default error message
    };
  },

  methods: {
    /*
     * call on the octokit tool to access public user info;
     * will take an argument as defined in the v-bind input: userSearch
     */
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
          // console.log(result.data);
          this.data = result.data;
        })
        // Will catch status 404, etc
        .catch(() => {
          this.error = true;
        });
    },

    /*
     * change user theme from light to dark as defined by the 'data-theme'
     * attribute on the <html> tag; also changes component data to indicate
     * light or dark theme applied, which will change button state
     */
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

  /*
   * Look to see what the user has set in their browser via
   * 'prefers-color-scheme'; set them to dark if needed.
   * ('light' theme is set as default)
   */
  created() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
      this.light = false;
    }
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
    <div class="search-bar-wrapper" :class="{ 'box-shadow': light }">
      <span class="search-icon-wrapper">
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
        :lightTheme="this.light"
      />
    </div>
  </main>

  <footer class="attribution">
    <div class="att-container">
      Challenge by
      <a
        href="https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6"
        target="_blank"
        rel="noopener noreferrer"
        >Frontend Mentor</a
      >.
    </div>
    <div class="att-container">
      Code by
      <a
        href="https://bradleysmith.tech"
        target="_blank"
        rel="noopener noreferrer"
        >Bradley Smith</a
      >.
    </div>
  </footer>
</template>

<style lang="scss">
body {
  background-color: var(--primary-bg);
}

main {
  margin-bottom: 1rem;
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
  justify-self: end; // in relation to parent's grid
  display: flex; // to help with centering in children

  // fade in text on change
  @include fade-in;
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
  padding: 0.5rem;
  display: flex;
  align-content: center;
}

.header-title {
  color: var(--secondary-text);
  font-size: 26px;
  line-height: 39px;
  font-weight: 700;
}

.search-icon-wrapper {
  padding: 0.5rem;
  display: flex;

  @include tablet-breakpoint {
    padding: 0.5rem 1.6rem;
  }
}

.search-icon {
  height: 1.33rem;
  width: 1.33rem;
  align-self: center;

  @include tablet-breakpoint {
    height: 1.6rem;
    width: 1.6rem;
  }
}

.error-not-found {
  color: $error-red;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  min-width: 12ch;
  display: flex;
  align-self: center;
}

.input-search {
  background-color: inherit;
  color: var(--primary-text);
  font-size: 13px;
  line-height: 25px;
  width: 100%;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }

  @include tablet-breakpoint {
    font-size: 18px;
  }
}

.search-button {
  // same colors for both themes
  background-color: $bright-blue;
  color: #fff;
  cursor: pointer;
  border-style: none;
  border-radius: 0.67rem;
  font-weight: 700;
  // mobile
  font-size: 14px;
  line-height: 21px;
  padding: 0.83rem 1.2rem;
  // a little flair on changing background color
  transition: background-color 0.1s;

  &:active {
    background-color: $active-blue;
  }

  @include tablet-breakpoint {
    font-size: 16px;
    line-height: 24px;
  }
}

.attribution {
  color: var(--primary-text);
  margin-bottom: 2rem;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  & a {
    color: $bright-blue;

    &:hover {
      text-decoration: underline;
    }
  }

  @include tablet-breakpoint {
    font-size: 14px;
    flex-direction: row;
  }
}
</style>
