import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

  const [categorias, setCategorias] = useState([]);
  const [currentCategoria, setCurrentCategoria] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias');
    setCategorias(data);
  }

  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat => cat.id === id)
    setCurrentCategoria(categoria[0]);
    router.push('/');
  }

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCurrentCategoria(categorias[0]);
  }, [categorias]);

  const handleSetProducto = (producto) => {
    setProducto(producto);
  }

  const handleChangeModal = () => {
    setModal(!modal);
  }

  const handleSetPedido = ({ categoriaId, ...producto }) => {

    const pedido = pedidos.some(pedido => pedido.id === producto.id);
    // Editando pedido
    if (pedido) {
      const pedidosActualizados = pedidos.map(pedido => pedido.id === producto.id ? producto : pedido);
      setPedidos(pedidosActualizados);
      toast.success('Guardado correctamente');
    } else {
      // Añadiendo pedido
      setPedidos([...pedidos, producto]);
      toast.success('Agregado al pedido');
    }
    setModal(!modal);
  }

  const handleEditarCantidad = id => {
    const pedidoActualizado = pedidos.filter(pedido => pedido.id = id);
    setProducto(pedidoActualizado[0]);
    setModal(!modal);
  }

  const handleEliminarProducto = id => {
    const pedidosActualizados = pedidos.filter(pedido => pedido.id != id);
    setPedidos(pedidosActualizados);
  }

  const colocarOrden = async e => {
    e.preventDefault();
    try {

      await axios.post('/api/ordenes', { pedidos, nombre, total, fecha: Date.now().toString() });
      // Reset app
      setCurrentCategoria(categorias[0]);
      setPedidos([]);
      setNombre('');
      setTotal(0);

      toast.success('Pedido realizado correctamente');
      setTimeout(() => { router.push('/'); }, 3000);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const res = pedidos.reduce((total, curr) => {
      return total + (curr.cantidad * curr.precio)
    }, 0);
    setTotal(res);
  }, [pedidos]);

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        currentCategoria,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleSetPedido,
        pedidos,
        handleEditarCantidad,
        handleEliminarProducto,
        nombre,
        setNombre,
        total,
        colocarOrden
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext;