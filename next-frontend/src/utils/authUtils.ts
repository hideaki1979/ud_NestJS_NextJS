import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleAuthError = (err: AxiosError, router: AppRouterInstance) => {
    if (err instanceof AxiosError) {
        if (err.response?.status === 401 || err.response?.status === 403) {
            router.push('/auth')
        }
    }
}