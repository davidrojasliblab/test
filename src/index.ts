import { Environment } from './http/environment';
import { SdkConfig } from './http/types';
import { MorseService } from './services/morse';
import { BrailleService } from './services/braille';
import { StarwarsService } from './services/starwars';
import { StartrekService } from './services/startrek';
import { ElvishService } from './services/elvish';
import { CharactersService } from './services/characters';
import { DialectService } from './services/dialect';
import { PigLatinService } from './services/pig-latin';
import { GameOfThronesService } from './services/game-of-thrones';
import { EnglishService } from './services/english';
import { InternetFadService } from './services/internet-fad';

export * from './services/morse';
export * from './services/braille';
export * from './services/starwars';
export * from './services/startrek';
export * from './services/elvish';
export * from './services/characters';
export * from './services/dialect';
export * from './services/pig-latin';
export * from './services/game-of-thrones';
export * from './services/english';
export * from './services/internet-fad';

export * from './http';
export { Environment } from './http/environment';

export class Liblab {
  public readonly morse: MorseService;

  public readonly braille: BrailleService;

  public readonly starwars: StarwarsService;

  public readonly startrek: StartrekService;

  public readonly elvish: ElvishService;

  public readonly characters: CharactersService;

  public readonly dialect: DialectService;

  public readonly pigLatin: PigLatinService;

  public readonly gameOfThrones: GameOfThronesService;

  public readonly english: EnglishService;

  public readonly internetFad: InternetFadService;

  constructor(public config: SdkConfig) {
    this.morse = new MorseService(this.config);

    this.braille = new BrailleService(this.config);

    this.starwars = new StarwarsService(this.config);

    this.startrek = new StartrekService(this.config);

    this.elvish = new ElvishService(this.config);

    this.characters = new CharactersService(this.config);

    this.dialect = new DialectService(this.config);

    this.pigLatin = new PigLatinService(this.config);

    this.gameOfThrones = new GameOfThronesService(this.config);

    this.english = new EnglishService(this.config);

    this.internetFad = new InternetFadService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.morse.baseUrl = baseUrl;
    this.braille.baseUrl = baseUrl;
    this.starwars.baseUrl = baseUrl;
    this.startrek.baseUrl = baseUrl;
    this.elvish.baseUrl = baseUrl;
    this.characters.baseUrl = baseUrl;
    this.dialect.baseUrl = baseUrl;
    this.pigLatin.baseUrl = baseUrl;
    this.gameOfThrones.baseUrl = baseUrl;
    this.english.baseUrl = baseUrl;
    this.internetFad.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.morse.baseUrl = environment;
    this.braille.baseUrl = environment;
    this.starwars.baseUrl = environment;
    this.startrek.baseUrl = environment;
    this.elvish.baseUrl = environment;
    this.characters.baseUrl = environment;
    this.dialect.baseUrl = environment;
    this.pigLatin.baseUrl = environment;
    this.gameOfThrones.baseUrl = environment;
    this.english.baseUrl = environment;
    this.internetFad.baseUrl = environment;
  }

  set timeoutMs(timeoutMs: number) {
    this.morse.timeoutMs = timeoutMs;
    this.braille.timeoutMs = timeoutMs;
    this.starwars.timeoutMs = timeoutMs;
    this.startrek.timeoutMs = timeoutMs;
    this.elvish.timeoutMs = timeoutMs;
    this.characters.timeoutMs = timeoutMs;
    this.dialect.timeoutMs = timeoutMs;
    this.pigLatin.timeoutMs = timeoutMs;
    this.gameOfThrones.timeoutMs = timeoutMs;
    this.english.timeoutMs = timeoutMs;
    this.internetFad.timeoutMs = timeoutMs;
  }

  set token(token: string) {
    this.morse.token = token;
    this.braille.token = token;
    this.starwars.token = token;
    this.startrek.token = token;
    this.elvish.token = token;
    this.characters.token = token;
    this.dialect.token = token;
    this.pigLatin.token = token;
    this.gameOfThrones.token = token;
    this.english.token = token;
    this.internetFad.token = token;
  }

  set apiKey(apiKey: string) {
    this.morse.apiKey = apiKey;
    this.braille.apiKey = apiKey;
    this.starwars.apiKey = apiKey;
    this.startrek.apiKey = apiKey;
    this.elvish.apiKey = apiKey;
    this.characters.apiKey = apiKey;
    this.dialect.apiKey = apiKey;
    this.pigLatin.apiKey = apiKey;
    this.gameOfThrones.apiKey = apiKey;
    this.english.apiKey = apiKey;
    this.internetFad.apiKey = apiKey;
  }

  set apiKeyHeader(apiKeyHeader: string) {
    this.morse.apiKeyHeader = apiKeyHeader;
    this.braille.apiKeyHeader = apiKeyHeader;
    this.starwars.apiKeyHeader = apiKeyHeader;
    this.startrek.apiKeyHeader = apiKeyHeader;
    this.elvish.apiKeyHeader = apiKeyHeader;
    this.characters.apiKeyHeader = apiKeyHeader;
    this.dialect.apiKeyHeader = apiKeyHeader;
    this.pigLatin.apiKeyHeader = apiKeyHeader;
    this.gameOfThrones.apiKeyHeader = apiKeyHeader;
    this.english.apiKeyHeader = apiKeyHeader;
    this.internetFad.apiKeyHeader = apiKeyHeader;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
