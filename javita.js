const template = document.createElement('template');
template.innerHTML = `
<style>
    :root {
        --bg-soft: #f4f7f6;
        --white-pure: #ffffff;
        --text-main: #2b2a2c;
        --text-muted: #8e8d91;
        --pastel-pink: #fbc4d0;
        --pastel-blue: #c0e6ec;
        --pastel-yellow: #fdeca6;
        --pastel-purple: #dcd3f1;
        --border-radius-lg: 28px;
        --border-radius-sm: 18px;
        --shadow-soft: 0 10px 25px rgba(160, 175, 185, 0.12);
    }

    .Tarjetaruta {
        background-color: var(--white-pure);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-soft);
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 2px solid transparent;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }

    .Tarjetaruta:hover {
        transform: translateY(-6px);
        box-shadow: 0 15px 30px rgba(251, 196, 208, 0.25);
        border-color: rgba(251, 196, 208, 0.5);
    }

    .Tarjetaruta::before {
        content: '';
        position: absolute;
        left: 0;
        top: 35px;
        bottom: 35px;
        width: 6px;
        border-radius: 0 8px 8px 0;
    }
    .Tarjetaruta.bus-1::before { background-color: #ff6b8b; }
    .Tarjetaruta.bus-2::before { background-color: #4ea8de; }
    .Tarjetaruta.bus-3::before { background-color: #ffd166; }
    .Tarjetaruta.bus-4::before { background-color: #06d6a0; }

    .Tarjetarutaencabezado {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
    }

    .Rutainfo h3 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text-main);
    }

    .Conductor {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .Clima {
        background-color: #e0f2fe;
        color: #0369a1;
        padding: 8px 14px;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .Rutadatos {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    }

    .Datocajita {
        background-color: #f5f6f8;
        padding: 6px 14px;
        border-radius: var(--border-radius-sm);
        font-size: 0.85rem;
        color: var(--text-main);
        font-weight: 500;
    }

    .CajitaEstudiantes {
        background-color: #f9fafb;
        border-radius: var(--border-radius-sm);
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .TituloEstudiantes {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .ListaEstudiantes {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .Estudiantito {
        display: inline-flex;
        align-items: center;
        background-color: #fafbfc;
        border: 1px solid #ebf0ee;
        padding: 6px 12px;
        border-radius: 50px;
        font-size: 0.8rem;
        font-weight: 500;
        color: #4a494b;
        box-shadow: 0 2px 6px rgba(160, 175, 185, 0.04);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .Estudiantito:hover {
        background-color: #fff0f3;
        border-color: var(--pastel-pink);
        transform: scale(1.05);
        box-shadow: 0 4px 10px rgba(251, 196, 208, 0.3);
    }

    .eliminar-estudiante {
        margin-left: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-muted);
        transition: all 0.2s ease;
    }

    .Estudiantito:hover .eliminar-estudiante {
        color: #ff6b8b;
        transform: scale(1.2);
    }

    .Btn-gestionar {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
        gap: 8px;
    }

    .botonGestionar {
        background-color: transparent;
        border: none;
        color: var(--text-muted);
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 10px;
        transition: all 0.2s ease;
    }
    .botonGestionar:hover {
        color: #ff6b8b;
        background-color: #fff0f3;
    }
    .botonEditar {
        color: #4ea8de;
    }
    .botonEditar:hover {
        background-color: #e0f2fe;
        color: #0369a1;
    }
</style>
<div class="Tarjetaruta">
    <div class="Tarjetarutaencabezado">
        <div class="Rutainfo">
            <h3></h3>
            <div class="Conductor"></div>
        </div>
        <div class="Clima">🌤️ Cargando...</div>
    </div>
                
    <div class="Rutadatos">
        <span class="Datocajita class-hora"></span>
        <span class="Datocajita class-capacidad"></span>
    </div>

    <div class="CajitaEstudiantes">
        <span class="TituloEstudiantes">Alumnos a bordo</span>
        <div class="ListaEstudiantes"></div>
    </div>

    <div class="Btn-gestionar">
        <button class="botonGestionar botonEditar">EDITAR RUTA</button>
        <button class="botonGestionar btnEliminarRuta">ELIMINAR RUTA</button>
    </div>
</div>
`;
class RouteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const idRuta = this.getAttribute("id-ruta") || "";
        const titulo = this.getAttribute("Titulo") || "Ruta General";
        const conductor = this.getAttribute("Conductor") || "Sin asignar";
        const hora = this.getAttribute("Hora") || "--:--";
        const clima = this.getAttribute("Clima") || "🌤️ --°C";
        const claseBus = this.getAttribute("clase-bus") || "bus-1";
        const estudiantesAtributo = this.getAttribute("estudiantes") || "";

        const tarjeta = this.shadowRoot.querySelector(".Tarjetaruta");
        if (tarjeta) tarjeta.className = `Tarjetaruta ${claseBus}`;
        this.shadowRoot.querySelector(".Rutainfo h3").textContent = titulo;
        this.shadowRoot.querySelector(".Conductor").textContent = `👤 Conductor: ${conductor}`;
        this.shadowRoot.querySelector(".Clima").textContent = clima;
        this.shadowRoot.querySelector(".class-hora").textContent = `⏰ Salida: ${hora}`;

        const contenedorEstudiantes = this.shadowRoot.querySelector(".ListaEstudiantes");
        if (contenedorEstudiantes) {contenedorEstudiantes.innerHTML = "";
            if (estudiantesAtributo.trim() !== "") {
                const listaAlumnos = estudiantesAtributo.split(",");
                listaAlumnos.forEach(nombre => {
                    const btnEstudiante = document.createElement("button");
                    btnEstudiante.type = "button";
                    btnEstudiante.className = "Estudiantito";
                    btnEstudiante.innerHTML = `${nombre} <span class="eliminar-estudiante">×</span>`;
                    
                    btnEstudiante.querySelector(".eliminar-estudiante").addEventListener('click', (e) => {
                        e.stopPropagation();
                        const eventoBorrarEstudiante = new CustomEvent('alumnoEliminado', {
                            detail: { nombreAlumno: nombre, idRuta: idRuta },
                            bubbles: true,
                            composed: true 
                        });
                        this.dispatchEvent(eventoBorrarEstudiante);
                    });

                    // Evento para editar un estudiante directamente al hacer click sobre su tag
                    btnEstudiante.addEventListener('click', (e) => {
                        if(e.target.className !== "eliminar-estudiante") {
                            const nuevoNombre = prompt(`🌸 EDITA EL NOMBRE DEL ESTUDIANTE:`);
                            if (nuevoNombre === null) return;
                                if (nuevoNombre.trim() === "" || !isNaN(nuevoNombre)) {
                                    alert("Error: Debes ingresar un nombre válido.");
                                    return;
                                }
                            const eventoEditarEstudiante = new CustomEvent('alumnoEditado', {
                                detail: { nombreViejo: nombre, nombreNuevo: `${iconoActual} ${nuevoNombre.trim()}`, idRuta: idRuta },
                                bubbles: true,
                                composed: true
                            });
                            this.dispatchEvent(eventoEditarEstudiante);
                        }
                    });
                    contenedorEstudiantes.appendChild(btnEstudiante);
                });
            }
        }

        const totalAlumnos = estudiantesAtributo.trim() !== "" ? estudiantesAtributo.split(",").length : 0;
        this.shadowRoot.querySelector(".class-capacidad").textContent = `CAPACIDAD: ${totalAlumnos}/10`;

        
        this.shadowRoot.querySelector(".btnEliminarRuta").addEventListener('click', () => {
            const eventoEliminarRuta = new CustomEvent('rutaEliminada', {
                detail: { idRuta: idRuta },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(eventoEliminarRuta);
        });

        this.shadowRoot.querySelector(".botonEditar").addEventListener('click', () => {
            const nuevoTitulo = prompt("Ingresa el nuevo nombre de la ruta:", titulo);
            if (nuevoTitulo === null) return;
            const nuevoConductor = prompt("Ingresa el nuevo conductor:", conductor);
            if (nuevoConductor === null) return;
            const nuevaHora = prompt("Ingresa la nueva hora de salida (Ej: 06:45 AM):", hora);
            if (nuevaHora === null) return;

            if (!nuevoTitulo.trim() || !nuevoConductor.trim() || !nuevaHora.trim()) {
                alert("Error: Todos los campos son obligatorios para editar la ruta.");
                return;
            }
            if (!isNaN(nuevoTitulo) || !isNaN(nuevoConductor)) {
                alert("Error: El nombre de la ruta y del conductor no pueden ser números.");
                return;
            }

            const eventoEditarRuta = new CustomEvent('rutaEditada', {
                detail: { idRuta: idRuta, titulo: nuevoTitulo.trim(), conductor: nuevoConductor.trim(), hora: nuevaHora.trim() },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(eventoEditarRuta);
        });
    }
}
customElements.define("route-card", RouteCard);


document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    if (buscador) {
        buscador.addEventListener("input", () => {
            const textoUsuario = buscador.value.toLowerCase().trim();
            const todasLasTarjetas = document.querySelectorAll("bus-card, .Tarjetaruta"); 
            todasLasTarjetas.forEach(tarjeta => {
                let tituloHTML = "";
                if (tarjeta.shadowRoot) {
                    tituloHTML = tarjeta.shadowRoot.querySelector("h3") ? tarjeta.shadowRoot.querySelector("h3").textContent : "";
                } else {
                    tituloHTML = tarjeta.querySelector("h3") ? tarjeta.querySelector("h3").textContent : "";
                }
                const titulo = tituloHTML.toLowerCase();
                if (titulo.includes(textoUsuario)) {
                    tarjeta.style.display = "block"; // Se queda
                } else {
                    tarjeta.style.display = "none";  // Se oculta
                }
            });
        });
    }
});
let textoBusqueda = ""; 

