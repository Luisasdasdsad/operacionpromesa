const calcularButton = document.getElementById('calcular');
const resultadoElement = document.getElementById('resultado');
const precioInput = document.getElementById('precio');
const cantidadInput = document.getElementById('cantidad');
const codigoDescuentoInput = document.getElementById('codigo-descuento');
const aplicarDescuentoButton = document.getElementById('aplicar-descuento');

let descuentoAplicado = false; // Variable para rastrear si el descuento ya ha sido aplicado

// Función para mostrar el resultado en el DOM
function mostrarResultado(resultado) {
    resultadoElement.textContent = `El total es: ${resultado}`;
    descuentoAplicado = false; // Resetear el estado del descuento cuando se recalcula el total
}

// Función para calcular el total
function calcularTotal(precio, cantidad) {
    return new Promise((resolve, reject) => {
        if (!isNaN(precio) && !isNaN(cantidad)) {
            const total = precio * cantidad;
            resolve(total);
        } else {
            reject("Por favor, ingresa valores válidos.");
        }
    });
}

// Evento para calcular el total
calcularButton.addEventListener('click', () => {
    const precio = parseFloat(precioInput.value);
    const cantidad = parseFloat(cantidadInput.value);
    calcularTotal(precio, cantidad)
        .then(total => mostrarResultado(total))
        .catch(error => resultadoElement.textContent = error);
});

// Función para aplicar descuento
function aplicarDescuento() {
    return new Promise((resolve, reject) => {
        if (descuentoAplicado) {
            reject("El descuento ya ha sido aplicado.");
        } else {
            const codigo = codigoDescuentoInput.value.trim();
            if (codigo === "DIAZ") {
                const total = parseFloat(resultadoElement.textContent.split(': ')[1]);
                const descuento = total * 0.10; // 10% de descuento
                const nuevoTotal = total - descuento;
                resolve(nuevoTotal);
            } else {
                reject("Código de descuento inválido.");
            }
        }
    });
}

// Evento para aplicar descuento
aplicarDescuentoButton.addEventListener('click', () => {
    aplicarDescuento()
        .then(nuevoTotal => {
            resultadoElement.textContent = `El total con descuento es: ${nuevoTotal}`;
            descuentoAplicado = true; // Marcar el descuento como aplicado
        })
        .catch(error => {
            // Mostrar el error sin borrar el resultado de la multiplicación
            const errorElement = document.createElement('div');
            errorElement.textContent = error;
            resultadoElement.appendChild(errorElement);
        });
});