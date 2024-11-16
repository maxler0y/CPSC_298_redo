'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, Trash2 } from 'lucide-react'

const GRID_SIZES = [8, 16, 32, 64]
const BRUSH_SIZES = [1, 2, 3, 4]

export default function PixelArtCreator() {
  const [gridSize, setGridSize] = useState(16)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(1)
  const [pixels, setPixels] = useState<string[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    setPixels(Array(gridSize * gridSize).fill(''))
  }, [gridSize])

  const handleMouseDown = (index: number) => {
    setIsDrawing(true)
    drawPixels(index)
  }

  const handleMouseEnter = (index: number) => {
    if (isDrawing) {
      drawPixels(index)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const drawPixels = (centerIndex: number) => {
    const newPixels = [...pixels]
    for (let y = 0; y < brushSize; y++) {
      for (let x = 0; x < brushSize; x++) {
        const index = centerIndex + x + (y * gridSize)
        if (index >= 0 && index < pixels.length && Math.floor(index / gridSize) === Math.floor(centerIndex / gridSize) + y) {
          newPixels[index] = color
        }
      }
    }
    setPixels(newPixels)
  }

  const clearCanvas = () => {
    setPixels(Array(gridSize * gridSize).fill(''))
  }

  const downloadImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = gridSize
    canvas.height = gridSize
    const ctx = canvas.getContext('2d')
    if (ctx) {
      pixels.forEach((pixel, index) => {
        const x = index % gridSize
        const y = Math.floor(index / gridSize)
        ctx.fillStyle = pixel || '#FFFFFF'
        ctx.fillRect(x, y, 1, 1)
      })
      const link = document.createElement('a')
      link.download = 'pixel-art.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Pixel Art Creator</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="grid-size">Grid Size</Label>
          <Select onValueChange={(value) => setGridSize(Number(value))}>
            <SelectTrigger id="grid-size">
              <SelectValue placeholder="Select grid size" />
            </SelectTrigger>
            <SelectContent>
              {GRID_SIZES.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}x{size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="color-picker">Color</Label>
          <Input
            id="color-picker"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 p-1"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="brush-size">Brush Size</Label>
          <Select onValueChange={(value) => setBrushSize(Number(value))}>
            <SelectTrigger id="brush-size">
              <SelectValue placeholder="Select brush size" />
            </SelectTrigger>
            <SelectContent>
              {BRUSH_SIZES.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}x{size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div 
        className="grid gap-px bg-gray-200 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: '100%',
          aspectRatio: '1 / 1',
        }}
      >
        {pixels.map((pixel, index) => (
          <div
            key={index}
            className="aspect-square"
            style={{ backgroundColor: pixel || '#FFFFFF' }}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={handleMouseUp}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={clearCanvas} variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Clear
        </Button>
        <Button onClick={downloadImage}>
          <Download className="mr-2 h-4 w-4" /> Download PNG
        </Button>
      </div>
    </div>
  )
}