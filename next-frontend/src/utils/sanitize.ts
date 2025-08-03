import DOMPurify from "dompurify"

export const sanitizeInput = (input: string): string => {
    // ブラウザ環境でのみ実行
    if (typeof window !== 'undefined') {
        return DOMPurify.sanitize(input, {
            ALLOWED_TAGS: [],    // HTMLタグを全て除去
            ALLOWED_ATTR: []    // 属性も全て除去
        })
    }
    // SSR時はフォールバック処理
    return input.replace(/[<>]/g, '')
}


export const validateInput = (input: string, maxLength: number): string => {
    // 長さ制限と危険な文字パターンをチェック
    const cleaned = input.slice(0, maxLength)
    // スクリプトタグや危険なパターンを除去
    return cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }