"use client";

import PedidosList from "./cocina/Pedido";
import PlatosList from "./cocina/Plato";
import IngredientesList from "./ingredientes/Ingrediente";
import { useState } from "react";
import PlazaMercadoList from "./plaza/PlazaMercado";

const menuItems = [
  { label: 'Platos' },
  { label: 'Ingredientes' },
  { label: 'Pedidos' },
  { label: 'Plaza Mercado' },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => setSelectedItem(item.label)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem',
                  fontWeight: 'bold',
                  background: selectedItem === item.label ? '#eee' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '2rem' }}>
        <h1>{selectedItem ? `Listado de ${selectedItem}` : 'Seleccioná una opción'}</h1>
        {selectedItem === 'Platos' && (<PlatosList/>)}
        {selectedItem === 'Ingredientes' && (<IngredientesList/>)}
        {selectedItem === 'Pedidos' && (<PedidosList/>)}
        {selectedItem === 'Plaza Mercado' && ( <PlazaMercadoList />)}
      </main>
    </div>
  );
}
