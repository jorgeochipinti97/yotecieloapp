import useSWR, { SWRConfiguration } from 'swr';
import { pedido } from '../interfaces';



export const usePedidos = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<pedido[]>(`/api${ url }`, config );

    return {
        pedidos: data || [],
        isLoading: !error && !data,
        isError: error
    }

}