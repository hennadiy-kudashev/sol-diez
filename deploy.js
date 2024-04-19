const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  // Password optional, prompted if none given
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: __dirname,
  remoteRoot: "/http/",
  include: ["*", "**/*"],      // this would upload everything except dot files
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "css/**/*.map",
    "videos/**",
    "node_modules/**",
    "node_modules/**/.*",
    "node_modules/**/.*/**",
    ".git/**",
    ".idea/**",
    "scss/**",
    "gulpfile.js",
    "package.json",
    "deploy.js",
    ".gitignore",
    "yarn.lock",
    ".envrc",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy.on("uploading", function (data) {
  console.log(`Deploying ${data.transferredFileCount} files of ${data.totalFilesCount}: ${data.filename}`);
});

ftpDeploy
  .deploy(config)
  .then((res) => console.log(`Deployed ${res.length} files`))
  .catch((err) => console.log(err));
