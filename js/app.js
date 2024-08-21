// variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //cuando agregas un curso presionando "agregar curso"
  listaCursos.addEventListener("click", agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso)

  //muestra los cursos del localStorage
  document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];

    carritoHtml();
  })

  //vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () =>{
    articulosCarrito = []; //reseteamos el arreglo

    limpiarHtml(); // limpiamos todo el HTml
  })
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//eliminar curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')) {
        const cursoID = (e.target.getAttribute('data-id'));

        //elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID)
        
        carritoHtml(); //volvemos a iterar sobre el carrito y mostrar su html
    }
}

//leer contenido del html al que le dimos click y extrae la info del curso.
function leerDatosCurso(curso) {
  // console.log(curso)
  //crear un objeto con el contenidop del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1
  };

  //revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if(existe){
    //actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
        if(curso.id === infoCurso.id){
            curso.cantidad++; //retorna el objeto actualizado
            return curso;
        }else{
            return curso; //retorna los objetos que no son los duplicados
        }
    });
    articulosCarrito = [...cursos];
  } else {
    //agrega elementos al carrito
  articulosCarrito = [...articulosCarrito, infoCurso];
  }


  console.log(articulosCarrito);

  carritoHtml();
}

//muestra el carrito de compras en el HTML
function carritoHtml() {

  //limpiar el HTMl
  limpiarHtml();

  //recorre el carrito y generea el html
  articulosCarrito.forEach((curso) => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
            <img src='${imagen}' width='100'>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso'Z data-id=${id}> X </a>
            </td>
        `;

    //agrega el html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

  //agregar el carrito de compras al storage
  sincronizarStorage()

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//elimina los cursos del tbody
function limpiarHtml() {
    
  //forma lenta
  // contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
