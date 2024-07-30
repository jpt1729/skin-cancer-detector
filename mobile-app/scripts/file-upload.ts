import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';


export const uploadImage = async (uri: string, answers: any, imageDetails: any) => {
  //TODO: UPDATE URL
  const url = new URL (`${process.env.EXPO_PUBLIC_API_URL}/upload`)
  url.search = new URLSearchParams(answers).toString();
  console.log(imageDetails)
  const processedUri = await manipulateAsync(uri, [{resize: {
    width: imageDetails["resolution"]["width"],
    height: imageDetails["resolution"]["height"],
  }}])
  console.log(processedUri)
  const res = await FileSystem.uploadAsync(
    url.toString(),
    processedUri.uri,
    {
      httpMethod: "PATCH",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "photo",
    }
  );
  console.log(res)
  return res;
};
