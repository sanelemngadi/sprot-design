export class SprotBoxShadowValues{
    constructor(private _parent: HTMLElement, private _canvasActionElement: HTMLElement){
        const h2 = document.createElement("h2");
        h2.textContent = "box shadow class";
        this._parent.replaceChildren(h2);
        
        this.createUi();
    }

    createUi(){
        
    }
}