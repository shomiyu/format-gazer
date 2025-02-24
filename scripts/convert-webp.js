const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

async function convertToWebP() {
  const srcDir = path.join(__dirname, "../src");
  const outputDir = path.join(__dirname, "../output");

  try {
    await fs.mkdir(outputDir, { recursive: true });

    const files = await fs.readdir(srcDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".png" || ext === ".jpg") {
        const srcPath = path.join(srcDir, file);
        const outputPath = path.join(
          outputDir,
          path.basename(file, ext) + ".webp"
        );

        await sharp(srcPath)
          .webp({
            quality: 80,
            lossless: false,
          })
          .toFile(outputPath);
        console.log(`🌍 Converted: ${file} → ${path.basename(outputPath)}`);
      }
    }
    console.log("🎉 PNG/JPG → WebP conversion complete!");
  } catch (error) {
    console.error("❌ Error converting to WebP:", error);
  }
}

convertToWebP();
