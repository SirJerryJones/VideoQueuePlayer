class VideoQueuePlayer {
    constructor() {
        this.videoPlayer = document.getElementById('videoPlayer');
        this.videoQueue = document.getElementById('videoQueue');
        this.videoList = [
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028422590-5109_1.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028482635-5109_2.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028542665-5109_3.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028602686-5109_4.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028662732-5109_5.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028722748-5109_6.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028782777-5109_7.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028842809-5109_8.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685028902839-5109_9.mp4',
            'https://snipback-ai-input-videos.s3-accelerate.amazonaws.com/9164/11184/snipbackvideo_1685029033887-5109_11.mp4',
        ];
        this.currentVideoIndex = 0;
        this.currentlyPlayingVideo = null;
        this.init();
    }

    init() {
        this.loadVideo(this.currentVideoIndex);
        this.videoPlayer.addEventListener('ended', () => this.playNextVideo());
        this.populateVideoQueue();
    }

    loadVideo(index) {
        this.videoPlayer.src = this.videoList[index];
        this.updateCurrentlyPlayingIcon();
        this.videoPlayer.load();
    }

    playNextVideo() {
        this.currentVideoIndex++;
        if (this.currentVideoIndex < this.videoList.length) {
            this.loadVideo(this.currentVideoIndex);
            this.updateCurrentlyPlayingIcon();
            this.videoPlayer.play();
        } else {
            alert('All videos have been played.');
        }
    }

    populateVideoQueue() {
        this.videoList.forEach((videoURL, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-start';
            listItem.textContent = `Video ${index + 1}`;
            listItem.id = `videoListItem-${index}`;

            const badge = document.createElement('span');
            badge.className = 'badge bg-warning';
            const icon = document.createElement('i');
            icon.className = 'fas fa-play';
            badge.appendChild(icon);
            listItem.appendChild(badge);

            listItem.addEventListener('click', () => this.loadVideo(index));
            //console.log(listItem);
            this.videoQueue.appendChild(listItem);
        });
    }

    updateCurrentlyPlayingIcon() {
        if (this.currentlyPlayingVideo !== null) {
            // Remove the play icon from the previously playing video
            this.currentlyPlayingVideo.querySelector('i').classList.remove('fa-pause');
            this.currentlyPlayingVideo.querySelector('i').classList.add('fa-play');
        }

        // Add the play icon to the currently playing video
        const currentListItem = document.getElementById(`videoListItem-${this.currentVideoIndex}`);
        // console.log(currentListItem);

        if (currentListItem) {
            const spanElement = currentListItem.querySelector('span');
            const iconElement = currentListItem.querySelector('i');
            
            // console.log(iconElement);
            if (iconElement) {
                // console.log(iconElement);
                spanElement.classList.remove('bg-warning');
                spanElement.classList.add('bg-danger');
                iconElement.classList.remove('fa-play');
                iconElement.classList.add('fa-pause');
            }
        }
        

        // Update the currently playing video element
        this.currentlyPlayingVideo = currentListItem;
    }
}

// Initialize the app
const videoQueuePlayer = new VideoQueuePlayer();
