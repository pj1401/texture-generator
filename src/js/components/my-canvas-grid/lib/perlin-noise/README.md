# Perlin noise 2D

A module for implementing 2D perlin noise.

## Installation

Download the latest release and extract the files.

To import:

```javascript
import PerlinNoise from './{PATH}/perlin-noise/index.js'
```

## Usage

After instantiating the `PerlinNoise` object, use the `valueOf()` function to get the current noise.

```javascript
const perlin = new PerlinNoise(1.3, 2.1) // x = 1.3, y = 2.1

perlin.valueOf() // returns 0.093744
```

You can use the `perlin()` function to update the coordinates.

```javascript
const perlin = new PerlinNoise(5.5, 3.7)

perlin.valueOf() // returns -0.177968

perlin.perlin(0.5, 0.5) // returns 0.006776

perlin.valueOf() // returns 0.006776
```

It's possible to specify a seed when instantiating the object. The same noise is generated given the same seed.

```javascript
const perlin = new PerlinNoise(0.5, 0.5, 24815821)

perlin.valueOf() // returns -0.344707
```
