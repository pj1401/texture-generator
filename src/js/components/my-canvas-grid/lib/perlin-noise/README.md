# Perlin noise 2D

A module for implementing 2D perlin noise.

## Installation

Download the latest release and extract the files.

To import:

```javascript
import PerlinNoise from './{PATH}/perlin-noise/index.js'
```

## Usage

After instantiating the `PerlinNoise` object, use the `valueOf()` function to get the current noise. The starting point is at `(x = 0, y = 0)`.

```javascript
const perlin = new PerlinNoise()

perlin.valueOf() // returns 0
```

You can use the `generatePerlinNoise()` function to update the coordinates.

```javascript
const perlin = new PerlinNoise()

perlin.generatePerlinNoise(5.5, 3.7) // returns -0.177968

perlin.valueOf() // -0.177968

perlin.generatePerlinNoise(0.5, 0.5) // returns 0.006776

perlin.valueOf() // 0.006776
```

It's possible to specify a seed when instantiating the object. The same noise is generated given the same seed.

```javascript
const perlin = new PerlinNoise(24815821)

perlin.generatePerlinNoise(0.5, 0.5) // returns -0.344707

perlin.valueOf() // -0.344707
```
