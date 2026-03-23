 import { useRef,useState } from "react";

 type voice={
   onUpload?: (data: any) => void;
   setAudioBlob: (blob: Blob) => void;
   setAudioURL: (url: string) => void;
   audioURL: string | null;
 }
 
export default function RecordVoice({onUpload,setAudioBlob,setAudioURL,audioURL}:voice) {
   
     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
     const audioChunksRef = useRef<Blob[]>([]);
   
     const [recording, setRecording] = useState<boolean>(false);
     

    // 🎤 Start Recording
  const startRecording = async (): Promise<void> => {
    try {
        if (!navigator.mediaDevices?.getUserMedia) {
  alert("Mic not supported or not on HTTPS/localhost");
  console.error("mediaDevices:", navigator.mediaDevices);
  return;
}
      const stream: MediaStream =
        await navigator.mediaDevices.getUserMedia({ audio: true });
        

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Mic permission denied:", error);
      alert("Please allow microphone access");
    }
  };

  // ⏹ Stop Recording
  const stopRecording = (): void => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };



    return(
        <>
           {/* 🎤 Start */}
            {!recording && (
              <button type='button'
                onClick={startRecording}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                🎤 Start
              </button>
            )}

            {/* ⏹ Stop */}
            {recording && (
              <button type='button'
                onClick={stopRecording}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                ⏹ Stop
              </button>
            )}

            {/* ▶️ Preview */}
            {audioURL && (
              <div className="mt-3">
                <audio controls src={audioURL}></audio>
              </div>
            )}
            </>
    )
}