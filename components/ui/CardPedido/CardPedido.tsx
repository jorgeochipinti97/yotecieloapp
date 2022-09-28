import { Box, Typography, capitalize } from '@mui/material'
import React from 'react'
import { SlideShow } from '../SlideShow'
import { FC, useEffect } from 'react';
import { pedido } from '../../../interfaces';
import Image from 'next/image'
import NativeVideoPlayer from '../VideoPlayer';

interface Props {
    pedido: pedido
}


export const CardPedido: FC<Props> = ({ pedido }) => {

    useEffect(() => {

        console.log(pedido)
    }, [])
    return (
        <>
            <Box display='flex' flexDirection='column' justifyContent='space-between'  >
                <div data-aos="fade-right">
                    <Typography variant='h3' sx={{ fontFamily: 'Special Elite', textAlign: 'center', color: 'black', pt: 2, pb: 2 }}>
                        Alguien te quiere dejar un mensajito...
                    </Typography>
                </div>
                <div data-aos="fade-left">
                    <SlideShow images={pedido.images} />
                </div>
                {
                    pedido.videos[0].length > 0
                    &&
                    <Box display='flex' justifyContent='center'>
                        <div data-aos="fade-right">
                            <NativeVideoPlayer url={pedido.videos[0]} />
                        </div>
                    </Box>
                }

                <div data-aos="fade-left">
                    <Box >
                        <Typography variant='h6' sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'start', ml: 1 }}>
                            {`${capitalize(pedido.name)} ${capitalize(pedido.lastname)}  `}
                        </Typography>
                        <Box sx={{ m: 1 }}>
                            <Typography sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'justify' }}>
                                {capitalize(pedido.message)}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'end', mr: 2 }}>
                            {`${new Date(pedido.createdAt!).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}`}
                        </Typography>
                    </Box>
                </div>
            </Box >
        </>
    )
}
