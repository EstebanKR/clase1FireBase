import { useState, useEffect } from 'react';
import { db } from './fireBaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const usersCollection = collection(db, "users");

  // Obtener usuarios desde Firebase
  const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  // Agregar usuario
  const addUser = async () => {
    if (newName.trim() && newEmail.trim()) {
      await addDoc(usersCollection, { name: newName, email: newEmail });
      setNewName("");
      setNewEmail("");
      getUsers(); // Recargar datos
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    getUsers(); // Recargar datos
  };

  // Seleccionar usuario para editar
  const startEditing = (user) => {
    setEditingUser(user);
    setNewName(user.name);
    setNewEmail(user.email);
  };

  // Actualizar usuario
  const updateUser = async () => {
    if (editingUser) {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name: newName, email: newEmail });
      setEditingUser(null);
      setNewName("");
      setNewEmail("");
      getUsers(); // Recargar datos
    }
  };

  // Cargar usuarios al iniciar
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>CRUD con Firebase y React</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />

      {editingUser ? (
        <button onClick={updateUser}>Actualizar Usuario</button>
      ) : (
        <button onClick={addUser}>Agregar Usuario</button>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <button onClick={() => startEditing(user)}>✏️ Editar</button>
            <button onClick={() => deleteUser(user.id)}>🗑 Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;