import { SprotNumericEntry, SprotNumericEntryEvent } from "../../../../../../sprot/elements/numericentry.js";


class SprotFillActionElement{
    constructor(private _canvasActionElement: HTMLElement){}

    bind(x:SprotNumericEntry, y: SprotNumericEntry,
        w: SprotNumericEntry, h: SprotNumericEntry){
            if(!this._canvasActionElement){
                return;
            }

            this.bindX(x);
            this.bindY(y);
            this.bindWidth(w);
            this.bindHeight(h);
    }

    private bindX(x: SprotNumericEntry){
        x.addEventListener("change", (e: SprotNumericEntryEvent) => {
            // this._canvasActionElement. = e.value + "px";
        });
    }

    private bindY(y: SprotNumericEntry){
        y.addEventListener("change", (e: SprotNumericEntryEvent) => {
            // this._canvasActionElement.style.marginRight = e.value + "px";
            // console.log("mr: ", e.value + "px");
        });
    }

    private bindWidth(ww: SprotNumericEntry){
        ww.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.width = e.value + "px";
            console.log("mb: ", e.value + "px");
        });
    }

    private bindHeight(hh: SprotNumericEntry){
        hh.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.height = e.value + "px";
        });
    }
}

export class SprotTransformationValues{
    constructor(private _parent: HTMLElement, 
        private _canvasActionElement: HTMLElement){
            if(_canvasActionElement){
                this.createUi();
            }
    }

    createUi(){
        const table = document.createElement("table");
        const row1 = document.createElement("tr");
        const row2 = document.createElement("tr");
        
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        row1.append(td1);
        row1.append(td2);

        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        row2.append(td3);
        row2.append(td4);

        const transfrom = window.getComputedStyle(this._canvasActionElement);

        const _bind = new SprotFillActionElement(this._canvasActionElement);
        const xx = new SprotNumericEntry(td1, "X:", this._canvasActionElement.offsetLeft, "Point X");
        const yy = new SprotNumericEntry(td2, "Y:",this._canvasActionElement.offsetTop,  "Point Y");
        const ww = new SprotNumericEntry(td3, "W:", transfrom.width ? parseInt(transfrom.width) : 0, "Width");
        const hh = new SprotNumericEntry(td4, "H:", transfrom.height ? parseInt(transfrom.height) : 0, "Height");

        if(_bind){
            _bind.bind(xx,  yy, ww, hh);            
        }


        table.append(row1);
        table.append(row2);

        this._parent.replaceChildren(table);
    }

    bindEvents(){
        
    }
}