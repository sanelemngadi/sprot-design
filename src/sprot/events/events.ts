import { EBoxModel } from "../utils/interfaces.js";

export class SprotEvent {
    constructor(){}
}


export class SprotChoiceEvent extends SprotEvent{
    private _selection: EBoxModel;
    constructor(){
        super();

        this._selection = EBoxModel.NONE;
    }

    get selection() {return this._selection}

}