import { useEffect, useCallback } from 'react';
import Layout from '../layout/Layout';
import { formatMoney } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

export default function Total() {

    const { pedidos, nombre, setNombre, total, colocarOrden } = useQuiosco();

    const isPedido = useCallback(() => {
        return pedidos.length === 0 || nombre === '' || nombre.length < 3;
    }, [pedidos, nombre]);

    useEffect(() => {
        isPedido();
    }, [pedidos, isPedido]);

    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
            <p className='text-2xl my-10'>Confirma tu pedido a continuación</p>

            <form 
                onSubmit={colocarOrden}
            >
                <div>
                    <label
                        htmlFor='nombre'
                        className='block uppercase text-slate-800 text-xl'
                    >Nombre</label>

                    <input
                        id='nombre'
                        className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md border-2 border-slate-300 hover:border-b-orange-400 focus:border-b-orange-400 outline-none transition-all'
                        type='text'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                    <div className='mt-10 text-2xl'>
                        <p>Total a pagar: {' '}<span className='text-amber-500'>{formatMoney(total)}</span></p>
                    </div>

                    <div>
                        <input 
                            className={`${isPedido() ? 'hover:cursor-not-allowed bg-indigo-400' : 'hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700'} w-full lg:w-auto px-5 py-2 rounded uppercase text-white mt-5 text-center`}
                            type='submit'
                            value='Confirmar pedido'
                            disabled={isPedido()}
                        />
                    </div>
                </div>
            </form>
        </Layout>
    )
}