# Photo Print Converter

A web-based application that converts uploaded images into printable layouts with customizable photo and print sizes. Perfect for creating wallet photos, passport photos, or multiple prints on standard photo paper.

## Features

- **Upload Any Image**: Supports all common image formats (JPG, PNG, GIF, etc.)
- **Flexible Photo Sizes**: Choose from preset sizes (2x2, 2x3, 3x3, 4x4, 4x6, 5x7) or define custom dimensions
- **Multiple Print Sizes**: Select from standard print sizes (4x6, 5x7, 8x10, 11x14) or use custom sizes
- **Automatic Layout**: Automatically calculates how many photos fit on your print size
- **High Quality**: Adjustable DPI settings (150, 300, or 600 DPI)
- **Smart Cropping**: Images are automatically cropped and scaled to fit perfectly
- **Download & Print**: Save as PNG or print directly from your browser

## Use Cases

- **Passport Photos**: Create 2x2 passport photos on 5x7 paper (gets you 6 photos)
- **Wallet Photos**: Make 2x3 wallet-size photos
- **Event Photos**: Print multiple 4x6 photos on larger paper
- **ID Photos**: Custom sizes for specific requirements

## How to Use

1. **Upload Your Image**
   - Click "Choose Image" and select your photo

2. **Select Photo Size**
   - Choose a preset size or select "Custom Size" to enter your own dimensions

3. **Select Print Size**
   - Choose the paper size you'll be printing on (default: 5x7)

4. **Choose Resolution**
   - 150 DPI for drafts
   - 300 DPI for standard printing (recommended)
   - 600 DPI for high-quality prints

5. **Generate Layout**
   - Click "Generate Layout" to create your printable sheet
   - Preview shows exactly how your photos will be arranged

6. **Download or Print**
   - Click "Download Image" to save as PNG
   - Click "Print" to print directly

## Running the Application

### Option 1: Direct File Opening
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Server
For better performance and to avoid CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Example

For **2x2 inch photos** on **5x7 inch paper**:
- Layout: 2 columns × 3 rows = **6 photos per sheet**
- At 300 DPI: 1500×2100 pixel output
- Perfect for passport photos!

## Technical Details

- **Technology**: Pure HTML5, CSS3, and JavaScript (no dependencies)
- **Canvas API**: Uses HTML5 Canvas for image processing
- **Responsive**: Works on desktop and tablet devices
- **Print-Friendly**: Optimized CSS for clean printing

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with HTML5 Canvas support

## License

MIT License - Feel free to use and modify as needed.