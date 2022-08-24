<template>
  <div class="modal">
    <p class="title">Enter your password</p>
    <div class="user-info row">
      <img :src="url" alt="user-image" />
      <div class="column info-text">
        <p class="info-text--account">{{ accountType }} Account</p>
        <p class="info-text--name">{{ name }}</p>
      </div>
    </div>
    <div class="password-input column">
      <label for="input-psw">Password</label>
      <div class="row">
        <svg width="24px" height="24px" viewBox="0 0 24 24" class="icon">
          <path
            fill-rule="evenodd"
            d="M7,10 L7,7 C7,4.23857625 9.23857625,2 12,2 C14.7614237,2 17,4.23857625 17,7 L17,10 L18,10 C19.0683513,10 20,10.7763739 20,11.8333333 L20,20.1666667 C20,21.2236261 19.0683513,22 18,22 L6,22 C4.93164867,22 4,21.2236261 4,20.1666667 L4,11.8333333 C4,10.7763739 4.93164867,10 6,10 L7,10 Z M9,10 L15,10 L15,7 C15,5.34314575 13.6568542,4 12,4 C10.3431458,4 9,5.34314575 9,7 L9,10 Z M6,12 L6,20 L18,20 L18,12 L6,12 Z M12,17 C11.4477153,17 11,16.5522847 11,16 C11,15.4477153 11.4477153,15 12,15 C12.5522847,15 13,15.4477153 13,16 C13,16.5522847 12.5522847,17 12,17 Z"
          />
        </svg>
        <input
          :type="showPassword ? 'text' : 'password'"
          name="input-psw"
          id="input-psw"
          v-model="psw"
          placeholder="***********"
        />
        <svg
          @click="changePswVisibility"
          v-if="!showPassword"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="icon icon--right"
        >
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          ></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
        <svg
          @click="changePswVisibility"
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="icon icon--right"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
    </div>
    <div class="btn-list row">
      <div class="toggle row">
        <toggle-button v-model="toggle" />
        <p>Stay signed in</p>
      </div>
      <button class="btn-list__item">Continue</button>
    </div>
    <router-link to="#" class="router"><p>Reset password</p></router-link>
  </div>
</template>

<script>
import ToggleButton from "@/components/ToggleButton.vue";
export default {
  name: "EnterPassword",
  components: {
    ToggleButton,
  },
  data: () => ({
    showPassword: false,
    psw: "",
    toggle: false,
  }),
  props: {
    url: {
      type: String,
      default: "https://kstu.edu.tr/kstu-file/uploads/default-user-image.png",
    },
    accountType: {
      type: String,
      default: "Business",
    },
    name: {
      type: String,
      default: "Sarah Bills",
    },
  },
  methods: {
    changePswVisibility: function () {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://rsms.me/inter/inter.css");
$white: #ffffff;
$dark: #132b50;
.modal {
  font-family: "Inter", sans-serif;
  height: 577px;
  width: 584px;
  border-radius: 16px;
  padding: 85px;
  box-shadow: 0px 44px 104px rgba(19, 43, 80, 0.1);
  border: none;
  background-color: $white;
  display: flex;
  flex-direction: column;
  gap: 32px;
  & > .title {
    @include font(inherit, $dark, 32px, 700);
  }
  & > .user-info {
    height: 78px;
    gap: 16px;
    align-items: center;
    & > img {
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
    }
    & .info-text {
      gap: 4px;
      @at-root #{&}--account {
        @include font(inherit, $dark, 14px, 500);
      }
      @at-root #{&}--name {
        @include font(inherit, $dark, 18px, 700);
      }
    }
  }
  & .password-input {
    gap: 8px;
    label {
      @include font(inherit, $dark, 14px, 600);
    }
    & .row {
      justify-content: left;
      align-items: center;
      gap: 16px;
      & #input-psw {
        padding: 16px 10px;
        padding-left: 48px !important;
        height: 59px;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 1px solid;
        flex: 1;
      }
      & .icon {
        // svg
        position: absolute;
        width: 26px !important;
        height: 26px !important;
        stroke-width: 0;
        fill: $dark;
        margin-left: 16px;
        &.icon--right {
          position: relative;
          margin-left: 0;
          fill: none;
          stroke-width: 2;
          stroke: $dark;
          stroke-linecap: round;
          stroke-linejoin: round;
          cursor: pointer;
        }
      }
    }
  }
  & .btn-list {
    height: 51px;
    width: 372px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .toggle {
      align-items: center;
      gap: 8px;
      @include font(inherit, $dark, 16px, 600);
    }
    @at-root #{&}__item {
      height: 100%;
      padding: 16px;
      width: fit-content;
      background-color: $dark;
      border: none;
      border-radius: 8px;
      @include font(inherit, $white, 16px, 600);
      cursor: pointer;
    }
  }
  & .router {
    padding-top: 8px;
    @include font(inherit, $dark, 16px, 600);
  }
}
</style>
