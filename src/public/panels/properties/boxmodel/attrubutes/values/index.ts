import { EBoxModel } from "../../../../../../sprot/utils/interfaces.js";
import { ISprotBoxModelObserver } from "../../../../../../utils/interfaces.js";
import { SprotBoxModel } from "../../box.js";
import { SprotAttributeValueFactor } from "./factory.js";

export class SprotAttributeValues implements ISprotBoxModelObserver{
    private _attributeValues: HTMLElement | null;

    constructor(private _parent: SprotBoxModel){
        this._attributeValues = document.querySelector(".attribute-values");

        _parent.register(this);
    }

    update(htmlElement: HTMLElement , canvasActionElement: HTMLElement | null): void {       

        if(htmlElement && this._attributeValues && canvasActionElement){
            const name = htmlElement.dataset.name;
            if(name){
                new SprotAttributeValueFactor(this._attributeValues, canvasActionElement, 
                    name as EBoxModel);
            }

        }else{
            if(this._attributeValues){
                //this._attributeValues.replaceChildren();
            }
        }
        
    }
}