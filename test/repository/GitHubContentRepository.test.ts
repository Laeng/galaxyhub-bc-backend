import {GitHubContentRepository} from "../../src/repository/GitHubContentRepository";

const repository = new GitHubContentRepository();

test('후원자 목록 가져오기', async () => {
    const response = await repository.getSponsorByYear(2000);

    expect<string>(JSON.stringify(response)).toBe('{"year":2000,"sponsors":[{"name":"test","comment":"test"}]}');
});
