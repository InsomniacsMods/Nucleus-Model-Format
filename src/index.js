/// <reference types="blockbench-types" />

import { codec, getFormat } from './codec.mjs'
// import { codec } from './codec.mjs'


const plugin_name = "Nucleus Clay Model Exporter";
const format = getFormat(codec)

Plugin.register('nucleus_clay', {
    title: plugin_name,
    icon: 'fas.fa-box-open',
    author: 'The Insomniacs',
    description: 'Create and edit Nucleus Clay Model files, for entity and tile entity models',
    tags: ["Exporter"],
    min_version: '3.7.0',
    variant: 'both',
    onload() {
        MenuBar.addAction(codec.export_action, 'file.export')
        codec.format = format
    },
    onunload() {
        codec.export_action.delete();
        codec.delete();
        format.delete();
    }
})