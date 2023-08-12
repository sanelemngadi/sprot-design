import { SprotCanvasController } from "../controler/canvascontroller.js";
import { SprotCanvasDocument } from "../models/canvasmodel.js";
import { SprotCanvasView } from "../views/canvasview.js";

console.log("Hello world");

const canvas = document.getElementById("canvas") as HTMLElement | null;
const addTool = document.getElementById("add-tool");

if(canvas){
    // size canvas to fit
    const document = new SprotCanvasDocument(canvas);
    const view = new SprotCanvasView(canvas);
    const controller = new SprotCanvasController(view, document);
    controller.init();
    console.log("canvas initialized");   
    if(addTool){
        // controller.addDiv();
        addTool.addEventListener("click", ()=>{
            controller.addDiv();
        })
    }
}



