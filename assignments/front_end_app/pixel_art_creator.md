# Pixel Art Creator

## Overview
This project is a simple **Pixel Art Creator** built with Next.js and TypeScript. It allows users to create pixel art by selecting a grid size, picking a color, and drawing on the grid by clicking and dragging.

## First Iteration Features
- **Grid Size Selector**: Users can choose from different grid sizes (8x8, 16x16, 32x32, 64x64) to set the canvas dimensions.
- **Color Picker**: A color input lets users select a color for drawing.
- **Clear Canvas**: A button clears the entire canvas, resetting all pixels to the default color.

## How It Works
- The grid size is managed with the `useState` hook, and the pixel data is stored in an array that updates when the user interacts with the grid.
- The `handleMouseDown`, `handleMouseEnter`, and `handleMouseUp` functions handle the drawing interactions, allowing the user to click and drag to paint on the grid.
- The `clearCanvas` function resets the pixel array, effectively clearing the drawing.

## Learning Experience

- **Use of v0**: This (and the previous time I had used v0 for this assignment the first time around) was my first time using v0. I was impressed with the ease of use, the speed, and the relatively decent code quality. I have/had both Claude Premium abnd OpenAI premium and I think the code quality was comaprable to those paid platforms, although this was my first time coding in a Next.js environment.
- **TypeScript**: This project helped me understand TypeScript’s type-checking capabilities, especially with props and state.
## Screenshot
Here’s a screenshot of the Pixel Art Creator app:

![Pixel Art Creator Screenshot](images/front_end1.png)

*This image shows the main interface with the grid, color picker, and controls.*

## Future Improvements
- Adding an undo feature for better control over the drawing.
- Implementing more drawing tools (like shapes or line tools).
- Allowing users to save their pixel art creations locally.
