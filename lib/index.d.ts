/// <reference types="cheerio" />
export declare enum MarkType {
    "folder" = "folder",
    "site" = "site"
}
export declare type TMarkType = keyof typeof MarkType;
export interface IBaseMark {
    name: string;
    type: TMarkType;
    href: string;
    icon: string;
    children: IBaseMark[];
}
export interface IFolderMark extends IBaseMark {
    type: "folder";
    children: IBaseMark[];
}
export interface ISiteMark extends IBaseMark {
    type: "site";
    children: [];
}
export declare const getRootFolder: (body: cheerio.Cheerio) => cheerio.Cheerio;
export declare const parseByString: (content: string) => IBaseMark[];
export declare const parseByPath: (path: string) => IBaseMark[];
declare const _default: {
    parseByPath: (path: string) => IBaseMark[];
    parseByString: (content: string) => IBaseMark[];
};
export default _default;
