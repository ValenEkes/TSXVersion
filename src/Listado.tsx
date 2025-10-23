import { useState, useContext, ChangeEvent } from "react";
import Pedidos from "./Pedidos";
import { Estados } from "../TSXVersion/public/Productos";
import PedidosContext, { Pedido } from './PedidosContext';
import './Diseño/Listado.css'
interface Estado {
  id: number;
  estado: string;
}

const Listado = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('Listado must be used within a PedidosProvider');
  }
  const { pedidos, setPedidos } = context;
  const [filtroEstado, setFiltroEstado] = useState<string>("");

  const pedidosFiltrados = filtroEstado ? pedidos.filter((p: Pedido) => p.Estado === filtroEstado) : pedidos;

  // Calcular contadores
  const totalPedidos = pedidos.length;
  const contadoresPorEstado = Estados.reduce((acc: { [key: string]: number }, estado: Estado) => {
    acc[estado.estado] = pedidos.filter((p: Pedido) => p.Estado === estado.estado).length;
    return acc;
  }, {});

  return (
    <div className="Listado">
      <h2>Pedidos registrados</h2>
      <div className="contadores">
        <p><strong>Total de Pedidos:</strong> {totalPedidos}</p>
        {Estados.map((estado: Estado) => (
          <p key={estado.id}><strong>{estado.estado}:</strong> {contadoresPorEstado[estado.estado]}</p>
        ))}
      </div>
      <div className="filtro">
        <label htmlFor="estado">Filtrar por Estado:</label>
        <select id="estado" value={filtroEstado} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFiltroEstado(e.target.value)}>
          <option value="">Todos</option>
          {Estados.map((e: Estado) => (
            <option key={e.id} value={e.estado}>{e.estado}</option>
          ))}
        </select>
      </div>
      <div className="pedidos-container">
        {
          pedidosFiltrados.map((e: Pedido, index: number) => <Pedidos key={e.ID} ID={e.ID} Cliente={e.NombreCliente} Fecha={e.Fecha} Estado={e.Estado} NombreProducto={e.NombreProducto} CantidadProducto={e.CantidadProducto} Precio={e.Precio} />)
        }
      </div>
    </div>
  );
};

export default Listado;
