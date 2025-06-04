"use client"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();
  const [quantity, setQuantity] = useState(0);
  const [co2, setCo2] = useState(0);
  const [three, setThree] = useState(0)

  const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from('quantidade')
      .select('qtd_actives')
      .eq('id', 1)
      .single()

    if (error) {
      console.error("Erro Supabase:", error.message, error.details)
    } else {
      console.log(data.qtd_actives)
      setQuantity(data.qtd_actives);
      setCo2(data.qtd_actives * 0.01)
      setThree(data.qtd_actives * 0.05)
    }

  } catch (error) {
    console.log("Erro inesperado:", error)
  }
}

const formatarNumero = (n: number) => {
  return n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}


useEffect(() => {
   // Chamada inicial
  fetchData();

  // Define o intervalo
  const interval = setInterval(() => {
    fetchData();
  }, 5000); // 5000ms = 5 segundos

  // Limpa o intervalo ao desmontar o componente
  return () => clearInterval(interval);
}, [])

  return (
    <div className="w-screen h-screen min-h-screen flex flex-col justify-center items-center gap-4 bg-white">
       {/* Section 2 */}
      <img src="2.png" alt="Estufômetro" className="object-cover w-full max-w-2xl" />

      {/* Section 2 */}
      <div className="w-full flex gap-3 justify-between items-center bg-black py-8 mx-3 px-8">
        {/* C02 */}
        <div className="flex gap-2 items-center w-full justify-start">
          <img src="3.png" alt="" className="w-full object-fill max-w-lg" />
          <div className="flex flex-col">
            <h2 className="text-9xl text-red-500 font-bold"> {co2 ? formatarNumero(co2) : "0"} </h2>
            <span className="text-6xl font-bold italic text-white">Toneladas CO2</span>
          </div>
        </div>

        {/* Árvores */}
        <div className="flex gap-2 items-center justify-end w-full">
          <img src="4.png" alt="" className="w-full object-fill max-w-lg" />
          <div className="flex flex-col">
            <h2 className="text-9xl text-green-500 font-bold"> {three ? formatarNumero(three) : "0" } </h2>
            <span className="text-6xl font-bold italic text-white">Árvores para compensar</span>
          </div>
        </div>

      </div>


      <div className="w-full flex justify-center items-center gap-4">
        <img src="5.png" alt="Logo vida - Corações de um voluntário" className="w-full object-fill max-w-lg" />
        <img src="6.png" alt="Kalor produções" className="w-full object-fill max-w-lg" />
      </div>
    </div>  
  )
}
