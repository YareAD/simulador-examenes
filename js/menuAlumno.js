import { db, collection, query, where, getDocs, getDoc, deleteDoc, doc, orderBy, serverTimestamp } from './firebase.js';

obtenerFormularios();


async function obtenerFormularios() {
    const q = query(collection(db, "formularios"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (formulario) => {
        const dataFormulario = formulario.data();

        let card = `
        <div class="col-12 col-md-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${formulario.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${dataFormulario.profe}</h6>
                        <p class="card-text">Lee con Atención y Contesta el Siguiente Formulario</p>
                        <div class="d-flex justify-content-between">
                            <a href="contestarForm.html?id-form=${formulario.id}" class="card-link" >CONTESTAR</a>
                            <button class="btn btn-danger" onclick="pdf('${formulario.id}')">PDF</button>
                        </div>
                    </div>
                </div>
        </div>
        `;
        $("#menu").append(card);
    });

}

async function pdf(formulario_id) {
    const user_s = localStorage.getItem('user');
    var user = JSON.parse(user_s);

    const ref = doc(db, "formularios", formulario_id);
    const formulario = await getDoc(ref);
    const dataFormuario = formulario.data();

    const pdf = new jsPDF();
    pdf.setFontSize(10);
    pdf.text(`Nombre del Maestro : ${dataFormuario.profe}`, 10, 20);
    pdf.text(`Nombre del Alumno : ${user.nombre}`, 10, 25);

    pdf.setFontSize(15);
    pdf.text(`${formulario.id}`, 10, 40);


    const q = query(collection(db, "respuestas_alumnos"), orderBy('date', 'asc'), where("formulario", "==", formulario_id), where("nombre_alumno", "==", user.nombre));
    const querySnapshot = await getDocs(q);

    let last_respuesta = null;
    querySnapshot.forEach((doc) => {
        last_respuesta = doc.data().respuestas;
    });

    pdf.setFontSize(10);
    pdf.text(`Numero de intentos : ${querySnapshot.size}`, 10, 45);

    let salto = 5;
    const preguntas = dataFormuario.preguntas.slice(0, 5);
    let numeroAciertos = 0;
    let numeroErrores = 0;
    preguntas.forEach(info_pregunta => {
        const respuestas_formulario = info_pregunta.respuestas;
        pdf.text(`${info_pregunta.pregunta}`, 10, 50 + salto);
        salto += 10;

        const respuesta_alumno = last_respuesta.find(item => item.id == info_pregunta.id);

        if (respuesta_alumno && respuesta_alumno.respuesta == 'a') {
            if (respuesta_alumno.acerto) {
                numeroAciertos++;
                pdf.setTextColor(0, 255, 0);
            } else {
                numeroErrores++;
                pdf.setTextColor(255, 0, 0);
            }
        }
        pdf.text(`(a) ${respuestas_formulario.a}`, 10, 50 + salto);
        pdf.setTextColor(0, 0, 0);
        salto += 5;

        if (respuesta_alumno && respuesta_alumno.respuesta == 'b') {
            if (respuesta_alumno.acerto) {
                numeroAciertos++;
                pdf.setTextColor(0, 255, 0);
            } else {
                numeroErrores++;
                pdf.setTextColor(255, 0, 0);
            }
        }
        pdf.text(`(b) ${respuestas_formulario.b}`, 10, 50 + salto);
        pdf.setTextColor(0, 0, 0);
        salto += 5;

        if (respuesta_alumno && respuesta_alumno.respuesta == 'c') {
            if (respuesta_alumno.acerto) {
                numeroAciertos++;
                pdf.setTextColor(0, 255, 0);
            } else {
                numeroErrores++;
                pdf.setTextColor(255, 0, 0);
            }
        }
        pdf.text(`(c) ${respuestas_formulario.c}`, 10, 50 + salto);
        pdf.setTextColor(0, 0, 0);
        salto += 10;

    });
    salto += 10;
    pdf.text(`Aciertos: ${numeroAciertos}`, 10, 50 + salto);
    salto += 5;
    pdf.text(`Errores: ${numeroErrores}`, 10, 50 + salto);

    window.open(pdf.output('bloburl'))
}

window.pdf = pdf;