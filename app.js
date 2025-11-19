// Photo Print Converter - Main Application Logic

class PhotoPrintConverter {
    constructor() {
        this.uploadedImage = null;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.faceDetectionReady = false;
        this.detectedFace = null;

        // Initialize face detection
        this.initializeFaceDetection();

        // Photo requirements database with official specifications
        this.photoRequirements = {
            'india-passport': {
                width: 2, height: 2,
                requirements: [
                    'Photo must be square: 2x2 inch (51mm x 51mm)',
                    'Face must be centered and directly facing camera',
                    'White or light-colored background required',
                    'No glasses allowed',
                    'Neutral expression with mouth closed',
                    'Head should be straight, not tilted',
                    'Digital: 200x200 to 1500x1500 pixels, max 500KB'
                ],
                facePosition: 'center' // center-weighted positioning
            },
            'india-visa': {
                width: 2, height: 2,
                requirements: [
                    'Photo must be square: 2x2 inch (51mm x 51mm)',
                    'E-Visa: 350x350 to 1000x1000 pixels recommended',
                    'File size: 10KB to 1MB',
                    'Face must be centered with both sides equally visible',
                    'White background required',
                    'No eyeglasses in e-Visa photos',
                    'Recent photograph (within last 6 months)'
                ],
                facePosition: 'center'
            },
            'india-oci': {
                width: 2, height: 2,
                requirements: [
                    'Photo must be square: 2x2 inch (51mm x 51mm)',
                    'Digital: 200x200 to 1500x1500 pixels',
                    'Maximum file size: 500KB',
                    'Face must be centered, head not tilted',
                    'White or very light colored background',
                    'No glasses, neutral expression',
                    'Both ears should be visible'
                ],
                facePosition: 'center'
            },
            'ireland-passport': {
                width: 1.38, height: 1.77,
                requirements: [
                    'Size: 35mm x 45mm (1.38" x 1.77")',
                    'Face must take up 70-80% of the photo',
                    'Top of shoulders should be visible',
                    'Clear, light-colored background',
                    'No eyeglasses',
                    'Neutral facial expression preferred (smiling okay)',
                    'No hats unless religious headgear',
                    'Recent photograph (within last 6 months)'
                ],
                facePosition: 'top-weighted' // face should be in upper portion
            },
            'ireland-visa': {
                width: 1.38, height: 1.77,
                requirements: [
                    'Size: 35mm x 45mm (1.38" x 1.77")',
                    'Face must take up 70-80% of the photo',
                    'Top of shoulders must be visible',
                    'Clear, light-colored background required',
                    'No eyeglasses allowed',
                    'Neutral facial expression',
                    'Head centered and directly facing camera',
                    'Photo must be recent (within 6 months)'
                ],
                facePosition: 'top-weighted'
            },
            'usa-passport': {
                width: 2, height: 2,
                requirements: [
                    'Photo must be square: 2x2 inch (51mm x 51mm)',
                    'Head height: 1 to 1⅜ inches (25-35mm) from chin to crown',
                    'Eye position: 1⅛ to 1⅜ inches from bottom of photo',
                    'Plain white or off-white background',
                    'Face camera directly, head not tilted',
                    'Neutral expression, both eyes open',
                    'No glasses (since November 2016)',
                    'Digital: 600x600 to 1200x1200 pixels at 300 DPI'
                ],
                facePosition: 'top-weighted'
            },
            'usa-visa': {
                width: 2, height: 2,
                requirements: [
                    'Photo must be square: 2x2 inch (51mm x 51mm)',
                    'Head height: 1 to 1⅜ inches (25-35mm)',
                    'Recent photograph (within last 6 months)',
                    'Plain white background required',
                    'Full face view, looking directly at camera',
                    'Neutral expression with both eyes open',
                    'No glasses or headgear (except religious)',
                    'Resolution: 600x600 to 1200x1200 pixels'
                ],
                facePosition: 'top-weighted'
            },
            'uk-passport': {
                width: 1.38, height: 1.77,
                requirements: [
                    'Size: 35mm x 45mm (1.38" x 1.77")',
                    'Face measurement: 32-36mm from chin to crown',
                    'Head and shoulders must take up 65-75% of frame',
                    'Plain pale cream, light grey or light blue background',
                    'Face camera directly, neutral expression',
                    'No glasses (unless medical reasons with letter)',
                    'No headwear (except religious or medical)',
                    'Digital: JPEG format, at least 600 DPI, 50KB-10MB'
                ],
                facePosition: 'top-weighted'
            },
            'schengen-visa': {
                width: 1.38, height: 1.77,
                requirements: [
                    'Size: Exactly 35mm x 45mm (1.38" x 1.77")',
                    'Face height: 32-36mm from chin to top of head',
                    'Face must occupy 70-80% of the photo',
                    'Light gray background suggested (no pattern)',
                    'Looking straight at camera, neutral expression',
                    'Recent photograph (within 6 months)',
                    'Two identical photos required',
                    'No glasses or headwear (except religious)'
                ],
                facePosition: 'top-weighted'
            },
            'canada-passport': {
                width: 1.97, height: 2.76,
                requirements: [
                    'Size: 50mm x 70mm (1.97" x 2.76")',
                    'Head must be centered',
                    'Solid white or light natural-colored background',
                    'Neutral expression required',
                    'Uniform lighting without shadows',
                    'Face camera directly',
                    'No glasses or headwear (except religious)',
                    'Recent photograph (within last 6 months)'
                ],
                facePosition: 'top-weighted'
            }
        };

        this.initializeEventListeners();
        this.updatePhotoRequirements(); // Show requirements on load
    }

