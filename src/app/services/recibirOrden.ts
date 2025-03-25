import React from "react";
import IPlato from "../interfaces/IPlato";

export default async function recibirOrden(
    platoSeleccionado: IPlato,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
) {
    try {
        const recepcionarOrdenPost: string = `${process.env.NEXT_PUBLIC_API_COCINA}${process.env.NEXT_PUBLIC_PATG_POST_PEDIDOS_RECIBIR}`
        const response = await fetch(
          recepcionarOrdenPost,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(platoSeleccionado),
          }
        );
        if (!response.ok) {
          throw new Error("Error al ordenar el plato");
        }
        const result = await response.json();
        setMessage(result?.message);
      } catch (error: any) {
        console.log(`Error: ${error.message}`)
        setMessage('Por favor, seleccione de nuevo su pedido.');
      }
}