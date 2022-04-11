import {
    crearPregunta,
    agregarPregunta,
    eliminarPregunta
} from './preguntas.js';
import {
    db,
    getDoc,
    doc,
    setDoc
} from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const id_formulario = urlParams.get('id');
document.getElementById('nombreForm').value = id_formulario;

obtenerFormulario();

async function obtenerFormulario() {
    const docRef = doc(db, "formularios", id_formulario);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const dataFormulario = docSnap.data();
        const preguntas = dataFormulario.preguntas;
        preguntas.forEach(pregunta => {
            crearPregunta(pregunta);
        });

    } else {
        console.log("no existe");
    }
}

const editarFormulario = document.getElementById('editar-formulario');

editarFormulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombreForm = document.getElementById('nombreForm').value;
    const preguntas_html = document.getElementsByName('preguntas');
    let preguntas = [];
    preguntas_html.forEach((div, index) => {
        let objetoPregunta = {
            id: index + 1,
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
    await setDoc(doc(db, "formularios", nombreForm), {
            profe: user.nombre,
            preguntas
        })
        .then(() => {
           
            var myModal = new bootstrap.Modal(document.getElementById('modalEditar'), {
                keyboard: false
            })
            myModal.show();
            // window.location.href = "../menuMaestro.html";
        })
        .catch(() => {
            alert("A ocurrido un error");
        })
})

window.agregarPregunta = agregarPregunta;
window.eliminarPregunta = eliminarPregunta;
// console.log(id_formulario);