const cp = require('child_process');

exports.spawnGame = ({
  gameDir,
  gameExe = 'gamemd.exe',
  hostUri,
  graphic,
  args,
  isWindowMode,
  isAres,
}) => {
  /***
   * If it need to run as admin. Then use Pipe of something that
   * can communicate that process is running or not.
   */

  if (isAres) {
    gameExe = 'syringe.bin';
    args = [
      '"gamemd.exe"',
      ...args,
    ];
  }

  const child = cp.spawn(
    `${gameDir}\\${gameExe}`, args, {
      windowsVerbatimArguments: true,
      cwd: gameDir,
      env: {
        'CNCNET_URL': `ra2:v4serv=${hostUri}`,
      },
    },
  );

  return child;
};
