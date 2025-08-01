'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid"

const DashBoard = () => {
    const router = useRouter()
    const logout = async () => {
        try {
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
        </div>
    )
}

export default DashBoard