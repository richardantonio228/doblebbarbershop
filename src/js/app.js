
let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id:'',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion()
       tabs (); //cambia la sección cuando se presiona los tabs.
       botonesPaginador(); //Agrega o quita los botones del paginador.
       paginaSiguiente();
       paginaAnterior();
       consultarAPI(); //Consulta la Api en el Backend de PHP.
       idCliente();
       nombreCliente();//Añade el nombre del cliente al objeto de cita
       seleccionarFecha(); //Añade la fecha de la cita en el objeto
       seleccionarHora();//Añade la hora de la cita en el objeto

       mostrarResumen();//Muestra el resumen de la cita

}

function mostrarSeccion(){

    //Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');

        }

    //Seleccionar la sección con el paso...

    const pasoSelector =`#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');
    
    //Quitar la clase actual al tab anterior
    
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior){
        tabAnterior.classList.remove('actual');
    }
     //Resalta el tab actual
     const tab = document.querySelector(`[data-paso="${paso}"]`);
     tab.classList.add('actual');

}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton =>{
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();

           
        })
    })
}

function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');

    }else if(paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();

    }else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if (paso <=pasoInicial) return;
        paso--;
        botonesPaginador();
    })

}

function paginaSiguiente(){
    const paginaSiguiente= document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if (paso >=pasoFinal) return;
        paso++;
        botonesPaginador();
    })

}
//Creacion de Api
async function consultarAPI(){
    try {
        // const url = `${location.origin}/api/servicios`; PAra hospedearlo y diferente lugares Back y front
        const url = '/api/servicios'; //si se va a hospedar en el mismo dominio lo hacemos asi
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error){
        console.log(error);
    }
}
//Muestra los Servicios en el layout
function mostrarServicios(servicios){
    servicios.forEach(servicio =>{
        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio)
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild (precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
        

        // console.log(servicioDiv);
    });
}
 
function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita; //extraer el arreglo de servicios

    //Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //comprobar si un servicio fue agregado o quitarlo
    if(servicios.some(agregado => agregado.id === id)){
        //Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    }else{
        //Agregarlo
        cita.servicios = [...servicios, servicio]; //tomar una copia del arreglo y agregando uno nuevo reescribendo
        divServicio.classList.add('seleccionado');
    }
    

    
    
    // console.log(cita);
}

function idCliente(){
    cita.id = document.querySelector('#id').value; 

}
function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value; 
    

}
//Funcion para seleccionar fecha
function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){

        //Metodo para seleccionar el dia en JS. 0=Domingo,...
        const dia = new Date(e.target.value).getUTCDay();

        if ([0,1].includes(dia)){
            e.target.value = '';
            mostrarAlertas('Lunes no laboramos y Domingos hasta las 7 pm', 'error', '.formulario');
        }else {
            cita.fecha = e.target.value;
        }
    });
    
}

function seleccionarHora (){  
  
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
       
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 8 || hora > 19){
            e.target.value = '';
            mostrarAlertas('Hora No Válida', 'error', '.formulario');

        }else {
            cita.hora = e.target.value;
            console.log(cita);
        }
    })

}

//Mostrar en formato am y pm 
// function seleccionarHora() {
//     const inputHora = document.querySelector('#hora');
//     inputHora.addEventListener('input', function (e) {
//         const horaCita = e.target.value;
//         const partesHora = horaCita.split(":");
//         const hora = partesHora[0];
//         const minutos = partesHora[1];

//         if (hora < 8 || hora > 18) {
//             e.target.value = '';
//             mostrarAlertas('Hora No Válida', 'error', '.formulario');
//         } else {
//             let hora12;
//             const ampm = hora < 12 ? 'AM' : 'PM';
//             if (hora == 0) {
//                 hora12 = '12';
//             } else if (hora <= 12) {
//                 hora12 = hora;
//             } else {
//                 hora12 = hora - 12;
//             }

//             const horaCompleta = hora12 + ':' + minutos + ' ' + ampm;
//             cita.hora = horaCompleta;
//             console.log(cita);
//         }
//     });
// }



//Funcion para mostra las alertas a sellecionar una fecha

function mostrarAlertas(mensaje, tipo, elemento, desaparece = true){

//Previene que se generen mas de 1 alerta
const alertaPrevia = document.querySelector('.alerta');
if (alertaPrevia){
    alertaPrevia.remove();
}

//Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent =mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);
    console.log(alerta);

    //Mostrar el formulario en pantalla
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

   
    if (desaparece){
         //Eliminar alerta
         setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
    
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');
    //Limpiar el contenido del resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }


    if (Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlertas('Faltan datos de servicios, fecha u hora', 'error', '.contenido-resumen', false);
        return;
    }
    //Formatear el div del resumen
    const {nombre, fecha, hora, servicios} = cita;

    
    //Heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);
    
    //Iterando y mostrando los servicios
    servicios.forEach(servicio =>{
        const {id, precio, nombre} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    
      });

        //Heading para Servicios en Resumen
    const headingCitas = document.createElement('H3');
    headingCitas.textContent = 'Resumen de Citas';
    resumen.appendChild(headingCitas);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear la fehca a español

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDay() +2;
    const year = fechaObj.getFullYear();
    
    const fechaUTC = new Date (Date.UTC(year,mes,dia));

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX',opciones);
    console.log(fechaFormateada);

    const fechaCita= document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    //Boton para crear una cita

    const botonReservar = document.createElement('BUTTON'); //Se crea el boton
    botonReservar.classList.add('boton'); //Se le asigna un clase
    botonReservar.textContent ='Reserva Cita'; //Se le agrega el texto
    botonReservar.onclick = reservarCita;// Se le asocia una funcion


    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);//Para que aparezca el boton
   
    //FormData: es la forma de crear el submit pero en JS.
    async function reservarCita(){
        const {nombre, fecha, hora, servicios, id} = cita;

        const idServicio = servicios.map(servicio => servicio.id);
        // console.log(idServicio)
        
        const datos = new FormData();
        datos.append('fecha', fecha);
        datos.append('hora', hora);
        datos.append('usuarioId', id);
        datos.append('servicios', idServicio);


        //  console.log([...datos]); 

        //  return;
        try {
            //Peticion hacia la api
            const url = '/api/citas'

            const respuesta = await fetch(url,{
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();
            console.log(resultado.resultado);

            if (resultado.resultado){
                Swal.fire({
                    icon: 'success',
                    title: 'Cita Creada',
                    text: 'Tu cita ha sido creada',
                    button: 'Ok'
                }).then(() =>{
                  setTimeout(() =>{
                    window.location.reload();

                  }, 3000)
                })
            }
        
        
     } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al Guardar la cita',
            
          })
             
 }       

    }   
}