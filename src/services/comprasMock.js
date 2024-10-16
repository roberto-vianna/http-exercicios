// Defina comprasMock no escopo global do serviço
let comprasMock = [
  { id: 1, descricao: 'Paracetamol ', nome_cliente: 'João Silva', valor: 14.00, endereco: 'Rua A, 123', status: 'fiado' },
  { id: 2, descricao: 'Ibuprofeno', nome_cliente: 'Maria Souza', valor: 27.00, endereco: 'Rua B, 456', status: 'pago' },
  { id: 3, descricao: 'Amoxicilina 500 mg', nome_cliente: 'Pedro Alves', valor: 23.00, endereco: 'Rua C, 789', status: 'fiado' }
];

export default {
  // Simulação para listar as compras
  getCompras() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(comprasMock);
      }, 500); // Simula um pequeno delay para dar realismo
    });
  },

  // Simulação para cadastrar uma nova compra
  createCompra(compra) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Gera um ID incrementando o maior ID existente
        const novoId = comprasMock.length ? Math.max(...comprasMock.map(c => c.id)) + 1 : 1;
        compra.id = novoId; // Atribui o novo ID à compra

        comprasMock.push(compra); // Adiciona a compra ao array de mock
        resolve(compra); // Retorna a compra criada
      }, 500);
    });
  },

  // Simulação para deletar uma compra
  deleteCompra(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        comprasMock = comprasMock.filter(c => c.id !== id);
        resolve({ message: 'Compra excluída com sucesso!' });
      }, 500);
    });
  },

  // Simulação para editar uma compra existente
  updateCompra(id, compraAtualizada) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = comprasMock.findIndex(c => c.id === id);
        if (index !== -1) {
          comprasMock[index] = { id, ...compraAtualizada };
          resolve(comprasMock[index]);
        } else {
          resolve(null); // Caso a compra não seja encontrada
        }
      }, 500);
    });
  }
};
