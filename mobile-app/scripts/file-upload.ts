import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useImage } from '@/hooks/usePhotoContext'


export const uploadImage = async (uri: string, answers: any) => {
  //TODO: UPDATE URL
  const url = new URL ("http://10.0.0.145:5000/upload")
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
  return res;
};
