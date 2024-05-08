//Variable que mantiene el estado visible del carrito
/* var carritoVisible = false; */

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
/* if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
} */



const verCarrito=document.getElementById("Icarrito")
const carritoMo=document.getElementById("carritoI")
const totalTag = document.getElementById("total")
const itemsC=document.getElementById("carrito-items")
const CantidadCarrito = document.getElementById("CantidadCarrito")

const formatoPrecio = (precio) => {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

let carrito=[]

CantidadCarrito.style.display = "none"
carritoMo.style.display = "none";


let productos=[

{
    nombre: "Zygocactus",
    imagen: "./assets/filocactus.jpg",
    precio: 10000,
    id: 1,
    cantidad:1
},

{
    nombre: "Zig zag",
    imagen: "./assets/zigzag.jpg",
    precio: 8000,
    id: 2,
    cantidad:1
},

{
    nombre: "Zapote",
    imagen: "./assets/Zapote.jpg",
    precio: 15000,
    id: 3,
    cantidad:1
},

{
    nombre: "Zamioculca",
    imagen: "./assets/zamioculca-p14-v2.jpg",
    precio: 14000,
    id: 4,
    cantidad:1
},

{
    nombre: "Yerbabuena",
    imagen: "./assets/yerbabuena-matero.jpg",
    precio: 10000,
    id: 5,
    cantidad:1
},

{
    nombre: "Violetas De Los Alpes",
    imagen: "./assets/violeta-alpes-roja-v2.jpg",
    precio: 25000,
    id:6,
    cantidad:1
},

{
    nombre: "Violeta Africana",
    imagen: "./assets/violeta-africa.jpg",
    precio: 30000,
    id:7,
    cantidad:1
},

{
    nombre: "Pensamiento",
    imagen: "./assets/pensamiento-01.jpg",
    precio: 22000,
    id:8,
    cantidad:1
},

{
    nombre: "Tilandsia Roja #1",
    imagen: "./assets/tilandsia-n1.jpg",
    precio: 22000,
    id:9,
    cantidad:1

},







]


let carritoHeader = document.createElement("div")
    carritoHeader.classList="header-carrito"
    let h2 = document.createElement("h2")
    h2.textContent="Tu Carrito"
    carritoHeader.appendChild(h2) 
    
    document.getElementById("closeCart").appendChild(carritoHeader)

    let botonMo = document.createElement("h1")
    botonMo.textContent="❌"
    botonMo.className="botonMo"

    botonMo.addEventListener("click", ()=>{

        carritoMo.style.display = "none";
    })

    carritoHeader.append(botonMo)
    
    



    productos.forEach((item,index)=>{
        let div = document.createElement("div")
        div.classList="item"
        let nombre = document.createElement("span")
        nombre.textContent=item.nombre
        nombre.classList="titulo-item"
        
        div.appendChild(nombre)

        let imagenT= document.createElement("img")
        imagenT.src=item.imagen
        imagenT.classList="img-item"
        div.appendChild(imagenT)

        let precio= document.createElement("span")
        precio.textContent= formatoPrecio(item.precio)
        precio.classList="precio-item"
        div.appendChild(precio)

        let botonAdd =document.createElement("button")
        botonAdd.classList="boton-item"
        botonAdd.textContent= "Agregar al Carrito"
        div.appendChild(botonAdd)

       document.getElementById("container").appendChild(div)

      

       

        botonAdd.addEventListener("click", () => {

            const repeat = carrito.some((repeatitem) => repeatitem.id === item.id)
            console.log(repeat);
    
            if (repeat) {
                     carrito.map((producto) => {
                       
                    if (producto.id === item.id) {
                        producto.cantidad++
                        
                    }
                })

                
                

            } else {
                carrito.push({
                    id: item.id,
                    nombre: item.nombre,
                    img: item.imagen,
                    precio: item.precio,
                    cantidad: item.cantidad,
                })
                
    
            }
            
            addProduct()
            carritoCant()
            //pintarCarrito()

           
            
        })

        

        
    })

function addProduct(){
    itemsC.innerHTML = ''
    carrito.forEach((item,index)=>{

        let contenedorCar = document.createElement("div")
        contenedorCar.classList="carrito-item"

        let nameAndImage = document.createElement("div")
        nameAndImage.setAttribute("id","nameAndImage")

        let nombre=document.createElement("span")
        nombre.textContent=item.nombre
        nameAndImage.appendChild(nombre)
        
         

        let imagenC=document.createElement("img")
        imagenC.setAttribute("id","img1")
        imagenC.src=item.img
        imagenC.width="80px"
        nameAndImage.appendChild(imagenC)
        contenedorCar.appendChild(nameAndImage)


        let datosItem=document.createElement("div")
        datosItem.id=datosItem
        contenedorCar.appendChild(datosItem)

        let precio= document.createElement("p")
        precio.textContent=formatoPrecio(item.precio)
        datosItem.appendChild(precio)
        
        let cantidad= document.createElement("p")
        cantidad.textContent= ` Cant: ${item.cantidad}`
        datosItem.appendChild(cantidad)

        let total= document.createElement("p")
        total.textContent= formatoPrecio(item.cantidad * item.precio)
        datosItem.appendChild(total)

        let eliminar = document.createElement("img")
        eliminar.src="./assets/papelera.webp"
        eliminar.className = "btn-eliminar"
        contenedorCar.append(eliminar);

        eliminar.addEventListener("click", ()=>{

            item.cantidad--

            if(item.cantidad===0){

                carrito.splice(index,1)
                
            }

            addProduct()
            
            if(carrito.length!==0){

                carritoCant()
            }
            else{
                CantidadCarrito.style.display = "none"
            }
            

            /* eliminarProducto() */
        });
        
        console.log(itemsC)
        
        itemsC.append(contenedorCar) 

    })  

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalCarr = document.createElement("div")
    totalCarr.className = "carrito-total"
    totalCarr.innerHTML = `Total a pagar: $${formatoPrecio(total)} `
    totalTag.innerHTML=''
    totalTag.append(totalCarr)

    const vaciarCarrito = document.createElement("button")
    vaciarCarrito.setAttribute("id","vaciar")
    vaciarCarrito.textContent="Vaciar Carrito"
    totalTag.append(vaciarCarrito)

    vaciarCarrito.addEventListener("click", ()=>{
        carrito.splice(0,carrito.length)

        carritoCant()
        CantidadCarrito.style.display = "none"
        addProduct()
    })


}



verCarrito.addEventListener("click", ()=>{
    carritoMo.style.display = "block"
})

/* const eliminarProducto = () => {
   

     carrito.forEach(element=>{



     })

     
        
    
    carritoCant() 
   
}; */



const carritoCant = () => {

    CantidadCarrito.style.display = "block"
    CantidadCarrito.innerText = carrito.length
}
