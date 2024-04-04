document.addEventListener('DOMContentLoaded', function(){

  // --> Activacion del boton de enviar el email
  const email = {
    email: '',
    asunto: '',
    mensaje: '',
}

  // --> Seleccionar los elementos de la interfas
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');
 // console.log(inputMensaje);  //--> sirve para comprobar que los seleccionñe bien

  // --> Asignar eventos, cuando estás trabajando con un formulario lo más común es blur (callback)
  // blur se ejecuta cuando estas en un campo y vas hacia otra parte del dom
  inputEmail.addEventListener('input', validar);  //--> sustituyo blur por input
  inputAsunto.addEventListener('input', validar);    
  inputMensaje.addEventListener('input', validar);

  formulario.addEventListener('submit', enviarEmail)

  btnReset.addEventListener('click', function(evento) {
    evento.preventDefault();                         //--> por defecto reinicia el formulario
    resetFormulario();
 
  })

  function enviarEmail (evento) {
    evento.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      // reiniciar el objeto
    resetFormulario();

    // Crear una alerta
    const alertaExito = document.createElement('P');
    alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
    alertaExito.textContent = 'Mensaje enviado correctamente';

    formulario.appendChild(alertaExito);

    setTimeout(() => {
      alertaExito.remove();
    }, 3000);
  }, 3000);
  }

function validar(evento) { 
  if(evento.target.value.trim () === '') {     // --> trim se usa en formularios para quitar espacio en blando 
    mostrarAlerta(`El campo ${evento.target.id} es obligatorio`,evento.target.parentElement );
    email[evento.target.name] = '';
    comprobarEmail();
    return;
  } 
   if(evento.target.id === 'email' && !validarEmail(evento.target.value)) {
    mostrarAlerta('El email no es válido', evento.target.parentElement);
    email[evento.target.name] = '';
    comprobarEmail();
    return;
   };

    limpiarAlerta(evento.target.parentElement);

    // Asignar valores al objeto email (si el codigo se ejecuta hasta aquí quiere decir que se han pasado las validaciones)
    email[evento.target.name] = evento.target.value.trim().toLowerCase();
    
    // Comprobar el objeto de email
   comprobarEmail( );
  
  };

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
function validarEmail(email) {
  const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/  // --> expresion regular
  const resultado = regex.test(email); // --> metodo test para comprobar una expresion regular retorna true o false
  return (resultado);
}

function comprobarEmail() {
  if (email.email === '' || email.asunto === '' || email.mensaje === '') {
    btnSubmit.classList.add('opacity-50');
    btnSubmit.disabled = true;
    return;
  }
  btnSubmit.classList.remove('opacity-50');
  btnSubmit.disabled = false;
}

function resetFormulario () {
     // reiniciar el objeto
     email.email = '';
     email.asunto = '';
     email.mensaje = '';
 
     formulario.reset();
     comprobarEmail();
}
});

