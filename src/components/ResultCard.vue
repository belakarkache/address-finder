<template>
  <div class="result-card shadow-2">
    <h4>{{ location.localidade }} - {{ location.uf }}</h4>
    <q-separator />
    <q-list separator>
      <q-item>
        <q-item-section>
          <q-item-label overline>CÓDIGO POSTAL</q-item-label>
          <q-item-label>{{ location.cep }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label overline>BAIRRO</q-item-label>
          <q-item-label>{{ location.bairro }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label overline>ENDEREÇO</q-item-label>
          <q-item-label
            >{{ location.logradouro }} {{ location.complemento }}</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label overline>CÓDIGO IBGE</q-item-label>
          <q-item-label>{{ location.ibge }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "ResultCard",
  props: ["location"],
};
</script>