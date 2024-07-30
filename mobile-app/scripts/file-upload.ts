import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useImage } from '@/hooks/usePhotoContext'
export async function imagePreprocessing(uri: string){
  const { height, width } = Dimensions.get("window");
  console.log('preprocessing')

  const { updateImage } = useImage()
  const imageProcessed = await manipulateAsync(
    uri,
    [{ rotate: 90 }, {crop: {
      originX: width/2 + 150,
      originY: height/2 + 150, // This will need to be changed
      width: 300,
      height: 300
    }}],
    { compress: 1, format: SaveFormat.JPEG }
  );
  updateImage(imageProcessed)
  return;
}

export const uploadImage = async (uri: string, answers: any) => {
  //TODO: UPDATE URL
  imagePreprocessing("")
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
