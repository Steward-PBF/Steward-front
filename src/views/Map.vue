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
      id="exampleModal"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Insert details for province (ID: {{ selectedProvinceId }})
            </h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="country-name" class="col-form-label">Country name:</label>
                <input
                  id="country-name"
                  v-model="form.countryName"
                  type="text"
                  class="form-control"
                >
              </div>
              <div class="mb-3">
                <label for="province-name" class="col-form-label">Province name:</label>
                <input
                  id="province-name"
                  v-model="form.provinceName"
                  type="text"
                  class="form-control"
                >
              </div>
              <div class="mb-3">
                <label for="characteristics" class="col-form-label">Characteristics:</label>
                <input
                  id="characteristics"
                  :value="form.characteristics.join(',')"
                  type="text"
                  class="form-control"
                  multiple
                  @input="form.characteristics = $event.target.value.split(',')"
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal, Tooltip } from 'bootstrap';
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

const getProvinceDesc = ({ provinceName, countryName, characteristics }) => `
  Country: <b>${countryName}</b> </br>
  Province: ${provinceName} </br>
  Characteristics: ${characteristics}
`;

export default {
  name: 'Map',
  components: {
    MapSvg,
  },
  data() {
    return {
      selectedProvinceId: null,
      provinces,
      form: { ...DEFAULT_PROVINCE },
    };
  },
  mounted() {
    this.setTooltips();
  },
  methods: {
    createTooltipForElement(element) {
      return new Tooltip(element, {
        title: getProvinceDesc(this.provinces[element.id]),
        html: true,
      });
    },
    save() {
      this.provinces[this.selectedProvinceId] = { ...this.form };
      this.createTooltipForElement(document.getElementById(this.selectedProvinceId));
    },
    setTooltips() {
      [...document.getElementsByTagName('path')].map(this.createTooltipForElement);
    },
    async onSvgClick({ target: { id } }) {
      if (id) {
        this.form = { ...this.provinces[id] };
        this.selectedProvinceId = id;

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
        this.setTooltips();
        alert('Provinces imported!');
      };

      fileReader.readAsText(files[0], 'UTF-8');
    },
  },
};
</script>

<style lang="scss">
.map-page {
  width: 70%;

  svg {
    background-color: #0f79a6;
  }

  .first-layer {
    fill: #fff;
  }

  path {
    stroke: #000;
    stroke-width: 4;
    stroke-miterlimit: 10;

    &:hover {
      fill: red;
      cursor: pointer;
    }
  }
}
</style>
