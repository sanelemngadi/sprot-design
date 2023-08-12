import { SprotPropertiesPanel } from "../public/panels/properties/index.js";
import { SprotObservable } from "../utils/observable.js";
import {Rectangle} from "../utils/rectangle.js";

export class SprotCanvasView extends SprotObservable{

    private _state: string = "hover";
    private _device: string = "desktop";

    constructor(public _canvas: HTMLElement){
        super();

        const panels = document.querySelector(".panels-content") as HTMLElement | null;;
        if(panels){
            const property = new SprotPropertiesPanel(this, panels);
        }

        //property.hide = true;
    }

    clearCanvas(){}
    get canvas(){return this._canvas;}

    addElement(){
        const div = document.createElement("div");
        this._canvas.append(div);
    }
    
    removeElement(){}
}