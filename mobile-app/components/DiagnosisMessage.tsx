import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ThemedText } from "./ThemedText";

type DiagnosisMessageProps = {
  result: any;
};

const getPercentage = (number: number) => {
    const multiplied = number * 100;
    const rounded = multiplied.toFixed(1);
    return parseFloat(rounded);
  };

export default function DiagnosisMessage({ result }: DiagnosisMessageProps) {
  if (result.status !== 200) {
    return (
      <ThemedText
        type="subtitle"
        style={{
          fontWeight: "medium",
          fontSize: 24,
          color: "white",
          lineHeight: 29,
        }}
      >
        {result.error}
      </ThemedText>
    );
  }
  let jsonObject;
  try {
    jsonObject = JSON.parse(result.body);
  } catch (error) {
    console.log(error);
    return (
      <>
        <ThemedText
          type="subtitle"
          style={{
            fontWeight: "medium",
            fontSize: 24,
            color: "white",
            lineHeight: 29,
          }}
        >
          Right now, our model is speaking gibberish. We couldn't process the
          response
        </ThemedText>
      </>
    );
  }
  const probability = jsonObject.probability;
  if (probability >= 0.0 && probability <= 0.35) {
    return (
      <>
        <ThemedText
          type="subtitle"
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: "white",
            lineHeight: 29,
          }}
        >
          From this photo, you likely{" "}
          <ThemedText type="highlight">do not have</ThemedText> skin cancer.
        </ThemedText>
        <ThemedText style={{color:'#FFFFFF'}}>
            Our model believes you have a {`${getPercentage(probability)}%`} chance of skin cancer. If you continue to feel skin cancer symptoms, please see a doctor.
        </ThemedText>
      </>
    );
  } else if (probability > 0.35 && probability <= 0.65) {
    return (
      <>
        <ThemedText
          type="subtitle"
          style={{
            fontWeight: "medium",
            fontSize: 24,
            color: "white",
            lineHeight: 29,
          }}
        >
          From this photo, you{" "}
          <ThemedText type="highlight">might have</ThemedText> skin cancer.
        </ThemedText>
        <ThemedText style={{color:'#FFFFFF'}}>
            Our model believes you have a {`${getPercentage(probability)}%`} chance of skin cancer. If you continue to feel skin cancer symptoms, please see a doctor.
        </ThemedText>
      </>
    );
  } else if (probability > 0.65 && probability <= 1.0) {
    return (
      <>
        <ThemedText
          type="subtitle"
          style={{
            fontWeight: "medium",
            fontSize: 24,
            color: "white",
            lineHeight: 29,
          }}
        >
          From this photo, you{" "}
          <ThemedText type="highlight">likely have</ThemedText> skin cancer.
        </ThemedText>
        <ThemedText style={{color:'#FFFFFF'}}>
            Our model believes you have a {`${getPercentage(probability)}%`} chance of skin cancer. If you continue to feel skin cancer symptoms, please see a doctor.
        </ThemedText>
      </>
    );
  } else {
    return (
      <>
        <ThemedText
          type="subtitle"
          style={{
            fontWeight: "medium",
            fontSize: 24,
            color: "white",
            lineHeight: 29,
          }}
        >
          Right now, our model is speaking gibberish. We couldn't understand the
          response
        </ThemedText>
        
      </>
    );
  }
}