<template>
  <div
    v-if="userIsLogged"
    class="d-flex justify-content-end align-items-center border-bottom p-4"
  >
    <span>
      Użytkownik: <strong v-text="user.email"></strong>
    </span>
    <button
      class="btn btn-outline-primary ml-2"
      @click="logoutUser"
    >
      Wyloguj
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user', 'userIsLogged']),
  },
  methods: {
    ...mapMutations(['setUser']),
    async logoutUser() {
      await this.$http.get('/logout');
      this.setUser(null);
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
