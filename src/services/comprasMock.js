let comprasMock = [
  { id: 1, descricao: 'Paracetamol ', nome_cliente: 'João Silva', valor: 14.00, endereco: 'Rua A, 123', status: 'fiado' },
  { id: 2, descricao: 'Ibuprofeno', nome_cliente: 'Maria Souza', valor: 27.00, endereco: 'Rua B, 456', status: 'pago' },
  { id: 3, descricao: 'Amoxicilina 500 mg', nome_cliente: 'Pedro Alves', valor: 23.00, endereco: 'Rua C, 789', status: 'fiado' }
];

export default {
  getCompras() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(comprasMock);
      }, 500); 
    });
  },
  createCompra(compra) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const novoId = comprasMock.length ? Math.max(...comprasMock.map(c => c.id)) + 1 : 1;
        compra.id = novoId;
        comprasMock.push(compra);
        resolve(compra); 
      }, 500);
    });
  },
  deleteCompra(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        comprasMock = comprasMock.filter(c => c.id !== id);
        resolve({ message: 'Compra excluída com sucesso!' });
      }, 500);
    });
  },
  updateCompra(id, compraAtualizada) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = comprasMock.findIndex(c => c.id === id);
        if (index !== -1) {
          comprasMock[index] = { id, ...compraAtualizada };
          resolve(comprasMock[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  }
};
