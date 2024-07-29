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
