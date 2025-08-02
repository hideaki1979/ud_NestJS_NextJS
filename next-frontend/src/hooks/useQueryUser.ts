import { QUERY_KEYS } from "@/constants/queryKeys"
import { UserPayload } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"

const getUser = async () => {
    const { data } = await axios.get<UserPayload>(
        `${process.env.NEXT_PUBLIC_API_URL}/user`
    )
    return data
}

export const useQueryUser = () => {
    const router = useRouter()
    return useQuery<UserPayload>({
        queryKey: [QUERY_KEYS.USER],
        queryFn: getUser,
        staleTime: 300000,   // 5分
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/auth')
                }
            }
        }
    })
}
