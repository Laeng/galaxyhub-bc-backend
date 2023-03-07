import {Authorization} from "../Authorization";
import {HttpHelper} from "@coralblack/cyan/dist/helper";
import {HttpRequestResponse} from "@coralblack/cyan/src/helper/Http.helper";

interface GetContentResponse {
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

export class Contents {
    private readonly baseUrl: string;
    private readonly token: string;
    private readonly http: HttpHelper;

    constructor() {
        const authorization = new Authorization();

        this.baseUrl = authorization.getBaseUrl();
        this.token = authorization.getToken();
        this.http = new HttpHelper();
    }

    public getContent({owner, repo, path}: GetContentParameter): Promise<HttpRequestResponse<GetContentResponse>> {
        return this.http.get<GetContentResponse>({
            url: `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${this.token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            },
            responseType: 'json'
        });
    }
}
