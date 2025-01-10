import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const FETCH_DRUG_SHAPES = 'FETCH_DRUG_SHAPES'

export const useFetchDrugShapes = () => {
    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=GetAllHandyDrugsShapes&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return res
    }
    return useQuery({
        queryFn,
        queryKey: [FETCH_DRUG_SHAPES],
    })
}
