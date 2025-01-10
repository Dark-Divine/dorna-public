import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const FETCH_NEWS = 'FETCH_NEWS'

export const useFetchNews = () => {
    const token = localStorage.getItem('token')

    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=GetTazeha&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return res
    }
    return useQuery({
        queryFn,
        queryKey: [FETCH_NEWS],
    })
}

// const getNews = () => {
//     axios
//         .get(
//             `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetTazeha&apikey=${process.env.REACT_APP_API_KEY}`
//         )
//         .then(function (response) {
//             setNews(() => response.data)
//         })
//         .catch((error) => {
//             setNews([])
//         })
// }