    async initializeFaceDetection() {
        try {
            // Wait for face-api.js to load
            if (typeof faceapi === 'undefined') {
                setTimeout(() => this.initializeFaceDetection(), 100);
                return;
            }

            const detectionStatus = document.getElementById('detectionStatus');
            detectionStatus.textContent = 'Loading face detection models...';

            // Load the tiny face detector model (lighter and faster)
            const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';

            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);

            this.faceDetectionReady = true;
            detectionStatus.textContent = '✓ Face detection ready';
            detectionStatus.style.color = '#28a745';

            console.log('Face detection models loaded successfully');
        } catch (error) {
            console.error('Error loading face detection:', error);
            const detectionStatus = document.getElementById('detectionStatus');
            detectionStatus.textContent = '⚠ Face detection unavailable (manual mode)';
            detectionStatus.style.color = '#ffc107';
        }
    }

    async detectFace(image) {
        if (!this.faceDetectionReady || document.getElementById('faceDetection').value !== 'auto') {
            return null;
        }

        try {
            const detectionStatus = document.getElementById('detectionStatus');
            detectionStatus.textContent = 'Detecting face...';
            detectionStatus.style.color = '#007bff';

            // Create a temporary canvas to analyze the image
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = image.width;
            tempCanvas.height = image.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(image, 0, 0);

            // Detect face with landmarks
            const detection = await faceapi
                .detectSingleFace(tempCanvas, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks(true);

            if (detection) {
                detectionStatus.textContent = '✓ Face detected successfully';
                detectionStatus.style.color = '#28a745';

                console.log('Face detected:', detection.detection.box);
                return {
                    box: detection.detection.box,
                    landmarks: detection.landmarks
                };
            } else {
                detectionStatus.textContent = '⚠ No face detected (using default positioning)';
                detectionStatus.style.color = '#ffc107';
                return null;
            }
        } catch (error) {
            console.error('Face detection error:', error);
            return null;
        }
    }

    initializeEventListeners() {
        // Image upload
        document.getElementById('imageUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Photo size selection
        document.getElementById('photoSize').addEventListener('change', (e) => {
            this.toggleCustomPhotoSize(e.target.value);
            this.updatePhotoRequirements();
        });

        // Print size selection
        document.getElementById('printSize').addEventListener('change', (e) => {
            this.toggleCustomPrintSize(e.target.value);
        });

        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateLayout();
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadImage();
        });

        // Print button
        document.getElementById('printBtn').addEventListener('click', () => {
            this.printImage();
        });
    }

    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Display file name
        document.getElementById('fileName').textContent = `Selected: ${file.name}`;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            img.onload = async () => {
                this.uploadedImage = img;
                console.log('Image loaded successfully:', img.width, 'x', img.height);

                // Detect face in the image
                this.detectedFace = await this.detectFace(img);

                document.getElementById('generateBtn').disabled = false;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    toggleCustomPhotoSize(value) {
        const customDiv = document.getElementById('customPhotoSize');
        customDiv.style.display = value === 'custom-photo' ? 'block' : 'none';
    }

    toggleCustomPrintSize(value) {
        const customDiv = document.getElementById('customPrintSize');
        customDiv.style.display = value === 'custom-print' ? 'block' : 'none';
    }

    updatePhotoRequirements() {
        const photoSizeValue = document.getElementById('photoSize').value;
        const requirementsBox = document.getElementById('photoRequirements');
        const requirementsContent = document.getElementById('requirementsContent');

        // Check if this is a country-specific photo size
        if (this.photoRequirements[photoSizeValue]) {
            const req = this.photoRequirements[photoSizeValue];

            let html = '<ul>';
            req.requirements.forEach(requirement => {
                html += `<li>${requirement}</li>`;
            });
            html += '</ul>';

            requirementsContent.innerHTML = html;
            requirementsBox.classList.add('show');
        } else {
            requirementsBox.classList.remove('show');
        }
    }

    getPhotoSize() {
        const photoSizeValue = document.getElementById('photoSize').value;

        // Check for country-specific requirements first
        if (this.photoRequirements[photoSizeValue]) {
            return {
                width: this.photoRequirements[photoSizeValue].width,
                height: this.photoRequirements[photoSizeValue].height,
                facePosition: this.photoRequirements[photoSizeValue].facePosition,
                type: photoSizeValue
            };
        }

        // Custom size
        if (photoSizeValue === 'custom-photo') {
            const width = parseFloat(document.getElementById('photoWidth').value);
            const height = parseFloat(document.getElementById('photoHeight').value);
            return { width, height, facePosition: 'center', type: 'custom' };
        }

        // Standard sizes
        const sizes = {
            '2x2': { width: 2, height: 2, facePosition: 'center' },
            '2x3': { width: 2, height: 3, facePosition: 'center' },
            '3x3': { width: 3, height: 3, facePosition: 'center' },
            '4x4': { width: 4, height: 4, facePosition: 'center' },
            '4x6': { width: 4, height: 6, facePosition: 'center' },
            '5x7': { width: 5, height: 7, facePosition: 'center' }
        };

        const size = sizes[photoSizeValue];
        return size ? { ...size, type: 'standard' } : null;
    }

    getPrintSize() {
        const printSize = document.getElementById('printSize').value;

        if (printSize === 'custom-print') {
            const width = parseFloat(document.getElementById('printWidth').value);
            const height = parseFloat(document.getElementById('printHeight').value);
            return { width, height };
        }

        const sizes = {
            '4x6': { width: 4, height: 6 },
            '5x7': { width: 5, height: 7 },
            '8x10': { width: 8, height: 10 },
            '11x14': { width: 11, height: 14 }
        };

        return sizes[printSize];
    }

    getDPI() {
        return parseInt(document.getElementById('dpi').value);
    }

    getPhotoSpacing() {
        return parseFloat(document.getElementById('photoSpacing').value);
    }

    calculateLayout(photoSize, printSize, spacing = 0) {
        // Calculate how many photos fit with spacing
        // Formula: n * photoSize + (n-1) * spacing <= printSize
        // Solving: n <= (printSize + spacing) / (photoSize + spacing)

        let cols = Math.floor((printSize.width + spacing) / (photoSize.width + spacing));
        let rows = Math.floor((printSize.height + spacing) / (photoSize.height + spacing));

        // Ensure at least 1 photo fits
        cols = Math.max(1, cols);
        rows = Math.max(1, rows);

        // Calculate total width and height including spacing
        const totalPhotoWidth = cols * photoSize.width + (cols - 1) * spacing;
        const totalPhotoHeight = rows * photoSize.height + (rows - 1) * spacing;

        // Calculate margins to center the photos
        const marginX = (printSize.width - totalPhotoWidth) / 2;
        const marginY = (printSize.height - totalPhotoHeight) / 2;

        return {
            cols,
            rows,
            total: cols * rows,
            marginX,
            marginY,
            spacing
        };
    }

    generateLayout() {
        if (!this.uploadedImage) {
            alert('Please upload an image first!');
            return;
        }

        const photoSize = this.getPhotoSize();
        const printSize = this.getPrintSize();
        const dpi = this.getDPI();
        const spacing = this.getPhotoSpacing();

        // Validate sizes
        if (photoSize.width > printSize.width || photoSize.height > printSize.height) {
            alert('Photo size cannot be larger than print size!');
            return;
        }

        // Calculate layout with spacing
        const layout = this.calculateLayout(photoSize, printSize, spacing);

        if (layout.total === 0) {
            alert('No photos fit in the selected print size. Please adjust your sizes.');
            return;
        }

        // Convert inches to pixels using DPI
        const canvasWidth = Math.round(printSize.width * dpi);
        const canvasHeight = Math.round(printSize.height * dpi);
        const photoWidthPx = Math.round(photoSize.width * dpi);
        const photoHeightPx = Math.round(photoSize.height * dpi);
        const marginXPx = Math.round(layout.marginX * dpi);
        const marginYPx = Math.round(layout.marginY * dpi);
        const spacingPx = Math.round(spacing * dpi);

        // Set canvas size
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        // Fill with white background
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw photos in grid with spacing
        for (let row = 0; row < layout.rows; row++) {
            for (let col = 0; col < layout.cols; col++) {
                const x = marginXPx + (col * (photoWidthPx + spacingPx));
                const y = marginYPx + (row * (photoHeightPx + spacingPx));

                // Draw image with appropriate face positioning
                this.drawImageWithFacePosition(
                    this.uploadedImage,
                    x, y,
                    photoWidthPx,
                    photoHeightPx,
                    photoSize.facePosition || 'center'
                );

                // Draw border around each photo
                this.ctx.strokeStyle = '#ddd';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x, y, photoWidthPx, photoHeightPx);
            }
        }

        // Update info box
        document.getElementById('infoBox').style.display = 'block';
        document.getElementById('layoutInfo').textContent =
            `${layout.cols} columns × ${layout.rows} rows = ${layout.total} photos per page`;

        const spacingText = spacing > 0 ? ` | Spacing: ${spacing}"` : '';
        const faceDetectionText = this.detectedFace ? ' | Face detected ✓' : '';

        document.getElementById('dimensionsInfo').textContent =
            `Photo: ${photoSize.width}"×${photoSize.height}" | Print: ${printSize.width}"×${printSize.height}" | Resolution: ${dpi} DPI${spacingText}${faceDetectionText}`;

        // Show preview
        document.getElementById('previewSection').style.display = 'block';
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('printBtn').disabled = false;

        // Scroll to preview
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    drawImageWithFacePosition(image, x, y, width, height, facePosition) {
        /**
         * Draw image with proper face positioning based on photo requirements
         *
         * facePosition options:
         * - 'center': Face centered (used for India passport/visa/OCI)
         * - 'top-weighted': Face in upper portion with shoulders visible (USA, Ireland, UK, Schengen, Canada)
         */

        const imgRatio = image.width / image.height;
        const areaRatio = width / height;

        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = image.width;
        let sourceHeight = image.height;

        // Use detected face for better positioning
        if (this.detectedFace && this.detectedFace.box) {
            const face = this.detectedFace.box;
            const faceCenterX = face.x + face.width / 2;
            const faceCenterY = face.y + face.height / 2;

            console.log('Using face detection for positioning.');
            console.log('Face box:', face);
            console.log('Face center:', faceCenterX, faceCenterY);

            if (imgRatio > areaRatio) {
                // Image is wider than area - crop sides, center on face horizontally
                sourceWidth = image.height * areaRatio;
                sourceX = Math.max(0, Math.min(
                    faceCenterX - sourceWidth / 2,
                    image.width - sourceWidth
                ));
            } else {
                // Image is taller than area - crop top/bottom, position face properly
                sourceHeight = image.width / areaRatio;

                if (facePosition === 'top-weighted') {
                    // For passport photos: need full head including hair visible with shoulders
                    // Face detection gives us the face box (usually from forehead to chin)
                    // We need to account for hair above the detected face

                    // Estimate hair height (typically 15-25% of face height above detected face)
                    const hairPadding = face.height * 0.4; // 40% padding for hair and forehead space
                    const estimatedTopOfHead = Math.max(0, face.y - hairPadding);

                    // For passport photos, head should occupy upper portion
                    // Top of head should be at ~10-15% from top of photo
                    // Bottom of chin should leave room for shoulders
                    const desiredHeadTopPosition = sourceHeight * 0.12; // 12% from top

                    sourceY = Math.max(0, estimatedTopOfHead - desiredHeadTopPosition);

                    // Ensure we don't crop the chin - face bottom should be at ~65-70% of photo height
                    const faceBottom = face.y + face.height;
                    const maxSourceY = Math.max(0, faceBottom - (sourceHeight * 0.68));

                    sourceY = Math.min(sourceY, maxSourceY);

                    console.log('Top-weighted positioning:', {
                        hairPadding,
                        estimatedTopOfHead,
                        desiredHeadTopPosition,
                        calculatedSourceY: sourceY,
                        faceBottom,
                        maxSourceY
                    });
                } else {
                    // Center-weighted: face and head should be centered
                    // For India documents, center the entire head including hair

                    // Estimate hair padding above face
                    const hairPadding = face.height * 0.35;
                    const estimatedTopOfHead = Math.max(0, face.y - hairPadding);

                    // Estimate full head height (from top of hair to chin)
                    const estimatedHeadHeight = (face.y + face.height) - estimatedTopOfHead;

                    // Center the head in the frame
                    const headCenter = estimatedTopOfHead + (estimatedHeadHeight / 2);
                    const targetCenter = sourceHeight / 2;

                    sourceY = Math.max(0, headCenter - targetCenter);

                    console.log('Center-weighted positioning:', {
                        hairPadding,
                        estimatedTopOfHead,
                        estimatedHeadHeight,
                        headCenter,
                        targetCenter,
                        sourceY
                    });
                }

                // Ensure we don't go out of bounds
                if (sourceY + sourceHeight > image.height) {
                    sourceY = image.height - sourceHeight;
                }
                if (sourceY < 0) {
                    sourceY = 0;
                }
            }
        } else {
            // Fallback to manual positioning when no face is detected
            console.log('No face detected, using manual positioning mode');

            if (imgRatio > areaRatio) {
                // Image is wider than area - crop sides, center horizontally
                sourceWidth = image.height * areaRatio;
                sourceX = (image.width - sourceWidth) / 2;
            } else {
                // Image is taller than area - crop top/bottom
                sourceHeight = image.width / areaRatio;

                if (facePosition === 'top-weighted') {
                    // For passport photos: assume face is in upper-middle portion
                    // Leave ~15% from top for head room, crop more from bottom
                    sourceY = (image.height - sourceHeight) * 0.30;
                } else {
                    // Center vertically (for India photos and general use)
                    sourceY = (image.height - sourceHeight) / 2;
                }

                // Ensure we don't go out of bounds
                if (sourceY + sourceHeight > image.height) {
                    sourceY = image.height - sourceHeight;
                }
                if (sourceY < 0) {
                    sourceY = 0;
                }
            }
        }

        console.log('Final crop values:', {
            sourceX, sourceY, sourceWidth, sourceHeight,
            imageSize: `${image.width}x${image.height}`,
            outputSize: `${width}x${height}`
        });

        // Draw the cropped and scaled image
        this.ctx.drawImage(
            image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, width, height
        );
    }

    downloadImage() {
        const link = document.createElement('a');
        const photoSize = this.getPhotoSize();
        const printSize = this.getPrintSize();

        const fileName = photoSize.type && photoSize.type !== 'standard' && photoSize.type !== 'custom'
            ? `${photoSize.type}-photos-${printSize.width}x${printSize.height}.png`
            : `print-${photoSize.width}x${photoSize.height}-on-${printSize.width}x${printSize.height}.png`;

        link.download = fileName;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    printImage() {
        window.print();
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PhotoPrintConverter();
});
