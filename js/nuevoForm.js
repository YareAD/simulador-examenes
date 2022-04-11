import { db, setDoc, getDoc, doc } from './firebase.js';
import { agregarPregunta, eliminarPregunta } from './preguntas.js';

agregarPregunta();
var modalRepetido = new bootstrap.Modal(document.getElementById('nombreRepetido'), {
    keyboard: false
})
const form = document.getElementById('nuevo-formulario');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombreForm = document.getElementById('nombreForm').value;
    const preguntas_html = document.getElementsByName('preguntas');

    const docRef = doc(db, "formularios", nombreForm);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        // alert("Este nombre de formulario ya existe");
       
        modalRepetido.show();
        return;
    }

    let preguntas = [];
    preguntas_html.forEach((div, index) => {
        let objetoPregunta = {
            id:  index + 1,
            pregunta: '',
            respuestas: {
                a: '',
                b: '',
                c: ''
            },
            correcta: 'a'
        }
        const id = div.id;
        const pregunta = document.getElementById(`pregunta-${id}`).value;
        const respuesta_1 = document.getElementById(`respuesta-1-${id}`).value;
        const respuesta_2 = document.getElementById(`respuesta-2-${id}`).value;
        const respuesta_3 = document.getElementById(`respuesta-3-${id}`).value;
        const correcta = document.querySelector(`input[name=nameRespuestas-${id}]:checked`).value;

        objetoPregunta.pregunta = pregunta;
        objetoPregunta.respuestas.a = respuesta_1;
        objetoPregunta.respuestas.b = respuesta_2;
        objetoPregunta.respuestas.c = respuesta_3;
        objetoPregunta.correcta = correcta;

        preguntas.push(objetoPregunta);
    });
    var user = JSON.parse(localStorage.getItem('user'));
    await setDoc(doc(db, "formularios", nombreForm), { profe: user.nombre, preguntas })
        .then(() => {
            var myModal = new bootstrap.Modal(document.getElementById('modalGuardado'), {
                keyboard: false
            })
            myModal.show();
            // window.location.href = "../menuMaestro.html";
        })
        .catch(() => {
            alert("A ocurrido un error");
        })
})

function closeModal(){
    modalRepetido.hide();
}

window.agregarPregunta = agregarPregunta;
window.eliminarPregunta = eliminarPregunta;
window.closeModal = closeModal;