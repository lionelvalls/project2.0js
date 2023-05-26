const nombre = document.querySelector('.nombre');
const numero = document.querySelector('.numero');
const direccion = document.querySelector('.direccion');
const btnAgregarContacto = document.querySelector('.btn-agregar-contacto');

const listadoContactos = document.querySelector('.listado-contactos');

const db = window.localStorage;

actualizarLocalStorage(db, listadoContactos);

btnAgregarContacto.onclick = () => {
    let contacto = {
        id: Math.round(Math.random() * 99) + 1,
        nombre: nombre.value,
        numero: numero.value,
        direccion: direccion.value,
    };
    agregarContacto(db, contacto, listadoContactos);
};