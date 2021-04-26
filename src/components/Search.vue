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
          outlined
          v-model="addressData.city"
          :options="options"
          label="Cidade"
          option-label="nome"
          option-value="nome"
          key="id"
          class="col-md-4 col-xs-12"
          :disable="!addressData.state"
          emit-value
          map-options
          @filter="filterFn"
          @filter-abort="abortFilterFn"
          use-input
        />
        <q-input
          outlined
          :disable="!addressData.city"
          v-model="addressData.street"
          label="Logradouro"
          clearable
          class="col-md-4 col-xs-12"
        />

        <div class="actions col-12">
          <q-btn
            unelevated
            color="secondary"
            label="Limpar resultados"
            @click="clearResults"
          />

          <q-btn
            unelevated
            color="primary"
            label="Buscar"
            @click="searchResults"
          />
        </div>
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
      options: [],
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
            } else if (resp.length === 0 || resp.erro) {
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
            } else if (resp.length === 0 || resp.erro) {
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
      getCities(this.addressData.state).then((resp) => {
        this.cities = resp;
        this.options = this.cities;
      });
    },
    filterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.cities.filter(
          (v) => v.nome.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    abortFilterFn() {
      this.options = this.cities;
    },
  },
};
</script>