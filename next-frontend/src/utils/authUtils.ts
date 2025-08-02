import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleAuthError = (err: AxiosError, router: AppRouterInstance) => {
    const status = err.response?.status
    if (status === 401 || status === 403) {
        console.warn(`認証エラーが発生しました。ステータス：${status}`)
        const currentPath = window.location.pathname
        router.push(`/auth?redirect=${encodeURIComponent(currentPath)}`)
    }
}