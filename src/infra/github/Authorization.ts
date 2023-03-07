import { env } from 'process';

export class Authorization {
    private readonly token: string;

    constructor() {
        this.token = process.env.GITHUB_TOKEN || '';
        console.log(this.token);
    }

    public getBaseUrl(): string {
        return 'https://api.github.com';
    }

    public getToken(): string {
        return this.token;
    }
}
