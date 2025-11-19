// Photo Print Converter - Main Application Logic

class PhotoPrintConverter {
    constructor() {
        this.uploadedImage = null;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Image upload
        document.getElementById('imageUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Photo size selection
        document.getElementById('photoSize').addEventListener('change', (e) => {
            this.toggleCustomPhotoSize(e.target.value);
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

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Display file name
        document.getElementById('fileName').textContent = `Selected: ${file.name}`;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.uploadedImage = img;
                document.getElementById('generateBtn').disabled = false;
                console.log('Image loaded successfully:', img.width, 'x', img.height);
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

    getPhotoSize() {
        const photoSize = document.getElementById('photoSize').value;

        if (photoSize === 'custom-photo') {
            const width = parseFloat(document.getElementById('photoWidth').value);
            const height = parseFloat(document.getElementById('photoHeight').value);
            return { width, height };
        }

        const sizes = {
            '2x2': { width: 2, height: 2 },
            '2x3': { width: 2, height: 3 },
            '3x3': { width: 3, height: 3 },
            '4x4': { width: 4, height: 4 },
            '4x6': { width: 4, height: 6 },
            '5x7': { width: 5, height: 7 }
        };

        return sizes[photoSize];
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

    calculateLayout(photoSize, printSize) {
        // Calculate how many photos fit in each direction
        const cols = Math.floor(printSize.width / photoSize.width);
        const rows = Math.floor(printSize.height / photoSize.height);

        // Calculate spacing to center the photos
        const totalPhotoWidth = cols * photoSize.width;
        const totalPhotoHeight = rows * photoSize.height;

        const marginX = (printSize.width - totalPhotoWidth) / 2;
        const marginY = (printSize.height - totalPhotoHeight) / 2;

        return {
            cols,
            rows,
            total: cols * rows,
            marginX,
            marginY
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

        // Validate sizes
        if (photoSize.width > printSize.width || photoSize.height > printSize.height) {
            alert('Photo size cannot be larger than print size!');
            return;
        }

        // Calculate layout
        const layout = this.calculateLayout(photoSize, printSize);

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

        // Set canvas size
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        // Fill with white background
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw photos in grid
        for (let row = 0; row < layout.rows; row++) {
            for (let col = 0; col < layout.cols; col++) {
                const x = marginXPx + (col * photoWidthPx);
                const y = marginYPx + (row * photoHeightPx);

                // Calculate the best fit for the image (cover mode)
                this.drawImageCover(
                    this.uploadedImage,
                    x, y,
                    photoWidthPx,
                    photoHeightPx
                );

                // Optional: Draw border around each photo
                this.ctx.strokeStyle = '#ddd';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x, y, photoWidthPx, photoHeightPx);
            }
        }

        // Update info box
        document.getElementById('infoBox').style.display = 'block';
        document.getElementById('layoutInfo').textContent =
            `${layout.cols} columns × ${layout.rows} rows = ${layout.total} photos per page`;
        document.getElementById('dimensionsInfo').textContent =
            `Photo: ${photoSize.width}"×${photoSize.height}" | Print: ${printSize.width}"×${printSize.height}" | Resolution: ${dpi} DPI`;

        // Show preview
        document.getElementById('previewSection').style.display = 'block';
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('printBtn').disabled = false;

        // Scroll to preview
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    drawImageCover(image, x, y, width, height) {
        // Calculate scaling to cover the area (similar to CSS background-size: cover)
        const imgRatio = image.width / image.height;
        const areaRatio = width / height;

        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = image.width;
        let sourceHeight = image.height;

        if (imgRatio > areaRatio) {
            // Image is wider than area - crop sides
            sourceWidth = image.height * areaRatio;
            sourceX = (image.width - sourceWidth) / 2;
        } else {
            // Image is taller than area - crop top/bottom
            sourceHeight = image.width / areaRatio;
            sourceY = (image.height - sourceHeight) / 2;
        }

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

        link.download = `print-${photoSize.width}x${photoSize.height}-on-${printSize.width}x${printSize.height}.png`;
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
