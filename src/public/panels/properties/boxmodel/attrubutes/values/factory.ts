import { EBoxModel } from "../../../../../../sprot/utils/interfaces.js";
import { SprotBorderValues } from "./border.js";
import { SprotBoxShadowValues } from "./boxshadow.js";
import { SprotConstraintsValues } from "./constraints.js";
import { SprotContentValues } from "./content.js";
import { SprotMarginValues } from "./margin.js";
import { SprotPaddingValues } from "./padding.js";
import { SprotSidesValues } from "./sides.js";
import { SprotTransformationValues } from "./transformations.js";

export class SprotAttributeValueFactor{
    constructor(_parent: HTMLElement, _canvasActionElement: HTMLElement, private _name: EBoxModel){

        // console.log("values: ", _name);
        switch (_name) {

            case EBoxModel.BORDER:
                new SprotBorderValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.BOXSHADOW:
                new SprotBoxShadowValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.CONSTRAINTS:
                new SprotConstraintsValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.CONTENT:
                new SprotContentValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.MARGIN:
                new SprotMarginValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.PADDING:
                new SprotPaddingValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.TRANSFORMATION:
                new SprotTransformationValues(_parent, _canvasActionElement);
                break;
            case EBoxModel.SIDES:
                new SprotSidesValues(_parent, _canvasActionElement);
                break;
        
            default:
                //new SprotTransformationValues(_parent, _canvasActionElement);

                _parent.replaceChildren();
                break;
        }
    }



}