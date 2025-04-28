const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function bundleOAS() {
  const inputPath = path.resolve(__dirname, '../oas/lke/lke.openapi.yaml');
  const outputDir = path.resolve(__dirname, '../docs/api/lke');
  const outputPath = path.join(outputDir, 'lke.openapi.yaml');

  // Garante que o diretório de saída existe
  fs.mkdirSync(outputDir, { recursive: true });

  // Faz o bundle do OAS
  const oas = await $RefParser.bundle(inputPath);

  // Converte para YAML e salva
  const yamlContent = YAML.stringify(oas);
  fs.writeFileSync(outputPath, yamlContent, 'utf8');
  console.log('Bundle OAS created in:', outputPath);
}

bundleOAS().catch((err) => {
  console.error('Error to create OAS bundle:', err);
  process.exit(1);
});