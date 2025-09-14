class YouTubeApp {
  constructor() {
    this.API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual API key
    this.BASE_URL = 'https://www.googleapis.com/youtube/v3';
    this.currentQuery = '';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadDefaultCategories();
    this.loadRecommendedVideos();
  }

  setupEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const closeModal = document.getElementById('closeModal');
    const videoModal = document.getElementById('videoModal');

    searchBtn.addEventListener('click', () => this.handleSearch());
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch();
      }
    });

    closeModal.addEventListener('click', () => this.closeVideoModal());
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        this.closeVideoModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeVideoModal();
      }
    });
  }

  async handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (!query) return;

    this.currentQuery = query;
    await this.searchVideos(query);
  }

  async searchVideos(query) {
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '<div class="loading">Searching videos...</div>';

    try {
      // For demo purposes, we'll use mock data since we don't have a real API key
      // In a real implementation, you would use the YouTube Data API
      const mockResults = this.getMockSearchResults(query);
      this.displayVideos(mockResults, 'videosGrid');
    } catch (error) {
      console.error('Search error:', error);
      videosGrid.innerHTML = '<div class="error">Failed to search videos. Please try again.</div>';
    }
  }

  loadDefaultCategories() {
    const categories = [
      {
        title: 'Remaster Dictny',
        count: '8.1M',
        thumbnail: 'https://dummyimage.com/320x180/ff6b6b/ffffff?text=Remaster+Dictny',
        query: 'remaster music'
      },
      {
        title: 'Planetlegor Acoriante',
        count: '2.4M',
        thumbnail: 'https://dummyimage.com/320x180/4ecdc4/ffffff?text=Planet+Documentary',
        query: 'planet documentary'
      },
      {
        title: 'LirettHoir Roov diano',
        count: '1.8M',
        thumbnail: 'https://dummyimage.com/320x180/45b7d1/ffffff?text=Music+Performance',
        query: 'live music performance'
      },
      {
        title: 'Ronin Vinoc',
        count: '3.2M',
        thumbnail: 'https://dummyimage.com/320x180/f9ca24/ffffff?text=Gaming+Content',
        query: 'gaming videos'
      },
      {
        title: 'Rontau Baner',
        count: '5.6M',
        thumbnail: 'https://dummyimage.com/320x180/6c5ce7/ffffff?text=Tech+Reviews',
        query: 'technology reviews'
      },
      {
        title: 'Tonise Ruolate',
        count: '2.9M',
        thumbnail: 'https://dummyimage.com/320x180/fd79a8/ffffff?text=Travel+Vlogs',
        query: 'travel vlogs'
      }
    ];

    this.displayCategories(categories);
  }

  displayCategories(categories) {
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = '';

    categories.forEach(category => {
      const categoryCard = document.createElement('div');
      categoryCard.className = 'category-card';
      categoryCard.innerHTML = `
        <img src="${category.thumbnail}" alt="${category.title}" referrerpolicy="no-referrer">
        <div class="category-overlay">
          <div class="category-title">${category.title}</div>
          <div class="category-count">${category.count}</div>
        </div>
        <div class="play-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
        </div>
      `;

      categoryCard.addEventListener('click', () => {
        this.searchVideos(category.query);
        document.getElementById('searchInput').value = category.query;
      });

      categoriesGrid.appendChild(categoryCard);
    });
  }

  async loadRecommendedVideos() {
    const mockVideos = this.getMockRecommendedVideos();
    this.displayVideos(mockVideos, 'videosGrid');
  }

  displayVideos(videos, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    videos.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.className = 'video-card';
      videoCard.innerHTML = `
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}" referrerpolicy="no-referrer">
          <div class="video-duration">${video.duration}</div>
        </div>
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-channel">${video.channel}</div>
          <div class="video-meta">${video.views} • ${video.publishedAt}</div>
        </div>
      `;

      videoCard.addEventListener('click', () => {
        this.playVideo(video);
      });

      container.appendChild(videoCard);
    });
  }

  playVideo(video) {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');

    // In a real implementation, you would use the actual YouTube video ID
    // For demo purposes, we'll use a placeholder
    const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
    
    videoPlayer.src = embedUrl;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description || 'No description available.';

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    modal.style.display = 'none';
    videoPlayer.src = '';
    document.body.style.overflow = 'auto';
  }

  getMockSearchResults(query) {
    // Mock search results - in a real app, this would come from YouTube API
    return [
      {
        videoId: 'dQw4w9WgXcQ',
        title: `${query} - Amazing Tutorial`,
        channel: 'TechChannel',
        thumbnail: 'https://dummyimage.com/320x180/ff6b6b/ffffff?text=Search+Result+1',
        duration: '10:25',
        views: '1.2M views',
        publishedAt: '2 days ago',
        description: `This is a comprehensive tutorial about ${query}. Learn everything you need to know!`
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: `Best ${query} Guide 2024`,
        channel: 'ProTips',
        thumbnail: 'https://dummyimage.com/320x180/4ecdc4/ffffff?text=Search+Result+2',
        duration: '15:30',
        views: '856K views',
        publishedAt: '1 week ago',
        description: `The ultimate guide to ${query} in 2024. Don't miss out!`
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: `${query} Explained Simply`,
        channel: 'EasyLearn',
        thumbnail: 'https://dummyimage.com/320x180/45b7d1/ffffff?text=Search+Result+3',
        duration: '8:45',
        views: '2.1M views',
        publishedAt: '3 days ago',
        description: `Simple explanation of ${query} for beginners.`
      }
    ];
  }

  getMockRecommendedVideos() {
    return [
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Helkain West',
        channel: 'Adventure Channel',
        thumbnail: 'https://dummyimage.com/320x180/2d3436/ffffff?text=Adventure+Video',
        duration: '12:34',
        views: '1.2M views',
        publishedAt: '1 week ago',
        description: 'An amazing adventure in the western territories.'
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Feent Ing Dagay',
        channel: 'Nature Docs',
        thumbnail: 'https://dummyimage.com/320x180/00b894/ffffff?text=Nature+Documentary',
        duration: '25:18',
        views: '3.4M views',
        publishedAt: '3 days ago',
        description: 'Stunning nature documentary about mountain landscapes.'
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Triabin Call',
        channel: 'Tech Reviews',
        thumbnail: 'https://dummyimage.com/320x180/e17055/ffffff?text=Tech+Review',
        duration: '18:22',
        views: '987K views',
        publishedAt: '2 days ago',
        description: 'Latest technology review and analysis.'
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Deply Bavle',
        channel: 'Gaming Pro',
        thumbnail: 'https://dummyimage.com/320x180/0984e3/ffffff?text=Gaming+Content',
        duration: '22:15',
        views: '2.8M views',
        publishedAt: '5 days ago',
        description: 'Epic gaming moments and strategies.'
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Yur Yor Reltoy',
        channel: 'Lifestyle',
        thumbnail: 'https://dummyimage.com/320x180/fdcb6e/ffffff?text=Lifestyle+Content',
        duration: '14:08',
        views: '1.5M views',
        publishedAt: '1 day ago',
        description: 'Lifestyle tips and daily routines.'
      },
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Men Capdist',
        channel: 'Educational',
        thumbnail: 'https://dummyimage.com/320x180/6c5ce7/ffffff?text=Educational+Video',
        duration: '16:45',
        views: '756K views',
        publishedAt: '4 days ago',
        description: 'Educational content for curious minds.'
      }
    ];
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new YouTubeApp();
});
