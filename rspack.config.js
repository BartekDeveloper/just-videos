// rspack.config.js
const path = require("path");
const { transform } = require("lightningcss");
const fs = require("fs");
const { TanStackRouterRspack } = require("@tanstack/router-plugin/rspack");

// A small plugin to integrate Lightning CSS in RSPack:
function LightningCSSPlugin() {
  return {
    name: "lightning-css-plugin",
    apply(rspack) {
      rspack.hooks.afterEmit.tapPromise(
        "lightning-css-plugin",
        async (compilation) => {
          // Minimal example usage: read a CSS file, transform it, output to dist
          const inputPath = path.resolve(__dirname, "styles", "index.css");
          const outputPath = path.resolve(__dirname, "dist", "bundle.css");
          if (fs.existsSync(inputPath)) {
            const inputCSS = fs.readFileSync(inputPath, "utf8");
            const { code /*, map*/ } = transform({
              code: Buffer.from(inputCSS),
              targets: {
                chrome: 90,
              },
              sourceMap: true,
            });
            fs.writeFileSync(outputPath, code);
            // Optionally write map if needed
          }
        }
      );
    },
  };
}

module.exports = {
  mode: "development", // or "production"
  entry: "./src/main.tsx", 
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "swc-loader", 
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    LightningCSSPlugin(),

    // Configure the plugin to read routes from 'src/routes'
    // and generate 'routes.gen.ts' in that same folder.
    TanStackRouterRspack({
      routesDir: path.resolve(__dirname, "src", "routes"),
      outFile: path.resolve(__dirname, "src", "routes", "routes.gen.ts"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
};
