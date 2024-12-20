import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

export class TranslationUtils {
  private static client = new TranslateClient({ region: "us-east-1" });

  static async translateKeys(data: Record<string, any>): Promise<Record<string, any>> {
    const translatedData: Record<string, any> = {};

    for (const key in data) {
      const translatedKey = await this.translateKey(key);
      translatedData[translatedKey] = data[key];
    }

    return translatedData;
  }

  static async translateKey(
    text: string,
    sourceLang: string = "en",
    targetLang: string = "es"
  ): Promise<string> {
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
    });

    try {
      const response = await this.client.send(command);
      return response.TranslatedText || text;
    } catch (error) {
      console.error(`Error translating text "${text}":`, error);
      return text;
    }
  }
}
