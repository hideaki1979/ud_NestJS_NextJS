import DOMPurify from "dompurify"

export const sanitizeInput = (input: string | null | undefined): string => {
    if (!input) {
        return ''
    }
    // ブラウザ環境でのみ実行
    if (typeof window !== 'undefined') {
        return DOMPurify.sanitize(input, {
            ALLOWED_TAGS: [],    // HTMLタグを全て除去
            ALLOWED_ATTR: []    // 属性も全て除去
        })
    }
    // SSR時はフォールバック処理
    return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/style\s*=/gi, '')
        .replace(/data:/gi, '')
}

export const validateInput = (input: string, maxLength: number): string => {
    if (!input) {
        return ''
    }

    // 長さ制限と危険な文字パターンをチェック
    const cleaned = input.slice(0, maxLength)
    // スクリプトタグや危険なパターンを除去
    return cleaned
        .replace(/<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
        .replace(/<\s*script\b[^>]*>/gi, '')
        .replace(/javascript\s*:/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
}