'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid"
import UserInfo from "./UserInfo"
import { useQueryClient } from "@tanstack/react-query"

const DashBoard = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const logout = async () => {
        try {
            queryClient.removeQueries(['user'])
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
            router.push('/auth')
        } catch (err) {
            console.error('ログアウトに失敗しました', err)
        }
    }

    return (
        <div>
            <ArrowRightEndOnRectangleIcon
                className="mb-6 h-6 w-6 text-blue-500 cursor-pointer"
                onClick={logout}
            />
            <UserInfo />
        </div>
    )
}

export default DashBoard