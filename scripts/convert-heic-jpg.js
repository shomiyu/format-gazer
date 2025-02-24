const fs = require("fs").promises;
const path = require("path");
const heicConvert = require("heic-convert");

async function convertHEICtoJPG(inputPath, outputPath) {
  try {
    const inputBuffer = await fs.readFile(inputPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: "JPEG", // PNGからJPEGに変更
      quality: 0.85, // JPEGの品質設定（0-1）
    });

    await fs.writeFile(outputPath, outputBuffer);
    console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error);
  }
}

async function convertAllHEICFiles() {
  const inputDir = path.join(__dirname, "../src");
  const outputDir = path.join(__dirname, "../output");

  try {
    const files = await fs.readdir(inputDir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".heic") {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(
          outputDir,
          path.basename(file, path.extname(file)) + ".jpg"
        );
        await convertHEICtoJPG(inputPath, outputPath);
      }
    }
    console.log("🎉 HEIC → JPG conversion complete!");
  } catch (error) {
    console.error("❌ Error processing HEIC files:", error);
  }
}

convertAllHEICFiles();
