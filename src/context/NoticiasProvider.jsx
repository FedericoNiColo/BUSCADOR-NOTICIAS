import axios from 'axios'
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({ children }) => {

    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)

    useEffect(() => {

        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?
            country=ar&category=${categoria}&language=es&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles);
            console.log(data)
            setTotalNoticias(data.totalResults)
            setPagina(1)
        }
        consultarAPI()

    }, [categoria])

    useEffect(() => {

        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?
            country=ar&category=${categoria}&page=${pagina}&language=es&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles);
            console.log(data)
            setTotalNoticias(data.totalResults)
        }
        consultarAPI()

    }, [pagina])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChangePagina = (e, valor) => {
        setPagina(valor)
    }

    return (
        <NoticiasContext.Provider
            value={{
                setCategoria,
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext