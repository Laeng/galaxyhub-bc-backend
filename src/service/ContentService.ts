import { Inject } from "@coralblack/cyan/dist/core";
import {
  FaqData,
  GitHubContentRepository,
  InfoData,
  LocationData,
  Sponsors
} from "../repository/GitHubContentRepository";
import {Cache} from "node-ts-cache";
import {Cache as CacheConfig} from "../config/Cache";

export class ContentService {
  private readonly supportLanguages = ["en", "ko"];
  private readonly documentRepository: GitHubContentRepository;

  constructor(@Inject() documentRepository: GitHubContentRepository) {
    this.documentRepository = documentRepository;
  }

  @Cache(CacheConfig.redisContainer, { ttl: 150 })
  public async getHomeContents(lang: string): Promise<EventInfo> {
    if (!this.isSupportLanguage(lang)) {
      lang = "en";
    }

    const info = await this.documentRepository.getInfo();
    const faq = await this.documentRepository.getFaq();
    const location = await this.documentRepository.getLocation();

    const years: number[] = [2023, 2022];
    const sponsors: Sponsors[] = [];

    for (const year of years) {
      const sponsor = await this.documentRepository.getSponsorByYear(year);
      sponsors.push(sponsor);
    }

    return {
      info: info[lang],
      faq: faq[lang],
      location: location[lang],
      sponsor: sponsors
    };
  }

  private isSupportLanguage(lang: string): boolean {
    return this.supportLanguages.includes(lang);
  }
}

export interface EventInfo {
  info: InfoData,
  faq: FaqData,
  location: LocationData,
  sponsor: Sponsors[]
}
