
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({ id: null, email: "", first_name: "", last_name: "" }),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formUser: { ...this.user },
    };
  },
  methods: {
    submitForm() {
      this.$emit("user-saved", this.formUser);
      this.formUser = { id: null, email: "", first_name: "", last_name: "" }; // Resetar o formulário
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.formUser = { ...newUser };
      },
    },
  },
};
</script>
<template>
  <b-modal @hide="closeModal" :title="isEditing ? 'Editar Usuário' : 'Adicionar Novo Usuário'" visible hide-footer>
    <b-form @submit.prevent="submitForm">
      <b-form-group>
        <b-form-input v-model="formUser.first_name" placeholder="Digite o nome" required></b-form-input>
      </b-form-group>
      <b-form-group class="py-2">
        <b-form-input v-model="formUser.last_name" placeholder="Digite o sobrenome" required></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input type="email" v-model="formUser.email" placeholder="Digite o email" required></b-form-input>
      </b-form-group>

      <div slot="modal-footer" class="w-100 d-flex justify-content-end">
        <b-button @click="closeModal" variant="secondary" class="mr-2">Cancelar</b-button>
        <b-button type="submit" class="btn-new-user">{{ isEditing ? 'Salvar Alterações' : 'Adicionar' }}</b-button>
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
