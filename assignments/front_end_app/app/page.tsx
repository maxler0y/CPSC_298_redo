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
import { Trash2 } from 'lucide-react'

const GRID_SIZES = [8, 16, 32, 64]

export default function PixelArtCreator() {
  const [gridSize, setGridSize] = useState(16)
  const [color, setColor] = useState('#000000')
  const [pixels, setPixels] = useState<string[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    setPixels(Array(gridSize * gridSize).fill(''))
  }, [gridSize])

  const handleMouseDown = (index: number) => {
    setIsDrawing(true)
    const newPixels = [...pixels]
    newPixels[index] = color
    setPixels(newPixels)
  }

  const handleMouseEnter = (index: number) => {
    if (isDrawing) {
      const newPixels = [...pixels]
      newPixels[index] = color
      setPixels(newPixels)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setPixels(Array(gridSize * gridSize).fill(''))
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
      </div>
    </div>
  )
}