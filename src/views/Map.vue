<template>
  <div class="map-page">
    <MapSvg />
  </div>
</template>

<script>
import MapSvg from '@/assets/world-map/003.svg?inline';

export default {
  name: 'Map',
  components: {
    MapSvg,
  },
};
</script>

<style lang="scss">
.cls-1, .cls-2, .cls-3 {
  stroke: #fff;
  stroke-miterlimit: 10;
}

.cls-1 {
  stroke-width: 4px;
}

.cls-3 {
  stroke-width: 2px;
}

.map-page {
  width: 70%;

  path:hover {
    fill: red
  }
}
</style>
