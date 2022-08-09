<template>
  <div class="modal">
    <div class="inner">
      <p class="title">Add new item</p>
      <div class="inner__item inner__item--radio">
        <p>What kind of item would you like to add?</p>
        <div class="radio row">
          <div class="radio__item row">
            <input
              type="radio"
              id="service"
              value="Service"
              v-model="pickedItem"
            />
            <label for="service">Service</label>
          </div>
          <div class="radio__item row">
            <input
              type="radio"
              id="product"
              value="Product"
              v-model="pickedItem"
            />
            <label for="product">Product</label>
          </div>
        </div>
      </div>
      <div class="inner__item">
        <label for="input-name" :class="status($v.name)"> Name * </label>
        <input
          class="input"
          type="text"
          name="input-name"
          id="input-name"
          placeholder="Eg. Business Consulting"
          v-model="$v.name.$model"
        />
      </div>
      <div class="inner__item">
        <label for="input-desc"> Description </label>
        <textarea
          class="input input--textarea"
          name="input-desc"
          rows="3"
          id="input-desc"
          placeholder="Describe your product"
        ></textarea>
      </div>
      <div class="inner__item">
        <label for="input-price" :class="status($v.price)"> Price * </label>
        <input
          class="input"
          type="text"
          name="input-price"
          id="input-price"
          placeholder="Enter amount"
          v-model="$v.price.$model"
          v-maska="'$#*.##'"
        />
      </div>
      <div class="row">
        <button class="btn btn--flat">Cancel</button>
        <button class="btn" @click="submitForm">Add item</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { maska } from "maska";
export default {
  name: "AddItemModal",
  directives: { maska },
  data: () => ({
    pickedItem: "Service",
    name: "",
    description: "",
    price: "",
  }),
  validations: {
    name: { required },
    price: { required },
  },
  methods: {
    submitForm: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      alert("SUCCESS!!");
    },
    status(validation) {
      return validation.$error ? "required" : "";
    },
  },
  mounted() {
    console.log(this.$v);
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap");
// colors
$black: #000000;
$dark: #0f1730;
$select-purple: #8234e4;
$border-color: #cfd4e2;
$dark-grey: #555b6d;

.modal {
  font-family: "IBM Plex Sans", sans-serif;
  width: 490px;
  height: 726px;
  border-radius: 20px;
  border: 1px solid $border-color;
  padding: 60px 70px 81px;
  text-align: left;
  background-color: white;
  filter: drop-shadow(0 5px 3px #cac7c7);
  & .inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    & label {
      @include font(inherit, $dark, 16px, 500);
      &.required::after {
        content: "It is required";
        color: red;
      }
    }
    & .title {
      @include font(inherit, $dark, 28px, bold);
      margin-bottom: 6px;
    }
    &__item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      @include font(inherit, inherit, 16px, medium);
      & .input {
        border-radius: 5px;
        border: 1px solid $border-color;
        padding: 15px 20px;
        @include font(inherit, $dark, 16px);
        @at-root #{&}--textarea {
          height: 93px;
        }
      }
      @at-root #{&}--radio {
        margin-bottom: 15px;
        gap: 25px;
        & .radio {
          gap: 61px;
          &__item {
            height: 28px;
            align-items: center;
            gap: 10px;
            @include font(inherit, $dark-grey, 16px, 500);
            input[type="radio"] {
              accent-color: $dark-grey;
              height: 100%;
              aspect-ratio: 1;
              cursor: pointer;
            }
          }
        }
      }
    }
    & > *:last-child {
      margin-top: 5px;
      gap: 17px;
      .btn {
        background-color: $dark;
        border-radius: 3px;
        @include font(inherit, white, 16px, medium);
        height: 51px;
        width: 100%;
        cursor: pointer;
        @at-root #{&}--flat {
          background-color: white;
          color: $dark;
          border: none;
        }
      }
    }
    &::before {
      color: $dark-grey;
      content: url("@/assets/icons/x.svg");
      cursor: pointer;
      white-space: nowrap;
      border: none;
      color: $dark-grey;
      display: flex;
      align-items: center;
      position: absolute;
      justify-content: center;
      width: 51px;
      height: 51px;
      right: 30px;
      top: 30px;
    }
  }
}
</style>
