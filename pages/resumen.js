import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import ResumenProducto from '../components/ResumenProducto';

export default function Resumen() {

    const { pedidos } = useQuiosco();

    return (
        <Layout pagina='Resumen'>
            <h1 className='text-4xl font-black'>Resumen</h1>
            <p className='text-2xl my-10'>Revisa tu pedido</p>

            {pedidos.length === 0 ? (
                <p className='text-center text-2xl'>No hay elementos aún</p>
            ) : (
                pedidos.map( pedido => (
                    <ResumenProducto 
                        key={pedido.id}
                        pedido={pedido}
                    />
                ))
            )}

        </Layout>
    )
}