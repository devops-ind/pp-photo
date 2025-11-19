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
- **AI-Powered Face Detection**: Automatically detects faces and positions them correctly
  - Uses advanced face detection AI to locate faces in images
  - Intelligently positions eyes and face according to passport requirements
  - Prevents heads from being cut off in photos
  - Fallback to manual positioning if face not detected

- **Smart Face Positioning**: Automatically adjusts image cropping based on official specifications
  - Center-weighted positioning for India documents
  - Top-weighted positioning for passport photos with shoulders visible
  - Eye-level positioning at 60% from top for passport photos
  - Face-centered positioning for OCI/Visa applications

- **Manual Photo Adjustment**: Fine-tune photo position before generating layout
  - Real-time preview of adjusted photo
  - Vertical position control (move up/down)
  - Horizontal position control (move left/right)
  - Zoom level control (80-150%)
  - Reset to auto-detected position with one click

- **Adjustable Photo Spacing**: Customize spacing between photos (0" to 0.25")
  - Makes cutting photos easier
  - Professional-looking layouts
  - Prevents photos from touching each other

- **Multiple Print Sizes**: Select from standard print sizes (4x6, 5x7, 8x10, 11x14) or use custom sizes
- **Automatic Layout**: Calculates optimal photo arrangement on print paper accounting for spacing
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

