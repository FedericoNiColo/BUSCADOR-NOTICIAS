import { Grid, Typography } from '@mui/material'
import useNoticias from '../hooks/useNoticias'
import Noticia from './Noticia'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ListadoNoticias = () => {

    const { noticias, totalNoticias, handleChangePagina, pagina } = useNoticias()

    let totalPaginas = Math.ceil(totalNoticias / 20)


    return (
        <>
            <Typography
                textAlign={'center'}
                marginY={5}
                variant='h3'
                component={'h2'}
            >
                Últimas Noticias
            </Typography>

            <Grid
                container
                spacing={2}
            >
                {noticias.map(noticia => (
                    <Noticia
                        key={noticia.url}
                        noticia={noticia}
                    />
                ))}
            </Grid>

            <Stack
                spacing={2}
                direction={'row'}
                justifyContent='center'
                alignItems='center'
                marginY={10}
            >
                <Pagination
                    count={totalPaginas}
                    color="primary"
                    onChange={handleChangePagina}
                    page={pagina}
                />
            </Stack>

        </>
    )
}

export default ListadoNoticias
