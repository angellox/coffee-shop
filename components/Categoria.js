import Image from 'next/image';
import useQuiosco from '../hooks/useQuiosco';

const Categoria = ({ categoria }) => {

    const { currentCategoria, handleClickCategoria } = useQuiosco();
    const { nombre, icono, id } = categoria;

    return (
        <div className={`${currentCategoria?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4  w-full border px-8 py-4 hover:bg-amber-400 hover:scale-110 transition-all`}>
            <Image 
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
            />

            <button
                type='button'
                className='text-3xl font-bold hover:cursor-pointer'
                onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
        </div>
    )
}

export default Categoria