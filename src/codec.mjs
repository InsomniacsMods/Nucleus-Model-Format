/// <reference types="blockbench-types" />

import { ClayModel } from "./types/model.mjs"
import beautify from "json-beautify";

const project_name = 'Export Nucleus Clay Model'


function can_save() {
    
    if (Project.box_uv) return true

    Blockbench.showMessageBox({
        title: 'Mine-imator Model Exporter',
        message: 'Models need to use the UV mode "Box UV", otherwise the exporter won\'t work correctly.'
    })

    return false

}


function save_model(options) {

    if (!can_save()) return

    let data = ClayModel.fromProject(Project)
    console.log(data)
    data = data.toJson()
    data = beautify(data, null, 4, 64)

    return Buffer.from(data)

}

function load_model(data) {
    const model = ClayModel.fromJson(data)
    model.updateProject(Project)
}

export const codec = new Codec('clay', {
    name: project_name,
    extension: 'clay',
    load_filter: {
        type: 'json',
        extensions: ['clay']
    },
    remember: true,
    compile(options = {}) {
        return save_model(options)
    },
    parse(model, p) {
        load_model(model)
    }
})

codec.export_action = new Action('export_clay', {
    name: 'Export Nucleus Clay',
    icon: 'fas.fa-box-open',
    category: 'file',
    click() {
        if (!can_save()) return
        codec.export()
    }
})

export function getFormat(codec) {

    return new ModelFormat({
        id: "nucleus_clay",
        icon: 'fas.fa-box-open',
        name: "Nucleus Clay Model",
        description: "",
        category: "minecraft",
        show_on_start_screen: true,
        model_identifier: false,
        box_uv: true,
        optional_box_uv: true,
        single_texture: true,
        bone_rig: true,
        centered_grid: true,
        integer_size: true,
        codec: codec
    })

}