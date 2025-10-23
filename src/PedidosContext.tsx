import { createContext, useState, useEffect, ReactNode } from 'react';

export interface Pedido {
  ID: number;
  NombreCliente: string;
  Fecha: string;
  NombreProducto: string;
  CantidadProducto: number;
  Precio: number;
  Estado: string;
}

interface PedidosContextType {
  pedidos: Pedido[];
  setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>;
}

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pedidos');
    if (saved) {
      try {
        setPedidos(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing pedidos from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  return (
    <PedidosContext.Provider value={{ pedidos, setPedidos }}>
      {children}
    </PedidosContext.Provider>
  );
};

export default PedidosContext;
