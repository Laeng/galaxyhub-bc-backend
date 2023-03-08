import {Contents as GitHubContents} from '../infra/github'
import {ConvertBase64} from "../helper/ConvertBase64";

export class GitHubDocumentRepository {
    private readonly GITHUB_OWNER = process.env.GITHUB_OWNER || '';
    private readonly GITHUB_REPO = process.env.GITHUB_REPO || '';

    private readonly documentApi: GitHubContents;

    constructor() {
        this.documentApi = new GitHubContents();
    }

    public async getI18nByLang(lang: string): Promise<object> {
        const response = await this.documentApi.getContent({
            owner: this.GITHUB_OWNER,
            repo: this.GITHUB_REPO,
            path: `public/lang/${lang}.json`
        });

        return ConvertBase64.toJson<object>(response.content);
    }

    public async getSponsorByYear(year: number): Promise<object> {
        const response = await this.documentApi.getContent({
            owner: this.GITHUB_OWNER,
            repo: this.GITHUB_REPO,
            path: `/public/document/sponsor/${year}/user.json`
        });

        return ConvertBase64.toJson<object>(response.content);
    }

    public async getContentByName(pageName:string, sectionName:string, fileName:string): Promise<object> {
        const response = await this.documentApi.getContent({
            owner: this.GITHUB_OWNER,
            repo: this.GITHUB_REPO,
            path: `/public/document/content/${pageName}/${sectionName}/${fileName}.json`
        });

        return ConvertBase64.toJson<object>(response.content);
    }
}
