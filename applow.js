// example of using lowdb
// see appsample.js for an API prototype

import { JSONFilePreset } from 'lowdb/node';

const defaultData = { users: [] }
const db = await JSONFilePreset('db.json', defaultData)

async function addUser(name, age) {
  await db.read();
  db.data.users.push({ id: db.data.users.length + 1, name, age });  // simple but bad id management
  await db.write();
  console.log(`User ${name} added.`);
}

async function updateUser(id, updatedData) {
  await db.read();
  const user = db.data.users.find((user) => user.id === id);
  if (user) {
    // merge user data with new data
    Object.assign(user, updatedData);
    await db.write();
    console.log(`user with id ${id} updated.`);
  } else {
    console.log(`user with id ${id} not found.`);
  }
}

async function listUsers() {
  await db.read();
  console.log("users:", db.data.users);
}

async function main() {
  await addUser('Alice', 25);
  await addUser('Bob', 30);
  await listUsers();
  await updateUser(1, { age: 60 });
  await listUsers();
}

// test
main()
 .catch((err) => {
     console.error('Error:', err);
   });
