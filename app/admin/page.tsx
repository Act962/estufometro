"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

export default function Page() {
    const supabase = createClient();
    const [quantity, setQuantity] = useState(0);
    const [co2, setCo2] = useState(0);
    const [three, setThree] = useState(0)
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const settingsData = async (n: number) => {
        setQuantity(n)
        setCo2(n * 0.01)
        setThree(n * 0.05)
    }
    
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
          settingsData(data.qtd_actives)
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
    
    const updateData = async () => {
       setLoading(true)
       try {
           const { error } = await supabase
           .from("quantidade")
           .update({ qtd_actives:  Number(inputValue)})
           .eq('id', 1)
   
           if (error) {
               console.log(error)
           } else {
               settingsData(Number(inputValue))
               setInputValue("")
               toast.success("Atualizado com sucesso")
               inputRef.current?.focus()
           }
       } catch (error) {
           console.log(error);
           toast.error("Erro ao atualizar dados!")
       } finally {
           setLoading(false)
       }
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
    <div className='h-screen min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-4xl px-4'>
            <h2>Atualizar participantes</h2>
            <Input type='number' className='mt-3' value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} />
            {loading ? <Button disabled={true} className='w-full mt-4' onClick={updateData}>
                <LoaderCircle className='animate-spin' />
                Carregando...
            </Button>: 
            <Button disabled={!inputValue} className='w-full mt-4' onClick={updateData}>
                Atualizar
            </Button>}

            <div className='mt-4'>
                <h3>Quantidade: <span className='font-semibold'>{quantity ? quantity : "0"}</span> </h3>
                <h3>Quantidade de C02 por tolenada: <span className='font-semibold'>{co2 ? formatarNumero(co2) : "0"}</span> </h3>
                <h3>Quantidade de árvores para compensar: <span className='font-semibold'>{three ? formatarNumero(three) : "0"}</span> </h3>
            </div>
        </div>
    </div>
  )
}
