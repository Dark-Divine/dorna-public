import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const TASK_QUERY_KEY = 'user_tasks'
export const useGetTasks = () => {
    console.log('dd', `${process.env.REACT_APP_API_KEY}`)
    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=Getshowchanel&apikey=${process.env.REACT_APP_API_KEY}&show=0`
        )
        console.log('res', res)

        return res.data
    }
    return useQuery({
        queryFn,
        queryKey: [TASK_QUERY_KEY],
    })
}
