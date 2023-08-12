import { TSprotBorderStyle } from "./styles.js";

export class SprotPen{
    constructor(private _size: string = "1px", private _color: string = "black", 
        private _style: TSprotBorderStyle = "solid"){

        }

    set color(c: string){ this._color = c; }
    get color(){ return this._color; }

    set size(s: string){this.size = s;}
    get size(){ return this._size;}

    set style(s: TSprotBorderStyle) {this._style = s;}
    get style() {return this._style;}
}