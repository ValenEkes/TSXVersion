import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { Productos, Estados } from "../TSXVersion/public/Productos";
import PedidosContext, { Pedido } from './PedidosContext';
import './Diseño/Formulario.css'
interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Estado {
  id: number;
  estado: string;
}

const CrearPedido = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('CrearPedido must be used within a PedidosProvider');
  }
  const { pedidos, setPedidos } = context;
  const [precio, setPrecio] = useState<number>(0);

  const handleProductoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedNombre = e.target.value;
    const producto = Productos.find((p: Producto) => p.nombre === selectedNombre);
    setPrecio(producto ? producto.precio : 0);
  };

  const agregarPedido = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const Pedido = {
      ID: pedidos.length + 1,
      NombreCliente: (form.NombreCliente as HTMLInputElement).value,
      Fecha: (form.Fecha as HTMLInputElement).value,
      NombreProducto: (form.NombreProducto as HTMLSelectElement).value,
      CantidadProducto: parseInt((form.CantidadProducto as HTMLInputElement).value),
      Precio: precio,
      Estado: (form.Estado as HTMLSelectElement).value
    };
    setPedidos([...pedidos, Pedido]);
    form.reset();
    setPrecio(0);
  };

  return (
    <div className="formulario">
      <h2>Crear Pedido</h2>
      <form onSubmit={agregarPedido}>
        <div className="form-group">
          <label htmlFor="NombreCliente">Nombre</label>
          <input type="text" id="NombreCliente" name="NombreCliente" required />
        </div>
        <div className="form-group">
          <label htmlFor="Fecha">Fecha</label>
          <input type="date" id="Fecha" name="Fecha" required />
        </div>
        <div className="form-group">
          <label htmlFor="NombreProducto">Nombre Productos</label>
          <select id="NombreProducto" name="NombreProducto" onChange={handleProductoChange} required>
            <option value="">Selecciona un producto</option>
            {Productos.map((e: Producto) => (
              <option key={e.id} value={e.nombre}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="CantidadProducto">Cantidad</label>
          <input type="number" id="CantidadProducto" name="CantidadProducto" min="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="Estado">Tipo de Estado</label>
          <select id="Estado" name="Estado" required>
            <option value="">Selecciona un estado</option>
            {Estados.map((e: Estado) => (
              <option key={e.id} value={e.estado}>{e.estado}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-submit">Agregar Pedido</button>
      </form>
    </div>
  );
};

export default CrearPedido;
