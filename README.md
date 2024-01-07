# About

W.I.P.

# Object Spec

```py

class ClayModel:

    texture_data: ClayTextureData
    elements: List[ClayElement]

```

```py

class ClayTextureData:

    path: Path
    size: Tuple[Integer, Integer]

```

```py

class ClayGroup(ClayElement):

    name: String
    visible: Boolean
    pivot: Tuple[Number, Number]
    rotation: Tuple[Number, Number]
    children: List[ClayElement]

```

```py

class ClayCube(ClayElement):

    name: String
    visible: Boolean
    uv: Tuple[Number, Number]
    mirror: Boolean
    scale: Number
    origin: Tuple[Number, Number]
    size: Tuple[Number, Number]
    rotation: Tuple[Number, Number]
    pivot: Tuple[Number, Number]

```