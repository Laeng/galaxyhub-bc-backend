import {GitHubDocumentRepository} from "../../src/repository/GitHubDocumentRepository";

const repository = new GitHubDocumentRepository();

test('언어파일 가져오기', async () => {
    const response = await repository.getI18nByLang('test');

    expect<string>(JSON.stringify(response)).toBe('{"name":"test"}');
});

test('후원자 목록 가져오기', async () => {
    const response = await repository.getSponsorByYear(2000);

    expect<string>(JSON.stringify(response)).toBe('{"year":2000,"sponsors":[{"name":"test","comment":"test"}]}');
});

test('컨텐츠 가져오기', async () => {
    const response = await repository.getContentByName('test', 'test', 'test');

    expect<string>(JSON.stringify(response)).toBe('{"hello":"world"}');
});
