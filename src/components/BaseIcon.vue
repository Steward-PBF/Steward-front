<template>
  <svg class="bi" fill="currentColor">
    <use :xlink:href="`/bootstrap-icons.svg#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
