import { SprotNumericEntry } from "../../../../../../sprot/elements/numericentry.js";

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

export class SprotSidesValues{
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

        const numEntry = new SprotNumericEntry(td1, top, 20, "Top");
        const numEntry2 = new SprotNumericEntry(td2, right, 20, "Right");
        const numEntry3 = new SprotNumericEntry(td3, bottom, 20, "Bottom");
        const numEntry4 = new SprotNumericEntry(td4, left, 20, "Left");

        table.append(row1);
        table.append(row2);

        this._parent.replaceChildren(table);
    }
}