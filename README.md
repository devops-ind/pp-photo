# Photo Print Converter

A professional web-based application that converts uploaded images into printable layouts with official photo specifications for passports, visas, and government documents. Perfect for India passport/visa/OCI, Ireland visa, USA passport, and many other country-specific photo requirements.

## Features

- **Country-Specific Photo Formats**: Pre-configured sizes for official documents
  - India (Passport, Visa, OCI) - 2x2" (51mm)
  - Ireland (Passport, Visa) - 35x45mm (1.38x1.77")
  - USA (Passport, Visa) - 2x2" (51mm)
  - UK Passport - 35x45mm (1.38x1.77")
  - Schengen Visa - 35x45mm (1.38x1.77")
  - Canada Passport - 50x70mm (1.97x2.76")

- **Official Requirements Display**: Shows detailed photo requirements for each document type
- **Smart Face Positioning**: Automatically adjusts image cropping based on official specifications
  - Center-weighted positioning for India documents
  - Top-weighted positioning for passport photos with shoulders visible

- **Multiple Print Sizes**: Select from standard print sizes (4x6, 5x7, 8x10, 11x14) or use custom sizes
- **Automatic Layout**: Calculates optimal photo arrangement on print paper
- **High Quality Output**: Adjustable DPI settings (150, 300, or 600 DPI)
- **Professional Results**: Images cropped and scaled according to official government standards
- **Download & Print**: Save as PNG or print directly from browser

## Use Cases

### Official Government Documents
- **India Passport/Visa/OCI**: 2x2" photos with centered face positioning
- **Ireland Visa Applications**: 35x45mm with 70-80% face coverage
- **USA Passport**: 2x2" with specific head height requirements
- **UK Passport**: 35x45mm with 65-75% head and shoulders
- **Schengen Visa**: Standardized 35x45mm format
- **Canada Passport**: 50x70mm specifications

### General Use
- **Wallet Photos**: Create 2x3 wallet-size photos
- **Event Photos**: Print multiple 4x6 photos on larger paper
- **Custom Sizes**: Define your own dimensions for any requirement

## How to Use

1. **Upload Your Image**
   - Click "Choose Image" and select your photo
   - Ensure your photo meets basic requirements: clear face, proper lighting, plain background

2. **Select Photo Size**
   - Choose from country-specific options (India, Ireland, USA, UK, Schengen, Canada)
   - Or select standard sizes (2x2, 2x3, 3x3, 4x4, 4x6, 5x7)
   - Or define custom dimensions
   - **Official requirements will be displayed automatically** for government document formats

3. **Select Print Size**
   - Choose the paper size you'll be printing on (default: 5x7)
   - Recommended: 4x6 or 5x7 for passport photos

4. **Choose Resolution**
   - 150 DPI for drafts/preview
   - 300 DPI for standard printing (recommended for most uses)
   - 600 DPI for high-quality professional prints

5. **Review Requirements**
   - Read the displayed photo requirements for your selected document type
   - Ensure your original photo meets these specifications
   - The app will automatically apply proper face positioning

6. **Generate Layout**
   - Click "Generate Layout" to create your printable sheet
   - Preview shows exactly how your photos will be arranged
   - The app automatically applies:
     - Centered positioning for India documents
     - Top-weighted positioning for other passport photos

7. **Download or Print**
   - Click "Download Image" to save as PNG (with descriptive filename)
   - Click "Print" to print directly from browser

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

## Examples

### India Passport/Visa/OCI Photos
- **Photo Size**: 2x2 inch (51mm x 51mm) square
- **Print on 5x7 paper**: 2 columns × 3 rows = **6 photos per sheet**
- **At 300 DPI**: 1500×2100 pixel output
- **Face Positioning**: Centered (as per India requirements)
- **Use Case**: Perfect for passport applications, visa applications, OCI cards

### Ireland Visa Photos
- **Photo Size**: 35mm × 45mm (1.38" × 1.77")
- **Print on 5x7 paper**: 3 columns × 2 rows = **6 photos per sheet**
- **At 300 DPI**: 1500×2100 pixel output
- **Face Positioning**: Top-weighted with shoulders visible (70-80% face coverage)
- **Use Case**: Ireland visa applications, passport renewal

### USA Passport Photos
- **Photo Size**: 2x2 inch (51mm x 51mm) square
- **Print on 4x6 paper**: 2 columns × 3 rows = **6 photos per sheet**
- **Print on 5x7 paper**: 2 columns × 3 rows = **6 photos per sheet**
- **At 300 DPI**: Head height 1-1⅜ inches from chin to crown
- **Face Positioning**: Top-weighted (eyes at specific height)
- **Use Case**: US passport applications, visa applications

### Schengen Visa Photos
- **Photo Size**: 35mm × 45mm (1.38" × 1.77")
- **Print on 5x7 paper**: 3 columns × 2 rows = **6 photos per sheet**
- **Face Requirements**: Face occupies 70-80% of photo
- **Use Case**: Travel to Schengen area countries (Europe)

## Photo Requirements & Face Positioning

### Automatic Face Positioning
The application implements intelligent face positioning based on official photo requirements:

**Center-Weighted Positioning** (India documents):
- Face is centered both horizontally and vertically
- Used for India Passport, Visa, and OCI applications
- Ensures equal visibility of both sides of face

**Top-Weighted Positioning** (Most other passports/visas):
- Face positioned in upper portion of frame
- Shoulders remain visible as required
- Used for USA, Ireland, UK, Schengen, and Canada documents
- Complies with 70-80% face coverage requirements

### Official Requirements Database
The app includes built-in requirements for:
- **India**: Passport, Visa, E-Visa, OCI applications
- **Ireland**: Passport and Visa applications
- **USA**: Passport and Visa photos
- **UK**: Passport photos
- **Schengen**: Visa applications (Europe)
- **Canada**: Passport photos

Each format displays specific requirements including:
- Exact dimensions
- Background color requirements
- Face positioning rules
- Expression and eyewear restrictions
- Digital file specifications

## Technical Details

- **Technology**: Pure HTML5, CSS3, and JavaScript (no dependencies)
- **Canvas API**: Advanced HTML5 Canvas for image processing and cropping
- **Smart Cropping Algorithm**: Automatically positions face based on document type
- **Requirements Database**: Official specifications from government sources (2024-2025)
- **Responsive Design**: Works on desktop and tablet devices
- **Print-Friendly CSS**: Optimized for clean printing without UI elements

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with HTML5 Canvas support

## License

MIT License - Feel free to use and modify as needed.