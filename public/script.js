// Função para procurar registos na tabela
function fetchAndRenderItems() {
  fetch('/students')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderItems(data);
    })
    .catch(error => console.error('Erro:', error));
}

// Função para renderizar a tabela
function renderItems(items) {
  const tableBody = document.getElementById("itemsTable").querySelector("tbody");
  tableBody.innerHTML = ""; // Limpa as linhas existentes

  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td contenteditable="true" data-property="name">${item.name}</td>
      <td contenteditable="true" data-property="age">${item.age}</td>
      <td contenteditable="true" data-property="study">${item.study}</td>
      <td>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Adiciona event listeners aos campos editáveis para capturar as atualizações
  document.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('blur', function() {
      const id = this.parentElement.firstChild.textContent; // Obtém o ID da linha
      const property = this.dataset.property; // Obtém o nome da propriedade a partir do atributo data
      const value = this.textContent;

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
    body: JSON.stringify({ [property]: value }),
  })
  .then(response => {
    if (response.ok) {
      alert('Estudante atualizado com sucesso!');
      fetchAndRenderItems(); // Atualiza a tabela após a atualização
    } else {
      alert('Erro ao atualizar estudante.');
    }
  })
  .catch(error => console.error('Erro:', error));
}

// Função para remover um item
function deleteItem(id) {
  fetch(`/students/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      alert('Estudante removido com sucesso!');
      fetchAndRenderItems(); // Atualiza a tabela após a remoção
    } else {
      alert('Erro ao remover estudante.');
    }
  })
  .catch(error => console.error('Erro:', error));
}

// Função para criar um novo item
function createNewItem() {
  const name = document.getElementById("newProp1").value;
  const age = document.getElementById("newProp2").value;
  const study = document.getElementById("newProp3").value;

  fetch('/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, study })
  })
  .then(response => response.json())
  .then(data => {
    alert('Estudante criado com sucesso!');
    fetchAndRenderItems(); // Atualiza a tabela
  })
  .catch(error => console.error('Erro:', error));
}

// Carrega e renderiza os itens ao iniciar
fetchAndRenderItems();
