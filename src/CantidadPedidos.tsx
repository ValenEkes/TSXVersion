import { useContext } from 'react';
import PedidosContext from './PedidosContext';

const CantidadPedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('CantidadPedidos must be used within a PedidosProvider');
  }
  const { pedidos } = context;
  const totalPedidos = pedidos.length;

  return (
    <div className="cantidad-pedidos">
      <h2>Cantidad de Pedidos</h2>
      <div className="total-pedidos">
        <p><strong>Total de Pedidos Registrados:</strong> {totalPedidos}</p>
      </div>
    </div>
  );
};

export default CantidadPedidos;
