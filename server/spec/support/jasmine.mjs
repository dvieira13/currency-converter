export default {
  spec_dir: "spec",
  spec_files: ["**/*[sS]pec.ts"],
  helpers: ["helpers/**/*.ts"],
  requires: ["tsx"] // use tsx for extensionless ES imports
};
