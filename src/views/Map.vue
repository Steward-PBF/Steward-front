<template>
  <div class="map-page">
    <div class="mb-3">
      <label for="provinces-string" class="col-form-label">Provinces as string</label>
      <input
        id="provinces-string"
        :value="JSON.stringify(provinces)"
        type="text"
        class="form-control"
        readonly
      >
    </div>
    <MapSvg @click="onClick" />
    <div
      v-if="selectedProvinceId"
      id="exampleModal"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Insert province details
            </h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="country-name" class="col-form-label">Country name:</label>
                <input
                  id="country-name"
                  v-model="provinces[selectedProvinceId].countryName"
                  type="text"
                  class="form-control"
                >
              </div>
              <div class="mb-3">
                <label for="province-name" class="col-form-label">Province name:</label>
                <input
                  id="province-name"
                  v-model="provinces[selectedProvinceId].provinceName"
                  type="text"
                  class="form-control"
                >
              </div>
              <div class="mb-3">
                <label for="characteristics" class="col-form-label">Characteristics:</label>
                <input
                  id="characteristics"
                  :value="provinces[selectedProvinceId].characteristics.join(',')"
                  type="text"
                  class="form-control"
                  multiple
                  @input="provinces[selectedProvinceId].characteristics = $event.target.value.split(',')"
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import MapSvg from '@/assets/world-map/004.svg?inline';

const DEFAULT_PROVINCE = {
  countryName: '',
  provinceName: '',
  characteristics: [],
};

const provincesIds = Array(98)
  .fill(1)
  .map((x, y) => `province-${x + y}`);

const provinces = provincesIds.reduce(
  (acc, id) => ({
    ...acc,
    [id]: { ...DEFAULT_PROVINCE },
  }),
  {},
);

export default {
  name: 'Map',
  components: {
    MapSvg,
  },
  data() {
    return {
      selectedProvinceId: null,
      provinces,
    };
  },
  methods: {
    async onClick({ target }) {
      if (target.id?.startsWith('province-')) {
        this.selectedProvinceId = target.id;
        await this.$nextTick();
        const modalElement = document.getElementById('exampleModal');
        new Modal(modalElement).show();
        modalElement.addEventListener('shown.bs.modal', () => {
          modalElement.getElementsByTagName('input')[0].focus();
        });
      }
    },
  },
};
</script>

<style lang="scss">
.st0 {
  stroke: #FFFFFF;
  stroke-width: 4;
  stroke-miterlimit: 10;
}

.st1 {
  stroke: #FFFFFF;
  stroke-miterlimit: 10;
}

.st2 {
  stroke: #FFFFFF;
  stroke-width: 2;
  stroke-miterlimit: 10;
}

.map-page {
  width: 70%;

  path:hover {
    fill: red;
    cursor: pointer;
  }
}
</style>
