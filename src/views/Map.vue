<template>
  <div class="map-page">
    <div class="mb-3">
      <button class="btn btn-primary mr-2" @click="exportProvinces">
        Export
      </button>
      <button class="btn btn-outline-primary" @click="$refs.fileInput.click()">
        Import
      </button>
      <input
        ref="fileInput"
        type="file"
        class="d-none"
        @change="importProvinces"
      >
    </div>
    <MapSvg @click="onSvgClick" />
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
  .map((x, y) => x + y);

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
    async onSvgClick({ target }) {
      if (target.id?.startsWith('province-')) {
        this.selectedProvinceId = target.id.replace('province-', '');
        await this.$nextTick();
        const modalElement = document.getElementById('exampleModal');
        new Modal(modalElement).show();
        modalElement.addEventListener('shown.bs.modal', () => {
          modalElement.getElementsByTagName('input')[0].focus();
        });
      }
    },
    exportProvinces() {
      const file = new Blob([JSON.stringify(this.provinces)], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = 'provinces.json';

      link.click();
    },
    importProvinces({ target: { files } }) {
      const fileReader = new FileReader();

      fileReader.onload = ({ target: { result } }) => {
        this.provinces = JSON.parse(result);
        alert('Provinces imported!');
      };

      fileReader.readAsText(files[0], 'UTF-8');
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
