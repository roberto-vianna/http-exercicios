
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
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addUser(user) {
      api
        .createUser(user)
        .then((response) => {
          this.users.push(response.data);
          this.closeModal();
          this.messages.push({
            text: "Usuário cadastrado com sucesso!",
            type: "success",
          });
        })
        .catch((error) => {
          this.messages.push({
            text: "Erro ao cadastrar usuário!",
            type: "danger",
          });
        });
    },
    listUsers() {
      api.getUsers().then((response) => {
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
    <div v-if="messages.length" class="floating-alert">
      <b-alert 
        v-for="(message, index) in messages" 
        :key="index" 
        :variant="message.type"
        show dismissible
      >
        {{ message.text }}
      </b-alert>
    </div>
    <UserList :users="users" @add-user="openModal" />
    <UserForm v-if="showModal" @close-modal="closeModal" @user-added="addUser" />
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
