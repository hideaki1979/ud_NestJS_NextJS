import AccountForm from "@/components/AccountForm";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'ログイン認証',
        description: 'ログインまたはサインアップしてアカウントにアクセス'
    }
}

export default function AuthPage() {
    return (
        <AccountForm />
    )
}
