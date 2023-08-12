import { SprotNumericEntry, SprotNumericEntryEvent } from "../../../../../../sprot/elements/numericentry.js";

const height = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M16.142 4.81L14.5 3.11l-1.641 1.7a.5.5 0 0 1-.72-.695l1.821-1.886a.75.75 0 0 1 1.08 0l1.82 1.886a.5.5 0 1 1-.72.694ZM5 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4.5a.5.5 0 0 0 0-1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4.5a.5.5 0 0 0 0-1H5Zm9.503 2a.5.5 0 0 1 .5.5V7a.5.5 0 1 1-1 0V5.5a.5.5 0 0 1 .5-.5Zm.5 8a.5.5 0 1 0-1 0v1.5a.5.5 0 0 0 1 0V13Zm-.5-4a.5.5 0 0 1 .5.5v1a.5.5 0 1 1-1 0v-1a.5.5 0 0 1 .5-.5Zm1.639 6.19l-1.641 1.7l-1.641-1.7a.5.5 0 1 0-.72.695l1.821 1.886a.75.75 0 0 0 1.08 0l1.82-1.886a.5.5 0 1 0-.72-.694Z"/></svg>`;


const width = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="m15.192 16.142l1.7-1.641l-1.7-1.641a.5.5 0 0 1 .694-.72l1.886 1.821a.75.75 0 0 1 0 1.08l-1.886 1.82a.5.5 0 1 1-.694-.72ZM17 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4.5a.5.5 0 0 0 1 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4.5a.5.5 0 1 0 1 0V5Zm-2 9.503a.5.5 0 0 1-.5.5H13a.5.5 0 1 1 0-1h1.5a.5.5 0 0 1 .5.5Zm-8 .5a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0 0 1H7Zm4-.5a.5.5 0 0 1-.5.5h-1a.5.5 0 1 1 0-1h1a.5.5 0 0 1 .5.5Zm-6.19 1.639L3.11 14.5l1.7-1.641a.5.5 0 0 0-.695-.72L2.23 13.961a.75.75 0 0 0 0 1.08l1.886 1.82a.5.5 0 1 0 .694-.72Z"/></svg>`;

class SprotFillActionElement{
    constructor(private _canvasActionElement: HTMLElement){}

    bind(minWidth:SprotNumericEntry, minHeight: SprotNumericEntry,
        maxWidth: SprotNumericEntry, maxHeight: SprotNumericEntry){
            if(!this._canvasActionElement){
                return;
            }

            this.bindMinWidth(minWidth);
            this.bindMinHeight(minHeight);
            this.bindMaxWidth(maxWidth);
            this.bindMaxHeight(maxHeight);
    }

    private bindMinWidth(minWidth: SprotNumericEntry){
        minWidth.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.minWidth = e.value + "px";
            console.log("mt: ", e.value + "px");
        });
    }

    private bindMinHeight(minHeight: SprotNumericEntry){
        minHeight.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.minHeight = e.value + "px";
            console.log("pr: ", e.value + "px");
        });
    }

    private bindMaxWidth(maxWidth: SprotNumericEntry){
        maxWidth.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.maxWidth = e.value + "px";
            console.log("maxWidth: ", e.value + "px");
        });
    }

    private bindMaxHeight(maxHeight: SprotNumericEntry){
        maxHeight.addEventListener("change", (e: SprotNumericEntryEvent) => {
            this._canvasActionElement.style.maxHeight = e.value + "px";

            console.log("maxHeight: ", e.value + "px");
            
        });
    }
}


export class SprotConstraintsValues{
    constructor(private _parent: HTMLElement, private _canvasActionElement: HTMLElement){
    
        if(_canvasActionElement){
            this.createUi();
        }
    }
    
    createUi(){
        const table = document.createElement("table");
        const row1 = document.createElement("tr");
        const row2 = document.createElement("tr");
        
        const constrain = window.getComputedStyle(this._canvasActionElement);
        
        const row1Td1 = document.createElement("td");
        row1Td1.append("Min:");
        row1.append(row1Td1);
        
        const row1Td2 = document.createElement("td");
        const minW = new SprotNumericEntry(row1Td2, width, parseInt(constrain.minWidth),  "Min width");
        row1.append(row1Td2);
        
        const row1Td3 = document.createElement("td");
        const minH = new SprotNumericEntry(row1Td3, height, parseInt(constrain.minHeight), "Min height");
        row1.append(row1Td3);
        
        const row2Td1 = document.createElement("td");
        row2Td1.append("Max:");
        row2.append(row2Td1);

        const row2Td2 = document.createElement("td");
        const maxW = new SprotNumericEntry(row2Td2, width, constrain.maxWidth.trim().length <= 0 ? parseInt(constrain.maxWidth) : parseInt(constrain.width), "Max width");
        row2.append(row2Td2);


        const row2Td3 = document.createElement("td");
        const maxH = new SprotNumericEntry(row2Td3, height, constrain.maxHeight.trim().length <= 0 ? parseInt(constrain.maxHeight) : parseInt(constrain.height), "Max height");
        row2.append(row2Td3);


        const _bind = new SprotFillActionElement(this._canvasActionElement);

        if(_bind){
            _bind.bind(minW,  minH, maxW, maxH);            
        }

        table.append(row1);
        table.append(row2);

        this._parent.replaceChildren(table);
    }
}