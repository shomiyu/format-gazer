const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

async function optimizeJPGFiles() {
  const outputDir = path.join(__dirname, "../output");

  try {
    const files = await fs.readdir(outputDir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".jpg") {
        const filePath = path.join(outputDir, file);
        const optimizedPath = path.join(
          outputDir,
          `${path.parse(file).name}.jpg`
        );

        await sharp(filePath)
          .jpeg({
            quality: 75, // 圧縮品質（0-100）
            mozjpeg: true, // mozjpegを使用して高品質な圧縮を実現
            chromaSubsampling: "4:2:0", // より効率的な圧縮のためのサブサンプリング
          })
          .toFile(optimizedPath + ".tmp");

        // 一時ファイルを元のファイルに置き換え
        await fs.unlink(filePath);
        await fs.rename(optimizedPath + ".tmp", filePath);

        console.log(`🔧 Optimized: ${filePath}`);
      }
    }
    console.log("🎉 JPG optimization complete!");
  } catch (error) {
    console.error("❌ Error optimizing JPG files:", error);
  }
}

optimizeJPGFiles();
