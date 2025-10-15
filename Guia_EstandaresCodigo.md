Guia_EstandaresCodigo.md

Guía de Estándares de Código - Proyecto FINDYRATE (Node.js/Express)

1. Reglas de Nombres

Variables

Formato: camelCase

Ejemplos aceptados:


let nombreLugar = "Parque Central";
let totalResenas = 25;

Ejemplos no aceptados:


let nombre_lugar;
let TotalResenas;

Clases

Formato: PascalCase

Ejemplos aceptados:


class Usuario { ... }
class Lugar { ... }

Ejemplos no aceptados:


class usuario { ... }
class lugar { ... }

Funciones / Métodos

Formato: camelCase

Ejemplos aceptados:


function obtenerResenasLugar(lugarId) { ... }
const calcularPromedioResenas = (resenas) => { ... };

Ejemplos no aceptados:


function Obtener_resenas_lugar(lugarId) { ... }
const Calcular_Promedio = (resenas) => { ... };

2. Comentarios y Documentación Interna

Usar JSDoc para funciones y métodos:


/**
 * Obtiene todas las reseñas de un lugar
 * @param {number} lugarId - ID del lugar
 * @returns {Array} Lista de reseñas
 */
function obtenerResenasLugar(lugarId) {
  return resenas.filter(r => r.lugarId === lugarId);
}

Evitar comentarios redundantes.


3. Identación y Estilo de Código

Indentación: 2 espacios.

Llaves: abrir en la misma línea.

Espacios: después de comas, alrededor de operadores.

Líneas: máximo 120 caracteres.


4. Ejemplos Aceptados y No Aceptados

Aceptado:

const calcularPromedioResenas = (resenas) => {
  return resenas.reduce((acc, r) => acc + r.puntuacion, 0) / resenas.length;
};

No aceptado:

function calcular_promedio(resenas){
return resenas.reduce((a,b)=>a+b.puntuacion,0)/resenas.length
}

5. Instalación de Linters y Formateadores

ESLint

npm install eslint --save-dev
npx eslint --init

Prettier

npm install --save-dev prettier

.eslintrc.json recomendado:


{
  "env": { "node": true, "es2021": true },
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-unused-vars": "warn"
  }
}

.prettierrc recomendado:


{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 120
}

6. Aplicar reglas al código actual

npx eslint . --fix
npx prettier --write .