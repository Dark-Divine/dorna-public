import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const FETCH_DRUG_INFO = 'FETCH_DRUG_INFO'

export const useFetchDrugInfo = (id: number) => {
    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=GetHandyDrugWithId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`
        )
        return res[0]
    }
    return useQuery({
        queryFn,
        queryKey: [FETCH_DRUG_INFO, id],
        enabled: id ? true : false,
    })
}

// const getDrugInfo = () => {
//     axios
//         .get(
//             `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetHandyDrugWithId&apikey=${process.env.REACT_APP_API_KEY}&id=${id}`
//         )
//         .then(function (response) {
//             setDrug(() => response.data[0])
//         })
// }
