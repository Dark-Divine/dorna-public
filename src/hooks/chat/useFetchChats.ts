import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const FETCH_CHATS = 'FETCH_CHATS'

export const useFetchChats = () => {
    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=Getshowchanel&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return res
    }
    return useQuery({
        queryFn,
        queryKey: [FETCH_CHATS],
    })
}
