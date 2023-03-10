import {Contents as GitHubContents, GitHubContentResponse} from '../infra/github'
import {ConvertBase64} from "../helper/ConvertBase64";

export class GitHubContentRepository {
    private readonly githubToken = process.env.GITHUB_TOKEN || '';
    private readonly githubOwner = process.env.GITHUB_OWNER || '';
    private readonly githubRepo = process.env.GITHUB_REPO || '';
    private readonly documentApi: GitHubContents;

    constructor() {
        this.documentApi = new GitHubContents(this.githubToken);
    }

    public async getSponsorByYear(year: number): Promise<Sponsors> {
        const response = await this.getGithubContent(`/public/sponsor/${year}/user.json`);

        return ConvertBase64.toJson<Sponsors>(response.content);
    }

    public async getInfo(): Promise<Info> {
        const response = await this.getGithubContent('/public/info.json');

        return ConvertBase64.toJson<Info>(response.content);
    }

    public async getFaq(): Promise<Faq> {
        const response = await this.getGithubContent('/public/faq.json');

        return ConvertBase64.toJson<Faq>(response.content);
    }

    private async getGithubContent(path: string): Promise<GitHubContentResponse> {
        return await this.documentApi.getContent({
            owner: this.githubOwner,
            repo: this.githubRepo,
            path: path
        });
    }
}

export interface Sponsors {
    year: number,
    sponsors: SponsorData[]
}

export interface SponsorData {
    name: string,
    comment: string
}

export interface Info {
    en: InfoData,
    ko: InfoData
}

export interface InfoData {
    datetime: string,
    place: string,
    price: string,
    inform: string[],
    button: infoButton[]
}

export interface infoButton {
    "name": string,
    "url": ""
}

export interface Faq {
    en: FaqData[],
    ko: FaqData[]
}

export interface FaqData {
    question: string,
    answer: string
}
