import { SprotChoice, SprotChoiceEvent } from "../../../../../sprot/elements/choice.js";
import { EBoxModel, ISproChoice } from "../../../../../sprot/utils/interfaces.js";
import { ISprotBoxModelObserver } from "../../../../../utils/interfaces.js";
import { SprotBoxModel } from "../box.js";

export class SprotBoxModelAttrubutes implements ISprotBoxModelObserver {
    private _attributes: SprotChoice | null;
    constructor(private _parentBoxModel: SprotBoxModel ,private _boxModelHTMLElement: HTMLElement){
        this._boxModelHTMLElement = _boxModelHTMLElement;
        _parentBoxModel.register(this);

        const items: ISproChoice[] = [];
        items.push({name: EBoxModel.NONE, value: "Select Item"});
        items.push({name: EBoxModel.TRANSFORMATION, value: "Transformations"});
        items.push({name: EBoxModel.BORDER, value: "Border"});
        items.push({name: EBoxModel.MARGIN, value: "Margin"});
        items.push({name: EBoxModel.PADDING, value: "Padding"});
        items.push({name: EBoxModel.SIDES, value: "Sides"});
        items.push({name: EBoxModel.BOXSHADOW, value: "Box Shadow"});
        items.push({name: EBoxModel.CONTENT, value: "Content"});
        items.push({name: EBoxModel.CONSTRAINTS, value: "Constraints"});
        this._attributes = null;

        const doc = document.querySelector(".property-attributes") as HTMLElement | null;
        if(doc){
            this._attributes = new SprotChoice(doc, items);

            this._attributes.addEventListener("selection", (evt: SprotChoiceEvent)=>{
                this._parentBoxModel.setCurrentBoxModelState("focus", evt.selection); 
            });
        }

    }
    setSelection(selection: string){
        this._attributes?.setSelection(selection);
    }

    update(actionBoxModelElement: HTMLElement | null){
        if(actionBoxModelElement){
            const name = actionBoxModelElement.dataset.name;
            this.setSelection(name ? name : "none");
        }else{
            this.setSelection("none");
        }
    }
}