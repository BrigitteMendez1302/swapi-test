import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

export class TranslationUtils {
  private client: TranslateClient;
  private translationCache: { [key: string]: string } = {}; // Caché para traducciones

  constructor() {
    this.client = new TranslateClient({ region: "us-east-1" });
  }

  async translateKeys(data: any): Promise<any> {
    const translatedData: any = {};

    for (const key in data) {
      if (!key) {
        console.warn("Skipping null or undefined key");
        continue;
      }

      const translatedKey = await this.translateKey(key);
      translatedData[translatedKey] = data[key];
    }

    return translatedData;
  }

  private async translateKey(key: string, sourceLang: string = "en", targetLang: string = "es"): Promise<string> {
    if (this.translationCache[key]) {
      return this.translationCache[key];
    }

    const command = new TranslateTextCommand({
      Text: key,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
    });

    try {
      const response = await this.client.send(command);

      const translatedText = response.TranslatedText || key;
      this.translationCache[key] = translatedText;

      return translatedText;
    } catch (error) {
      console.error(`Error translating key "${key}":`, error);
      return key; // Si hay un error, retorna la clave original
    }
  }
}
