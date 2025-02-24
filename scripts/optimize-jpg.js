const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

async function optimizeJPGFiles() {
  const srcDir = path.join(__dirname, "../src");
  const outputDir = path.join(__dirname, "../output");

  try {
    await fs.mkdir(outputDir, { recursive: true });

    const files = await fs.readdir(srcDir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".jpg") {
        const srcPath = path.join(srcDir, file);
        const outputPath = path.join(outputDir, file);

        await sharp(srcPath)
          .jpeg({
            quality: 75,
            mozjpeg: true,
            chromaSubsampling: "4:2:0",
          })
          .toFile(outputPath);

        console.log(`🔧 Optimized: ${file}`);
      }
    }
    console.log("🎉 JPG optimization complete!");
  } catch (error) {
    console.error("❌ Error optimizing JPG files:", error);
  }
}

optimizeJPGFiles();