document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    
    if (buscador) {
        buscador.addEventListener("input", () => {
            textoBusqueda = buscador.value.toLowerCase().trim();
            
            renderizarRutas(); 
        });
    }
});

let misRutas = [
    { id: "bus-1", titulo: "Ruta Arcoíris 🌈", conductor: "Don Diego", hora: "06:45 AM", estudiantes: ["Sofía", "Mateo"] },
    { id: "bus-2", titulo: "Ruta Cohete 🚀", conductor: "Sr. Pablo", hora: "07:15 AM", estudiantes: ["Santiago"] }
];


let climaCacheado = "";

async function consultarClimaBucaramanga() {
    try {
        const respuesta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Bucaramanga,co&appid=b189cc9df8cf46be6927d6059b85d341&units=metric");
        if (respuesta.ok) {
            const datosClima = await respuesta.json();
            const temperatura = Math.round(datosClima.main.temp);
            climaCacheado = `${temperatura}°C`;
        }
    } catch (error) {
        console.log("ERROR: NO SE PUEDO CONECTAR LA API.");
    }
}

function renderizarRutas() {
    const gridRutas = document.getElementById("gridRutas");
    if (!gridRutas) return;

    gridRutas.innerHTML = "";

    misRutas.forEach((ruta, index) => {
        const tarjetaComponente = document.createElement("route-card");
        
        tarjetaComponente.setAttribute("id-ruta", ruta.id);
        tarjetaComponente.setAttribute("titulo", ruta.titulo);
        tarjetaComponente.setAttribute("conductor", ruta.conductor);
        tarjetaComponente.setAttribute("hora", ruta.hora);
        tarjetaComponente.setAttribute("clima", climaCacheado);
        tarjetaComponente.setAttribute("clase-bus", `bus-${(index % 4) + 1}`);
        tarjetaComponente.setAttribute("estudiantes", ruta.estudiantes.join(","));

        gridRutas.appendChild(tarjetaComponente);
    });
    actualizarHistorialTabla();
}

