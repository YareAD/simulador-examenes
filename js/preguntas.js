
let num_pregunta = 0;
function agregarPregunta() {
    crearPregunta();
}

function crearPregunta(pregunta = { pregunta: '', respuestas: { a: '', b: '', c: '' }, correcta: 'a' }) {
    num_pregunta++;
    let contenido = `
    <div name="preguntas" class="mb-4 position-relative  border border-1 border-primary p-4 rounded-2" id="${num_pregunta}">
            <button type="button" class="btn btn-danger btn-delete-pregunta" onclick="eliminarPregunta(${num_pregunta})"><i class="bi bi-trash"></i></button>
            <label for="pregunta-${num_pregunta}" class="form-label">Escribe la Pregunta</label>
            <input type="text" class="form-control mb-4" placeholder="¿Qué es un Hipervínculo?" value="${pregunta.pregunta}"  id="pregunta-${num_pregunta}" required>
            <h6>Escribe las posibles respuestas y selecciona la correcta</h6>

            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input" type="radio" name="nameRespuestas-${num_pregunta}" value="a" id="a-${num_pregunta}">
                </div>
                <input type="text" class="form-control" placeholder="Opción 1" id="respuesta-1-${num_pregunta}" value="${pregunta.respuestas.a}" required>
            </div>

            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input" type="radio" name="nameRespuestas-${num_pregunta}" value="b"  id="b-${num_pregunta}">
                </div>
                <input type="text" class="form-control" placeholder="Opción 2" id="respuesta-2-${num_pregunta}" value="${pregunta.respuestas.b}" required>
            </div>

            <div class="input-group">
                <div class="input-group-text">
                <input class="form-check-input" type="radio" name="nameRespuestas-${num_pregunta}" value="c" id="c-${num_pregunta}">
                </div>
                <input type="text" class="form-control" placeholder="Opción 3" id="respuesta-3-${num_pregunta}" value="${pregunta.respuestas.c}" required>
            </div>
    </div>
    `
    $("#preguntas").append(contenido);

    switch (pregunta.correcta) {
        case 'a':
            document.getElementById(`a-${num_pregunta}`).checked = true;
            break;
        case 'b':
            document.getElementById(`b-${num_pregunta}`).checked = true;
            break;
        case 'c':
            document.getElementById(`c-${num_pregunta}`).checked = true;
            break;
        default:
            document.getElementById(`a-${num_pregunta}`).checked = true;
            break;
    }
}

function eliminarPregunta(num_pregunta) {
    $(`#${num_pregunta}`).remove();
}

export {
    agregarPregunta,
    eliminarPregunta,
    crearPregunta
}