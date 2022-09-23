import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { dbPedidos } from '../../database';
import { pedido } from '../../interfaces';
import { CardPedido, LayoutClient, SlideShow } from '../../components'
import { FullScreenLoading } from '../../components/FullScreenLoading';

interface Props {
    pedido: pedido
}


const PedidosPage: NextPage<Props> = ({ pedido }) => {
    const [loading, setIsLoading] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(true)
        }, 2000);

        return () => clearInterval(interval)
    }, []);

    return (
        <>
            <LayoutClient title='Yo te cielo'>
                {
                    !loading
                        ? <FullScreenLoading />
                        : <CardPedido pedido={pedido} />
                }
            </LayoutClient>
        </>
    )
}


export default PedidosPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { id = '' } = query;

    let pedido: pedido | null;

    pedido = await dbPedidos.getPedidoById(id.toString())

    if (!pedido && pedido != undefined) {
        return {
            redirect: {
                destination: '/create',
                permanent: false,
            }
        }
    }

    return {
        props: {
            pedido,
        }
    }
}