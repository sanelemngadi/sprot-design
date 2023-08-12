import { SprotElementMeta } from "../../../../sprot/metadata.js";
import { EBoxModel } from "../../../../sprot/utils/interfaces.js";
import { ISprotBoxModelObservable, ISprotBoxModelObserver } from "../../../../utils/interfaces.js";
// import { SprotBoxModelAttrubutes } from "./attrubutes.js";


const positionSvg = `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12L2 2L13 2" stroke="black" stroke-width="3"/><path d="M11 12L9.26795 9L12.7321 9L11 12Z" fill="#0E0E0E"/></svg>`;
const sidesSvg = `<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31174e-07 2L10 2L10 13" stroke="black" stroke-width="3"/></svg>`;
const constraintsSvg = `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 0V13.5H0" stroke="black" stroke-width="3"/></svg>`;


class SprotBoxModelObservable implements ISprotBoxModelObservable{
    protected observers: ISprotBoxModelObserver[];
    constructor(){
        this.observers = [];
    }
    register(observer: ISprotBoxModelObserver): void {
        this.observers.push(observer);
    }
    remove(observer: ISprotBoxModelObserver): void {
        
    }
    notify(): void{
        throw new Error("this method is not implemented");
    }
}

export class SprotBoxModel  extends SprotBoxModelObservable{
    private _box: HTMLElement | null;
    // private _attributes: SprotBoxModelAttrubutes;
    private _canvasActionElement: HTMLElement | null;
    private _actionBoxModelElement: HTMLElement | null;

    constructor(private _boxModel: HTMLElement){
        super();

        this._boxModel = _boxModel;
        this._box = document.querySelector(".box") as HTMLElement | null;
        this._canvasActionElement = null;
        this._actionBoxModelElement = null;

        // this._attributes = new SprotBoxModelAttrubutes(this, _boxModel);
        this.createUi();
        this.bindeEvents();
    }

    createUi(){
        if(!this._box){
            return;
        }
        const boxShadow =this.bundleElements(this._box, EBoxModel.BOXSHADOW);

        const transformation = this.bundleElements(boxShadow, EBoxModel.TRANSFORMATION);
        this.bundleButtonElements(transformation, EBoxModel.POSITION, positionSvg);
        this.bundleButtonElements(transformation, EBoxModel.SIDES, sidesSvg);
        this.bundleButtonElements(transformation, EBoxModel.CONSTRAINTS, constraintsSvg);

        const margin = this.bundleElements(transformation, EBoxModel.MARGIN);
        const border = this.bundleElements(margin, EBoxModel.BORDER);
        const padding = this.bundleElements(border, EBoxModel.PADDING);
        this.bundleElements(padding, EBoxModel.CONTENT);
    }

    bundleElements(parent: HTMLElement, bx: EBoxModel): HTMLElement{
        const child = document.createElement("div");
        if( bx !== EBoxModel.BOXSHADOW){
            child.classList.add('box_model-item');
        }
        child.classList.add(bx);
        child.title = bx;
        child.dataset.name = bx;
        child.style.setProperty("--name", `'${bx}'`);
        parent.append(child);
        return child;
    }
    
    bundleButtonElements(parent: HTMLElement, bx: EBoxModel, svg: string){
        const btn = document.createElement("button");
        btn.innerHTML = svg;
        btn.classList.add(bx);
        btn.dataset.name = bx;
        btn.title = bx;
        parent.append(btn);
    }

    bindeEvents(){
        this._box?.addEventListener("mousedown", this.onMouseLeftDown.bind(this));
        this._box?.addEventListener("mousemove", this.onMouseMove.bind(this));
        this._box?.addEventListener("mouseleave", ()=>{
            this.setCurrentBoxModelState("hover", "none");
        });
    }
    
    onMouseMove = (e: MouseEvent) =>{ 
        const element = e.target as HTMLElement | null;
        this.handleEvent(element, "hover");
    }

    onMouseLeftDown = (e: MouseEvent) => {
        const element = e.target as HTMLElement | null;
        this.handleEvent(element, "focus");

        this._actionBoxModelElement = element;
            this.notify();
    };

    private handleEvent(element: HTMLElement | null, state: "focus" | "hover"){
        this.clearBoxModel(state);
        element?.classList.add(state);
    }

    private clearBoxModel(state: string){
        if(this._box){
            this.setElementState(this._box, state);
        }
    }

    private setElementState(parent: HTMLElement, state: string){
        const children = Array.from(parent.children);
        if(parent.classList.contains(state)){
            parent.classList.remove(state);
        }
        
        for(const child of children){
            this.setElementState(child as HTMLElement, state);
        }
    }


    update(html: HTMLElement | null){
        this._canvasActionElement = html;
        // this method will update the box model values with the canvas element values

        if(html){
            const metadata = new SprotElementMeta(html);

            // fill values
            console.log("bx");
            this.setCurrentBoxModelState("focus", EBoxModel.TRANSFORMATION);
            
        }else{
            console.log("out");
            this.setCurrentBoxModelState("focus", "none");
            
        }

        this.notify();

    }

    setCurrentBoxModelState(state: "focus" | "hover", name: string){
        if(!this._box){
            return;
        }
        const element = this.findElementByDataName(this._box, name);
        this._actionBoxModelElement = element;

        this.handleEvent(element, state);
    }

    private findElementByDataName(parent: HTMLElement, name: string): HTMLElement | null{
        const children = Array.from(parent.children);
        const element = parent.dataset.name === name;
        if(element){
            return parent;
        }

        for(const child of children){
            const foundElement = this.findElementByDataName(child as HTMLElement, name);

            if(foundElement){
                return foundElement;
            }
        }

        return null;
    }

    notify(){
        for(const observer of this.observers){
            observer.update(this._actionBoxModelElement, this._canvasActionElement);
        }
    }
}
