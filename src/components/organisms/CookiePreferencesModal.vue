<template>
  <div class="modal column">
    <div class="top column">
      <p class="text text--title">About Your Privacy</p>
      <p class="text text--description">
        We process your data to deliver content or advertisements and measure
        the delivery of such content or advertisements to extract insights about
        our website. We share this information with our partners on the basis of
        consent and legitimate interest. You may exercise your right to consent
        or object to a legitimate interest, based on a specific purpose below or
        at a partner level in the link under each purpose. These choices will be
        signaled to our vendors.
      </p>
      <button class="btn" @click="allowAll">Allow all</button>
    </div>
    <div class="bottom column">
      <p class="content-title">Manage Consent Preferences</p>
      <div class="preferences column">
        <div
          v-for="item in cookies"
          :key="item.title"
          class="preferences__item row"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon-plus"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <p class="pref-text">{{ item.title }}</p>
          <p v-if="item.forced" class="pref-text pref-text--activity">
            Always Active
          </p>
          <toggle-button
            :ref="item.ref"
            :id="item.ref"
            v-else
            v-model="item.value"
          />
        </div>
      </div>
      <div class="btn-list row">
        <button class="btn" @click="rejectAll">Reject all</button>
        <button class="btn">Submit my choices</button>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "./ToggleButton.vue";
export default {
  name: "CookiePreferencesModal",
  data: () => ({
    cookies: {
      necessary: {
        ref: "necessary",
        forced: true,
        value: true,
        title: "Strictly Necessary Cookies",
      },
      functional: {
        ref: "functional",
        forced: false,
        value: false,
        title: "Functional Cookies",
      },
      performance: {
        ref: "performance",
        forced: false,
        value: false,
        title: "Performance Cookies",
      },
      personalized: {
        ref: "personalized",
        forced: false,
        value: false,
        title:
          "Personalised ads and content measurement, audience insights and product development",
      },
    },
  }),
  components: { ToggleButton },
  methods: {
    allowAll: function () {
      for (let [key, value] of Object.entries(this.cookies)) {
        if (value.forced != true && value.value == false) {
          document.getElementById(key).click();
        }
      }
    },
    rejectAll: function () {
      for (let [key, value] of Object.entries(this.cookies)) {
        if (value.forced != true && value.value == true) {
          document.getElementById(key).click();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://rsms.me/inter/inter.css");
$white: #ffffff;
$background: #fafbff;
$grey-light: #f1f4fd;
$grey: #d2d9ef;
$dark: #131339;
.modal {
  position: relative;
  font-family: "Inter", sans-serif;
  width: 571px;
  height: fit-content;
  background-color: $background;
  box-shadow: 20px 34px 74px rgba(21, 21, 106, 0.07);
  border-radius: 32px;
  padding: 54px;
  gap: 40px;
  &::before {
    content: "";
    position: absolute;
    background-color: $dark;
    left: -85px;
    top: -85px;
    width: 400px;
    height: 484px;
    border-radius: 80px;
    z-index: -1;
  }
  & .top {
    gap: 16px;
    .text--title {
      @include font(inherit, $dark, 18px, 600);
    }
    .text--description {
      @include font(inherit, $dark, 14px);
    }
  }
  & .bottom {
    gap: 16px;
    & p.content-title {
      @include font(inherit, $dark, 16px, 600);
    }
    & .preferences {
      gap: 4px;
      &__item {
        gap: 16px;
        align-items: center;
        justify-content: space-between;
        background-color: $white;
        padding: 16px;
        & .icon-plus {
          fill: none;
          stroke: $dark;
          stroke-width: 1;
        }
        & p.pref-text {
          @include font(inherit, $dark, 16px);
          align-items: center;
          flex: 1;
          @at-root #{&}--activity {
            opacity: 0.5;
            flex: none;
          }
        }
      }
    }
    & .btn-list {
      gap: 8px;
      justify-content: flex-start;
    }
  }
  .btn {
    background-color: $dark;
    padding: 16px 24px;
    border: none;
    border-radius: 32px;
    width: fit-content;
    @include font(inherit, $white, 14px, 300);
    line-height: 17px;
    cursor: pointer;
  }
}
</style>
