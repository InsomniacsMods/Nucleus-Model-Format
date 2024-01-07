/// <reference types="blockbench-types" />
import { ClayModel } from "./types/model.mjs";
import modelData from '../vilger.clay.json' assert { type: "json" }

const model = ClayModel.fromJson(modelData)
console.log(model.toJson())
// console.log(model.elementData.elements)
