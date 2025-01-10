import { useQuery } from '@tanstack/react-query'
import crudService from '../../utils/api'

export const FETCH_DORNA_COINS = 'FETCH_DORNA_COINS'

export const useFetchDornaCoins = () => {
    const token = localStorage.getItem('token')

    async function queryFn() {
        const res = await crudService.get(
            `api/doapi?func=GetUserDornaWithToken&apikey=${process.env.REACT_APP_API_KEY}&token=${token}`
        )
        return res[0]
    }
    return useQuery({
        queryFn,
        queryKey: [FETCH_DORNA_COINS],
    })
}

// const getdornaCoins = () => {
//     if (!id) return
//     axios
//         .get(
//             `${process.env.REACT_APP_API_GATEWAY}api/doapi?func=GetUserDornaWithToken&apikey=${process.env.REACT_APP_API_KEY}&token=${token}`
//         )
//         .then(function (response) {
//             localStorage.setItem(
//                 'last_auth_date',
//                 new Date().toLocaleDateString()
//             )
//             setCoin(() => response?.data[0]?.dorna)
//         })
// }