function actualizarHistorialTabla() {
    const tablaContenido = document.getElementById("tablaHistorialContenido");
    if (!tablaContenido) return;
    tablaContenido.innerHTML = "";
    const fechaActual = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    misRutas.forEach(ruta => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><span class="Badge Categoria">Rutas</span></td>
            <td>${fechaActual}</td>
            <td><strong>${ruta.titulo}</strong></td>
            <td>${ruta.conductor}</td>
            <td><span class="Estado Activo">Activo (${ruta.estudiantes.length} Alumnos)</span></td>
            <td><button class="btnEliminarFila" data-id="${ruta.id}">🗑️</button></td>
        `;
        
        fila.querySelector(".btnEliminarFila").addEventListener('click', () => {
            misRutas = misRutas.filter(r => r.id !== ruta.id);
            renderizarRutas();
        });

        tablaContenido.appendChild(fila);
    });
}

document.addEventListener('alumnoEliminado', (e) => {
    const { nombreAlumno, idRuta } = e.detail;
    const rutaObjetivo = misRutas.find(r => r.id === idRuta);
    if (rutaObjetivo) {
        rutaObjetivo.estudiantes = rutaObjetivo.estudiantes.filter(alumno => alumno !== nombreAlumno);
        renderizarRutas();
    }
});

document.addEventListener('alumnoEditado', (e) => {
    const { nombreViejo, nombreNuevo, idRuta } = e.detail;
    const rutaObjetivo = misRutas.find(r => r.id === idRuta);
    if (rutaObjetivo) {
        const indice = rutaObjetivo.estudiantes.indexOf(nombreViejo);
        if (indice !== -1) {
            rutaObjetivo.estudiantes[indice] = nombreNuevo;
            renderizarRutas();
        }
    }
});

document.addEventListener('rutaEliminada', (e) => {
    const { idRuta } = e.detail;
    misRutas = misRutas.filter(ruta => ruta.id !== idRuta);
    renderizarRutas();
});

document.addEventListener('rutaEditada', (e) => {
    const { idRuta, titulo, conductor, hora } = e.detail;
    const rutaObjetivo = misRutas.find(r => r.id === idRuta);
    if (rutaObjetivo) {
        rutaObjetivo.titulo = titulo;
        rutaObjetivo.conductor = conductor;
        rutaObjetivo.hora = hora;
        renderizarRutas();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await consultarClimaBucaramanga();
    renderizarRutas();

    
    const FormuRuta = document.getElementById("FormuRuta");
    if (FormuRuta) {
        FormuRuta.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombreRuta = document.getElementById("InputNombreRuta").value.trim();
            const conductorRuta = document.getElementById("InputConductorRuta").value.trim();
            const horaRuta = document.getElementById("InputHoraRuta").value;

            if (!nombreRuta || !conductorRuta || !horaRuta) {
                alert("⚠️ Alerta: Debe sí o sí ingresar todos los datos requeridos para la ruta.");
                return;
            }

            if (!isNaN(nombreRuta) || !isNaN(conductorRuta)) {
                alert("⚠️ Alerta: El nombre de la ruta y del conductor deben ser texto válido, no números puros.");
                return;
            }

            let horaFormateada = horaRuta;
            const [hrs, mins] = horaRuta.split(':');
            const h = parseInt(hrs);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const formato12 = h % 12 || 12;
            horaFormateada = `${formato12}:${mins} ${ampm}`;

            misRutas.push({
                id: `bus-${Date.now()}`,
                titulo: nombreRuta,
                conductor: conductorRuta,
                hora: horaFormateada,
                estudiantes: []
            });

            guardarEnLocalStorage();

            FormuRuta.reset();
            renderizarRutas();
        });
    }

    const formuEstudiante = document.getElementById("formuEstudiante");
    if (formuEstudiante) {
        formuEstudiante.addEventListener("submit", (e) => {e.preventDefault();
            const nombreEstudiante = document.getElementById("InputNombreEstudiante").value.trim();
            
            if (!nombreEstudiante) {
                alert("DEBES INGRESAR EL NOMBRE DEL ESTUDIANTE OBLIGATORIAMENTE.");
                return;
            }

            // ⚠️ VALIDACIÓN EXIGIDA: No permitir números puros en el nombre del alumno
            if (!isNaN(nombreEstudiante)) {
                alert("EL NOMBRE DEL ESTUDIANTE NO PUEDE SER UN NÚMERO.");
                return;
            }

            if (misRutas.length === 0) {
                alert("NO HAY RUTAS ACTIVAS EN EL SISTEMA, DEBES CREAR UNA RUTA NUEVA.");
                return;
            }

            let menuOpciones = "¿A cuál de las siguientes rutas desea asignar al estudiante?\n\nEscriba el número correspondiente:\n";
            misRutas.forEach((ruta, i) => {
                menuOpciones += `${i + 1}. ${ruta.titulo}\n`;
            });

            const seleccionUsuario = prompt(menuOpciones);
            if (seleccionUsuario === null) return; 

            const indiceElegido = parseInt(seleccionUsuario) - 1;

            if (isNaN(indiceElegido) || indiceElegido < 0 || indiceElegido >= misRutas.length) {
                alert("SELECCIÓN NO VALIDA, OPERACIÓN CANCELADA.");
                return;
            }

            if (misRutas[indiceElegido].estudiantes.length >= 10) {
                alert("ESTA RUTA HA ALCANZADO SU LIMITE MAXIMO DE ESTUDIANTES.");
                return;
            }

            misRutas[indiceElegido].estudiantes.push(nombreEstudiante);
            guardarEnLocalStorage()

            formuEstudiante.reset();
            renderizarRutas(); 
        });
        
    }
});


const API_KEY = "1ddafd8c6e081646bed43c59c2eeb005"; 
const CIUDAD = "Bucaramanga"; 
const IDIOMA = "es"; 

async function obtenerClima() {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=metric&lang=${IDIOMA}`;

    try {
        console.log(" SOLICITANDO DATOS DEL CLIMA A OPENWEATHER...");
        
        //Hacemos la petición real con fetch y esperamos la respuesta
        const respuesta = await fetch(url);

        //¡Validación importante! Si la respuesta no es correcta (ej. ciudad no encontrada o API key inválida)
        if (!respuesta.ok) {
            throw new Error(`ERROR EN LA PETICIÓN: ${respuesta.status}`);
        }

        // Convertimos la respuesta de texto plano/JSON a un objeto JS manejable
        const datosClima = await respuesta.json();
        
        console.log("¡DATOS RECIBIDOS CON EXITO!", datosClima);

        // Enviamos los datos listos a una función que se encargue de pintarlos en el HTML
        renderizarClima(datosClima);

    } catch (error) {
        console.error("OH NO, OCURRIÓ UN ERROR AL TRAER EL CLIMA:", error);
        // Aquí podrías poner un mensajito lindo en tu interfaz avisando que el clima está tímido hoy
    }
}

function renderizarClima(datos) {
    const { name, main, weather } = datos;
    const temperatura = Math.round(main.temp); // Redondeamos para que quede como un número entero lindo (ej: 26)
    const descripcion = weather[0].description; // Ej: "cielo claro" o "nubes dispersas"
    const iconoCodigo = weather[0].icon; // Código del sticker/icono que OpenWeather nos regala
    
    // URL oficial de OpenWeather para traer el sticker animado del clima
    const urlIcono = `https://openweathermap.org/img/wn/${iconoCodigo}@2x.png`;
    // Supongamos que en tu HTML tienes un contenedor para el clima como #seccion-clima
    const contenedorClima = document.getElementById("seccion-clima");

    if (contenedorClima) {
        contenedorClima.innerHTML = `
            <div class="tarjeta-clima-coquette" style="text-align: center; padding: 15px;">
                <h3 style="margin: 0; font-size: 1.1rem;">☁️ El Clima en ${name}</h3>
                <img src="${urlIcono}" alt="${descripcion}" style="width: 60px; height: 60px;">
                <p style="font-size: 1.8rem; font-weight: bold; margin: 5px 0;">${temperatura}°C</p>
                <p style="text-transform: capitalize; opacity: 0.8; font-size: 0.9rem;">✿ ${descripcion} ✿</p>
            </div>
        `;
    }
}
obtenerClima();

function guardarEnLocalStorage() {
    localStorage.setItem("misRutasKids", JSON.stringify(misRutas));
}
function cargarDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem("misRutasKids");
    
    if (datosGuardados) {
        misRutas = JSON.parse(datosGuardados);
    } else {
        misRutas = [
            { id: "bus-1", titulo: "Ruta Arcoíris 🌈", conductor: "Don Diego", hora: "06:45 AM", estudiantes: ["👧 Sofía", "👦 Mateo"] },
            { id: "bus-2", titulo: "Ruta Cohete 🚀", conductor: "Sr. Pablo", hora: "07:15 AM", estudiantes: ["👦 Santiago"] }
        ];
    }
}
obtenerClima();