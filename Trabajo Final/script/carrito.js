document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total-price");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      // ✅ Verificación de que el producto no sea null y tenga imagen
      if (!producto || !producto.imagen || !producto.nombre || !producto.precio) {
        console.warn("Producto inválido en el carrito:", producto);
        return; // salta al siguiente producto
      }

      const div = document.createElement("div");
      div.classList.add("producto-card");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button data-index="${index}" class="eliminar">Eliminar</button>
      `;
      contenedor.appendChild(div);
      total += producto.precio;
    });

      const producto = {
      nombre: card.querySelector("h3")?.textContent || "Producto sin nombre",
      precio: parseFloat(card.querySelector("p")?.textContent.replace("$", "")) || 0,
      imagen: card.querySelector("img")?.getAttribute("src") || ""
      };

      if (producto.nombre && producto.precio && producto.imagen) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      }

    totalSpan.textContent = total;
  }

  contenedor.addEventListener("click", e => {
    if (e.target.classList.contains("eliminar")) {
      const index = parseInt(e.target.dataset.index);
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }
  });

  document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length > 0) {
      alert("Compra finalizada. ¡Gracias por tu pedido!");
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    } else {
      alert("El carrito está vacío.");
    }
  });

  renderCarrito();
});

