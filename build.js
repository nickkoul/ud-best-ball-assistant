// build.js
import { watch } from "fs";
import { Glob } from "bun";

let buildTimeout;
let isBuilding = false;
let hasLoggedChange = false;

async function build() {
  if (isBuilding) return; // Prevent concurrent builds
  
  isBuilding = true;
  console.log("🔨 Building...");
  hasLoggedChange = false; // Reset for next change

  try {
    // Bundle JS files
    await Bun.build({
      entrypoints: ['./src/popup.js'],
      outdir: './dist',
      minify: false,
      sourcemap: 'external',
    });

    // Copy HTML files
    const htmlGlob = new Glob("**/*.html");
    for await (const file of htmlGlob.scan("./src")) {
      await Bun.write(`./dist/${file}`, Bun.file(`./src/${file}`));
    }

    // Copy manifest and CSS
    await Bun.write('./dist/manifest.json', Bun.file('./manifest.json'));
    
    const cssGlob = new Glob("**/*.css");
    for await (const file of cssGlob.scan("./src")) {
      await Bun.write(`./dist/${file}`, Bun.file(`./src/${file}`));
    }

    console.log("✅ Build complete!");
  } finally {
    isBuilding = false;
  }
}

// Initial build
await build();

// Watch mode
if (process.argv.includes('--watch')) {
  console.log("👀 Watching for changes...");
  
  watch('./src', { recursive: true }, async (event, filename) => {
    // Ignore temp files
    if (filename.includes('~') || filename.includes('.swp') || /^\d+$/.test(filename)) {
      return;
    }
    
    // Only log once per debounce window
    if (!hasLoggedChange) {
      console.log(`📝 Changed: ${filename}`);
      hasLoggedChange = true;
    }
    
    // Debounce: wait 100ms before building
    clearTimeout(buildTimeout);
    buildTimeout = setTimeout(build, 100);
  });}
