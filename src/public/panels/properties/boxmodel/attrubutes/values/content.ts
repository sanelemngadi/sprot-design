export class SprotContentValues{
    constructor(private _parent: HTMLElement, private _canvasActionElement: HTMLElement){
        const h2 = document.createElement("h2");
        h2.textContent = "content class";
        this._parent.replaceChildren(h2);

        this.createUi();
    }

    createUi(){
        
    }
}