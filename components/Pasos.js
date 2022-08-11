import { useRouter } from 'next/router';
import { useState } from 'react';
import useQuiosco from '../hooks/useQuiosco';

const pasos = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Datos y Total', url: '/total' }
];

const Pasos = () => {

    const router = useRouter();

    const calcularProgreso = () => {
        return router.pathname === '/' ? 2 : router.pathname === '/resumen' ? 45 : 100;
    }

    return (
        <>
            <div className='flex justify-between mb-5'>
                {pasos.map(paso => (
                    <button
                        onClick={() => {
                            router.push(paso.url);
                        }}
                        className='text-2xl font-bold'
                        key={paso.paso}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>


            <div className='bg-gray-200 mb-10'>
                <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10' style={{ width: `${calcularProgreso()}%` }}></div>
            </div>
        </>
    )
}

export default Pasos