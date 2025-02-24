const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

async function convertToWebP() {
  const outputDir = path.join(__dirname, "../output");

  try {
    const files = await fs.readdir(outputDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".png" || ext === ".jpg") {
        const inputPath = path.join(outputDir, file);
        const outputPath = path.join(
          outputDir,
          path.basename(file, ext) + ".webp"
        );

        await sharp(inputPath)
          .webp({
            quality: 80, // WebPの品質設定
            lossless: false, // 可逆圧縮を無効化
          })
          .toFile(outputPath);
        console.log(`🌍 Converted: ${inputPath} → ${outputPath}`);
      }
    }
    console.log("🎉 PNG/JPG → WebP conversion complete!");
  } catch (error) {
    console.error("❌ Error converting to WebP:", error);
  }
}

convertToWebP();
