<script>
export default {
  props: {
    user: { // Alterado para "compra"
      type: Object,
      default: () => ({ id: null, descricao: "", nome_cliente: "", valor: "", endereco: "", status: "fiado" }),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formCompra: { ...this.user }, // Alterado para "formCompra"
    };
  },
  methods: {
    submitForm() {
      this.$emit("user-saved", this.formCompra); // Emite o evento com a compra
      this.formCompra = { id: null, descricao: "", nome_cliente: "", valor: "", endereco: "", status: "fiado" }; // Resetar o formulário
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.formCompra = { ...newUser }; // Atualiza o formulário com a compra
      },
    },
  },
};
</script>

<template>
  <b-modal @hide="closeModal" :title="isEditing ? 'Editar Compra' : 'Adicionar Nova Compra'" visible hide-footer>
    <b-form @submit.prevent="submitForm">
      <!-- Campo para Descrição da Compra -->
      <b-form-group>
        <b-form-input v-model="formCompra.descricao" placeholder="Digite a descrição do remédio" required></b-form-input>
      </b-form-group>

      <!-- Campo para Nome do Cliente -->
      <b-form-group class="py-2">
        <b-form-input v-model="formCompra.nome_cliente" placeholder="Digite o nome do cliente" required></b-form-input>
      </b-form-group>

      <!-- Campo para Valor da Compra -->
      <b-form-group>
        <b-form-input type="number" v-model="formCompra.valor" placeholder="Digite o valor" required></b-form-input>
      </b-form-group>

      <!-- Campo para Endereço do Cliente -->
      <b-form-group>
        <b-form-input type="text" v-model="formCompra.endereco" placeholder="Digite o endereço" required></b-form-input>
      </b-form-group>

      <!-- Campo para Status da Compra (Fiado ou Pago) -->
      <b-form-group>
        <p>Selecione o status</p>
        <b-form-select v-model="formCompra.status" required>
          <option value="fiado">Fiado</option>
          <option value="pago">Pago</option>
        </b-form-select>
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
