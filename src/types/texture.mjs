export class ClayTextureData {

    path
    size
    // renderSides

    constructor(config) {
        this.path = config.path
        this.size = config.size
        // this.renderSides = config.renderSides
    }

    static fromProject(project) {

        let texture = project.selected_texture || project.textures[0]
        if (texture == null) return

        return new ClayTextureData({
            path: texture.folder + texture.name,
            size: [project.texture_width, project.texture_height],
            // render_sides: texture.render_sides,
        })

    }

    static fromJson(data) {

        return new ClayTextureData({
            path: data.path,
            size: data.size,
            // renderSides: data.render_sides,
        })

    }

    updateProject(project) {

        const texture = new Texture().fromPath(this.path);
        texture.add(false);

        Project.texture_width = parseInt(this.size[0])
        Project.texture_height = parseInt(this.size[1])

        Cube.all.forEach(c => c.applyTexture(texture));

    }

    toJson() {

        return {
            path: this.path,
            size: this.size,
            // render_sides: this.renderSides
        }

    }

}