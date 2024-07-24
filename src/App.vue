<script>
import UserList from "./components/UserList.vue";
import UserForm from "./components/UserForm.vue";
import api from "./services/userService.js";

export default {
  components: {
    UserList,
    UserForm,
  },
  data() {
    return {
      messages: [],
      showModal: false,
      users: [],
      selectedUser: { id: null, email: "", first_name: "", last_name: "" },
      isEditing: false,
    };
  },
  methods: {
    openModal(isEditing, user) {
      this.isEditing = isEditing;
      this.selectedUser = { ...user };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveUser(user) {
      if (this.isEditing) {
        api.updateUser(user.id, user).then(() => {
          this.users = this.users.map((u) => (u.id === user.id ? user : u));
          this.messages.push({
            text: "Usuário atualizado com sucesso!",
            type: "success",
          });
        });
      } else {
        api.createUser(user).then((response) => {
          this.users.push(response.data);
          this.messages.push({
            text: "Usuário cadastrado com sucesso!",
            type: "success",
          });
        });
      }
      this.closeModal();
    },
    deleteUser(user) {
      api.deleteUser(user.id).then(() => {
        this.users = this.users.filter((u) => u.id !== user.id);
        this.messages.push({
          text: "Usuário excluído com sucesso!",
          type: "success",
        });
      });
    },
    listUsers() {
      api.getUsers(1).then((response) => {
        this.users = response.data.data;
      });
    },
  },
  created() {
    this.listUsers();
  },
};
</script>

<template>
  <div id="app" class="container">
    <h1>Gerenciamento de Usuários</h1>
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
    <UserList :users="users" @add-user="openModal(false)" @edit-user="openModal(true, $event)" @delete-user="deleteUser" />
    <UserForm v-if="showModal" :user="selectedUser" :isEditing="isEditing" @close-modal="closeModal" @user-saved="saveUser" />
  </div>
</template>


<style scoped>
h1 {
  text-align: center;
  color: rgb(10, 107, 57);
}
.floating-alert {
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1050;
  width: 350px;
}
</style>
