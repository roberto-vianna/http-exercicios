<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "id", label: "ID" },
        { key: "first_name", label: "Nome" },
        { key: "last_name", label: "Sobrenome" },
        { key: "email", label: "Email" },
      ],
    };
  },
};
</script>
<template>
    <div>
      <b-card>
        <div class="d-flex justify-content-end mb-3">
      <b-button @click="$emit('add-user')" size="lg" class="btn-new-user">Novo Usuário</b-button>
    </div>
      <b-table  hover :items="users" :fields="fields">
    </b-table>
      </b-card>
  
    </div>
  </template>

<style scoped>
.btn-new-user {
  background-color: rgb(10, 107, 57);
}

.btn-new-user:hover {
  background-color: rgb(60, 110, 68);
}
</style>
