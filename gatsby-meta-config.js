module.exports = {
  title: `WooGi-Codding`,
  description: `우기의 개발노트`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://free-ko.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `고영욱`,
    bio: {
      role: `개발자`,
      description: ['매일 성장하는', '능동적으로 일하는', '이로운 것을 만드는'],
      thumbnail: 'zoomkoding.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/free-ko`,
      linkedIn: `https://www.linkedin.com/in/youngwock-ko-74223921b/`,
      email: `duddnr654@naver.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      //{
      //   date: '2021.08',
      //   activity: '개인 블로그 디자인 및 개발',
      //   links: {
      //     post: '/gatsby-starter-zoomkoding-introduction',
      //     github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
      //     demo: 'https://www.zoomkoding.com',
      //   },
      // },
      {
        date: '2021.01 ~ ',
        activity: '(주)에픽모바일 프론트엔드 개발🚀',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '개발 블로그 테마 개발',
        description:
          '간단한 테마를 활용하여 개발 블로그를 만들고 운영하다 보니 점점 블로그를 내가 원하는 형태로 만들고 싶게 되었습니다. 입사 전 시기를 활용해서 원하는 기능과 디자인이 있는 블로그 테마를 만들게 되었습니다.',
        techStack: ['gatsby', 'react'],
        thumbnailUrl: 'zoomkoding.png',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.zoomkoding.com',
        },
      },
    ],
  },
};
