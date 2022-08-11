import { useState, useEffect } from 'react';
import Image from 'next/image';

import useQuiosco from '../hooks/useQuiosco';
import { formatMoney } from '../helpers';

import PlusIcon from './PlusIcon';
import MinusIcon from './MinusIcon';
import ClosedIcon from './ClosedIcon';

const ModalProducto = () => {

    const { producto, handleChangeModal, handleSetPedido, pedidos } = useQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [isPresent, setIsPresent] = useState(false);

    useEffect(() => {
        if(pedidos.some(pedido => pedido.id === producto.id)) {
            const pedidoExistente = pedidos.find(pedido => pedido.id === producto.id);
            setIsPresent(!isPresent);
            setCantidad(pedidoExistente.cantidad);
        }
    }, [producto, pedidos]);

    return (
        <div className='md:flex gap-10'>
            <div className='md:w-1/3'>
                <Image
                    width={300}
                    height={400}
                    alt={`Imagen producto ${producto.nombre}`}
                    src={`/assets/img/${producto.imagen}.jpg`}
                />
            </div>

            <div className='md:w-2/3'>
                <div className='flex justify-end'>
                    <button
                        onClick={handleChangeModal}
                    >
                        <ClosedIcon />
                    </button>
                </div>
                <h1 className='text-3xl font-bold mt-5'>{producto.nombre}</h1>
                <p className='mt-5 text-5xl text-amber-500'>{formatMoney(producto.precio)}</p>

                <div className='flex gap-4 mt-5'>
                    <button
                        type='button'
                        onClick={() => {
                            if(cantidad <= 1) return;
                            setCantidad(--cantidad);
                        }}
                    >
                        <MinusIcon h={6} w={6} />
                    </button>

                    <p className='text-3xl'>{cantidad}</p>

                    <button
                        type='button'
                        onClick={() => {
                            if(cantidad >= 5) return;
                            setCantidad(++cantidad);
                        }}
                    >
                        <PlusIcon h={6} w={6} />
                    </button>
                </div>

                <button
                    type='button'
                    className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
                    onClick={() => handleSetPedido({ ...producto, cantidad })} 
                >
                    {isPresent ? 'Guardar cambios' : 'Añadir al pedido'}
                </button>

            </div>
        </div>
    )
}

export default ModalProducto