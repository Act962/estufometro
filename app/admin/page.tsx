"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client';
import { LoaderCircle } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';

export default function Page() {
    const supabase = createClient()
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

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
        </div>
    </div>
  )
}
