import axios from 'axios'
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({ children }) => {

    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [paginas, setPaginas] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)

    useEffect(() => {

        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?
            country=mx&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles);
            console.log(data)
            setTotalNoticias(data.totalResults)
        }
        consultarAPI()

    }, [categoria])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    return (
        <NoticiasContext.Provider
            value={{
                setCategoria,
                categoria,
                handleChangeCategoria,
                noticias
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