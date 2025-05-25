const { Storage } = require('@google-cloud/storage');
const { Readable } = require('stream');  // 스트림을 사용하기 위해 필요

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
console.log("🔑 GCS Key Path:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

// 이미지 업로드 (buffer로 파일을 받으면 이를 스트림으로 변환)
const uploadImageToGCS = (file, folder) => {
  return new Promise((resolve, reject) => {
    // buffer를 읽을 수 있는 스트림으로 변환
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);  // 스트림 끝을 표시

    const fileName = `${folder}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    // bufferStream을 fileUpload 스트림에 연결
    bufferStream.pipe(stream);

    stream.on('finish', async () => {
      resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

// 이미지 삭제
const deleteImageFromGCS = async (imageUrl) => {
  if (!imageUrl) return;
  const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
  const filePath = imageUrl.replace(baseUrl, '');

  try {
    await bucket.file(filePath).delete();
    console.log(`GCS에서 ${filePath} 삭제됨`);
  } catch (err) {
    console.error(`GCS 이미지 삭제 실패: ${filePath}`, err.message);
  }
};

module.exports = { uploadImageToGCS, deleteImageFromGCS };
