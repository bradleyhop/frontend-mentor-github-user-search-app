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
    // for the drop shadow on light theme
    lightTheme: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      imageLoading: true,
    };
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
      return this.twitter ? "https:twitter.com/" + this.twitter : null;
    },
  },

  watch: {
    avatar: function () {
      this.imageLoading = true;
    },
  },
};
</script>

<template>
  <article class="article-wrapper" :class="{ 'box-shadow': lightTheme }">
    <!-- must have vue's :key so that fade-in effect applies to each image load -->
    <!-- using vue's @load to hide image alt text as image is being downloaded -->
    <img
      :src="avatar"
      :key="avatar"
      :style="{ visibility: imageLoading ? 'hidden' : 'visible' }"
      @load="imageLoading = false"
      alt="avatar of GitHub user"
      class="user-img"
    />
    <div class="card-header-wrapper">
      <div class="header-content">
        <div class="user-info-wrapper">
          <h2 class="name" :class="{ 'not-available': !name }">
            {{ name || "Not available" }}
          </h2>
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
          <span class="link-icon-wrapper">
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
          <span class="link-icon-wrapper">
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
          <span class="link-icon-wrapper">
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
            target="_blank"
            rel="noopener noreferrer"
            >@{{ twitter }}</a
          >
          <span v-else class="link-text not-available">Not available</span>
        </div>
        <div class="link-wrapper">
          <span class="link-icon-wrapper">
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
// align card content to not be under user avatar in desktop
@mixin shift-left {
  margin-left: 10rem;
}

// decrease color opacity for icons and text when property is falsey
.not-available {
  opacity: 0.5;
}

.article-wrapper {
  background-color: var(--secondary-bg);
  border-radius: 1rem;
  padding: 1.6rem;

  @include tablet-breakpoint {
    padding: 2.67rem;
  }

  @include desktop-breakpoint {
    padding: 3.2rem;
  }
}

.user-img {
  background-color: var(--secondary-bg);
  height: 4.67rem;
  width: 4.67rem;
  border-radius: 50%;
  object-fit: cover;
  float: left;
  margin-right: 2rem;
  // fade in image on load
  @include fade-in;

  @include tablet-breakpoint {
    height: 7.8rem;
    width: 7.8rem;
  }
}

.card-header-wrapper {
  display: flex;
  min-height: 4.67rem; // set same height as user image

  @include tablet-breakpoint {
    min-height: 7.8rem;
  }

  @include desktop-breakpoint {
    // allow content to top and bio below
    min-height: initial;
  }
}

.header-content {
  width: 100%;
  display: grid;
  align-content: center;

  @include desktop-breakpoint {
    grid-template-columns: 1fr 1fr;
  }
}

.name {
  color: var(--secondary-text);
  font-size: 16px;
  line-height: 24px;

  @include tablet-breakpoint {
    font-size: 26px;
    line-height: 39px;
  }
}

.user-link {
  color: $bright-blue;
  font-size: 13px;
  line-height: 19px;

  @include tablet-breakpoint {
    font-size: 16px;
    line-height: 24px;
  }
}

.join-date {
  color: var(--primary-text);
  font-size: 13px;
  line-height: 19px;

  @include tablet-breakpoint {
    font-size: 15px;
    line-height: 22px;
  }

  @include desktop-breakpoint {
    justify-self: end;
    line-height: 39px;
  }
}

.user-bio {
  color: var(--primary-text);
  font-size: 13px;
  line-height: 25px;
  margin: 2.2rem 0;

  @include tablet-breakpoint {
    font-size: 15px;
    line-height: 25px;
    margin-top: 1.6rem;
  }

  @include desktop-breakpoint {
    @include shift-left;
    margin-top: 1.3rem;
  }
}

.stats-container {
  background-color: var(--primary-bg);
  border-radius: 0.67rem;
  display: grid;
  // same layout for all devices
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem 2rem;
  margin-bottom: 1.6rem;
  text-align: center;

  @include tablet-breakpoint {
    text-align: left;
  }

  @include desktop-breakpoint {
    @include shift-left;
  }
}

.title-stat {
  color: var(--secondary-text);
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 0.5rem;

  @include tablet-breakpoint {
    font-size: 13px;
    line-height: 19.25px;
  }
}

.numb-stat {
  color: var(--secondary-text);
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;

  @include tablet-breakpoint {
    font-size: 22px;
    line-height: 33px;
  }
}

.link-container {
  display: grid;

  @include tablet-breakpoint {
    // set links two by two
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  @include desktop-breakpoint {
    @include shift-left;
  }
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
  align-self: center;

  @include tablet-breakpoint {
    font-size: 15px;
    line-height: 22px;
  }
}

.link-wrapper {
  margin-bottom: 0.5rem;
  display: flex;
  align-content: center;
  min-height: 2rem;
}

.link-icon-wrapper {
  margin-right: 1rem;
  display: flex;
  align-self: center;
  height: 20px;
  width: 20px;
  text-align: center;
}
</style>
