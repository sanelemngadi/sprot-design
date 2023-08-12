export class SprotCanvasDocument{
    constructor(private _rootElement: HTMLElement){

    }

    addBefore(before: HTMLElement,  htmlElement: HTMLElement): HTMLElement{
        const element = this._rootElement.insertBefore(before, htmlElement)
        return element; // unsuccessfull
    }
    
    addAfter(after: HTMLElement, htmlElement: HTMLElement): HTMLElement{
        const element =this._rootElement.insertBefore(after, htmlElement)
        return element; // unsuccessfull
    }

    addTo(to: HTMLElement, htmlElement: HTMLElement){
        to.append(htmlElement);
    }
    
    addStyles(){}
}