5. **Set Photo Spacing** (Optional)
   - Choose spacing between photos (0.1" recommended)
   - More spacing makes cutting photos easier
   - No spacing maximizes photos per page

6. **Face Detection** (Automatic)
   - App automatically detects face when image is uploaded
   - Positions face correctly based on document requirements
   - Shows "Face detected ✓" when successful
   - Can switch to "Manual positioning" if needed

7. **Review Requirements**
   - Read the displayed photo requirements for your selected document type
   - Ensure your original photo meets these specifications
   - The app will automatically apply proper face positioning

8. **Adjust Photo Position** (Optional)
   - After uploading, you'll see a preview of how your photo will be cropped
   - Use the adjustment controls to fine-tune the position:
     - **Vertical Position**: Move photo up or down (−100% to +100%)
     - **Horizontal Position**: Move photo left or right (−100% to +100%)
     - **Zoom Level**: Zoom in or out (80% to 150%)
   - Preview updates in real-time as you adjust
   - Click "Reset to Auto" to return to AI-detected position
   - All adjustments are applied to the final layout

9. **Generate Layout**
   - Click "Generate Layout" to create your printable sheet
   - Preview shows exactly how your photos will be arranged
   - The app automatically applies:
     - AI-detected face positioning (if face detected)
     - Your manual adjustments (if any)
     - Centered positioning for India documents
     - Top-weighted positioning for other passport photos
     - Proper spacing between photos

10. **Download or Print**
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

### AI-Powered Face Detection
The application uses advanced face detection technology to automatically locate faces in your photos:

**How It Works:**
1. When you upload an image, the app automatically detects the face using AI models
2. It identifies key facial landmarks (eyes, nose, mouth)
3. Calculates the optimal crop position based on face location and document requirements
4. Positions the face correctly to prevent heads from being cut off

**Benefits:**
- **Full Head Visibility**: Includes hair and forehead space above detected face
- **No Top Cropping**: Ensures head is never cut off at the top (40% hair padding added)
- **Proper Head Positioning**: Top of head at 12% from top for passport photos
- **Chin Protection**: Ensures chin is visible (face bottom at ~68% of photo height)
- **Smart Centering**: For India documents, centers entire head including hair
- **Shoulder Visibility**: For passport photos, leaves room for shoulders below chin

**Manual Mode:**
- If face detection is not desired, switch to "Manual positioning"
- Falls back automatically if no face is detected
- Uses intelligent default positioning based on document type

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

## Manual Photo Adjustment

### Why Manual Adjustment?
While AI face detection is highly accurate, manual adjustment gives you complete control over the final photo crop. This is useful when:
- You want to include more or less background
- The hair style or head position needs specific adjustment
- You need precise positioning for specific requirements
- The automatic detection needs a slight tweak

### How It Works

**Real-Time Preview:**
- After uploading an image, you'll see a preview showing exactly how the photo will be cropped
- The preview updates instantly as you adjust the sliders
- Preview matches the selected photo size dimensions

**Adjustment Controls:**

1. **Vertical Position** (−100% to +100%)
   - Negative values: Move photo UP (shows more from bottom)
   - Positive values: Move photo DOWN (shows more from top)
   - Example: −20% moves photo up to show more shoulders

2. **Horizontal Position** (−100% to +100%)
   - Negative values: Move photo LEFT (shows more from right)
   - Positive values: Move photo RIGHT (shows more from left)
   - Example: +10% moves photo right to center face better

3. **Zoom Level** (80% to 150%)
   - Below 100%: Zoom OUT (shows more background, smaller face)
   - Above 100%: Zoom IN (closer crop, larger face)
   - Example: 120% zooms in for tighter crop on face

**Reset Function:**
- Click "Reset to Auto" to return to AI-detected position
- Resets all three controls to default values
- Useful if you want to start over

### Tips for Best Results

**For Passport Photos (Top-Weighted):**
- Start with auto-detection (usually very good)
- Use vertical adjustment if head is slightly off
- Zoom in slightly (105-110%) for closer face crop
- Ensure shoulders are still visible

**For India Documents (Center-Weighted):**
- Photo should be centered after auto-detection
- Use horizontal adjustment if face is slightly off-center
- Keep zoom at 100% unless face is too small
- Both sides of face should be equally visible

**General Tips:**
- Make small adjustments (5-10% at a time)
- Check the preview before generating layout
- Remember: the preview shows exactly what will be printed
- Use zoom first, then position adjustments

## Technical Details

- **Technology**: HTML5, CSS3, and JavaScript
- **Face Detection**: face-api.js (TensorFlow.js-based AI models)
  - TinyFaceDetector for fast, accurate face detection
  - 68-point facial landmark detection
  - Runs entirely in the browser (no server required)
  - Models loaded from CDN on first use
- **Canvas API**: Advanced HTML5 Canvas for image processing and cropping
- **Smart Cropping Algorithm**: AI-powered face positioning with intelligent fallback
- **Photo Spacing**: Configurable spacing between photos for easy cutting
- **Requirements Database**: Official specifications from government sources (2024-2025)
- **Responsive Design**: Works on desktop and tablet devices
- **Print-Friendly CSS**: Optimized for clean printing without UI elements
- **Privacy**: All processing happens locally in your browser (images never uploaded to server)

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with HTML5 Canvas support

## Troubleshooting

### Face Detection Issues

**Problem: "Face not detected" message**
- Ensure face is clearly visible in the photo
- Use good lighting (no shadows on face)
- Face should be directly facing the camera
- Try a different photo or use "Manual positioning" mode

**Problem: Head still cut off at top**
- Check browser console (F12) for detailed positioning logs
- The app adds 40% padding above detected face for hair
- If still cut off, your photo may have excessive hair volume - try:
  - Using "Manual positioning" mode
  - Uploading a photo taken from slightly further away
  - Adjusting the original photo to show more space above head

**Problem: Face positioned too low**
- This is intentional for passport photos (shoulders must be visible)
- For India documents, select India-specific format (uses center positioning)
- Check that you've selected the correct document type

### Layout Issues

**Problem: Not enough photos fit on page**
- Reduce photo spacing (try 0.05" or 0")
- Check that photo size is appropriate for print size
- For 2x2" photos on 5x7" paper: 2 cols × 3 rows = 6 photos

**Problem: Photos too small/large when printed**
- Verify DPI setting matches your printer (300 DPI recommended)
- Check print preview before printing
- Ensure printer is set to "Actual Size" not "Fit to Page"

### Performance Issues

**Problem: Face detection models slow to load**
- Models load from CDN on first use (~2-3MB download)
- Check your internet connection
- After first load, models are cached by browser
- If offline, app will fall back to manual positioning

### Browser Console Logs

For debugging, open browser console (F12) and look for:
- `Face detected:` - Shows detected face coordinates
- `Top-weighted positioning:` - Shows passport photo calculations
- `Center-weighted positioning:` - Shows India document calculations
- `Final crop values:` - Shows exact crop region used

## License

MIT License - Feel free to use and modify as needed.