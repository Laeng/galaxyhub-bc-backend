import {ConvertBase64} from "../../src/util/ConvertBase64";

test('Base64를 텍스트로 변환하기', () => {
    const base64: string = 'aGVsbG8gd29ybGQ';

    expect<string>(ConvertBase64.toString(base64))
        .toBe('hello world');
})

test('Base64를 JSON으로 변환하기', () => {
    const base64: string = 'eyJoZWxsbyI6IndvcmxkIn0';

    expect<base64ToJson>(ConvertBase64.toJson<base64ToJson>(base64))
        .toStrictEqual({hello: 'world'});
});


interface base64ToJson {
    hello: string
}
