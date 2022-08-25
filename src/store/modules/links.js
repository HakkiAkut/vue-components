const state = {
  links: [
    {
      github: {
        link: "https://github.com/HakkiAkut/vue-components/blob/master/src/components/organisms/AddItemModal.vue",
        text: "Check on GitHub",
      },
      design: {
        link: "https://uidesigndaily.com/posts/figma-add-item-modal-pop-up-day-1443",
        text: "Taken from UI Daily Design",
      },
      information: "Add item modal with validation",
    },
    {
      github: {
        link: "https://github.com/HakkiAkut/vue-components/blob/master/src/components/organisms/EnterPassword.vue",
        text: "Check on GitHub",
      },
      design: {
        link: "https://uidesigndaily.com/posts/figma-enter-password-log-in-authentication-card-day-1583",
        text: "Taken from UI Daily Design",
      },
      information: "Enter your password modal",
    },
    {
      github: {
        link: "https://github.com/HakkiAkut/vue-components/blob/master/src/components/organisms/CookiePreferencesModal.vue",
        text: "Check on GitHub",
      },
      design: {
        link: "https://uidesigndaily.com/posts/figma-cookie-preferences-modal-cookies-settings-day-1581",
        text: "Taken from UI Daily Design",
      },
      information: "Cookie preferences modal",
    },
    {
      github: {
        link: "https://github.com/HakkiAkut/vue-components/blob/master/src/components/organisms/FilterSearchModal.vue",
        text: "Check on GitHub",
      },
      design: {
        link: "https://uidesigndaily.com/posts/figma-filter-search-list-day-1541",
        text: "Taken from UI Daily Design",
      },
      information:
        "Filter Search Modal, filtering process done on ComponentView since I wanted to use EventBus",
    },
    {
      github: {
        link: "https://github.com/HakkiAkut/vue-components/blob/master/src/components/molecules/CustomAlert.vue",
        text: "Check on GitHub",
      },
      design: {
        link: "https://uidesigndaily.com/posts/sketch-subscribe-notifications-message-notification-day-914",
        text: "Taken from UI Daily Design",
      },
      information: "Custom Alerts",
    },
    {
      github: {
        link: "https://github.com/HakkiAkut/vue-components/blob/master/src/components/organisms/AddUserCard.vue",
        text: "Check on GitHub",
      },
      design: {
        link: "https://uidesigndaily.com/posts/figma-call-to-action-card-footer-day-1461",
        text: "Taken from UI Daily Design",
      },
      information:
        "Call to Action Card, after entering an email, it will add a random user",
    },
  ],
};
const getters = {
  getLinks: (state) => state.links,
};
const mutations = {};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
