import { ISprotBorder, ISprotBoxModel, ISprotContentImage, ISprotContentText, ISprotMargin, ISprotPadding, ISprotPen, ISprotSides, ISprotTransformation, TSprotPosition } from "./utils/interfaces.js";
import { SprotPen } from "./utils/pen.js";
import { TSprotBorderStyle } from "./utils/styles.js";

interface I{
    position: TSprotPosition;
    transformation: ISprotTransformation;
    margin?: ISprotMargin;
    border?: ISprotBorder;
    padding?: ISprotPadding;
    content?: ISprotContentText | ISprotContentImage;
    sides?: ISprotSides;
}

export class SprotElementMeta{
    constructor(private _element: HTMLElement){}

    isFocuseable(): boolean{
        const isInput = (this._element.tabIndex === undefined && this._element instanceof HTMLInputElement);
        return this._element.tabIndex >= 0 || isInput;
    }

    getBoxModel(): ISprotBoxModel{
        const box: ISprotBoxModel = {
            position: this.getCssPosition() as TSprotPosition,
            transformation: this.getTransformation(),
            margin: this.getMargin(),
            padding: this.getPadding(),
            border: this.getBorder(),
            sides: this.getSides(),
            content: this.getContent()
        }
        return box;
    }

    private getComputedStyes(): CSSStyleDeclaration{
        return window.getComputedStyle(this._element);
    }

    private getCssPosition(){
        return this.getComputedStyes().position;
    }

    private getTransformation(): ISprotTransformation{
        const x = String(this._element.offsetLeft);
        const y = String(this._element.offsetTop);
        const width = this.getComputedStyes().width;
        const height = this.getComputedStyes().height;
        const trans: ISprotTransformation = {x, y, width, height};
        return trans;
    }

    private getMargin(): ISprotMargin{
        const top = this.getComputedStyes().marginTop;
        const right = this.getComputedStyes().marginRight;
        const bottom = this.getComputedStyes().marginBottom;
        const left = this.getComputedStyes().marginLeft;

        return {top, right, bottom, left};
    }

    private getPadding(): ISprotPadding{
        const top = this.getComputedStyes().paddingTop;
        const right = this.getComputedStyes().paddingRight;
        const bottom = this.getComputedStyes().paddingBottom;
        const left = this.getComputedStyes().paddingLeft;

        return {top, right, bottom, left};
    }

    private getBorder(): ISprotBorder{
        const s =this.getComputedStyes();
        const top = new SprotPen(s.borderTopWidth,s.borderTopColor, 
            s.borderTopStyle  as TSprotBorderStyle);
        const right = new SprotPen(s.borderRightWidth,s.borderRightColor, 
            s.borderRightStyle  as TSprotBorderStyle);
        const bottom = new SprotPen(s.borderBottomWidth,s.borderBottomColor, 
            s.borderBottomStyle  as TSprotBorderStyle);
        const left = new SprotPen(s.borderLeftWidth,s.borderLeftColor, 
            s.borderLeftStyle  as TSprotBorderStyle);

        return {top, right, bottom, left};
    }

    private getSides(): ISprotSides{
        const s = this.getComputedStyes();
        const left = s.left;
        const right = s.right;
        const top = s.top;
        const bottom = s.bottom;
        return {left, right, top, bottom};
    }

    private getContent(): ISprotContentText | ISprotContentImage | null{
        const s = this.getComputedStyes();

        if(this._element instanceof Text && this._element.textContent && this._element.textContent.trim() != ''){
            const txt: ISprotContentText = {size: s.fontSize, weight: s.fontWeight,
                lineSpacing: s.lineHeight, charecterSpacing: s.wordSpacing};
            return txt;
        }else if(this._element instanceof HTMLImageElement){            
            const img: ISprotContentImage = {
                src: this._element.src,
                alt: this._element.alt 
            }
            return img;
        }
        return null;
    }
}