import Image from 'next/image';
import useQuiosco from '../hooks/useQuiosco';
import Categoria from './Categoria';

const Sidebar = () => {

    const { categorias } = useQuiosco();

    return (
        <>
            <div className='mt-5'>
                <Image width={300} height={100} src='/assets/img/logo.svg' alt='Logotipo' />
            </div>

            <nav className='mt-10'>
                {categorias.map(categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar