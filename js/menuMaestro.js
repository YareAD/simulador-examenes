
import { db, collection, query, where, getDocs, getDoc, deleteDoc, doc } from './firebase.js';

obtenerFormularios();
async function obtenerFormularios() {
    var user = JSON.parse(localStorage.getItem('user'));
    const q = query(collection(db, "formularios"), where("profe", "==", user.nombre));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((formulario) => {
        let card = `
        <div class="col-12 col-md-3 mb-2" id="${formulario.id}">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${formulario.id}</h5>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-danger me-1" onclick="eliminarFormulario('${formulario.id}')"><i class="bi bi-trash"></i></button>
                        <button class="btn btn-warning" onclick="editarFormulario('${formulario.id}')"><i class="bi bi-pencil-square"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#menu").append(card);
    });

}

async function eliminarFormulario(id_formulario) {
    await deleteDoc(doc(db, "formularios", id_formulario))
        .then(() => {
            var myModal = new bootstrap.Modal(document.getElementById('modalEliminado'), {
                keyboard: false
            })
            myModal.show();
            $(`#${id_formulario}`).remove();
        })
        .catch(() => {
            alert("ocurrio un error");
        });
}

async function editarFormulario(id_formulario) {
    window.location.href = `/editarForm.html?id=${id_formulario}`
}

window.eliminarFormulario = eliminarFormulario;
window.editarFormulario = editarFormulario;
/* */
