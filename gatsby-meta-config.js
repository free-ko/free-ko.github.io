module.exports = {
  title: `Log`,
  description: `개발을 하면서 배운 내용을 기록하는 장소 입니다.`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://free-ko.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: '',
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `고영욱`,
    bio: {
      role: `개발자`,
      description: [
        '매일 0.1%씩 성장하는',
        '기본에 집중하는',
        '이로운 것을 만드는',
        '운동을 좋아하는',
        '독서를 좋아하는',
        '커피를 좋아하는',
      ],
      thumbnail: 'woogi.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/free-ko`,
      linkedIn: `https://www.linkedin.com/in/%EC%98%81%EC%9A%B1-%EA%B3%A0-74223921b/`,
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
      {
        date: '2020.12 ~ 2022.06 ',
        activity: '(주)에픽모바일 프론트엔드 개발',
      },
      {
        date: '2022.07 ~ 2023.04',
        activity: '(주)넥스트유니콘 프론트엔드 개발',
      },
      {
        date: '2023.05 ~ ',
        activity: '(주)모던라이언 프론트엔드 개발',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '나에게 맞는 지자체, 정부기업 혜택 검색 서비스 개발',
        description:
          '사용자 지역 그리고 개인 정보를 통해 지자체, 정부기업 관련 혜택을 매칭해주는 서비스 개발 진행',
        techStack: ['TypeScript', 'Angular', 'Ionic', 'MongoDB', 'Insomnia'],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
    ],
  },
};
