/* Terminal, ay no se  */

const lineasTerminal = [
  "> inicializando mensaje...",
  "> cargando emociones...",
  "> error: demasiados sentimientos detectados",
  "> solucion: decirte lo que siento...",
  "> ejecutando programa: confesion.exe"
];

let lineaActual = 0;

function escribirTerminal() {
  if (lineaActual < lineasTerminal.length) {
    let linea = lineasTerminal[lineaActual];
    let i = 0;

    function escribir() {
      if (i < linea.length) {
        document.getElementById("terminal").innerHTML += linea.charAt(i);
        i++;
        setTimeout(escribir, 40);
      } else {
        document.getElementById("terminal").innerHTML += "\n";
        lineaActual++;
        setTimeout(escribirTerminal, 500);
      }
    }

    escribir();
  } else {
    document.getElementById("boton").style.display = "inline-block";
  }
}

escribirTerminal();

/* paguinas, Me encanta */

let pagina = 0;

const paginas = [
  `Tengo que admitir que quería hacer una nota...
<br><br>
pero olvidé lo que soy:
<br><span class="programador">un programador.</span>`,

  `Por eso quería hacer este detalle
<br>
con mi estilo,
<br>
con mi toque personal.`,

  `Porque eres:<br>
<div class="d-flex flex-column align-items-center">
  <ul class="list-group w-75">
    <li class="list-group-item bg-transparent border-0 text-white">Asombrosa</li>
    <li class="list-group-item bg-transparent border-0 text-white">Inteligente</li>
    <li class="list-group-item bg-transparent border-0 text-white">Apasionada</li>
    <li class="list-group-item bg-transparent border-0 text-white">Orgullosa</li>
    <li class="list-group-item bg-transparent border-0 text-white">Tímida</li>
    <li class="list-group-item bg-transparent border-0 text-white">Valiente</li>
  </ul>
</div>`,

  `Esos ojos que deslumbran,
<br>
cómo desfilas al caminar,
<br>
cómo te distraes con cualquier cosa,
<br>
cómo mantienes tus prioridades en alto.`,

  `Simplemente...
<br><br>
todo de ti.`,

  `No soy una persona que se abra fácilmente,
<br>
pero para mí tú eres alguien muy especial.`,

  `Tan diferente a mí...
<br>
pero eso lo hace único y divertido.`,

  `Quiero tener más foto contigo, quiero tener más fotos de ti<br><br>cada momento contigo es especial<br><br>en cada detalle, en cada sonrisa`,

  `<h2>I love you</h2>
<h3>Honey</h3>
<div class="heart">❤️</div>`
];

/* MAQUINA DE ESCRIBIR "dios como me gusta" */

function escribirTexto(texto, elemento, callback) {
  let i = 0;
  elemento.innerHTML = "";

  function escribir() {
    if (i < texto.length) {
      if (texto[i] === "<") {
        let cierre = texto.indexOf(">", i);
        elemento.innerHTML += texto.substring(i, cierre + 1);
        i = cierre + 1;
      } else {
        elemento.innerHTML += texto[i];
        i++;
      }

      setTimeout(escribir, 18);
    } else {
      if (callback) callback();
    }
  }

  escribir();
}

/* BOTON */

function siguiente() {
  let terminal = document.getElementById("terminal");
  const boton = document.getElementById("boton");

  if (terminal.style.display !== "none") {
    terminal.classList.add("fadeOut");

    setTimeout(() => {
      terminal.style.display = "none";
    }, 1000);
  }

  document.getElementById("contenido").style.display = "block";

  if (pagina < paginas.length) {
    boton.disabled = true;

    const contenidoEl = document.getElementById("contenido");
    escribirTexto(paginas[pagina], contenidoEl, () => {
      boton.disabled = false;
      pagina++;
      if (pagina === paginas.length) {
        document.getElementById("musica").play();
        boton.innerText = "❤️";
        setTimeout(() => {
          window.location.href = 'corazon.html';
        }, 1000);
      }
    });
  } else {
    boton.style.display = "none";
  }
}
