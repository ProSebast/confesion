/* Terminal, ay no se  */

const lineasTerminal = [
  "> inicializando mensaje...",
  "> cargando emociones...",
  "> error: demasiados sentimientos detectados",
  "> solucion: decirte lo que siento...",
  "> ejecutando programa: confesion.exe"
];

// SFX - Usamos audios de Pixabay (libres de derechos)
const sfxTeclado = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_7313628795.mp3?filename=typing-6417.mp3');
const sfxPapel = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_f55928b122.mp3?filename=paper-rustle-95105.mp3');

let lineaActual = 0;
let hintTimeout;

function mostrarHint() {
    const hint = document.getElementById("hint");
    if (hint) hint.style.display = "block";
}

function resetHintTimer() {
    const hint = document.getElementById("hint");
    if (hint) hint.style.display = "none";
    clearTimeout(hintTimeout);
    hintTimeout = setTimeout(mostrarHint, 5000);
}

function escribirTerminal() {
  if (lineaActual < lineasTerminal.length) {
    let linea = lineasTerminal[lineaActual];
    let i = 0;

    function escribir() {
      if (i < linea.length) {
        const terminal = document.getElementById("terminal");
        if (terminal) {
          // Efecto Glitch en la línea de error
          if (linea.includes("error:")) {
              terminal.innerHTML += `<span class="glitch">${linea.charAt(i)}</span>`;
          } else {
              terminal.innerHTML += linea.charAt(i);
          }
          sfxTeclado.currentTime = 0;
          sfxTeclado.volume = 0.2;
          sfxTeclado.play().catch(() => {});
        }
        i++;
        setTimeout(escribir, 40);
      } else {
        const terminal = document.getElementById("terminal");
        if (terminal) {
          terminal.innerHTML += "\n";
        }
        lineaActual++;
        setTimeout(escribirTerminal, 500);
      }
    }

    escribir();
  } else {
    const boton = document.getElementById("boton");
    if (boton) {
      boton.style.display = "inline-block";
      resetHintTimer();
    }
    const musica = document.getElementById("musica");
    if (musica) {
      musica.volume = 0.1;
      musica.play().catch(() => {});
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
    escribirTerminal();
});

document.addEventListener("click", (e) => {
  const boton = document.getElementById("boton");
  if (boton && boton.style.display !== "none" && !boton.disabled && e.target.tagName !== "BUTTON") {
    siguiente();
    resetHintTimer();
  }
});

let pagina = 0;
let volumeInterval;

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
<div class="cualidades-container">
    <div class="cualidad-tag">Asombrosa</div>
    <div class="cualidad-tag">Inteligente</div>
    <div class="cualidad-tag">Apasionada</div>
    <div class="cualidad-tag">Orgullosa</div>
    <div class="cualidad-tag">Tímida</div>
    <div class="cualidad-tag">Valiente</div>
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
      // Sonido de escritura (más suave para papel)
      sfxTeclado.currentTime = 0;
      sfxTeclado.volume = 0.05;
      sfxTeclado.play().catch(() => {});
      setTimeout(escribir, 30);
    } else {
      if (callback) callback();
    }
  }

  escribir();
}

function siguiente() {
  let terminal = document.getElementById("terminal");
  const boton = document.getElementById("boton");

  if (terminal && terminal.style.display !== "none") {
    terminal.classList.add("fadeOut");
    sfxPapel.play().catch(() => {}); // Sonido de papel al aparecer la nota

    setTimeout(() => {
      terminal.style.display = "none";
      const hoja = document.getElementById("hojaNota");
      if (hoja) {
          hoja.style.display = "block";
      }
    }, 1000);
  }

  const contenidoEl = document.getElementById("contenido");

  if (pagina < paginas.length) {
    if (boton) {
      boton.disabled = true;
    }

    if (contenidoEl) {
      contenidoEl.style.display = "block";
      const musica = document.getElementById("musica");
      if (musica) {
        if (musica.paused) musica.play().catch(() => {});
        let targetVolume = Math.min(0.1 + (pagina * 0.1), 0.8);
        
        if (volumeInterval) clearInterval(volumeInterval);
        volumeInterval = setInterval(() => {
          if (musica.volume < targetVolume) {
            musica.volume = Math.min(musica.volume + 0.05, targetVolume);
          } else {
            clearInterval(volumeInterval);
          }
        }, 100);
      }

      escribirTexto(paginas[pagina], contenidoEl, () => {
        if (boton) {
          boton.disabled = false;
        }
        pagina++;
        if (pagina === paginas.length) {
          const musica = document.getElementById("musica");
          if (musica) {
            musica.volume = 1.0;
          }
          if (boton) {
            boton.innerText = "Ver sorpresa ❤️";
            boton.onclick = (e) => {
              e.stopPropagation();
              window.location.href = 'corazon.html';
            };
          }
        }
      });
    }
  }
}
