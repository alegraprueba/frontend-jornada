import React from "react";
import EstadoPedido from "../enums/EstadoPedido";

export default async function finalizarOrden(
    numeroPedido: string,
    estado: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
) {
    try {
        const finalizarOrdenPost: string = `${process.env.NEXT_PUBLIC_API_COCINA}${process.env.NEXT_PUBLIC_PATG_POST_PEDIDOS_PROCESAR}`
        const response = await fetch(
          finalizarOrdenPost,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ numeroPedido, estadoPedido: estado }),
          }
        );
        if (!response.ok) {
          throw new Error("Error al ordenar el plato");
        }
        const result = await response.json();
        setMessage("Se ha finalizado la orden.");
      } catch (error: any) {
        console.log(`Error: ${error.message}`)
        setMessage('No hemos logrado finalizar la orden.');
      }
}