import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

const ColorPicker = () => {
  const [colors, setColors] = useState({
    red: 0,
    green: 0,
    blue: 0
  });
  const [copied, setCopied] = useState(false);
  const hexInputRef = useRef(null);

  const handleColorChange = (color, value) => {
    const numValue = Math.min(255, Math.max(0, parseInt(value) || 0));
    setColors(prev => ({
      ...prev,
      [color]: numValue
    }));
  };

  const rgbToHex = () => {
    const toHex = (n) => {
      const hex = n.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(colors.red)}${toHex(colors.green)}${toHex(colors.blue)}`.toUpperCase();
  };

  const handleCopy = () => {
    if (hexInputRef.current) {
      hexInputRef.current.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        window.getSelection().removeAllRanges();
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>RGB Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Red Controls */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="red">Red</Label>
              <Input
                id="red-number"
                type="number"
                min="0"
                max="255"
                value={colors.red}
                onChange={(e) => handleColorChange('red', e.target.value)}
                className="w-16 h-8 text-sm"
              />
            </div>
            <Input
              id="red-range"
              type="range"
              min="0"
              max="255"
              value={colors.red}
              onChange={(e) => handleColorChange('red', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Green Controls */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="green">Green</Label>
              <Input
                id="green-number"
                type="number"
                min="0"
                max="255"
                value={colors.green}
                onChange={(e) => handleColorChange('green', e.target.value)}
                className="w-16 h-8 text-sm"
              />
            </div>
            <Input
              id="green-range"
              type="range"
              min="0"
              max="255"
              value={colors.green}
              onChange={(e) => handleColorChange('green', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Blue Controls */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="blue">Blue</Label>
              <Input
                id="blue-number"
                type="number"
                min="0"
                max="255"
                value={colors.blue}
                onChange={(e) => handleColorChange('blue', e.target.value)}
                className="w-16 h-8 text-sm"
              />
            </div>
            <Input
              id="blue-range"
              type="range"
              min="0"
              max="255"
              value={colors.blue}
              onChange={(e) => handleColorChange('blue', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Color Preview */}
        <div className="space-y-2">
          <Label>Color Preview</Label>
          <div
            className="w-full h-24 rounded-md border"
            style={{
              backgroundColor: `rgb(${colors.red}, ${colors.green}, ${colors.blue})`
            }}
          />
        </div>

        {/* Hex Value */}
        <div className="space-y-2">
          <Label>Hex Value</Label>
          <div className="flex gap-2">
            <Input
              ref={hexInputRef}
              value={rgbToHex()}
              readOnly
              className="font-mono"
            />
            <Button
              onClick={handleCopy}
              variant="outline"
              size="icon"
              className="h-10 w-10"
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;