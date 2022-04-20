<script>
export default {
  name: "UserCard",

  props: {
    // these properties are required to have a GitHub account
    avatar: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    gitHubUrl: {
      type: String,
      required: true,
    },
    dateJoined: {
      type: String,
      required: true,
    },
    // additional info a GitHub user may provide; returns falsey if not explicitly
    // defined by GitHub user
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    repos: {
      type: Number,
    },
    followers: {
      type: Number,
    },
    followIng: {
      type: Number,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    twitter: {
      type: String,
    },
    company: {
      type: String,
    },
    // for the drop show on light theme
    lightTheme: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // convert date string to object; return day month year
    formatedDate() {
      return new Date(this.dateJoined).toLocaleString("en-gb", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    // format twitter user account link
    twitterLink() {
      return this.twitter ? "https:twitter.com" + this.twitter : null;
    },
  },
};
</script>

<template>
  <article class="article-wrapper" :class="{ 'box-shadow': lightTheme }">
    <div class="card-header-wrapper">
      <img :src="avatar" alt="avatar of GitHub user" class="img-user" />
      <div class="header-content">
        <h1 class="name" :class="{ 'not-available': !name }">
          {{ name || "Not available" }}
        </h1>
        <div class="user-link-wrapper">
          <a
            :href="gitHubUrl"
            class="user-link"
            target="_blank"
            rel="noopener noreferrer"
            >@{{ login }}</a
          >
        </div>
        <div class="join-date">Joined {{ formatedDate }}</div>
      </div>
    </div>
    <!-- /card-header-wrapper -->

    <p class="user-bio" :class="{ 'not-available': !bio }">
      {{ bio || "Not available" }}
    </p>
    <div class="stats-container">
      <div class="repo-wrapper">
        <div class="title-stat" :class="{ 'not-available': !repos }">Repos</div>
        <div class="numb-stat" :class="{ 'not-available': !repos }">
          {{ repos || 0 }}
        </div>
      </div>
      <div class="follower-wrapper">
        <div class="title-stat" :class="{ 'not-available': !followers }">
          Followers
        </div>
        <div class="numb-stat" :class="{ 'not-available': !followers }">
          {{ followers || 0 }}
        </div>
      </div>
      <div class="following-wrapper">
        <div class="title-stat" :class="{ 'not-available': !followIng }">
          Following
        </div>
        <div class="numb-stat" :class="{ 'not-available': !followIng }">
          {{ followIng || 0 }}
        </div>
      </div>
    </div>
    <!-- /stats-container -->
    <div class="link-container">
      <div class="link-box-1">
        <div class="link-wrapper">
          <span class="stats-icon-wrapper">
            <img
              src="@/assets/img/icon-location.svg"
              alt="image of location marker"
              class="location-icon"
              :class="{ 'not-available': !location }"
            />
          </span>
          <span class="link-text" :class="{ 'not-available': !location }">{{
            location || "Not available"
          }}</span>
        </div>
        <div class="link-wrapper">
          <span class="stats-icon-wrapper">
            <img
              src="@/assets/img/icon-website.svg"
              alt="icon of external link"
              class="website-icon"
              :class="{ 'not-available': !website }"
            />
          </span>
          <span v-if="website">
            <a
              :href="website"
              class="link-text"
              target="_blank"
              rel="noopener noreferrer"
              >{{ website }}</a
            >
          </span>
          <span v-else class="link-text not-available">Not available</span>
        </div>
      </div>
      <!-- /box-1 -->
      <div class="links-box-2">
        <div class="link-wrapper">
          <span class="stats-icon-wrapper">
            <img
              src="@/assets/img/icon-twitter.svg"
              alt="twitter icon"
              class="twitter-icon"
              :class="{ 'not-available': !twitter }"
            />
          </span>
          <a
            :href="twitterLink"
            v-if="twitter"
            class="link-text"
            rel="noopener noreferrer"
            >@{{ twitter }}</a
          >
          <span v-else class="link-text not-available">Not available</span>
        </div>
        <div class="link-wrapper">
          <span class="stats-icon-wrapper">
            <img
              src="@/assets/img/icon-company.svg"
              alt="icon of company building"
              class="company-icon"
              :class="{ 'not-available': !company }"
            />
          </span>
          <span class="link-text" :class="{ 'not-available': !company }">{{
            company || "Not available"
          }}</span>
        </div>
      </div>
      <!-- /box-2 -->
    </div>
  </article>
</template>

<style lang="scss">
// decrease color opacity for icons and text when property is falsey
.not-available {
  opacity: 0.5;
}

.article-wrapper {
  background-color: var(--secondary-bg);
  border-radius: 1rem;
  padding: 1.6rem;
}

.card-header-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 0.53rem;
  margin-bottom: 2.2rem;
}

.img-user {
  background-color: $light-greyish;
  height: 4.67rem;
  width: 4.67rem;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  color: var(--secondary-text);
  font-size: 16px;
  line-height: 24px;
}

.user-link {
  color: $bright-blue;
  font-size: 13px;
  line-height: 19px;
}

.join-date {
  color: var(--primary-text);
  font-size: 13px;
  line-height: 19px;
}

.user-bio {
  color: var(--primary-text);
  font-size: 13px;
  line-height: 25px;
  margin-bottom: 2.2rem;
}

.stats-container {
  background-color: var(--primary-bg);
  border-radius: 0.67rem;
  display: grid;
  // same layout for all devices
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem;
  text-align: center;
  margin-bottom: 1.6rem;
}

.title-stat {
  color: var(--secondary-text);
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 0.5rem;
}

.numb-stat {
  color: var(--secondary-text);
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}

.link-container {
  display: grid;
}

.location-icon {
  height: 1.33em;
  width: 0.92em;
}

.website-icon {
  height: 1.33rem;
  width: 1.33rem;
}

.twitter-icon {
  height: 1.08rem;
  width: 1.33rem;
}

.company-icon {
  height: 1.32rem;
  width: 1.33rem;
}

.link-text {
  color: var(--primary-text);
  font-size: 13px;
  line-height: 19px;
  vertical-align: middle;
}

.link-wrapper {
  margin-bottom: 1rem;
  display: flex;
  align-content: center;
}

.stats-icon-wrapper {
  display: inline-block;
  width: 2.5rem;
}
</style>
