import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const VideoSection = () => {

    // useRef hook for accessing the video element
    const videoRef = useRef(null);

    // State initialization
    const [isPlaying, setIsPlaying] = useState(false);

    // Function to handle play/pause video button click
    const handlePlayPauseVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Video</h3>
            <div className="relative">
                <video
                    ref={videoRef}
                    src="/6.mp4"
                    className="w-full rounded-lg"
                    controls={false}
                    onEnded={() => setIsPlaying(false)} // Reset to play icon when video ends
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    {isPlaying ? (
                        <PauseIcon
                            className="h-16 w-16 text-white opacity-75 hover:opacity-100 cursor-pointer"
                            onClick={handlePlayPauseVideo}
                        />
                    ) : (
                        <PlayIcon
                            className="h-16 w-16 text-white opacity-75 hover:opacity-100 cursor-pointer"
                            onClick={handlePlayPauseVideo}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
