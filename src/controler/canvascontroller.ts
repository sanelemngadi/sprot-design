import { SprotCanvasDocument } from "../models/canvasmodel.js";
import { SprotCanvasView } from "../views/canvasview.js";

export class SprotCanvasController{
    private _prevActionElement: HTMLElement | null;
    constructor(private _view: SprotCanvasView, private _document: SprotCanvasDocument){
        this._prevActionElement = null;
    }

    init(){
        this.bindEvents();
    }

    bindEvents(){
        this._view._canvas.addEventListener("mousedown", this.onMouseLeftDown.bind(this));
        this._view._canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this._view._canvas.addEventListener("mouseup", this.onMouseLeftUp.bind(this));
    }

    onMouseMove = (e: MouseEvent) => {
    }

    onMouseLeftDown = (e: MouseEvent) => {
        
        const actionElement = e.target as HTMLElement | null;

        if(actionElement === this._prevActionElement){
            return;
        }
        
        if(actionElement !== this._view._canvas){
            // console.log("mouse down: ", actionElement);
            this._view.actionElement = actionElement;

            if(actionElement){
                actionElement.classList.add("focus");
            }
        }else{
            // console.log("Canvas");
            this._view.actionElement = null;
            
        }

        if(this._prevActionElement){
            this._prevActionElement.classList.remove("focus");
        }

        this._prevActionElement = actionElement;

    }
    onMouseLeftUp = (e: MouseEvent) => {
        console.log("mouse up");
        
    }

    addDiv(){
        this._view.addElement();
    }
}