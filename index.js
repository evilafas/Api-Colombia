const API = 'https://api-colombia.com/api/v1/country/Colombia';

const options = {
    method: 'GET'
}
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const capital = document.getElementById("capital");
const poblacion = document.getElementById("poblacion");
const lenguaje = document.getElementById("lenguaje");
const moneda = document.getElementById("moneda");
const banderaimg = document.getElementById("bandera");
const departamentos = document.getElementById("departamentos");
const regiones = document.getElementById("regiones");
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json()
    return data;
}
(async () => {
    try {
        const info = await fetchData(API);
        titulo.innerText = info.name;
        descripcion.innerText = info.description;
        capital.innerText = `Capital: ${info.stateCapital}`;
        poblacion.innerText = `Poblacion: ${info.population.toLocaleString()} Habitantes`
        lenguaje.innerText = `Lenguajes: ${info.languages}`
        moneda.innerText = `Moneda: ${info.currency}`;
        banderaimg.setAttribute('src', info.flags[0])

        const endPointDepartamentos = 'https://api-colombia.com/api/v1/Department'
        const data = await fetchData(endPointDepartamentos);
        const cards = data.map((item) => {
            return `
            <div class="card">
            <h1 id="departamento">${item.name}</h1>
            <p id="descripcionDepartamento">${item.description}</p>
          </div>`;
        });
        departamentos.innerHTML = cards.join("");

        const endPointRegiones = 'https://api-colombia.com/api/v1/Region'
        const dataRegiones = await fetchData(endPointRegiones);
        const cardsRegiones = dataRegiones.map((item) => {
            return `
            <div class="card">
            <h1 id="departamento">${item.name}</h1>
            <p id="descripcionDepartamento">${item.description}</p>
          </div>`;
        });
        regiones.innerHTML = cardsRegiones.join("");

    } catch (error) {

    }
})();