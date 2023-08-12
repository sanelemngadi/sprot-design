import { EBoxModel } from "../sprot/utils/interfaces";

export interface ISprotObserver{
    update(htmlElement: HTMLElement | null): void; // each panels knows what to do with element
}

export interface ISprotObservable{
    register(observer: ISprotObserver): void; // when a panel is created
    remove(observer: ISprotObserver): void; // when a panel is close (reduce number of obsevers)
    notify(): void; // notify all observers
}

export interface ISprotBoxModelObserver{
    update(htmlElement: HTMLElement | null, canvasActionElement: HTMLElement | null): void; // each panels knows what to do with element
}

export interface ISprotBoxModelObservable{
    register(observer: ISprotBoxModelObserver): void; // when a panel is created
    remove(observer: ISprotBoxModelObserver): void; // when a panel is close (reduce number of obsevers)
    notify(): void; // notify all observers
}
