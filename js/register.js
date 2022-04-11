
import { db, setDoc, getDoc, doc } from './firebase.js';

const registrarForm = document.getElementById('registrar-form');
registrarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = registrarForm['nombre-registro'].value;
  const password = registrarForm['password-registro'].value;
  const sexo = registrarForm['sexo'].value;
  const tipo_user = registrarForm['rol-registro'].value;

  const docRef = doc(db, "usuarios", nombre);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    alert('Este nombre de usuario ya ha sido registrado');
    return;
  }
  await setDoc(doc(db, "usuarios", nombre), { nombre, password, sexo, tipo_user })
    .then(() => {
      alert("Usuario Registrado con EXITO !")
      window.location.href = './index.html';
    })
    .catch(() => {
      alert('ocurrio un error')
    })
})