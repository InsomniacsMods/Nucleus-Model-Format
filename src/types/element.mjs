function nullEmptyList(vec) {
    if (vec.every(item => item === 0)) return null
    return vec
}


export class ClayElements {

    elements

    constructor(config) {

        this.elements = config.elements

    }

    static fromProject(project) {

        return new ClayElements({
            elements: project.outliner.map(element => ClayElement.fromBBElement(element))
        })

    }

    static fromJson(data) {

        return new ClayElements({
            elements: data.map(element => ClayElement.fromJson(element))
        })

    }

    // TODO
    updateProject(project) {

        this.elements.forEach( element => element.updateProject(project) )

    }

    toJson() {

        return this.elements.map(element => element.toJson())

    }

}

export class ClayElement {

    static fromBBElement(element) {

        switch (Object.getPrototypeOf(element)) {
            case Group.prototype:
                return ClayGroup.fromBBGroup(element)
            case Cube.prototype:
                return ClayCube.fromBBCube(element)
        }

    }

    static fromJson(data) {

        switch (data.type) {
            case 'group':
                return ClayGroup.fromJson(data)
            case 'cube':
                return ClayCube.fromJson(data)
        }

    }

    updateProject(project) {}

    toElement() {}

    toJson() {}

    
    // util

    addNonDefault(defaults) {

        const result = {}

        for (let [key, defaultValue] of Object.entries(defaults)) {
            let value = this[key]
            if (!value) {
                result[key] = defaultValue
                continue
            }
            if (!value || value == defaultValue) continue
            if (Array.isArray(value) && value.every(item => item === 0)) continue
            result[key] = value
        }

        return result

    }


}

export class ClayGroup extends ClayElement {

    elementName
    visible
    pivot
    rotation
    children

    constructor({
        elementName = 'group',
        visible = true,
        pivot = [0, 0, 0],
        rotation = [0, 0, 0],
        children = [],
    }) {
        super()
        this.elementName = elementName
        this.visible = visible
        this.pivot = pivot
        this.rotation = rotation
        this.children = children
    }

    static fromBBGroup(group) {

        return new ClayGroup({
            elementName: group.name,
            visible: group.visibility,
            rotation: group.rotation,
            pivot: group.origin,
            children: group.children.map(element => ClayElement.fromBBElement(element)),
        })

    }

    static fromJson(data) {

        return new ClayGroup({
            elementName: data.name,
            visible: data.visible,
            rotation: data.rotation,
            pivot: data.pivot,
            children: data.children.map(element => ClayElement.fromJson(element)),
        })

    }

    updateProject(project) {

        const group = this.toElement().addTo('root').init()

        this.children.forEach(element => {
            const child = element.toElement()
            child.addTo(group)
            child.init()
        })

    }

    toElement() {

        return new Group({
            name: this.elementName,
            origin: this.pivot,
            rotation: this.rotation,
            reset: true,
            shade: true,
            selected: false,
            visibility: this.visible,
            export: true,
            autouv: 0
        })

    }

    toJson() {
        
        const result = this.addNonDefault({
            elementName: 'group',
            visible: true,
            pivot: [0, 0, 0],
            rotation: [0, 0, 0],
            children: [],
        })

        if (result.children) result.children = result.children.map(element => element.toJson())
        result.type = 'group'
        if (result.elementName) {
            result.name = result.elementName
            delete result.elementName
        }

        return result

    }

}

export class ClayCube extends ClayElement {

    elementName
    visible
    uv
    mirror
    scale
    origin
    size
    rotation
    pivot

    constructor({
        elementName = 'cube',
        visible = true,
        uv = [0, 0],
        mirror = false,
        scale = 0,
        origin = [0, 0, 0],
        size = [0, 0, 0],
        pivot = [0, 0, 0],
        rotation = [0, 0, 0],
    }) {
        super()
        this.elementName = elementName
        this.visible = visible
        this.uv = uv
        this.mirror = mirror
        this.scale = scale
        this.origin = origin
        this.size = size
        this.pivot = pivot
        this.rotation = rotation
    }

    static fromBBCube(cube) {

        return new ClayCube({
            elementName: cube.name,
            visible: cube.visibility,
            uv: cube.uv_offset,
            mirror: cube.mirror_uv,
            scale: cube.inflate,
            origin: cube.from,
            size: cube.size(),
            rotation: cube.rotation,
            pivot: cube.origin,
        })

    }

    
    static fromJson(data) {

        return new ClayCube({
            elementName: data.name,
            visible: data.visible,
            uv: data.uv,
            mirror: data.mirror,
            scale: data.scale,
            origin: data.origin,
            size: data.size,
            rotation: data.rotation,
            pivot: data.pivot,
        })

    }

    // TODO
    updateProject(project) {

        Undo.initEdit({cubes: Blockbench.elements, outliner: true});
        var cube = this.toElement().addTo('root').init();

    }

    toElement() {

        const cube = new Cube({
            name: this.elementName,
            autouv: 0,
            shade: true,
            mirror_uv: this.mirror,
            inflate: this.scale,
            color: 0,
            visibility: this.visible,
            from: this.origin,
            to: [
                this.size[0] + this.origin[0],
                this.size[1] + this.origin[1],
                this.size[2] + this.origin[2]
            ],
            rotation: this.rotation,
            origin: this.pivot,
            uv_offset: this.uv
        })
        
        return cube

    }

    toJson() {
        
        const result = this.addNonDefault({
            elementName: 'cube',
            visible: true,
            uv: [0, 0],
            mirror: false,
            scale: 0,
            origin: [0, 0, 0],
            size: [0, 0, 0],
            pivot: [0, 0, 0],
            rotation: [0, 0, 0],
        })

        result.type = 'cube'
        if (result.elementName) {
            result.name = result.elementName
            delete result.elementName
        }

        return result

    }

}
