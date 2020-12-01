<template>
  <form
    class="form"
    @submit.prevent="login"
  >
    <h2 class="form__title">
      Zaloguj się!
    </h2>
    <p
      v-if="$v.$anyError"
      class="text-danger"
    >
      Wypełnij wymagane pola poprawnie!
    </p>
    <p
      v-if="incorrectLoginData"
      class="text-danger"
    >
      Wprowadzone dane są niepoprawne!
    </p>
    <div class="mb-3">
      <label for="loginEmail">Email</label>
      <input
        id="loginEmail"
        v-model="form.username"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': $v.form.username.$error }"
      >
    </div>
    <div class="mb-3">
      <label for="loginPassword">Hasło</label>
      <input
        id="loginPassword"
        v-model="form.password"
        name="password"
        type="password"
        class="form-control"
        :class="{ 'is-invalid': $v.form.password.$error }"
      >
    </div>
    <div class="form__links">
      <router-link :to="{ name: 'register' }">
        Zarejestruj się
      </router-link>
      <router-link :to="{ name: 'remind-password' }">
        Przypomnij hasło
      </router-link>
    </div>
    <button class="btn btn-primary form__submit">
      Zaloguj się
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/src/validators';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      incorrectLoginData: false,
    };
  },
  validations: {
    form: {
      username: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  methods: {
    ...mapActions(['getLoggedUser']),
    async login() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        try {
          await this.$http.post('login', null, { params: this.form });
          await this.getLoggedUser();
          this.$router.push({ name: 'home' });
        } catch (e) {
          this.incorrectLoginData = true;
        }
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
