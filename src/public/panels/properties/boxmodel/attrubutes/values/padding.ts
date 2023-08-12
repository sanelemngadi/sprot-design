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

    bind(pt:SprotNumericEntry, pr: SprotNumericEntry,
        pb: SprotNumericEntry, pl: SprotNumericEntry){
            if(!this._canvasActionElement){
                return;
            }

            this.bindPt(pt);
            this.bindPr(pr);
            this.bindPb(pb);
            this.bindPl(pl);
    }

    private bindPt(pt: SprotNumericEntry){
        pt.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.paddingTop = e.value + "px";
            console.log("mt: ", e.value + "px");
        });
    }

    private bindPr(pr: SprotNumericEntry){
        pr.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.paddingRight = e.value + "px";
            console.log("pr: ", e.value + "px");
        });
    }

    private bindPb(pb: SprotNumericEntry){
        pb.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.paddingBottom = e.value + "px";
            console.log("pb: ", e.value + "px");
        });
    }

    private bindPl(pl: SprotNumericEntry){
        pl.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.paddingLeft = e.value + "px";

            console.log("pl: ", e.value + "px");
            
        });
    }
}

export class SprotPaddingValues{
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
        row1.append(td1);
        row1.append(td2);

        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        row2.append(td3);
        row2.append(td4);

        const padding = window.getComputedStyle(this._canvasActionElement);

        const pt = new SprotNumericEntry(td1, top, padding.paddingTop ? parseInt(padding.paddingTop) : 0, "Padding top");
        const pr = new SprotNumericEntry(td2, right, padding.paddingRight ? parseInt(padding.paddingRight) : 0, "Padding right");
        const pb = new SprotNumericEntry(td3, bottom, padding.paddingBottom ? parseInt(padding.paddingBottom) : 0, "Padding bottom");
        const pl = new SprotNumericEntry(td4, left, padding.paddingLeft ? parseInt(padding.paddingLeft) : 0, "Padding left");

        const _bind = new SprotFillActionElement(this._canvasActionElement);

        if(_bind){
            _bind.bind(pt,  pr, pb, pl);            
        }

        table.append(row1);
        table.append(row2);

        this._parent.replaceChildren(table);
    }
}