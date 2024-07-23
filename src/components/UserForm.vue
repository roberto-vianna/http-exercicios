<script>
export default {
  data() {
    return {
      user: {
        email: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("user-added", this.user);
      this.user = { email: "", first_name: "", last_name: "" }; // Resetar o formulário
    },
  },
};
</script>
<template>
    <b-modal @hide="$emit('close-modal')" title="Adicionar Novo Usuário" visible hide-footer>
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Nome:">
          <b-form-input v-model="user.first_name" placeholder="Digite o nome" required></b-form-input>
        </b-form-group>
        <b-form-group label="Sobrenome:">
          <b-form-input v-model="user.last_name" placeholder="Digite o sobrenome" required></b-form-input>
        </b-form-group>
        <b-form-group label="Email:">
          <b-form-input type="email" v-model="user.email" placeholder="Digite o email" required></b-form-input>
        </b-form-group>

        <div slot="modal-footer" class="w-100 d-flex justify-content-end">
        <b-button @click="$emit('close-modal')" variant="secondary" class="mr-2">Cancelar</b-button>
        <b-button type="submit" class="btn-new-user">Salvar</b-button>
      </div>
      </b-form>
    </b-modal>
  </template>

  <style scoped>
.btn-new-user {
  background-color: rgb(10, 107, 57);
}

.btn-new-user:hover {
  background-color: rgb(60, 110, 68);
}
</style>
