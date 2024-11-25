export interface IToken {
    accessToken: string
    user: {
        id: number
        name: string
        email: string
        papel: string
    }
}