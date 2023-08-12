import { SprotEvent } from "../events/events.js";
import { EBoxModel, ISproChoice } from "../utils/interfaces.js";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
<path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M36 18L24 30L12 18"/>
</svg>`

interface IFunctor{
    functor(event: SprotChoiceEvent): void
}

export class SprotChoiceEvent extends SprotEvent{
    private _selection: EBoxModel;
    private _dropdown: boolean;

    constructor(){
        super();

        this._selection = EBoxModel.NONE;
        this._dropdown = false;
    }

    get selection() {return this._selection}
    set selection(s: EBoxModel ){this._selection = s;}

}

export class SprotChoice{
    private _name: HTMLElement;
    private _topLevel: HTMLElement | null;
    private _children: HTMLElement[];
    private _display: HTMLElement;
    private _actionSelection: HTMLElement | null;
    private _functor: IFunctor;
    
    constructor(private _parent: HTMLElement, private _choices: ISproChoice[]){
        this._topLevel = null;
        this._actionSelection = null;
        this._functor = { functor: () => {} };
        
        this._children =[ ];
        this._display = document.createElement("div");
        this._display.className = "display";
        
        this._name = document.createElement("span");
        
        
        this.createUi();
    }

    createUi(){
        const choiceDiv = document.createElement("div");
        choiceDiv.className = "choice-element";

        const svgSpan = document.createElement("span");
        svgSpan.innerHTML = svg;
        this._display.append(this._name);
        this._display.append(svgSpan);
        
        const topLevel = document.createElement("div");
        topLevel.classList.add("attributes");
        topLevel.classList.add("transient");
        topLevel.classList.add("top-level");

        this._display.addEventListener("click", ()=>{
            if(window.getComputedStyle(topLevel).display !== "none"){
                topLevel.style.display = "none";
                this._display.classList.remove("focus");
            }else{
                topLevel.style.display = "block";

                this._display.classList.add("focus");
                // this._display.style.backgroundColor = "red";
            }
        })


        const topLevelItems = document.createElement("ul");
        topLevelItems.className = "items";

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const body = document.querySelector("body") as HTMLElement | null;
        if(body){
            const font =  window.getComputedStyle(body).fontSize + " "+ window.getComputedStyle(body).fontFamily;
        if(ctx){
            ctx.font = font;
        }
        }

        let hightTextSize = 0;

        for(const item of this._choices){
            const child = document.createElement("li");
            child.textContent = item.value;
            topLevelItems.append(child);
            child.addEventListener("click", this.onSelection.bind(this));
            child.dataset.name = item.name;
            

            this._children.push(child);

            if(ctx){
                const w = ctx.measureText(item.value).width;

                if(w > hightTextSize){
                    hightTextSize = w;
                }
            }
        }

        this._display.style.width = String(hightTextSize += 48) + "px";

        topLevel.append(topLevelItems);
        choiceDiv.append(this._display);
        choiceDiv.append(topLevel);

        topLevel.style.position = "absolute";
        this._topLevel = topLevel;
        topLevel.style.width = hightTextSize + "px";

        this._parent.append(choiceDiv);

        window.addEventListener("click", (e: MouseEvent)=>{
            const actionElement = e.target as HTMLElement | null;
            if(actionElement === topLevel || topLevel.contains(actionElement) 
                || actionElement === this._display || this._display.contains(actionElement)  ){
                
            }else{
                if(window.getComputedStyle(topLevel).display !== "none"){
                    topLevel.style.display = "none";
                    this._display.classList.remove("focus");
                }
            }
        });
        
        
        // defaults
        this._name.append(this._choices.length > 0 ? this._choices[0].value : "");
        this.setSelection(this._choices.length > 0 ? this._choices[0].name : "");
    }

    addEventListener(type: "selection", functor: (event: SprotChoiceEvent) => void){
       this._functor = {functor};
    }

    onSelection = (e: MouseEvent) => {
        const actionElement = e.target as HTMLElement | null;
        this._actionSelection = actionElement;

        if(this._topLevel){
            this._topLevel.style.display = "none";
            this._display.classList.remove("focus");
        } 
        
        if(this._name && actionElement && actionElement.dataset.name){
            this.setSelection(actionElement.dataset.name);
        }
    }

    private fireSelectionEvent(selectn: string){
        const event = new SprotChoiceEvent();
        const selection = (selectn as EBoxModel | undefined);
        if(selection){
            event.selection = selection;
        }else{
            event.selection = EBoxModel.NONE;
        }
        this._functor.functor(event);
    }

    private display(dataset: DOMStringMap, elem: HTMLElement){
        if(!dataset.name || !elem.textContent){
            return;
        }
        this.fireSelectionEvent(dataset.name);
        this._name.replaceChildren(elem.textContent);
    }

    setSelection(name: string){
        
        for(const child of this._children){
            if(child.dataset.name?.trim().toLowerCase() === name.trim().toLowerCase() && child.textContent){
                this.display(child.dataset, child);
                break;
            }
        }
    }
}