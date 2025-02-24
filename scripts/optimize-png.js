const fs = require("fs").promises;
const path = require("path");
const { execFile } = require("child_process");

async function optimizePNGFiles() {
  const pngquant = (await import("pngquant-bin")).default;
  const outputDir = path.join(__dirname, "../output");

  try {
    const files = await fs.readdir(outputDir);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".png") {
        const filePath = path.join(outputDir, file);
        await new Promise((resolve, reject) => {
          execFile(
            pngquant,
            [
              "--quality=60-75", // 圧縮率を少し上げる（元は65-80）
              "--speed=1", // 最も遅いが最適な圧縮を実現（1-11、1が最高品質）
              "--ext=.png",
              "--force",
              filePath,
            ],
            (err) => {
              if (err) return reject(err);
              console.log(`🔧 Optimized: ${filePath}`);
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
