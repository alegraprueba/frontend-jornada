import PlatosList from "./cocina/Cocina";
import IngredientesList from "./ingredientes/Ingrediente";

export default function Home() {
  return (
    <>
      <IngredientesList/>
      <PlatosList/>
    </>
  );
}
