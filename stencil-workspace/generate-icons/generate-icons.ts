import colors = require('colors');
import path = require('path');
import cheerio = require('cheerio');
import ejs = require('ejs');
const fs = require('fs').promises;

interface IconFunctionalComponentTemplateData {
  componentName: string;
  className: string;
  viewBox: string;
  svgHtml: string;
}

interface ModusIconMapTemplateData {
  icons: { name: string; caseName: string }[];
}

interface ModusIconUtilitiesTemplateData {
  iconNames: string[];
}

const NODE_MODULE_SVG_FOLDER = path.join(__dirname, '../node_modules/@trimble-oss/modus-icons/dist/modus-solid/svg');
const GENERATED_ICONS_OUTPUT_FOLDER = path.join(__dirname, '../src/icons/generated-icons');
const MODUS_ICON_UTIL_OUTPUT_PATH = path.join(__dirname, '../src/icons/ModusIconUtilities.ts');
const MODUS_ICON_MAP_OUTPUT_PATH = path.join(__dirname, '../src/icons/ModusIconMap.tsx');

const ICON_FUNCTIONAL_COMPONENT_TEMPLATE = path.join(__dirname, 'IconFunctionalComponent.template.ejs');
const MODUS_ICON_MAP_TEMPLATE = path.join(__dirname, 'ModusIconMap.template.ejs');
const MODUS_ICON_UTILITIES_TEMPLATE = path.join(__dirname, 'ModusIconUtilities.template.ejs');

(async function generateIcons() {
  console.log(colors.blue('Generating Modus Icons files...'));

  try {
    await generateIconComponentsAsync();
    await generateModusIconMapAsync();
    await generateModusIconUtilitiesAsync();
    console.log(colors.blue('Modus Icons files successfully generated ✨'));
  } catch (error) {
    handleGenerationError(error);
  }
})();

/*
  Generate the individual Icon functional components containing the SVGs based on each icon
  within the modus-icons package.
*/
export async function generateIconComponentsAsync() {
  try {
    const nodeModuleSvgFileNames = await fs.readdir(NODE_MODULE_SVG_FOLDER);
    for (const nodeModuleSvgFileName of nodeModuleSvgFileNames) {
      const { generatedFileContents, componentName } = await buildIconComponentFileContentsAsync(nodeModuleSvgFileName);
      await fs.writeFile(path.join(GENERATED_ICONS_OUTPUT_FOLDER, `${componentName}.tsx`), generatedFileContents);
    }
  } catch (error) {
    throw new Error(`Failed to generate SVG files: ${error.message}`);
  }
}

/*
  Generate the ModusIconMap component based on the files that are generated in the
  previous steps.
*/
async function generateModusIconMapAsync() {
  try {
    const generatedIconFileNames = await fs.readdir(GENERATED_ICONS_OUTPUT_FOLDER);
    const modusIconMapFileContents = await buildModusIconMapFileContentsAsync(generatedIconFileNames);
    await fs.writeFile(MODUS_ICON_MAP_OUTPUT_PATH, modusIconMapFileContents);
  } catch (error) {
    throw new Error(`Failed to generate ModusIconMap: ${error.message}`);
  }
}

/*
  Generate the array of icon names and the ModusIconName type based on the files
  that are generated in the previous steps.
*/
async function generateModusIconUtilitiesAsync() {
  try {
    const generatedSvgFileNames: string[] = await fs.readdir(GENERATED_ICONS_OUTPUT_FOLDER);
    const iconUtilitiesFileContents = await buildIconUtilitiesFileContentsAsync(generatedSvgFileNames);
    await fs.writeFile(MODUS_ICON_UTIL_OUTPUT_PATH, iconUtilitiesFileContents);
  } catch (error) {
    throw new Error(`Failed to generate icon names and type: ${error.message}`);
  }
}

///////////////////////////////////////////////////////////////////
//                       Helper functions
///////////////////////////////////////////////////////////////////

export async function buildIconComponentFileContentsAsync(
  nodeModuleSvgFileName: string
): Promise<{ generatedFileContents: string; componentName: string }> {
  const nodeModuleBaseFileName = path.basename(nodeModuleSvgFileName, '.svg');

  const componentName = convertNodeModuleSvgFileNameToComponentName(nodeModuleBaseFileName);
  const className = `icon-${nodeModuleBaseFileName}`;

  const nodeModuleSvgFilePath = path.join(NODE_MODULE_SVG_FOLDER, nodeModuleSvgFileName);
  const nodeModuleSvgContent = await fs.readFile(nodeModuleSvgFilePath, 'utf8');
  const loadedNodeModuleSvgContent = cheerio.load(nodeModuleSvgContent)('svg');
  const viewBox = loadedNodeModuleSvgContent.attr('viewBox');
  const svgHtml = loadedNodeModuleSvgContent.html();

  const templateData: IconFunctionalComponentTemplateData = {
    componentName,
    className,
    viewBox,
    svgHtml,
  };

  const generatedFileContents = await renderFileContents(ICON_FUNCTIONAL_COMPONENT_TEMPLATE, templateData);

  return { generatedFileContents, componentName };

  function convertNodeModuleSvgFileNameToComponentName(baseFileName: string): string {
    // Convert the kebab-case file name to PascalCase, prefixing with 'Icon'.
    return 'Icon' + baseFileName.split('-').map(capitalizeFirstLetter).join('');
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export function buildModusIconMapFileContentsAsync(generatedIconComponentFileNames: string[]): Promise<string> {
  const icons = generatedIconComponentFileNames.map((iconFileName) => {
    const baseName = path.basename(iconFileName, '.tsx');
    const caseName = pascalCaseToSnakeCase(baseName).replace(/icon_/, '');
    return { name: baseName, caseName };
  });

  const templateData: ModusIconMapTemplateData = {
    icons,
  };

  return renderFileContents(MODUS_ICON_MAP_TEMPLATE, templateData);
}

export function buildIconUtilitiesFileContentsAsync(generatedIconComponentFileNames: string[]): Promise<string> {
  let iconNames = generatedIconComponentFileNames
    .filter((generatedSvgFileName) => path.extname(generatedSvgFileName) === '.tsx')
    .map(
      (generatedSvgFileName) => `'${pascalCaseToSnakeCase(path.basename(generatedSvgFileName, '.tsx').replace(/Icon/, ''))}'`
    );

  const templateData: ModusIconUtilitiesTemplateData = {
    iconNames,
  };

  return renderFileContents(MODUS_ICON_UTILITIES_TEMPLATE, templateData);
}

async function renderFileContents(templatePath: string, templateData: any): Promise<string> {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, templateData, {}, (err, renderedContentString) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(renderedContentString);
    });
  });
}

function pascalCaseToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).slice(1);
}

function handleGenerationError(error: Error) {
  console.error(colors.red('There was an error during icon generation (generate-icons.js):'), error);
  process.exit(1);
}
