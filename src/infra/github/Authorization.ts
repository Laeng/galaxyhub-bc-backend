import { env } from 'process';

export class Authorization {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    public getBaseUrl(): string {
        return 'https://api.github.com';
    }

    public getToken(): string {
        return this.token;
    }
}
