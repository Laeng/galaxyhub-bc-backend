export class ConvertBase64 {
  public static toJson<T>(base64: string): T {
    return JSON.parse(ConvertBase64.toString(base64));
  }

  public static toString(base64: string): string {
    return Buffer.from(base64, "base64").toString("utf8");
  }
}
