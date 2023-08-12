import { TSprotBackgroundStyle } from "./styles.js";

export class SprotBrush{
    constructor(private _color: string = "black", 
        private _style: TSprotBackgroundStyle = "solid"){

        }

    set color(c: string){ this._color = c; }
    get color(){ return this._color; }

    set style(s: TSprotBackgroundStyle) {this._style = s;}
    get style() {return this._style;}
}