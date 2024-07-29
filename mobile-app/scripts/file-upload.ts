import * as FileSystem from "expo-file-system";

export const uploadImage = async (uri: string, answers: any) => {
  //TODO: UPDATE URL
  const url = new URL ("http://10.0.0.145:5000/multipart-upload")
  url.search = new URLSearchParams(answers).toString();
  const res = await FileSystem.uploadAsync(
    url.toString(),
    uri,
    {
      httpMethod: "PATCH",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "photo",
    }
  );
  console.log(JSON.stringify(res, null, 4));
};
