<template>
  <form
    class="form"
    @submit.prevent="register"
  >
    <h2 class="form__title">
      Zarejestruj się!
    </h2>
    <p
      v-if="$v.$anyError"
      class="text-danger"
    >
      Wypełnij wymagane pola poprawnie!
    </p>
    <p
      v-if="accountCreated"
      class="text-success"
    >
      Twoje konto zostało utworzone!<br>Aktywuj je poprzez link aktywacyjny.
    </p>
    <div class="mb-3">
      <label for="firstName">Imię*</label>
      <input
        id="firstName"
        v-model="form.firstName"
        name="first-name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': $v.form.firstName.$error }"
      >
    </div>
    <div class="mb-3">
      <label for="lastName">Nazwisko*</label>
      <input
        id="lastName"
        v-model="form.lastName"
        name="last-name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': $v.form.lastName.$error }"
      >
    </div>
    <div class="mb-3">
      <label for="birthDate">Data urodzenia*</label>
      <input
        id="birthDate"
        v-model="form.birthDate"
        name="birth-date"
        type="date"
        class="form-control"
        :class="{ 'is-invalid': $v.form.birthDate.$error }"
      >
    </div>
    <div class="mb-3">
      <label for="email">Email*</label>
      <input
        id="email"
        v-model="form.email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': $v.form.email.$error }"
      >
    </div>
    <div class="mb-3">
      <label for="password">Hasło*</label>
      <div class="input-group">
        <input
          id="password"
          v-model="form.password"
          name="new-password"
          autocomplete="new-password"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          :class="{ 'is-invalid': $v.form.password.$error }"
        >
        <div
          class="input-group-apend input-group-text c-pointer"
          @click="showPassword = !showPassword"
        >
          <BaseIcon
            :icon="showPassword ? 'eye-slash-fill' : 'eye-fill'"
            class="c-pointer"
            width="24"
            height="24"
            @click="showPassword = !showPassword"
          />
        </div>
      </div>
    </div>
    <div class="form__links">
      <router-link :to="{ name: 'login' }">
        Zaloguj się
      </router-link>
      <router-link :to="{ name: 'remind-password' }">
        Przypomnij hasło
      </router-link>
    </div>
    <button class="btn btn-primary form__submit">
      Zarejestruj się
    </button>
  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/src/validators';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
      },
      accountCreated: false,
      showPassword: false,
    };
  },
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      birthDate: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        await this.$http.post('/users', this.form);
        this.accountCreated = true;
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
