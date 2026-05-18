```js
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(
  ffmpegPath
);

const convertVideoToAudio = (
  inputPath
) => {
  return new Promise(
    (resolve, reject) => {

      const outputDir =
        "uploads/tafsiir/audio";

      if (
        !fs.existsSync(outputDir)
      ) {
        fs.mkdirSync(
          outputDir,
          {
            recursive: true,
          }
        );
      }

      const fileName =
        Date.now() + ".mp3";

      const outputPath =
        path.join(
          outputDir,
          fileName
        );

      ffmpeg(inputPath)

        .toFormat("mp3")

        .on("end", () => {
          resolve(outputPath);
        })

        .on(
          "error",
          (err) => {
            reject(err);
          }
        )

        .save(outputPath);
    }
  );
};

export default convertVideoToAudio;
```
