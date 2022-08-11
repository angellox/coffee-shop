import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';
import Producto from '../components/Producto';

export default function Home() {

  const { currentCategoria } = useQuiosco();

  return (
    <Layout pagina={`Menu ${currentCategoria?.nombre ? currentCategoria?.nombre : ''}`}>
      <h1 className='text-4xl font-black'>{currentCategoria?.nombre}</h1>
      <p className='text-2xl my-10 font-sans font-light'>
        Elige y personaliza tu pedido a continuación
      </p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {currentCategoria?.productos?.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>

    </Layout>
  )
}