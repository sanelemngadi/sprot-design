import { ISprotObservable, ISprotObserver } from "./interfaces.js";

export class SprotObservable implements ISprotObservable{
    protected _observers: ISprotObserver[];
    protected _actionElement: HTMLElement | null;

    constructor(){
        this._observers = [];
        this._actionElement = null;
    }

    // setCanvas() when we register observers

    register(observer: ISprotObserver): void {
        this._observers.push(observer);
    }

    remove(observer: ISprotObserver): void {
        
    }

    notify(): void {
        for(const observer of this._observers){
            observer.update(this._actionElement);
        }
    }

    set actionElement(elem: HTMLElement | null){
        this._actionElement = elem;
        this.notify();
    }
    get actionElement(){return this._actionElement};

}