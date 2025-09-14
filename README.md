# YouTube Search & Recommendations App

A YouTube-like interface that allows users to search for videos and browse recommendations. This app integrates with the YouTube Data API to fetch real video content.

## Features

- **Search Functionality**: Search for videos using keywords
- **Category Browsing**: Browse videos by predefined categories
- **Video Recommendations**: Display recommended videos
- **Video Player**: Play videos in a modal overlay
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### 1. Get YouTube Data API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy your API key

### 2. Configure the App

1. Open `script.js`
2. Replace `'YOUR_YOUTUBE_API_KEY'` with your actual API key:
   ```javascript
   this.API_KEY = 'your-actual-api-key-here';
   ```

### 3. Enable Real API Integration

The app currently uses mock data for demonstration. To enable real YouTube integration:

1. Uncomment the real API calls in the `searchVideos` method
2. Replace mock data functions with actual API calls
3. Update the video player to use real YouTube video IDs

## API Integration Example

```javascript
async searchVideos(query) {
  const response = await fetch(
    `${this.BASE_URL}/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)}&type=video&key=${this.API_KEY}`
  );
  const data = await response.json();
  
  const videos = data.items.map(item => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    publishedAt: this.formatDate(item.snippet.publishedAt),
    description: item.snippet.description
  }));
  
  this.displayVideos(videos, 'videosGrid');
}
```

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling with responsive design
- `script.js` - JavaScript functionality and API integration
- `README.md` - Setup and usage instructions

## Usage

1. **Search**: Enter keywords in the search box and press Enter or click the search button
2. **Browse Categories**: Click on category cards to search for related content
3. **Play Videos**: Click on any video card to open it in the modal player
4. **Close Player**: Click the X button or press Escape to close the video player

## Responsive Design

The app is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 768px  
- Desktop: > 768px

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- The app uses mock data by default for demonstration purposes
- To use real YouTube data, you need a valid YouTube Data API key
- Videos open in YouTube's embedded player
- All images use `referrerpolicy="no-referrer"` for privacy
