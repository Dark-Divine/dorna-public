import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const GET_INTRODUCER_ID = 'GET_INTRODUCER_ID'

export const useGetintroducerid = (id) => {
    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=Getintroducerid&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`
        )
        return res
    }
    return useQuery({
        queryFn,
        queryKey: [GET_INTRODUCER_ID],
        enabled: id ? true : false,
    })
}
