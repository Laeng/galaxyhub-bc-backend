import {Contents} from "../../../../src/infra/github";

test('깃허브 컨텐츠 가져오기', async () => {
    const contents = new Contents();
    const request = await contents.getContent({
        owner: 'laeng',
        repo: 'galaxyhub-bc-backend',
        path: 'README.md'
    });

    expect<number>(request.status).toBe(200);
});
