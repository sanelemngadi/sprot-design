import { SprotPen } from "./pen.js";

export type TSprotPosition = "static" | "relative" | "absolute" | "fixed" | "sticky"
export interface ISprotSides{
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export interface ISprotTransformation{
    x: string;
    y: string;
    width: string;
    height: string;
}

export interface ISprotContentImage{
    alt: string;
    src: string,
}

export interface ISprotContentText{
    size: string;
    weight: string;
    lineSpacing: string;
    charecterSpacing: string;
}

export interface ISprotPen{
    size: string;
    color: string;
    style: string;
}


export interface ISprotMargin extends ISprotSides{}
export interface ISprotPadding extends ISprotSides{}
export interface ISprotBorder {
    top?: SprotPen;
    right?: SprotPen;
    bottom?: SprotPen;
    left?: SprotPen;
}

export interface ISprotBoxShadow{
    x: string;
    y: string;
    blur: string;
    spread: string;
    color: string;
    opacity: string;
}


export interface ISprotBoxModel{
    position: TSprotPosition;
    transformation: ISprotTransformation;
    margin?: ISprotMargin;
    border?: ISprotBorder;
    padding?: ISprotPadding;
    content?: ISprotContentText | ISprotContentImage | null;
    sides?: ISprotSides;
}

export type TBoxModel = "transformation" | "margin" | "border" |
       "padding" | "content" | "sides" | "constraints";

export enum EBoxModel{
    NONE = "none",
    TRANSFORMATION = "transformations",
    MARGIN = "margin",
    BORDER = "border",
    PADDING = "padding",
    CONTENT = "content",
    SIDES = "sides",
    POSITION = "position",
    CONSTRAINTS = "constraints",
    BOXSHADOW = "box-shadow",
}


export interface ISproChoice{
    name: string,
    value: string
}