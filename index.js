async function obtenerProductos() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`,
            { method: `GET` });
        const productos = await response.json();
        console.log(productos);
    } catch (error) {
        console.error(`Error no se pudo obtener los productos:`, error);
    }
    
}

async function obtenerProducto(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, 
            { method: `GET` });
        const producto = await response.json();
        console.log(producto);
    } catch (error) {
        console.error(`Error no se pudo obtener el producto:`, error);
    }   }

async function agregarProducto(producto) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`,   
            { method: `POST`,
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const productoNuevo = await response.json();
        console.log(productoNuevo);
    } catch (error) {
        console.error(`Error no se pudo agregar el producto:`, error);
    }}

async function eliminarProducto(id) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, 
                { method: `DELETE` });
            const productoEliminado = await response.json();
            console.log(`se elimino el producto ${id}`, productoEliminado);
        } catch (error) {
            console.error(`Error no se pudo eliminar el producto:`, error);
        }}

async function actualizarProducto(producto)  {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${producto.id}`, 
            { method: `PUT`,
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': `application/json` 
            }
        });
        const productoActualizado = await response.json();
        console.log(productoActualizado);
    } catch (error) {
        console.error(`Error no se pudo actualizar el producto:`, error);
    }}



console.log("programa iniciado");

const argumentos = process.argv.slice(2);
const comando = argumentos[0]?.toLowerCase();
const datos = argumentos[1];

switch (comando) {
    case "get":
        if (datos === "products") {
            obtenerProductos();
        } else if (datos && datos.toLowerCase().startsWith("products/")) {
            const id = datos.split("/")[1];
            obtenerProducto(id);
        } else {
            console.log("Comando no reconocido");
        }
        break;
    case "post":
        if (datos === "products" && argumentos[2]) {
            const producto = {
                title: argumentos[2],
                price: Number(argumentos[3]),
                category: argumentos[4]
            }
            agregarProducto(producto);
        } else {
            console.log("Comando no reconocido");
        }
        break;
    case "put":
        if (datos && datos.toLowerCase().startsWith("products/") && argumentos[2]) {
            const id = datos.split("/")[1];
            const producto = {
                id: id,
                title: argumentos[2],
                price: Number(argumentos[3]),
                category: argumentos[4]
            }
                        actualizarProducto(producto);
        } else {
            console.log("Comando no reconocido");
        }
        break;
    case "delete":
        if (datos && datos.toLowerCase().startsWith("products/")) {
            const id = datos.split("/")[1];
            eliminarProducto(id);
             } else {
            console.log("Comando no reconocido");
        }
        break;
    default:
        console.log("Comando no reconocido");
}

// obtenerProductos();
// agregarProducto({
//     title: 'nuevo producto',
//     price: 29.99,
//     description: 'descripcion del producto',
// })
// obtenerProducto(20);
// eliminarProducto(19);

// actualizarProducto({
//     id: 18,
//     title: 'producto actualizado',
//     price:40});
