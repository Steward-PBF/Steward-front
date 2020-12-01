<template>
  <div
    id="app"
    class="wrapper"
  >
    <TheHeader />
    <h1 class="wrapper__title">
      Steward PBF!
    </h1>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    TheHeader: () => import('./components/TheHeader'),
  },
};
</script>

<style lang="scss">
@import 'styles/main';

.wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 30px;

  &__title {
    text-align: center;
    width: 400px;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 40px;
  }
}
</style>
