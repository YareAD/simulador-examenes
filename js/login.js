
import { db, getDoc, doc } from './firebase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = loginForm['nameUser'].value;
    const password = loginForm['password'].value;

    const docRef = doc(db, "usuarios", name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.password == password) {
            localStorage.setItem('user',JSON.stringify(data));
            if (data.tipo_user == "Alumno") {
                window.location.href = "./menuAlumno.html";
            } else {
                window.location.href = "./menuMaestro.html";
            }
        } else {
            alert('El nombre de usuario o contraseña no coinciden')
        }
    } else {
        alert('El nombre de usuario o contraseña no coinciden')
    }

})