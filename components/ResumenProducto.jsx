import Image from 'next/image';
import { formatMoney } from '../helpers';
import PencilIcon from './PencilIcon';
import TrashIcon from './TrashIcon';
import useQuiosco from '../hooks/useQuiosco';

const ResumenProducto = ({ pedido }) => {

    const { handleEditarCantidad, handleEliminarProducto } = useQuiosco();
    return (
        <div className='shadow p-5 mb-3 flex gap-10 items-center'>
            <div className='md:w-1/6'>
                <Image
                    width={300}
                    height={400}
                    alt={`Imagen producto ${pedido?.nombre}`}
                    src={`/assets/img/${pedido?.imagen}.jpg`}
                />
            </div>

            <div className='md:w-4/6'>
                <p className='text-3xl font-bold'>{pedido.nombre}</p>
                <p className='text-xl font-bold mt-2'>Cantidad: <span className='text-amber-700'>{pedido.cantidad}</span></p>
                <p className='text-xl font-bold text-amber-500 mt-2'>{formatMoney(pedido.precio)}</p>
                <p className='text-lg text-gray-700 font-bold mt-2'>Subtotal: {formatMoney(pedido.precio * pedido.cantidad)}</p>
            </div>


            <div>
                <button
                    type='button'
                    className='bg-sky-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full hover:bg-sky-800'
                    onClick={() => handleEditarCantidad(pedido.id)}
                >
                    <PencilIcon />{' '}Editar
                </button>
                <button
                    type='button'
                    className='bg-rose-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full hover:bg-rose-800 mt-5 text-center'
                    onClick={() => handleEliminarProducto(pedido.id)}
                >
                    <TrashIcon />{' '}Eliminar
                </button>
            </div>
        </div>
    )
}

export default ResumenProducto