import {Authorization} from "../Authorization";
import {HttpHelper} from "@coralblack/cyan/dist/helper";

export class Contents {
    private readonly baseUrl: string;
    private readonly token: string;
    private readonly http: HttpHelper;

    constructor(apiKey: string) {
        const authorization = new Authorization(apiKey);

        this.baseUrl = authorization.getBaseUrl();
        this.token = authorization.getToken();
        this.http = new HttpHelper();
    }

    public async getContent({owner, repo, path}: GetContentParameter): Promise<GitHubContentResponse> {
        const response = await this.http.get<GitHubContentResponse>({
            url: `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${this.token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            },
            responseType: 'json'
        });

        if (response.status !== 200) {
            throw new Error(`${response.statusText} - ${path}`);
        }

        return response.body;
    }
}

export interface GitHubContentResponse {
    type: string,
    encoding: string,
    size: number,
    name: string,
    path: string,
    content: string,
    sha: string,
    url: string,
    git_url: string,
    html_url: string,
    download_url: string,
    "_links": {
        "git": string,
        "self": string,
        "html": string
    }
}

interface GetContentParameter {
    owner: string,
    repo: string,
    path: string
}
