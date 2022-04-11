import { db, getDoc, doc, setDoc, addDoc, collection,serverTimestamp } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const id_formulario = urlParams.get('id-form');

const user_s = localStorage.getItem('user');
const user = JSON.parse(user_s);

document.getElementById('nombreAlumno').value = user.nombre;

preguntas();
var respuestas_correctas = [];
async function preguntas() {
    const docRef = doc(db, "formularios", id_formulario);
    const docSnap = await getDoc(docRef);
    const dataFormulario = docSnap.data();
    const preguntas = dataFormulario.preguntas.slice(0,5);

    preguntas.forEach(item => {
        const respuestas = item.respuestas;
        respuestas_correctas.push({ id: item.id, correcta: item.correcta });
        let contenido = `
                <div class="mb-3">
                        <input class="form-control" type="text" value="${item.pregunta}" id="pregunta-${item.id}"  disabled readonly>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" name="gridRadios-${item.id}" id="gridRadios-1-${item.id}" value="a">
                            <label class="form-check-label" for="gridRadios-1-${item.id}">
                                ${respuestas.a}
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios-${item.id}" id="gridRadios-2-${item.id}" value="b">
                            <label class="form-check-label" for="gridRadios-2-${item.id}">
                                ${respuestas.b}
                            </label>
                        </div>
                        <div class="form-check disabled">
                            <input class="form-check-input" type="radio" name="gridRadios-${item.id}" id="gridRadios-3-${item.id}" value="c">
                            <label class="form-check-label" for="gridRadios-3-${item.id}">
                                ${respuestas.c}
                            </label>
                        </div>
                </div>
        `;
        $("#preguntas").append(contenido);
    });
}

async function finalizar() {
    let validacion = false;
    let respuestas_alumno = [];
    respuestas_correctas.forEach(rc => {
        var pregunta = document.querySelector(`input[name="gridRadios-${rc.id}"]:checked`);
        if (pregunta == null) {
            validacion = true;
            return;
        } else {
            respuestas_alumno.push({ id: rc.id, respuesta: pregunta.value, acerto: pregunta.value == rc.correcta });
        }
    })

    if (validacion) {
        alert("No has contestado todas las preguntas")
    } else {
        document.getElementById('aciertos').textContent += respuestas_alumno.filter((item) => item.acerto).length;
        document.getElementById('errores').textContent += respuestas_alumno.filter((item) => !item.acerto).length;

        await addDoc(collection(db, "respuestas_alumnos"), {
            formulario: id_formulario,
            nombre_alumno: user.nombre,
            respuestas: respuestas_alumno,
            date:serverTimestamp()
        })
            .then((result) => {
                var myModal = new bootstrap.Modal(document.getElementById('modalResultados'), {
                    keyboard: false
                })
                myModal.show();
            })

    }

}

window.finalizar = finalizar;

