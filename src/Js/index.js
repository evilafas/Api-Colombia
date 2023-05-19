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
const atracciones = document.getElementById("turismo");
const presidentes = document.getElementById("presidentes");
const mapa = document.getElementById("mapa");


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
    } catch (error) {
        console.log("ERROR!")
    }
})();

(async () => {
    try {
        const endPointDepartamentos = 'https://api-colombia.com/api/v1/Department'
        const data = await fetchData(endPointDepartamentos);
        const cards = data.map((item) => {
            return `
            <div class="card">
            <h1 id="tituloCard">${item.name}</h1>
            <p id="descripcion">${item.description}</p>
          </div>`;
        });
        departamentos.innerHTML = cards.join("");
    } catch (error) {
        console.log("ERROR!")
    }
})();

(async () => {
    try {
        const endPointRegiones = 'https://api-colombia.com/api/v1/Region'
        const dataRegiones = await fetchData(endPointRegiones);
        const cardsRegiones = dataRegiones.map((item) => {
            return `
            <div class="card">
            <h1 id="tituloCard">${item.name}</h1>
            <p id="descripcion">${item.description}</p>
          </div>`;
        });
        regiones.innerHTML = cardsRegiones.join("");
    } catch (error) {
        console.log("ERROR!")
    }
})();

(async () => {
    try {
        const endPointAtracciones = 'https://api-colombia.com/api/v1/TouristicAttraction'
        const DataAtracciones = await fetchData(endPointAtracciones);
        const cardsAtracciones = DataAtracciones.map((item) => {
            return `
            <div class="card" id="cardAtracciones">
            <img src="${item.images}" alt="card Logo"/>
            <h1>${item.name}</h1>
            <p>${item.description}</p>
          </div>`;
        });
        atracciones.innerHTML = cardsAtracciones.join("");
    } catch (error) {
        console.log("ERROR!: ", error)
    }
})();

(async () => {
    try {
        const endPointPresidentes = 'https://api-colombia.com/api/v1/President'
        const DataPresidentes = await fetchData(endPointPresidentes);
        const cardsPresidentes = DataPresidentes.map((item) => {
            return `
            <div class="card" id="cardPresidentes">
            <img src="${item.image}" alt="card image"/>
            <h1>${item.id}. ${item.name} ${item.lastName}</h1>
            <p>${item.startPeriodDate}/${item.endPeriodDate}</p>
            <p>${item.politicalParty}</p>
            <p>${item.description}</p>
            </div>`;
        });
        presidentes.innerHTML = cardsPresidentes.join("");
    } catch (error) {
        console.log("ERROR!: ", error)
    }
})();

(async () => {
    try {
      const endPointMap = 'https://api-colombia.com/api/v1/Map';
      const response = await fetchData(endPointMap);
      const datosMapa = response.map((item) => {
        return `
          <div class="imgContainer">
            <img src="${item.urlImages}" alt="" class="imgMapa" />
            <p>${item.name}</p>
          </div>
        `;
      });
      mapa.innerHTML = datosMapa.join("");
  
      const imgMapas = document.getElementsByClassName("imgMapa");
      Array.from(imgMapas).forEach((imgMapa) => {
        imgMapa.addEventListener("click", function () {
          if (imgMapa.requestFullscreen) {
            imgMapa.requestFullscreen();
          } else if (imgMapa.mozRequestFullScreen) {
            imgMapa.mozRequestFullScreen();
          } else if (imgMapa.webkitRequestFullscreen) {
            imgMapa.webkitRequestFullscreen();
          } else if (imgMapa.msRequestFullscreen) {
            imgMapa.msRequestFullscreen();
          }
        });
      });
    } catch (error) {
      console.log("ERROR!: ", error);
    }
  })();
  

