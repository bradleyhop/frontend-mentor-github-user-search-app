<script>
export default {
  name: "UserCard",

  props: {
    name: {
      type: String,
      required: true,
    },
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
    bio: {
      type: String,
      required: true,
      default: "",
    },
    repos: {
      type: Number,
      required: true,
    },
    followers: {
      type: Number,
      required: true,
    },
    followIng: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    company: {
      type: String,
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
    twitterLink() {
      return "https:twitter.com" + this.twitter;
    },
  },
};
</script>

<template>
  <article class="article-wrapper">
    <img :src="avatar" alt="avatar of GitHub user" class="img-user" />
    <div class="card-header-wrapper">
      <h1 class="name">{{ name || "Not available" }}</h1>
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
    <!-- /card-header-wrapper -->
    <p class="description-user">{{ bio || "Not available" }}</p>
    <!-- begin stats-container -->
    <div class="stats-container">
      <div class="repo-wrapper">
        <div class="title-stat">Repos</div>
        <div class="numb-stat">{{ repos || 0 }}</div>
      </div>
      <div class="follower-wrapper">
        <div class="title-stat">Followers</div>
        <div class="numb-stat">{{ followers || 0 }}</div>
      </div>
      <div class="following-wrapper">
        <div class="title-stat">Following</div>
        <div class="numb-stat">{{ followIng || 0 }}</div>
      </div>
    </div>
    <!-- /stats-container -->
    <div class="link-container">
      <div class="link-box-1">
        <div class="location-wrapper">
          <img
            src="@/assets/img/icon-location.svg"
            alt="image of location marker"
            class="location-icon"
          />
          <span class="link-text">{{ location || "Not available" }}</span>
        </div>
        <div class="website-wrapper">
          <img
            src="@/assets/img/icon-website.svg"
            alt="icon of external link"
            class="website-icon"
          />
          <span v-if="website" class="link-text">
            <a :href="website" target="_blank" rel="noopener noreferrer">{{
              website
            }}</a>
          </span>
          <span v-else class="link-text">Not available</span>
        </div>
      </div>
      <!-- /box-1 -->
      <div class="links-box-2">
        <div class="twitter-wrapper">
          <img
            src="@/assets/img/icon-twitter.svg"
            alt="twitter icon"
            class="twitter-icon"
          />
          <a
            :href="twitterLink"
            v-if="twitter"
            class="link-text"
            rel="noopener noreferrer"
            >@{{ twitter }}</a
          >
          <span v-else class="link-text">Not available</span>
        </div>
        <div class="company-wrapper">
          <img
            src="@/assets/img/icon-company.svg"
            alt="icon of company building"
            class="company-icon"
          />
          <span class="link-text">{{ company || "Not available" }}</span>
        </div>
      </div>
      <!-- /box-2 -->
    </div>
  </article>
</template>

<style lang="scss">
.img-user {
  height: 4.67rem;
  width: 4.67rem;
  border-radius: 50%; // may not be needed
}

.name {
  font-size: 16px;
  line-height: 24px;
}

.user-link {
  font-size: 13px;
  line-height: 19px;
}

.join-date {
  font-size: 13px;
  line-height: 19px;
}

.description-user {
  font-size: 13px;
  line-height: 25px;
}

.stats-container {
  display: grid;
  // same layout for all devices
  grid-template-columns: repeat(3, 1fr);
}

.title-stat {
  font-size: 11px;
  line-height: 16px;
}

.numb-stat {
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
  font-size: 13px;
  line-height: 19px;
}
</style>
