import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const FETCH_DRUGS_BY_SHAPE_ID = 'FETCH_DRUGS_BY_SHAPE_ID'

export const useFetchDrugsByShapeId = (id: number) => {
    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=GetAllHanyDrugsByShapId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`
        )
        return res
    }
    return useQuery({
        queryFn,
        queryKey: [FETCH_DRUGS_BY_SHAPE_ID, id],
        enabled: id ? true : false,
    })
}
