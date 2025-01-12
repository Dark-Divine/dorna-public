import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const SEARCH_DRUGS = 'SEARCH_DRUGS'

export const useSearchDrugs = () => {
    async function queryFn() {
        const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetAllDrug&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return res.data
    }
    return useQuery({
        queryFn,
        queryKey: [SEARCH_DRUGS],
        retry: 1,
    })
}
