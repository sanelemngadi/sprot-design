import { ISprotObserver } from "../../../utils/interfaces.js";
import { SprotCanvasView } from "../../../views/canvasview.js";
import { SprotAttributeValues } from "./boxmodel/attrubutes/values/index.js";
import { SprotBoxModelAttrubutes } from "./boxmodel/attrubutes/options.js";
import { SprotBoxModel } from "./boxmodel/box.js";


export class SprotPropertiesPanel implements ISprotObserver{
    private _name: string;
    private _boxModel: SprotBoxModel;
    private _canvasActionElement: HTMLElement | null;

    constructor(private _canvasView: SprotCanvasView, private _parentElement: HTMLElement){
        this._name = "Properties";
        _canvasView.register(this);
        this._canvasActionElement = null;

        this._boxModel = new SprotBoxModel(_parentElement);
        const modelAttrs = new SprotBoxModelAttrubutes(this._boxModel, _parentElement);
        new SprotAttributeValues(this._boxModel);
        this.togglePropertySections();
    }

    update(htmlElement: HTMLElement | null): void {
        this._canvasActionElement = htmlElement;
        const boxModel = document.querySelector(".property.box-model") as HTMLElement | null;

        console.log(htmlElement);

        if(htmlElement){
            if(boxModel){
                boxModel.style.display = "block";
            }
            this._boxModel.update(htmlElement);  
            
        }else{
            if(boxModel){
                boxModel.style.display = "none";
            }
        } 
    }

    private togglePropertySections(){
        const properContents = document.getElementsByClassName("property-content");
        Array.from(properContents).forEach(collection => {
            const elem = collection as HTMLElement;
            const toggle = collection.querySelector(".property-toggle") as HTMLInputElement;
            const body = collection.querySelector(".property-body") as HTMLElement;
            
            body.style.display = toggle.checked ? "block" : "none";            
            toggle.addEventListener("input", ()=>{
                body.style.display = toggle.checked ? "block" : "none";
            })
        })
    }

    set hide(h:boolean){
        this._parentElement.style.display = h ? "none" : "block";
    }
}