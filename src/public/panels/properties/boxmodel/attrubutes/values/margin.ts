import { SprotNumericEntry, SprotNumericEntryEvent } from "../../../../../../sprot/elements/numericentry.js";

const top = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.25" y="0.25" width="15.5" height="15.5" stroke="white" stroke-width="0.5"/>
<path d="M16 4H0V0H16V4Z" fill="#060606"/>
</svg>
`;

const right = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="15.75" y="0.25" width="15.5" height="15.5" transform="rotate(90 15.75 0.25)"  stroke="white" stroke-width="0.5"/>
<path d="M12 16L12 -1.74846e-07L16 0L16 16L12 16Z" fill="#060606"/>
</svg>
`;

const bottom = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="15.75" y="15.75" width="15.5" height="15.5" transform="rotate(180 15.75 15.75)"  stroke="white" stroke-width="0.5"/>
<path d="M-3.49691e-07 12L16 12L16 16L0 16L-3.49691e-07 12Z" fill="#060606"/>
</svg>
`;

const left = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.25" y="15.75" width="15.5" height="15.5" transform="rotate(-90 0.25 15.75)"  stroke="white" stroke-width="0.5"/>
<path d="M4 -1.74846e-07L4 16L0 16L-6.99382e-07 0L4 -1.74846e-07Z" fill="#060606"/>
</svg>
`;

class SprotFillActionElement{
    constructor(private _canvasActionElement: HTMLElement){}

    bindMargin(mt:SprotNumericEntry, mr: SprotNumericEntry,
        mb: SprotNumericEntry, ml: SprotNumericEntry){
            if(!this._canvasActionElement){
                return;
            }

            this.bindMt(mt);
            this.bindMr(mr);
            this.bindMb(mb);
            this.bindMl(ml);
    }

    private bindMt(mt: SprotNumericEntry){
        mt.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.marginTop = e.value + "px";
            console.log("mt: ", e.value + "px");
        });
    }

    private bindMr(mr: SprotNumericEntry){
        mr.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.marginRight = e.value + "px";
            console.log("mr: ", e.value + "px");
        });
    }

    private bindMb(mb: SprotNumericEntry){
        mb.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.marginBottom = e.value + "px";
            console.log("mb: ", e.value + "px");
        });
    }

    private bindMl(ml: SprotNumericEntry){
        ml.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.marginLeft = e.value + "px";

            console.log("ml: ", e.value + "px");
            
        });
    }
}

class SprotInitActionElement{
    constructor(private _canvasActionElement: HTMLElement){}

    initMt(mt: SprotNumericEntry){
        // mt.
    }
}

export class SprotMarginValues{
    constructor(private _parent: HTMLElement, private _canvasActionElement: HTMLElement){  

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
        const td3 = document.createElement("td");
        row1.append(td1);
        row1.append(td2);
        row1.append(td3);

        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        row2.append(td4);
        row2.append(td5);
        row2.append(td6);

        const margin = window.getComputedStyle(this._canvasActionElement);

        const mt = new SprotNumericEntry(td1, top, margin.marginTop ? parseInt(margin.marginTop) : 0, "Margin top");
        const mb = new SprotNumericEntry(td2, bottom, margin.marginBottom ? parseInt(margin.marginBottom) : 0, "Margin bottom");
        const mr = new SprotNumericEntry(td4, right, margin.marginRight ? parseInt(margin.marginRight) : 0, "Margin right");
        const ml = new SprotNumericEntry(td5, left, margin.marginLeft ? parseInt(margin.marginLeft) : 0, "Margin left");

        td6.append("auto");

        const _bind = new SprotFillActionElement(this._canvasActionElement);

        if(_bind){
            _bind.bindMargin(mt,  mr, mb, ml);            
        }

        table.append(row1);
        table.append(row2);

        this._parent.replaceChildren(table);
    }
}