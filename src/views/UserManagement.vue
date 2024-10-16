<template>
  <div id="app" class="container">
    <h1>Gerenciamento de Compras</h1>
    <div class="floating-alert">
      <b-alert 
        v-for="(message, index) in messages" 
        :key="index" 
        :variant="message.type"
        show dismissible
      >
        {{ message.text }}
      </b-alert>
    </div>
    <UserList 
      :users="compras" 
      @add-user="openModal(false)" 
      @edit-user="openModal(true, $event)" 
      @delete-user="deleteCompra" 
    />
    <UserForm 
      v-if="showModal" 
      :user="selectedCompra" 
      :isEditing="isEditing" 
      @close-modal="closeModal" 
      @user-saved="saveCompra" 
    />
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
import UserForm from "../components/UserForm.vue";
import api from "../services/comprasMock"; 

export default {
  components: {
    UserList,
    UserForm,
  },
  data() {
    return {
      messages: [],
      showModal: false,
      compras: [],
      selectedCompra: { 
        id: null, 
        descricao: "", 
        nome_cliente: "", 
        valor: "", 
        endereco: "", 
        status: "fiado" 
      },
      isEditing: false,
    };
  },
  methods: {
    openModal(isEditing, compra) {
      this.isEditing = isEditing;
      this.selectedCompra = { ...compra };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveCompra(compra) {
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      if (this.isEditing) {
        api.updateCompra(compra.id, compra).then(() => {
          this.compras = this.compras.map((c) => (c.id === compra.id ? compra : c));
          this.messages.push({
            text: "Compra atualizada com sucesso!",
            type: "success",
          });
          this.isSubmitting = false;
          this.closeModal();
        });
      } else {
        api.createCompra(compra).then(() => {
          this.listCompras();
          this.messages.push({
            text: "Compra cadastrada com sucesso!",
            type: "success",
          });
          this.isSubmitting = false; 
          this.closeModal();
        });
      }
    },

    deleteCompra(compra) {
      api.deleteCompra(compra.id).then(() => {
        this.compras = this.compras.filter((c) => c.id !== compra.id);
        this.messages.push({
          text: "Compra excluída com sucesso!",
          type: "success",
        });
      });
    },
    listCompras() {
      api.getCompras().then((response) => {
        this.compras = response;
      });
    },
  },
  created() {
    this.listCompras();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: rgb(10, 107, 57);
}
.floating-alert {
  position: fixed;
  bottom: 10px;
  z-index: 1050;
  width: 350px;
  right: 500px;
}
</style>
