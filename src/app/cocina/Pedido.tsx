"use client";

import { useEffect, useState } from "react";
import listarPedidos from "../services/listarPedidos";
import IPedido from "../interfaces/IPedido";
import EstadoPedido from "../enums/EstadoPedido";
import IDetallePedido from "../interfaces/IDetallePedido";
import verificarDisponibilidadIngredientes from "../services/verificarDisponibilidadIgredientes";
import finalizarOrden from "../services/finalizarOrden";

export default function PedidosList() {
  const initialValuePedido: IPedido[] = [{
    id: "", numeroPedido: "", estadoPedido: "", detallePedido: {}
  }]
  const [pedidos, setOrdenes] = useState(initialValuePedido);
  const [loading, setLoading] = useState(true);
  const initialValueError: string = ""
  const [error, setError] = useState(initialValueError);
  const initialValueMessage: string = ""
  const [message, setMessage] = useState(initialValueMessage);

  useEffect(() => {
    listarPedidos(
        setOrdenes,
        setError,
        setLoading
    );
  }, []);

  const handleProcesarFinalizarPedido = async (
    estadoPedido: string, numeroPedido: string, detallePedido: IDetallePedido
  ) => {

    if(['EN_ESPERA', 'ESPERANDO_REPOSICION_STOCK'].includes(estadoPedido)) {
      await verificarDisponibilidadIngredientes(
        numeroPedido, detallePedido,
        setMessage,
        setError,
        setLoading
      )
      if(message != "") {
        alert(message)
      }
      alert("Intente de nuevo.")
    }
    else if (estadoPedido === "EN_PREPARACION") {
      const estado: string = EstadoPedido.ENTREGADO
      await finalizarOrden(
        numeroPedido,
        estado,
        setMessage
      )
      if(message != "") {
        alert(message)
      }
      alert("Intente de nuevo.")
    }
    else {
      alert("Su pedido ya fue finalizado.")
    }
  }


  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Listado de Pedidos</h1> */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Número de Pedido</th>
            <th className="border border-gray-300 px-4 py-2">Estado de Pedido</th>
            <th className="border border-gray-300 px-4 py-2">Plato seleccionado</th>
            <th className="px-4 py-2">Procesar o Finalizar Pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido: any) => (
            <tr key={pedido.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{pedido.numeroPedido}</td>
              <td className="border border-gray-300 px-4 py-2">{EstadoPedido[pedido.estadoPedido as keyof typeof EstadoPedido]}</td>
              <td className="border border-gray-300 px-4 py-2">{pedido.detallePedido.nombre}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded disabled:bg-gray-400"
                  onClick={() => handleProcesarFinalizarPedido(
                    pedido.estadoPedido,
                    pedido.numeroPedido,
                    pedido.detallePedido.ingredientes
                  )}
                >
                  PROCESAR | FINALIZAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
