import { ClayTextureData } from "./texture.mjs"
import { ClayElements } from "./element.mjs"

export class ClayModel {

    textureData
    elementData

    constructor(config) {
        this.textureData = config.textureData,
        this.elementData = config.elementData
    }

    static fromProject(project) {

        return new ClayModel({
            textureData: ClayTextureData.fromProject(project),
            elementData: ClayElements.fromProject(project)
        })

    }

    static fromJson(data) {

        return new ClayModel({
            textureData: ClayTextureData.fromJson(data.texture_data),
            elementData: ClayElements.fromJson(data.elements)
        })

    }

    updateProject(project) {

        Project.box_uv = true
        this.textureData.updateProject()
        this.elementData.updateProject(project)

    }

    toJson() {

        return {
            texture_data: this.textureData.toJson(),
            elements: this.elementData.toJson()
        }

    }

}
