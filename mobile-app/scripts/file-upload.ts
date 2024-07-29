import * as FileSystem from "expo-file-system";

export const uploadImage = async (uri: string) => {
  //TODO: UPDATE URL
  console.log(`running on ${uri}`);
  await fetch("http://10.0.0.145:5328/binary-upload");
  const res = await FileSystem.uploadAsync(
    "http://10.0.0.145:5328/binary-upload",
    uri,
    {
      httpMethod: "PATCH",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      fieldName: "file",
    }
  );
  console.log(JSON.stringify(res, null, 4));
};

export const test = async (uri: string) => {
  // Your base64 encoded file data
  console.log('we good!')
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });
  console.log('we good!')

  // Decode the base64 string
  const binaryString = atob(base64Data);

  // Convert the binary string to an array buffer
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the array buffer
  const blob = new Blob([bytes], { type: "application/octet-stream" });

  // Create a FormData object and append the Blob
  const formData = new FormData();
  formData.append("file", blob, "filename.jpg"); // You can provide the desired file name and extension
  console.log('we good!')
  // Send the request using fetch
  fetch("http://10.0.0.145:5328/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
