<template>
  <div>
    <div class="search shadow-4">
      <div class="search__header">
        <h4 class="search__header-title">Buscar endereços</h4>
        <small
          >*Para fazer a busca por logradouro, selecione uma UF e uma
          cidade</small
        >
      </div>
      <div class="search__form row">
        <q-input
          outlined
          v-model="addressData.zipcode"
          label="Código Postal"
          mask="#####-###"
          clearable
          class="col-md-2 col-xs-12"
        />
        <p style="padding: 20px 10px">ou</p>
        <q-select
          clearable
          outlined
          v-model="addressData.state"
          :options="states"
          label="UF"
          option-label="sigla"
          option-value="sigla"
          class="col-md-2 col-xs-12"
          emit-value
          map-options
          @input="getCitiesList"
        />
        <q-select
          clearable
          outlined
          v-model="addressData.city"
          :options="cities"
          label="Cidade"
          option-label="nome"
          option-value="nome"
          key="id"
          class="col-md-2 col-xs-12"
          :disable="!addressData.state"
          emit-value
          map-options
        />
        <q-input
          outlined
          :disable="!addressData.city"
          v-model="addressData.street"
          label="Logradouro"
          clearable
          class="col-md-3 col-xs-12"
        />
        <span class="col-md-2 col-xs-12">
          <q-btn
            unelevated
            round
            color="secondary"
            icon="fas fa-times"
            @click="clearResults"
          />
          <q-btn
            unelevated
            round
            color="primary"
            icon="fas fa-search"
            @click="searchResults"
          />
        </span>
      </div>
    </div>

    <div class="display-results">
      <span v-for="(location, index) in results" :key="index">
        <ResultCard :location="location" />
      </span>
    </div>
  </div>
</template>

<script>
import ResultCard from "./ResultCard";
import {
  getStates,
  getCities,
  getResultsByAddress,
  getResultsByCEP,
} from "../services/service";

export default {
  name: "Search",
  components: {
    ResultCard,
  },
  data() {
    return {
      addressData: {
        state: "",
        city: "",
        zipcode: "",
        street: "",
      },
      results: [],
      states: [],
      cities: [],
    };
  },
  mounted() {
    getStates.then((resp) => (this.states = resp));
  },
  watch: {
    results: function (val) {
      if (val.length === 0) {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("results-modifier");
      } else {
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("results-modifier");
      }
    },
  },
  methods: {
    searchResults() {
      if (this.addressData.zipcode) {
        getResultsByCEP(this.addressData)
          .then((resp) => {
            const isArray = Array.isArray(resp);
            if (resp.length > 0) {
              this.results = resp;
            } else if (!resp || resp.erro) {
              this.$q.notify({
                message: "Não foram encontrados resultados para a busca",
                color: "negative",
                position: "top",
                closeBtn: "✖",
                icon: "fas fa-exclamation-circle",
              });
            } else if (!isArray) {
              this.results.push(resp);
            }
          })
          .catch(() =>
            this.$q.notify({
              message: "Não foram encontrados resultados para a busca",
              color: "negative",
              position: "top",
              closeBtn: "✖",
              icon: "fas fa-exclamation-circle",
            })
          );
      } else {
        getResultsByAddress(this.addressData)
          .then((resp) => {
            const isArray = Array.isArray(resp);
            if (resp.length > 0) {
              this.results = resp;
            } else if (!resp || resp.erro) {
              this.$q.notify({
                message: "Não foram encontrados resultados para a busca",
                color: "negative",
                position: "top",
                closeBtn: "✖",
                icon: "fas fa-exclamation-circle",
              });
            } else if (!isArray) {
              this.results.push(resp);
            }
          })
          .catch(() =>
            this.$q.notify({
              message: "Não foram encontrados resultados para a busca",
              color: "negative",
              position: "top",
              closeBtn: "✖",
              icon: "fas fa-exclamation-circle",
            })
          );
      }
    },
    clearResults() {
      this.results = [];
      this.addressData = {
        state: "",
        city: "",
        zipcode: "",
        street: "",
      };
    },
    getCitiesList() {
      getCities(this.addressData.state).then((resp) => (this.cities = resp));
    },
  },
};
</script>