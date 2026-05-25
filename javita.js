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

let textoBusqueda = "";
let climaCacheado = "";
let misRutas = [
    { id: "bus-1", titulo: "Ruta Arcoíris 🌈", conductor: "Don Diego", hora: "06:45 AM", estudiantes: ["Sofía", "Mateo"] },
    { id: "bus-2", titulo: "Ruta Cohete 🚀", conductor: "Sr. Pablo", hora: "07:15 AM", estudiantes: ["Santiago"] }
];
let estudiantesPendientes = [];

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
        const clima = this.getAttribute("Clima") || "";
        const claseBus = this.getAttribute("clase-bus") || "bus-1";
        const estudiantesAtributo = this.getAttribute("estudiantes") || "";

        const tarjeta = this.shadowRoot.querySelector(".Tarjetaruta");
        if (tarjeta) tarjeta.className = `Tarjetaruta ${claseBus}`;
        this.shadowRoot.querySelector(".Rutainfo h3").textContent = titulo;
        this.shadowRoot.querySelector(".Conductor").textContent = ` CONDUCTOR: ${conductor}`;
        this.shadowRoot.querySelector(".Clima").textContent = clima;
        this.shadowRoot.querySelector(".class-hora").textContent = ` SALIDA: ${hora}`;

        const contenedorEstudiantes = this.shadowRoot.querySelector(".ListaEstudiantes");
        if (contenedorEstudiantes) {
            contenedorEstudiantes.innerHTML = "";
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

                    btnEstudiante.addEventListener('click', (e) => {
                        if (e.target.className !== "eliminar-estudiante") {
                            const nuevoNombre = prompt(` EDITA EL NOMBRE DEL ESTUDIANTE:`);
                            if (nuevoNombre === null) return;
                            if (nuevoNombre.trim() === "" || !isNaN(nuevoNombre)) {
                                mostrarNotificacion(`DEBES INGRESAR UN NOMBRE VALIDO`);
                                return;
                            }
                            const eventoEditarEstudiante = new CustomEvent('alumnoEditado', {
                                detail: { nombreViejo: nombre, nombreNuevo: nuevoNombre.trim(), idRuta: idRuta },
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

        const totalAlumnos = estudiantesAtributo.trim() === ""? 0: estudiantesAtributo.split(",").length;

        const capacidadCaja =this.shadowRoot.querySelector(".class-capacidad");
        capacidadCaja.textContent =`CAPACIDAD: ${totalAlumnos}/10`;

        if(totalAlumnos>=10){
            capacidadCaja.style.background="#ffd6d6";
            capacidadCaja.style.color="#d62828";
            capacidadCaja.textContent += " • LLENO";
        }


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
                mostrarNotificacion(`TODOS LOS CAMPOS SON OBLIGARIOS PARA EDITAR LA RUTA`);
                return;
            }
            if (!isNaN(nuevoTitulo) || !isNaN(nuevoConductor)) {
                mostrarNotificacion(`EL NOMBRE DE LA RUTA Y DEL CONDUCTOR DEBEN SER TEXTO VÁLIDO, NO NÚMEROS.`);
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

function renderizarRutas(){

    const grid=document.getElementById("gridRutas");

    if(!grid)return;

    grid.innerHTML="";

    misRutas.forEach((ruta,index)=>{

        const tarjeta=
        document.createElement("route-card");

        tarjeta.setAttribute("id-ruta",ruta.id);

        tarjeta.setAttribute("titulo",ruta.titulo);

        tarjeta.setAttribute("conductor",ruta.conductor);

        tarjeta.setAttribute("hora",ruta.hora);

        tarjeta.setAttribute("clima",climaCacheado);

        tarjeta.setAttribute("clase-bus",`bus-${(index%4)+1}`);

        tarjeta.setAttribute("estudiantes",ruta.estudiantes.join(","));

        grid.appendChild(tarjeta);

    });

    actualizarHistorialTabla();
    actualizarDashboard();
    renderizarAlumnosRegistrados();

}

function actualizarDashboard(){

    const busesRuta =document.getElementById("busesRuta");
    const totalEstudiantes =document.getElementById("totalEstudiantes");
    const totalPendientes =document.getElementById("totalEstudiantesPendientes");
    const totalRutas =misRutas.length;
    let estudiantesRegistrados = 0;
    misRutas.forEach(ruta=>{
        estudiantesRegistrados +=ruta.estudiantes.length;
    });

    const pendientes =estudiantesPendientes.length;
    if(busesRuta){
        busesRuta.textContent =`${totalRutas}/${totalRutas}`;
    }

    if(totalEstudiantes){
        totalEstudiantes.textContent =estudiantesRegistrados;
    }

    if(totalPendientes){
        totalPendientes.textContent = pendientes;
    }
}

function agregarPendiente(nombre){
    estudiantesPendientes.push(nombre);
    guardarPendientes();
    renderizarPendientes();
    actualizarDashboard();
} 

function guardarPendientes(){
    localStorage.setItem("pendientesKids",JSON.stringify(estudiantesPendientes));
}
    
function cargarPendientes(){
    const datos=localStorage.getItem("pendientesKids");
    if(datos){estudiantesPendientes=JSON.parse(datos);}
}
    
function renderizarPendientes(){
    const listaPendientes=document.querySelector(".ListaEstudiantesPendientes");
    if(!listaPendientes)return;

    listaPendientes.innerHTML="";

    estudiantesPendientes.forEach(nombre=>{
    let fila=document.createElement("div");

    fila.className="FilaEstudiantePendiente";

    fila.innerHTML=`
    <span>${nombre}</span>
    <button class="btnAsignar">➕ ASIGNAR</button>
    `;
    listaPendientes.appendChild(fila);
    });
}

function renderizarAlumnosRegistrados(){

    const lista=document.getElementById("listaAlumnosRegistrados");
    const contador=document.getElementById("contadorAlumnos");

    if(!lista) return;
    lista.innerHTML="";
    let todosLosAlumnos=[];
    misRutas.forEach(ruta=>{
        ruta.estudiantes.forEach(nombre=>{
            todosLosAlumnos.push({
                nombre:nombre,
                ruta:ruta.titulo
            });

        });
    });

    contador.textContent=`${todosLosAlumnos.length} alumnos`;
    todosLosAlumnos.forEach(alumno=>{
        const div=document.createElement("div");
        div.className="AlumnoCard";
        div.innerHTML=`
            <div>
                <div class="NombreAlumno">${alumno.nombre}</div>
                <small>${alumno.ruta}</small>
            </div>

            <span class="EstadoAlumno">
                REGISTRADO
            </span>
        `;
        lista.appendChild(div);

    });
}

function actualizarHistorialTabla() {
    const tablaContenido = document.getElementById("tablaHistorialContenido");
    if (!tablaContenido) return;
    tablaContenido.innerHTML = "";
    const fechaActual = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    misRutas.forEach(ruta => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><span class="Badge Categoria">Rutas</span></td>
            <td>${fechaActual}</td>
            <td><strong>${ruta.titulo}</strong></td>
            <td>${ruta.conductor}</td>
            <td><span class="Estado Activo">Activo (${ruta.estudiantes.length} Alumnos)</span></td>
            <td><button class="btnEliminarFila" data-id="${ruta.id}">X</button></td>
        `;

        fila.querySelector(".btnEliminarFila").addEventListener('click', () => {
            misRutas = misRutas.filter(r => r.id !== ruta.id);
            guardarEnLocalStorage();
            renderizarRutas();
        });

        tablaContenido.appendChild(fila);
    });
}

const API_KEY = "1ddafd8c6e081646bed43c59c2eeb005";
const CIUDAD = "Bucaramanga";
const IDIOMA = "es";

async function obtenerClima() {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=metric&lang=${IDIOMA}`;

    try {
        console.log(" SOLICITANDO DATOS DEL CLIMA A OPENWEATHER...");
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`ERROR EN LA PETICIÓN: ${respuesta.status}`);
        }
        const datosClima = await respuesta.json();
        console.log("¡DATOS RECIBIDOS CON EXITO!", datosClima);
        renderizarClima(datosClima);
    } catch (error) {
        console.error("OH NO, OCURRIÓ UN ERROR AL TRAER EL CLIMA:", error);
        
    }
}

function renderizarClima(datos) {
    const { name, main, weather } = datos;
    const temperatura = Math.round(main.temp); 
    const descripcion = weather[0].description; 
    const iconoCodigo = weather[0].icon; 

    climaCacheado=`${temperatura}°C`;

    const urlIcono = `https://openweathermap.org/img/wn/${iconoCodigo}@2x.png`;
    
    const contenedorClima = document.querySelector(".seccion-clima");

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
    renderizarRutas(); 
}


document.addEventListener('alumnoEliminado', (e) => {
    const { nombreAlumno, idRuta } = e.detail;
    const rutaObjetivo = misRutas.find(r => r.id === idRuta);
    if (rutaObjetivo) {
        rutaObjetivo.estudiantes = rutaObjetivo.estudiantes.filter(alumno => alumno !== nombreAlumno);
        guardarEnLocalStorage();
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
            guardarEnLocalStorage();
            renderizarRutas();
        } 
    }
});

document.addEventListener('rutaEliminada', (e) => {
    const { idRuta } = e.detail;
    misRutas = misRutas.filter(ruta => ruta.id !== idRuta);
    guardarEnLocalStorage();
    renderizarRutas();
});

document.addEventListener('rutaEditada', (e) => {
    const { idRuta, titulo, conductor, hora } = e.detail;
    const rutaObjetivo = misRutas.find(r => r.id === idRuta);
    if (rutaObjetivo) {
        rutaObjetivo.titulo = titulo;
        rutaObjetivo.conductor = conductor;
        rutaObjetivo.hora = hora;
        guardarEnLocalStorage();
        renderizarRutas();
    }
});

function mostrarNotificacion(mensaje){
    const noti=document.getElementById("notificacionKiddo");
    const texto=document.getElementById("textoNotificacion"); 
    texto.innerHTML=mensaje;
    noti.classList.remove("mostrar");
    setTimeout(()=>{
        noti.classList.add("mostrar");
    },100);
    
    setTimeout(()=>{
        noti.classList.remove("mostrar");
    },6500);
    
};

document.addEventListener("DOMContentLoaded", async () => {
    
    const listaPendientes=document.querySelector(".ListaEstudiantesPendientes");
    cargarDesdeLocalStorage();
    cargarPendientes();
    renderizarPendientes();

    await obtenerClima();
    renderizarRutas();

    const formuEstudiante = document.getElementById("formuEstudiante");

    const btnEntrar = document.getElementById("btnEntrarDashboard");
    const pantallaBienvenida = document.getElementById("pantallaBienvenida");

    console.log(btnEntrar, pantallaBienvenida);
    if (btnEntrar && pantallaBienvenida) {
        btnEntrar.addEventListener("click", () => {
            pantallaBienvenida.style.transform = "translateY(-100vh)";
            setTimeout(() => {
                pantallaBienvenida.style.display = "none";
            }, 800);
        });
    }

    const buscador = document.getElementById("buscador");
    if (buscador) {
        buscador.addEventListener("input", () => {
            const textoUsuario = buscador.value.toLowerCase().trim();
            const todasLasTarjetas = document.querySelectorAll("route-card");
            todasLasTarjetas.forEach(tarjeta => {
                let tituloHTML = "";
                if (tarjeta.shadowRoot) {
                    tituloHTML = tarjeta.shadowRoot.querySelector("h3") ? tarjeta.shadowRoot.querySelector("h3").textContent : "";
                } else {
                    tituloHTML = tarjeta.querySelector("h3") ? tarjeta.querySelector("h3").textContent : "";
                }
                const titulo = tituloHTML.toLowerCase();
                if (titulo.includes(textoUsuario)) {
                    tarjeta.style.display = "block"; 
                } else {
                    tarjeta.style.display = "none";  
                }
            });
        });
    }

    formuEstudiante.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("InputNombreEstudiante").value.trim();

        if (!nombre) {
            mostrarNotificacion(`INGRESE UN NOMBRE VÁLIDO.`);
            return;
        }
        if (!isNaN(nombre)) {
            mostrarNotificacion(`LOS NOMBRES NO PUEDEN SER SOLO NÚMEROS`);
            return;
        }
    
        if (/\d/.test(nombre)) {
            mostrarNotificacion(`EL NOMBRE NO DEBE TENER NÚMEROS, SOLO LETRAS POR FAVOR.`);
            return;
        }
    
        agregarPendiente(nombre);
        mostrarNotificacion(`¡ESTUDIANTE AGREGADO EXITOSAMENTE! ${nombre} AHORA HACE PARTE DE KIDDO ROUTES 🚌💖 LISTO PARA UNA NUEVA AVENTURA ESCOLAR.`);
        formuEstudiante.reset();   
    });

    const FormuRuta = document.getElementById("FormuRuta");
    if (FormuRuta) {
        FormuRuta.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombreRuta = document.getElementById("InputNombreRuta").value.trim();
            const conductorRuta = document.getElementById("InputConductorRuta").value.trim();
            const horaRuta = document.getElementById("InputHoraRuta").value;
            if (!nombreRuta || !conductorRuta || !horaRuta) {
                mostrarNotificacion(`TODOS LOS CAMPOS SON OBLIGATORIOS PARA CREAR UNA RUTA.`);
                return;
            }

            if (!isNaN(nombreRuta) || !isNaN(conductorRuta)) {
                mostrarNotificacion(`EL NOMBRE DE LA RUTA Y DEL CONDUCTOR DEBEN SER TEXTO VÁLIDO, NO NÚMEROS.`);
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
            mostrarNotificacion(`PERFECTO, RUTA CREADA EXITOSAMENTE!`);
            FormuRuta.reset();
            renderizarRutas();
        });
    }

    const modalRuta=document.getElementById("modalNuevaRuta");
    const modalPendientes=document.getElementById("modalNinosPendientes");
    const modalEstudiante=document.getElementById("modalNuevoEstudiante");

    const btnAbrirRuta=document.getElementById("btnIrNuevaRuta");
    const btnAbrirEstudiante=document.getElementById("btnIrNuevoEstudiante");
    const btnPendientes=document.getElementById("btnPendientes");

    const btnCerrarM1=document.getElementById("cerrarM1");

    const btnCerrarM2=document.getElementById("cerrarM2");

    const btnCerrarM3=document.getElementById("cerrarM3");

    if(btnAbrirRuta)
        {btnAbrirRuta.addEventListener("click",()=>modalRuta.classList.add("activo"));
    }

    if(btnPendientes){
        btnPendientes.addEventListener("click",()=>modalPendientes.classList.add("activo"));
    }

    if(btnAbrirEstudiante){
        btnAbrirEstudiante.addEventListener("click",()=>modalEstudiante.classList.add("activo"));
    }
    
    btnCerrarM1?.addEventListener("click",()=>modalRuta.classList.remove("activo"));
        
    btnCerrarM2?.addEventListener("click",()=>modalPendientes.classList.remove("activo"));
        
    btnCerrarM3?.addEventListener("click",()=>modalEstudiante.classList.remove("activo"));

    window.addEventListener("click", (e) => {
        if (e.target === modalRuta) modalRuta.classList.remove("activo");
        if (e.target === modalPendientes) modalPendientes.classList.remove("activo");
        if (e.target === modalEstudiante) modalEstudiante.classList.remove("activo");
    });

    listaPendientes.addEventListener("click", (e) => {

        if(!e.target.classList.contains("btnAsignar")) return;
        const fila=e.target.parentElement;
        const nombre=fila.querySelector("span").textContent;
        let mensaje="SELECCIONA UNA RUTA:\n";
        
        misRutas.forEach((ruta,index)=>{
            mensaje+=`${index+1}. ${ruta.titulo} (${ruta.estudiantes.length}/10)\n`;
        });
        
        const opcion=parseInt(prompt(mensaje));
        if(isNaN(opcion)){
            mostrarNotificacion("DEBES INGRESAR UN NÚMERO PARA SELECCIONAR LA RUTA");
            return;
        }
        if(opcion>=1 && opcion<=misRutas.length){
            const rutaSeleccionada=misRutas[opcion-1];
            if(rutaSeleccionada.estudiantes.length>=10){
                mostrarNotificacion(" ESTA RUTA YA ESTÁ LLENA, POR FAVOR SELECCIONA OTRA RUTA DISPONIBLE");
                return;
            }
            rutaSeleccionada.estudiantes.push(nombre);
            estudiantesPendientes=estudiantesPendientes.filter(n=>n!==nombre);
        
            guardarEnLocalStorage();
            guardarPendientes();
        
            renderizarPendientes();
            renderizarRutas();
            actualizarDashboard();
        
            mostrarNotificacion(` ${nombre} FUE ASIGNADO CORRECTAMENTE`);
        }
        else{
            mostrarNotificacion("SELECCIONA UNA RUTA VÁLIDA");
        }
        
    });
        
});
        