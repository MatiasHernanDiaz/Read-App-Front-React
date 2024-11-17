export class Author {
    id?: number;
    lastName: string;
    firstName: string;
    nativeLanguage: Language;

    constructor(
        id: number,
        lastName: string,
        firstName: string,
        nativeLanguage: Language = Language.SPANISH
    ) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.nativeLanguage = nativeLanguage;
    }

    static fromJSON(json: { id: number; lastName: string; firstName: string; nativeLanguage: Language }): Author {
        return new Author(
            json.id,
            json.lastName,
            json.firstName,
            json.nativeLanguage
        );
    }
}

export enum Language {
    SPANISH = "SPANISH",
    ENGLISH = "ENGLISH",
    GERMAN = "GERMAN",
    PORTUGUESE = "PORTUGUESE",
    RUSSIAN = "RUSSIAN",
    ITALIAN = "ITALIAN",
    MANDARIN = "MANDARIN",
    ARAB = "ARAB",
    HINDI = "HINDI",
    FRENCH = "FRENCH",
    BENGALI = "BENGALI",
    JAPANESE = "JAPANESE"
}
