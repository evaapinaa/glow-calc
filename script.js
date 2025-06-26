// Efecto visual seguimiento del cursor
const syncPointer = ({ x: pointerX, y: pointerY }) => {
  const x = pointerX.toFixed(2);
  const y = pointerY.toFixed(2);
  const xp = (pointerX / window.innerWidth).toFixed(2);
  const yp = (pointerY / window.innerHeight).toFixed(2);
  document.documentElement.style.setProperty("--x", x);
  document.documentElement.style.setProperty("--xp", xp);
  document.documentElement.style.setProperty("--y", y);
  document.documentElement.style.setProperty("--yp", yp);
};
document.body.addEventListener("pointermove", syncPointer);

// Variables para la calculadora
let pantalla = document.getElementById('pantalla');
let operacionActual = '';
let operador = '';
let valorAnterior = '';
let esperandoValor = false;

// Extraer números de los botones
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', () => {
      const valor = button.textContent;

        if (valor >= '0' && valor <= '9') {
            manejarNumero(valor);
        }

        if ("." == valor) {
          manejarDecimal();
        }

        else if (['+', '-', '×', '÷'].includes(valor)) {
            manejarOperador(valor);
        }

        else if ('C' == valor) {
          limpiar()
        }

        else if ('=' == valor) {
          calcular()
        }
        
        else if ('%' == valor) {
          porcentaje()
        }
    
    });
});

// ---- Métodos para la calculadora ----

// Manejar números
function manejarNumero(numero) {

  if(esperandoValor || pantalla.textContent === '0') {
    pantalla.textContent = numero;
    esperandoValor = false;
  } else {
      pantalla.textContent += numero;
  }
}

// Manejar números decimales
function manejarDecimal() {
  if (esperandoValor) {
    pantalla.textContent = '0.';
    esperandoValor = false;
  } else if (!pantalla.textContent.includes('.')) {
    pantalla.textContent += '.';
  }
}

// Manejar operadores
function manejarOperador(valor) {
  operador = valor;
  valorAnterior = pantalla.textContent;
  esperandoValor = true;
}

// Calcular porcentaje
function porcentaje() {
  const valor = parseFloat(pantalla.textContent)
  pantalla.textContent = (valor/100).toString();
}

// Calcular resultado
function calcular() {

  let resultado = 0;
  const num1 = parseFloat(valorAnterior)
  const num2 = parseFloat(pantalla.textContent)

    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '×':
            resultado = num1 * num2;
            break;
        case '÷':
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                pantalla.textContent = 'Error';
                return;
            }
            break;
        default:
            return;
    }

    pantalla.textContent = resultado.toString();
    valorAnterior = ''
    operador = '';
    esperandoValor = true;
}

// Limpiar todo
function limpiar() {
  pantalla.textContent = 0;
  operacionActual = '';
  operador = '';
  valorAnterior = '';
  esperan
}