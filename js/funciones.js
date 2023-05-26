const actualizarLocalStorage = (db, parentNode) => {
    loaderVisible(true)
    listadoVisible(false)
    obtenerContacto.then(contactos => {
        listadoVisible(true)
        loaderVisible(false)
        for (let contacto of contactos) {
            crearContacto(parentNode, contacto, db);
        }
    })
}

const loaderVisible = (visible) => {
    if (visible) {
        document.getElementById("loader").style.display = "inline-block";
    } else {
        document.getElementById("loader").style.display = "none";
    }
}

const listadoVisible = (visible) => {
    if (visible) {
        var btnAgregarContacto = document.getElementById('btn-agregar-contacto');
        btnAgregarContacto.style.display = null;
    } else {
        document.getElementById("btn-agregar-contacto").style.display = "none";
    }
}

const obtenerContacto = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(JSON.parse(db.getItem('contactos')) || [])
    }, 1000);
});

const crearContacto = (parentNode, contacto, db) => {
    let divContacto = document.createElement('div');
    let nombreContacto = document.createElement('h3');
    let numeroContacto = document.createElement('p');
    let direccionContacto = document.createElement('p');
    let iconoBorrar = document.createElement('span');

    nombreContacto.innerHTML = contacto.nombre;
    numeroContacto.innerHTML = contacto.numero;
    direccionContacto.innerHTML = contacto.direccion;
    iconoBorrar.innerHTML = 'delete_forever';

    divContacto.classList.add('contacto');
    iconoBorrar.classList.add('material-icons', 'icono');

    iconoBorrar.onclick = () => {
        const contactos = JSON.parse(db.getItem('contactos')) || [];
        const nuevosContactos = contactos.filter((c) => c.id !== contacto.id);
        db.setItem('contactos', JSON.stringify(nuevosContactos));
        parentNode.removeChild(divContacto);
    };

    divContacto.appendChild(nombreContacto);
    divContacto.appendChild(numeroContacto);
    divContacto.appendChild(direccionContacto);
    divContacto.appendChild(iconoBorrar);

    parentNode.appendChild(divContacto);
};

const agregarContacto = (db, contacto, parentNode) => {
    const contactos = JSON.parse(db.getItem('contactos')) || [];
    contactos.push(contacto);
    db.setItem('contactos', JSON.stringify(contactos));
    crearContacto(parentNode, contacto, db);
};