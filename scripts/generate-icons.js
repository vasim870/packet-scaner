import fs from 'fs';
import zlib from 'zlib';

function createSolidPNG(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(2, 9); // Truecolor (RGB)
  ihdr.writeUInt8(0, 10); // Deflate
  ihdr.writeUInt8(0, 11); // Filter
  ihdr.writeUInt8(0, 12); // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines: width * 3 bytes + 1 filter byte per line
  const rawData = Buffer.alloc(height * (width * 3 + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      // Draw subtle emerald gradient and centered emblem
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const isCorner = Math.abs(x - cx) > width * 0.44 && Math.abs(y - cy) > height * 0.44;

      if (dist < width * 0.28) {
        // Gold central scale / emblem
        rawData[offset++] = 245;
        rawData[offset++] = 158;
        rawData[offset++] = 11;
      } else if (dist < width * 0.38 && (Math.abs(x - cx) < 6 || Math.abs(y - (cy - 30)) < 6)) {
        // White scale beam & pillar
        rawData[offset++] = 255;
        rawData[offset++] = 255;
        rawData[offset++] = 255;
      } else {
        // Emerald background
        const grad = Math.floor((y / height) * 30);
        rawData[offset++] = Math.max(0, r - grad);
        rawData[offset++] = Math.max(0, g - grad);
        rawData[offset++] = Math.max(0, b - grad);
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4);
  data.copy(chunk, 8);
  const crc = crc32(Buffer.concat([Buffer.from(type), data]));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Generate standard PWA icons
fs.writeFileSync('public/pwa-192x192.png', createSolidPNG(192, 192, 4, 120, 87));
fs.writeFileSync('public/pwa-512x512.png', createSolidPNG(512, 512, 4, 120, 87));
fs.writeFileSync('public/pwa-maskable-512x512.png', createSolidPNG(512, 512, 6, 78, 59));
fs.writeFileSync('public/apple-touch-icon.png', createSolidPNG(180, 180, 4, 120, 87));

console.log('Successfully generated PWA icon assets in public/');
