/* Terminal, ay no se  */

const lineasTerminal = [
  "> inicializando mensaje...",
  "> cargando emociones...",
  "> error: demasiados sentimientos detectados",
  "> solucion: decirte lo que siento...",
  "> ejecutando programa: confesion.exe"
];

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
    const esLineaError = linea.includes("error:");

    function escribir() {
      if (i < linea.length) {
        const terminal = document.getElementById("terminal");
        if (terminal) {
          if (esLineaError && i === 0) {
            terminal.innerHTML += '<span class="error-rojo">';
            console.log("Aplicando clase error-rojo");
          }
          
          terminal.innerHTML += linea.charAt(i);
          
          sfxTeclado.currentTime = 0;
          sfxTeclado.volume = 0.2;
          sfxTeclado.play().catch(() => {});
        }
        i++;
        setTimeout(escribir, 40);
      } else {
        const terminal = document.getElementById("terminal");
        if (terminal) {
          if (esLineaError) {
            terminal.innerHTML += '</span>';
          }
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

  `Según este gráfico, cuando estás conmigo el nivel de felicidad alcanza su punto máximo.
<br><br>
<div id="heartChartContainer"></div>`,

  `Cada momento contigo es especial
<br><br>
en cada detalle, en cada sonrisa`,

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
    sfxPapel.play().catch(() => {});

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
        
        // Si es la página del gráfico, dibujarlo después de escribir el texto
        if (paginas[pagina].includes('heartChartContainer')) {
          setTimeout(() => {
            const container = document.getElementById('heartChartContainer');
            if (container) {
              dibujarGraficoCorazon(container);
            }
          }, 500);
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

// Función para dibujar el gráfico del corazón animado
function dibujarGraficoCorazon(container) {
  // Crear SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '320');
  svg.setAttribute('viewBox', '0 0 400 320');
  svg.style.maxWidth = '400px';
  svg.style.margin = '0 auto';
  svg.style.display = 'block';
  
  // Fondo
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '400');
  rect.setAttribute('height', '320');
  rect.setAttribute('fill', '#fffdf5');
  svg.appendChild(rect);
  
  // Ejes del gráfico (más gruesos)
  const ejeY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ejeY.setAttribute('x1', '50');
  ejeY.setAttribute('y1', '30');
  ejeY.setAttribute('x2', '50');
  ejeY.setAttribute('y2', '280');
  ejeY.setAttribute('stroke', '#333');
  ejeY.setAttribute('stroke-width', '3');
  svg.appendChild(ejeY);
  
  const ejeX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ejeX.setAttribute('x1', '50');
  ejeX.setAttribute('y1', '280');
  ejeX.setAttribute('x2', '380');
  ejeX.setAttribute('y2', '280');
  ejeX.setAttribute('stroke', '#333');
  ejeX.setAttribute('stroke-width', '3');
  svg.appendChild(ejeX);
  
  // Etiquetas
  const labelY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  labelY.setAttribute('x', '15');
  labelY.setAttribute('y', '20');
  labelY.setAttribute('fill', '#333');
  labelY.setAttribute('font-size', '13');
  labelY.setAttribute('font-weight', 'bold');
  labelY.setAttribute('font-family', 'sans-serif');
  labelY.textContent = 'Felicidad';
  svg.appendChild(labelY);
  
  const labelX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  labelX.setAttribute('x', '340');
  labelX.setAttribute('y', '305');
  labelX.setAttribute('fill', '#333');
  labelX.setAttribute('font-size', '13');
  labelX.setAttribute('font-weight', 'bold');
  labelX.setAttribute('font-family', 'sans-serif');
  labelX.textContent = 'Tiempo';
  svg.appendChild(labelX);
  
  // Generar puntos del corazón (MUCHO MÁS GRANDE)
  const points = [];
  const centerX = 215;
  const centerY = 155;
  const scale = 5.2;
  
  // Ecuación paramétrica del corazón (ajustada para gráfico)
  for (let t = 0; t <= Math.PI * 2; t += 0.02) {
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    points.push({
      x: centerX + x,
      y: centerY + y
    });
  }
  
  // Crear path para la línea del corazón
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let pathData = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i].x} ${points[i].y}`;
  }
  pathData += ' Z';
  
  path.setAttribute('d', pathData);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#ff3366');
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  
  // Calcular longitud total del path
  svg.appendChild(path);
  container.appendChild(svg);
  
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;
  
  // Animar el dibujo
  let start = null;
  const duration = 3000; // 3 segundos
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;
    
    if (progress < 1) {
      path.style.strokeDashoffset = pathLength * (1 - progress);
      requestAnimationFrame(animate);
    } else {
      path.style.strokeDashoffset = 0;
      // Agregar relleno al terminar
      path.setAttribute('fill', 'rgba(255, 51, 102, 0.15)');
    }
  }
  
  requestAnimationFrame(animate);
}
