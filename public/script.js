// Função para carregar e renderizar registros na tabela
function fetchAndRenderItems() {
  fetch('/students')
    .then(response => response.json())
    .then(data => {
      console.log('Dados carregados:', data);
      renderItems(data);
    })
    .catch(error => console.error('Erro ao buscar itens:', error));
}

// Função para renderizar a tabela
function renderItems(items) {
  const tableBody = document.getElementById('itemsTable').querySelector('tbody');
  tableBody.innerHTML = ''; // Limpa as linhas existentes

  items.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td contenteditable="true" data-id="${item.id}" data-property="name">${item.name}</td>
      <td contenteditable="true" data-id="${item.id}" data-property="age">${item.age}</td>
      <td contenteditable="true" data-id="${item.id}" data-property="study">${item.study}</td>
      <td>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Adiciona event listeners para capturar atualizações
  document.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('blur', function () {
      const id = this.dataset.id; // Obtém o ID do atributo data-id
      const property = this.dataset.property; // Nome da propriedade
      const value = this.textContent.trim(); // Remove espaços desnecessários
      updateItem(id, property, value);
    });
  });
}

// Função para atualizar um item
function updateItem(id, property, value) {
  fetch(`/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [property]: value }), // Atualiza apenas o campo alterado
  })
    .then(response => {
      if (response.ok) {
        console.log(`Estudante com ID ${id} atualizado com sucesso.`);
      } else {
        alert('Erro ao atualizar estudante.');
      }
    })
    .catch(error => console.error('Erro ao atualizar estudante:', error));
}

// Função para remover um item
function deleteItem(id) {
  fetch(`/students/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        alert('Estudante removido com sucesso!');
        fetchAndRenderItems(); // Atualiza a tabela
      } else {
        alert('Erro ao remover estudante.');
      }
    })
    .catch(error => console.error('Erro ao remover estudante:', error));
}

// Função para criar um novo item
function createNewItem() {
  const name = document.getElementById('newProp1').value;
  const age = document.getElementById('newProp2').value;
  const study = document.getElementById('newProp3').value;

  fetch('/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, study }),
  })
    .then(response => response.json())
    .then(data => {
      alert('Estudante criado com sucesso!');
      fetchAndRenderItems(); // Atualiza a tabela
    })
    .catch(error => console.error('Erro ao criar estudante:', error));

  // Limpa os campos de entrada
  document.getElementById('newProp1').value = '';
  document.getElementById('newProp2').value = '';
  document.getElementById('newProp3').value = '';
}

// Carrega e renderiza os itens ao iniciar
fetchAndRenderItems();
