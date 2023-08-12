import { SprotEvent } from "../events/events.js";

const upSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8.97" viewBox="0 0 400 448"><path fill="currentColor" d="m44 273l156-139l156 137q4 4 15 4q10 0 17-6q13-15-2-30L200 79L14 241q-14 16-2 30q14 13 32 2z"/></svg>`;

const downSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="9.15" viewBox="0 0 392 448"><path fill="currentColor" d="m192 284l186-162q15-17 2-30q-17-17-30-2L192 228L36 90Q23 75 6 92q-14 14 3 30z"/></svg>`;

type SprotNumericEntryEventType = "change" | "increment" | "decrement";
export class SprotNumericEntryEvent extends SprotEvent{
    constructor(private eventType: SprotNumericEntryEventType, private _value: string){
        super();
    }

    get value(){return this._value};
    set value(v: string) {this._value = v;}
}

interface IEvent{
    type: SprotNumericEntryEventType,
    functor(event: SprotNumericEntryEvent):void;
}

// event types, on increment, on decrement, on value change

class SprotBindEvents{
    constructor(){}

    fireEvents(){}
}

export class SprotNumericEntry{
    private _events: IEvent[];

    constructor(private _parent: HTMLElement, private _label: string, 
        private _initValue: number , private _title: string ){
        const nullEvent = new SprotNumericEntryEvent("change", "");
        this._events = [];
        this.createUi();
    }

    createUi(){
        const divItems = document.createElement("div");
        divItems.className = "items";

        const label = document.createElement("label");
        label.htmlFor = this.getRandomId();
        label.innerHTML = this._label;
        label.title = this._title;

        const input = document.createElement("input");
        input.type = "number";
        input.name =  this.getRandomId();
        input.id =  this.getRandomId();
        input.value = String(this._initValue);

        divItems.append(label);
        divItems.append(input);

        const divActions = document.createElement("div");
        divActions.className = "actions";
        
        const spanUp = document.createElement("span");
        spanUp.className = "up";
        spanUp.innerHTML = upSvg;
        spanUp.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();

            const event = new SprotNumericEntryEvent("increment", input.value);
            this.processEvents("increment", event);

            const chgEvt = new SprotNumericEntryEvent("change", input.value);
            this.processEvents("change", chgEvt);
            input.focus();

            this.increment(input);
        });
        
        const spanDown = document.createElement("span");
        spanDown.className = "down";
        spanDown.innerHTML = downSvg;
        spanDown.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();

            const event = new SprotNumericEntryEvent("decrement", input.value);
            this.processEvents("decrement", event);


            const chgEvt = new SprotNumericEntryEvent("change", input.value);
            this.processEvents("change", chgEvt);
            input.focus();
            
            this.decrement(input);
        });
        
        // input.addEventListener("input", (e)=>{
        //     e.preventDefault();
        //     const event = new SprotNumericEntryEvent("change", input.value);
            
        //     this.processEvents("change", event);
        // })

        input.addEventListener("change", (e)=>{
            e.preventDefault();
            const event = new SprotNumericEntryEvent("change", input.value);
            console.log("hellow");
            
            
            this.processEvents("change", event);
        })

        input.addEventListener("keydown", (evt) => {
            if(evt.key === "Enter" || evt.keyCode === 13){
                input.blur();

                const event = new SprotNumericEntryEvent("change", input.value);
                this.processEvents("change", event);
            }
        })

        divActions.append(spanUp);
        divActions.append(spanDown);

        divItems.append(divActions);


        // on input focus 
        input.addEventListener("focusin", ()=> divItems.classList.add("focus"));
        input.addEventListener("focusout", ()=> divItems.classList.remove("focus"));

        this._parent.append(divItems);
    }

    processEvents(type: SprotNumericEntryEventType, evt: SprotNumericEntryEvent){
        for(const event of this._events){
            if(event.type === type){
                event.functor(evt);
            }
        }
    }

    increment(input: HTMLInputElement, n: number = 1){
        const currValue = parseInt(input.value);
        const newValue = currValue + n;
        input.value = String(newValue);
    }

    decrement(input: HTMLInputElement, n: number = 1){
        const currValue = parseInt(input.value);
        const newValue = currValue - n;
        input.value = String(newValue);
    }

    addEventListener(type: SprotNumericEntryEventType, functor: (evt: SprotNumericEntryEvent) => void ){
        this._events.push({type, functor: functor});
    }

    getRandomId(){
        const n =  this.constructor.name;
        const id = n.trim().toLowerCase() +  this._title.trim().toLowerCase().split(" ").join("-");
        return id;
    }

    getElement(){}
}