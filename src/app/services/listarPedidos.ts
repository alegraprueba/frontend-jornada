import React from "react";
import IPedido from "../interfaces/IPedido";

export default async function listarPedidos(
    setOrdenes: React.Dispatch<React.SetStateAction<IPedido[]>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const pedidosGet: string = `${process.env.NEXT_PUBLIC_API_COCINA}${process.env.NEXT_PUBLIC_PATG_GET_PEDIDOS}`
        const response = await fetch(pedidosGet);
        if (!response.ok) {
          throw new Error("Error al obtener los ingredientes");
        }
        const data = await response.json();
        setOrdenes(data);
    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}