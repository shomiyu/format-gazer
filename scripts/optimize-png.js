const fs = require("fs").promises;
const path = require("path");
const { execFile } = require("child_process");

async function optimizePNGFiles() {
  const pngquant = (await import("pngquant-bin")).default;
  const srcDir = path.join(__dirname, "../src");
  const outputDir = path.join(__dirname, "../output");

  try {
    await fs.mkdir(outputDir, { recursive: true });

    const files = await fs.readdir(srcDir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".png") {
        const srcPath = path.join(srcDir, file);
        const outputPath = path.join(outputDir, file);

        await fs.copyFile(srcPath, outputPath);

        await new Promise((resolve, reject) => {
          execFile(
            pngquant,
            [
              "--quality=60-75",
              "--speed=1",
              "--ext=.png",
              "--force",
              outputPath,
            ],
            (err) => {
              if (err) return reject(err);
              console.log(`🔧 Optimized: ${file}`);
              resolve();
            }
          );
        });
      }
    }
    console.log("🎉 PNG optimization complete!");
  } catch (error) {
    console.error("❌ Error optimizing PNG files:", error);
  }
}

optimizePNGFiles();
