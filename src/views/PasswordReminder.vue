<template>
  <form
    class="form"
    @submit.prevent="remindPassword"
  >
    <h2 class="form__title">
      Przypomnij hasło!
    </h2>
    <p
      v-if="$v.$anyError"
      class="text-danger"
    >
      Wypełnij wymagane pola poprawnie!
    </p>
    <div class="mb-3">
      <label for="loginEmail">Email</label>
      <input
        id="loginEmail"
        v-model="form.email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': $v.form.email.$error }"
      >
    </div>
    <div class="form__links">
      <router-link :to="{ name: 'login' }">
        Zaloguj się
      </router-link>
      <router-link :to="{ name: 'register' }">
        Zarejestruj się
      </router-link>
    </div>
    <button class="btn btn-primary form__submit">
      Przypomnij hasło
    </button>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/src/validators';

export default {
  name: 'PasswordReminder',
  data() {
    return {
      form: {
        email: '',
      },
    };
  },
  validations: {
    form: {
      email: { required, email },
    },
  },
  methods: {
    async remindPassword() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        await this.$http.post('remindPassword', this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 350px;

  &__title {
    text-align: center;
    margin-bottom: 15px;
  }

  &__links {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  &__submit {
    display: block;
    margin: auto;
  }
}
</style>
