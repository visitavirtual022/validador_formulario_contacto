document.addEventListener('DOMContentLoaded', function(){

  // --> Seleccionar los elementos de la interfas
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');

 // console.log(inputMensaje);  //--> sirve para comprobar que los seleccionñe bien

  // --> Asignar eventos, cuando estás trabajando con un formulario lo más común es blur (callback)
  // blur se ejecuta cuando estas en un campo y vas hacia otra parte del dom
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar);    
  inputMensaje.addEventListener('blur', validar);

function validar(evento) {
 
  if(evento.target.value.trim() === '') {     // --> trim se usa en formularios para quitar espacio en blando 
    mostrarAlerta(`El campo ${evento.target.name} es obligatorio`,evento.target.parentElement );
    return;
  } 
    limpiarAlerta(evento.target.parentElement);
  }
;

function mostrarAlerta(mensaje, referencia) {
  limpiarAlerta(referencia);
  
  
   // Generar un alerta en html
  const error = document.createElement('P');
  error.textContent = mensaje ;     //--> construccion html
  error.classList.add('text-white', 'bg-red-600', 'p-2', 'text-center');  //--> añado clases tailwind
  // --> Inyectar el error al formulario (appendChild se usa para formulario) 
  referencia.appendChild(error);               //--> agreaga un hijo al final formulario
}

function limpiarAlerta(referencia) {
  // Comprueba si ya existe una alerta
  const alerta = referencia.querySelector('.bg-red-600');
  if (alerta){
  alerta.remove();
  }
}

});

