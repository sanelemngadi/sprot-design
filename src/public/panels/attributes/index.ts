import { ISprotObserver } from "../../../utils/interfaces.js";

export class SprotAttributesPanel implements ISprotObserver{
    constructor(private _name: string){}

    update(htmlElement: HTMLElement | null): void {
        throw new Error("Method not implemented.");

        // update the panel with the current element
    }

    get name(){ return this._name;
    }
}