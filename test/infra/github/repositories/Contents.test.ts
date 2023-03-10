import {Contents} from "../../../../src/infra/github";

test('깃허브 컨텐츠 가져오기', async () => {
    const contents = new Contents(process.env.GITHUB_TOKEN || '');
    const response = await contents.getContent({
        owner: 'laeng',
        repo: 'galaxyhub-bc-backend',
        path: 'README.md'
    });

    expect<string>(response.name).toBe('README.md');
});
