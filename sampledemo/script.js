// TODO: this code has to be modified to support API calls
// to get, update, create and delete elements


let items = [
    { id: 1, prop1: "Value 1A", prop2: "Value 1B", prop3: "Value 1C" },
    { id: 2, prop1: "Value 2A", prop2: "Value 2B", prop3: "Value 2C" },
  ];
  
  function renderItems() {
    const tableBody = document.getElementById("itemsTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  

    items.forEach((item, index) => {
      const row = document.createElement("tr");
  
      // TODO or to think. maybe using addEventListener instead of using direct event listeners.
      row.innerHTML = `
        <td>${item.id}</td>
        <td contenteditable="true" oninput="updateItem(${index}, 'prop1', this.innerText)">${item.prop1}</td>
        <td contenteditable="true" oninput="updateItem(${index}, 'prop2', this.innerText)">${item.prop2}</td>
        <td contenteditable="true" oninput="updateItem(${index}, 'prop3', this.innerText)">${item.prop3}</td>
        <td>
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
  }
  
  
  // TODO : every time a resource is created, updated or deleted, 
  // we need to get all from the database 
  // fetch GET
  // and update the table

  function updateItem(index, property, value) {
    // alert("updated");
    // TODO : fetch PUT
    items[index][property] = value;
  }
  
  function deleteItem(index) {
    // TODO : fetch DELETE
    items.splice(index, 1);
    renderItems();
  }
  
  function createNewItem() {
    // TODO : fetch POST
    const newProp1 = document.getElementById("newProp1").value;
    const newProp2 = document.getElementById("newProp2").value;
    const newProp3 = document.getElementById("newProp3").value;
  
    if (!newProp1 || !newProp2 || !newProp3) {
      alert("Please fill in all fields.");
      return;
    }
  
    const newItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      prop1: newProp1,
      prop2: newProp2,
      prop3: newProp3,
    };
    
    items.push(newItem);
    renderItems();
  
    // Clear the input fields
    document.getElementById("newProp1").value = "";
    document.getElementById("newProp2").value = "";
    document.getElementById("newProp3").value = "";
  }
  
  // Initial render
  renderItems();
  