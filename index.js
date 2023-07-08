// Knihovny pro nutnost behu jako github actions
const core = require('@actions/core');
const github = require('@actions/github');

// Potrebne knihovny
const path = require('path');

// Nacteme lokalni knihovny
const config = require('./lib/searchConfig');
const manifests = require('./lib/renderManifests');

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  const configFile = core.getInput('config-file-name');
  const tmpDir = core.getInput('tmp-directory');
  /*
  console.log("Working directory:", path.resolve(workingDir));
  console.log("File from environments:", confFile);
  console.log("Temporary directory k8s manifests:", tmpDir);
  */
  const foundConfigFile = config.getConfFiles(workingDir, configFile);

  console.log("Found files:");
  if (foundConfigFile.length > 0) {
    for (const configFile of foundConfigFile) {
      // spustime vykonny kod pro renderovani
      // Scriptu, predlozime vyhledany ENV soubor, ktery si modul rozparsuje a nasledne vygeneruje
      // k8s manifesty a vlozi do nej dashboard z uvedeneho zdroje
      manifests.init(configFile);
    }
  } else {
    console.log('Files is not found.');
  }


  // Set Output
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);
} catch (error) {
  core.setFailed(error.message)  
}