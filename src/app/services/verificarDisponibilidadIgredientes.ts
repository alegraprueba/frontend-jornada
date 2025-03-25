import React from "react";
import IDetallePedido from "../interfaces/IDetallePedido";
import finalizarOrden from "./finalizarOrden";

export default async function verificarDisponibilidadIngredientes(
    numeroPedido: string,
    detallePedido: IDetallePedido, 
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const ingredientesPost: string = `${process.env.NEXT_PUBLIC_API_BODEGA_ALIMENTO}${process.env.NEXT_PUBLIC_PATH_POST_VERIFICAR_INGREDIENTES}`
        const response = await fetch(
            ingredientesPost,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ numeroPedido, detallePedido }),
            }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los platos");
        }
        const data = await response.json();
        console.log(data)
        
        if(![null, undefined, ""].includes(data?.estadoPedido))
            await finalizarOrden(
                numeroPedido,
                data?.estadoPedido,
                setMessage
            )
            setMessage("Orden actualizada");
        setMessage(data?.message)
    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}