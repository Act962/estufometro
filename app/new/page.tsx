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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
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
    <div className="relative w-screen h-screen min-h-screen flex flex-col justify-center items-center gap-4 bg-white">
       <img src="FUNDO.png" alt="Background" className="w-full h-full object-cover" />


       <div className="absolute flex flex-col gap-3 justify-center items-center">

            <img src="estufometro.png" alt="Estufometro" />
            <div className="relative ml-36 mt-8">
                <img src="barra _.png" alt="Estufometro" className="" />

                <h2 className="text-9xl text-red-500 font-bold absolute top-12 left-[400px]"> {co2 ? formatarNumero(co2) : "0"} </h2>
                <h2 className="text-9xl text-green-500 font-bold absolute top-12 right-[460px]"> {three ? formatarNumero(three) : "0" } </h2>
            </div>
            <img src="marca Brazil energy.png" alt="Brazil Energy Logo" />
       </div>
    </div>  
  )
}
