<template>
  <div>
    <b-card>
      <div class="d-flex justify-content-end mb-3">
        <b-button @click="$emit('add-user')" size="lg" class="btn-new-user">Nova Compra</b-button>
      </div>
      <b-table hover :items="users" :fields="fields">
        <template slot="cell(status)" slot-scope="data">
          <span
            :class="{
              'bg-success text-white': data.item.status === 'pago',
              'bg-danger text-white': data.item.status === 'fiado'
            }"
            class="px-2 py-1 rounded"
          >
            {{ data.item.status }}
          </span>
        </template>

        <template slot="cell(actions)" slot-scope="data">
          <b-button size="sm" variant="warning" @click="$emit('edit-user', data.item)">
            <i class="bi bi-pencil"></i>
          </b-button>
          <b-button size="sm" variant="danger" class="ml-2" @click="$emit('delete-user', data.item)">
            <i class="bi bi-trash"></i>
          </b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

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
        { key: "descricao", label: "Descrição" },
        { key: "nome_cliente", label: "Nome do Cliente" },
        { key: "valor", label: "Valor" },
        { key: "endereco", label: "Endereço" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Ações" },
      ],
    };
  },
};
</script>
<style scoped>
.btn-new-user {
  background-color: rgb(10, 107, 57);
}

.btn-new-user:hover {
  background-color: rgb(60, 110, 68);
}
</style>