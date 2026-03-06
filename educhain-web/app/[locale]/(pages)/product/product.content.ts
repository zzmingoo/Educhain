import { type Dictionary, t } from 'intlayer';

const productContent = {
  key: 'product',
  content: {
    // 知识库
    knowledge: {
      title: t({
        'zh-CN': '知识库',
        en: 'Knowledge Base',
      }),
      subtitle: t({
        'zh-CN': '海量优质内容，区块链存证保护',
        en: 'Massive Quality Content, Blockchain Protected',
      }),
      description: t({
        'zh-CN': '涵盖编程、设计、商业、语言等数十个学科领域的优质教育内容，支持文本、图片、视频、文档等多种格式。每一份内容都经过区块链存证，确保原创性和不可篡改性',
        en: 'Quality educational content covering dozens of disciplines including programming, design, business, languages. Supports text, images, video, documents and more. Every piece of content is blockchain-certified to ensure originality and immutability',
      }),
      coreFeatures: t({
        'zh-CN': '核心特性',
        en: 'Core Features',
      }),
      features: [
        {
          title: t({ 'zh-CN': '海量内容库', en: 'Massive Content Library' }),
          description: t({ 'zh-CN': '超过10,000+优质知识条目，涵盖50+学科分类，从入门到精通的完整学习路径，持续更新的前沿技术内容', en: 'Over 10,000+ quality knowledge items covering 50+ disciplines, complete learning paths from beginner to expert, continuously updated cutting-edge content' }),
        },
        {
          title: t({ 'zh-CN': '多媒体支持', en: 'Multimedia Support' }),
          description: t({ 'zh-CN': '支持富文本、Markdown、图片、视频、音频、PDF、代码片段等多种内容格式，提供最佳的学习体验', en: 'Support for rich text, Markdown, images, video, audio, PDF, code snippets and more, providing the best learning experience' }),
        },
        {
          title: t({ 'zh-CN': '智能分类系统', en: 'Smart Classification' }),
          description: t({ 'zh-CN': '多级分类树结构，智能标签自动推荐，相关内容关联推荐，让您快速定位所需知识', en: 'Multi-level classification tree, smart tag auto-recommendation, related content suggestions to help you quickly locate needed knowledge' }),
        },
        {
          title: t({ 'zh-CN': '区块链存证', en: 'Blockchain Certification' }),
          description: t({ 'zh-CN': '每份内容自动上链存证，生成唯一哈希值和时间戳，确保内容不可篡改，保护创作者权益', en: 'Every piece of content is automatically blockchain-certified with unique hash and timestamp, ensuring immutability and protecting creator rights' }),
        },
        {
          title: t({ 'zh-CN': '版本管理', en: 'Version Control' }),
          description: t({ 'zh-CN': '完整的版本历史记录，支持版本对比和回滚，每个版本都有独立的区块链存证', en: 'Complete version history with comparison and rollback support, each version has independent blockchain certification' }),
        },
        {
          title: t({ 'zh-CN': '质量保证', en: 'Quality Assurance' }),
          description: t({ 'zh-CN': '专业审核团队，严格的内容质量标准，社区评分和反馈机制，确保内容的准确性和实用性', en: 'Professional review team, strict quality standards, community rating and feedback mechanisms ensure content accuracy and practicality' }),
        },
      ],
      stats: {
        content: t({ 'zh-CN': '知识条目', en: 'Knowledge Items' }),
        categories: t({ 'zh-CN': '学科分类', en: 'Categories' }),
        creators: t({ 'zh-CN': '内容创作者', en: 'Content Creators' }),
        views: t({ 'zh-CN': '总浏览量', en: 'Total Views' }),
      },
      useCases: {
        title: t({ 'zh-CN': '适用场景', en: 'Use Cases' }),
        description: t({
          'zh-CN': '无论您是学生、教师还是终身学习者，知识库都能满足您的需求',
          en: 'Whether you are a student, teacher, or lifelong learner, the knowledge base meets your needs',
        }),
        items: [
          {
            title: t({ 'zh-CN': '学生学习', en: 'Student Learning' }),
            description: t({
              'zh-CN': '从基础课程到专业知识，系统化的学习路径帮助学生快速掌握知识要点，配合练习题和项目实战，巩固学习成果',
              en: 'From basic courses to professional knowledge, systematic learning paths help students quickly master key points, with exercises and projects to consolidate learning',
            }),
          },
          {
            title: t({ 'zh-CN': '教师教学', en: 'Teacher Education' }),
            description: t({
              'zh-CN': '丰富的教学资源库，支持教师快速备课，创建个性化课程内容，分享教学经验，与学生进行互动交流',
              en: 'Rich teaching resource library supports teachers in quick lesson preparation, creating personalized course content, sharing teaching experience, and interacting with students',
            }),
          },
          {
            title: t({ 'zh-CN': '职业发展', en: 'Career Development' }),
            description: t({
              'zh-CN': '紧跟行业前沿技术，学习最新的专业技能，获取职业认证，提升职场竞争力，实现职业目标',
              en: 'Keep up with cutting-edge industry technology, learn the latest professional skills, obtain career certifications, enhance workplace competitiveness, and achieve career goals',
            }),
          },
        ],
      },
      cta: {
        title: t({ 'zh-CN': '开始探索知识库', en: 'Start Exploring Knowledge Base' }),
        description: t({ 'zh-CN': '发现海量优质学习资源，开启您的学习之旅', en: 'Discover massive quality learning resources and start your learning journey' }),
        button: t({ 'zh-CN': '立即探索', en: 'Explore Now' }),
      },
    },

    // 智能搜索
    search: {
      title: t({
        'zh-CN': '智能搜索',
        en: 'Smart Search',
      }),
      subtitle: t({
        'zh-CN': 'AI驱动，毫秒响应，精准匹配',
        en: 'AI-Powered, Instant Response, Precise Matching',
      }),
      description: t({
        'zh-CN': '基于先进的全文检索技术和AI语义理解，为您提供毫秒级的搜索响应。不仅仅是关键词匹配，更能理解您的搜索意图，智能推荐最相关的学习内容',
        en: 'Based on advanced full-text search technology and AI semantic understanding, providing millisecond-level search response. Not just keyword matching, but understanding your search intent and intelligently recommending the most relevant learning content',
      }),
      coreFeatures: t({
        'zh-CN': '核心特性',
        en: 'Core Features',
      }),
      useCases: t({
        'zh-CN': '使用场景',
        en: 'Use Cases',
      }),
      features: [
        {
          title: t({ 'zh-CN': 'AI 语义理解', en: 'AI Semantic Understanding' }),
          description: t({ 'zh-CN': '深度学习算法理解搜索意图，不仅匹配关键词，更理解上下文语义，提供更智能的搜索结果', en: 'Deep learning algorithms understand search intent, not just matching keywords but understanding contextual semantics for smarter search results' }),
        },
        {
          title: t({ 'zh-CN': '毫秒级响应', en: 'Millisecond Response' }),
          description: t({ 'zh-CN': '高性能搜索引擎，优化的索引结构，分布式架构，确保即时返回搜索结果，流畅的用户体验', en: 'High-performance search engine with optimized index structure and distributed architecture ensures instant search results and smooth user experience' }),
        },
        {
          title: t({ 'zh-CN': '精准匹配', en: 'Precise Matching' }),
          description: t({ 'zh-CN': '多维度相关性算法，综合考虑标题、内容、标签、作者等因素，最相关的内容优先展示', en: 'Multi-dimensional relevance algorithm considering title, content, tags, author and more, with most relevant content displayed first' }),
        },
        {
          title: t({ 'zh-CN': '高级筛选', en: 'Advanced Filtering' }),
          description: t({ 'zh-CN': '支持按时间、类型、难度、评分、作者等多维度筛选，组合筛选条件，精确定位目标内容', en: 'Support filtering by time, type, difficulty, rating, author and more dimensions, combine filter conditions to precisely locate target content' }),
        },
        {
          title: t({ 'zh-CN': '搜索建议', en: 'Search Suggestions' }),
          description: t({ 'zh-CN': '智能输入联想，热门搜索词推荐，搜索历史记录，帮助您快速找到想要的内容', en: 'Smart input suggestions, popular search term recommendations, search history to help you quickly find what you want' }),
        },
        {
          title: t({ 'zh-CN': '全文检索', en: 'Full-Text Search' }),
          description: t({ 'zh-CN': '支持标题、正文、标签、评论等全文检索，高亮显示匹配内容，快速定位关键信息', en: 'Support full-text search in title, body, tags, comments with highlighted matches for quick key information location' }),
        },
      ],
      stats: {
        searches: t({ 'zh-CN': '日均搜索量', en: 'Daily Searches' }),
        speed: t({ 'zh-CN': '平均响应时间', en: 'Avg Response Time' }),
        accuracy: t({ 'zh-CN': '搜索准确率', en: 'Search Accuracy' }),
      },
      scenarios: [
        {
          title: t({ 'zh-CN': '学习新技能', en: 'Learn New Skills' }),
          description: t({ 'zh-CN': '搜索"Python入门"，获取从零开始的完整学习路径，包括教程、视频、练习题和项目实战', en: 'Search "Python basics" to get a complete learning path from scratch, including tutorials, videos, exercises and projects' }),
        },
        {
          title: t({ 'zh-CN': '解决问题', en: 'Solve Problems' }),
          description: t({ 'zh-CN': '遇到技术难题？搜索错误信息或问题描述，快速找到解决方案和相关讨论', en: 'Technical problem? Search error messages or problem descriptions to quickly find solutions and related discussions' }),
        },
        {
          title: t({ 'zh-CN': '深入研究', en: 'Deep Research' }),
          description: t({ 'zh-CN': '搜索特定主题，获取相关论文、教程、案例研究和社区讨论，全面了解某个领域', en: 'Search specific topics to get related papers, tutorials, case studies and community discussions for comprehensive understanding' }),
        },
      ],
      cta: {
        title: t({ 'zh-CN': '体验智能搜索', en: 'Experience Smart Search' }),
        description: t({ 'zh-CN': '让AI帮你找到最需要的学习资源', en: 'Let AI help you find the learning resources you need most' }),
        button: t({ 'zh-CN': '开始搜索', en: 'Start Searching' }),
      },
    },

    // 推荐系统
    recommendation: {
      title: t({
        'zh-CN': '推荐系统',
        en: 'Recommendation System',
      }),
      subtitle: t({
        'zh-CN': '个性化推荐，智能学习路径',
        en: 'Personalized Recommendations, Smart Learning Paths',
      }),
      description: t({
        'zh-CN': '基于深度学习的个性化推荐引擎，分析您的学习行为、兴趣偏好和知识图谱，为您量身定制学习内容和路径。推荐越用越准，让学习更高效',
        en: 'Deep learning-based personalized recommendation engine analyzes your learning behavior, interests and knowledge graph to tailor learning content and paths. Recommendations get better with use, making learning more efficient',
      }),
      coreFeatures: t({
        'zh-CN': '核心特性',
        en: 'Core Features',
      }),
      features: [
        {
          title: t({ 'zh-CN': '智能学习', en: 'Smart Learning' }),
          description: t({ 'zh-CN': '系统持续学习您的浏览、收藏、点赞等行为，深度理解您的兴趣偏好，推荐越来越精准', en: 'System continuously learns from your browsing, bookmarking, liking behaviors to deeply understand your preferences for increasingly accurate recommendations' }),
        },
        {
          title: t({ 'zh-CN': '多维分析', en: 'Multi-dimensional Analysis' }),
          description: t({ 'zh-CN': '综合分析浏览历史、学习进度、兴趣标签、互动行为、时间偏好等多维数据，构建完整的用户画像', en: 'Comprehensive analysis of browsing history, learning progress, interest tags, interaction behavior, time preferences and more to build complete user profiles' }),
        },
        {
          title: t({ 'zh-CN': '个性化展示', en: 'Personalized Display' }),
          description: t({ 'zh-CN': '首页推荐、搜索结果、相关内容全面个性化，每个用户看到的内容都是为其量身定制', en: 'Homepage recommendations, search results, related content fully personalized, every user sees content tailored just for them' }),
        },
        {
          title: t({ 'zh-CN': '实时更新', en: 'Real-time Updates' }),
          description: t({ 'zh-CN': '推荐内容实时更新，紧跟您的学习节奏和兴趣变化，始终推荐最适合当前阶段的内容', en: 'Recommendations update in real-time, keeping pace with your learning rhythm and interest changes, always recommending content most suitable for current stage' }),
        },
        {
          title: t({ 'zh-CN': '协同过滤', en: 'Collaborative Filtering' }),
          description: t({ 'zh-CN': '基于相似用户的学习轨迹，发现您可能感兴趣但尚未接触的优质内容', en: 'Based on similar users\' learning trajectories, discover quality content you might be interested in but haven\'t encountered yet' }),
        },
        {
          title: t({ 'zh-CN': '学习路径', en: 'Learning Paths' }),
          description: t({ 'zh-CN': '根据您的目标和当前水平，智能规划从入门到精通的完整学习路径', en: 'Based on your goals and current level, intelligently plan complete learning paths from beginner to expert' }),
        },
      ],
      stats: {
        users: t({ 'zh-CN': '使用推荐的用户', en: 'Users Using Recommendations' }),
        accuracy: t({ 'zh-CN': '推荐准确率', en: 'Recommendation Accuracy' }),
        engagement: t({ 'zh-CN': '用户参与度提升', en: 'User Engagement Increase' }),
      },
      howItWorks: {
        title: t({ 'zh-CN': '工作原理', en: 'How It Works' }),
        description: t({
          'zh-CN': '了解推荐系统如何为您提供个性化的学习体验',
          en: 'Understand how the recommendation system provides personalized learning experience',
        }),
        steps: [
          {
            step: '1',
            title: t({ 'zh-CN': '数据收集', en: 'Data Collection' }),
            description: t({ 'zh-CN': '收集您的浏览、搜索、学习、互动等行为数据，构建用户行为特征', en: 'Collect your browsing, searching, learning, interaction behavior data to build user behavior features' }),
          },
          {
            step: '2',
            title: t({ 'zh-CN': '特征分析', en: 'Feature Analysis' }),
            description: t({ 'zh-CN': 'AI深度分析您的学习偏好、知识图谱、技能水平，生成用户画像', en: 'AI deeply analyzes your learning preferences, knowledge graph, skill level to generate user profile' }),
          },
          {
            step: '3',
            title: t({ 'zh-CN': '智能匹配', en: 'Smart Matching' }),
            description: t({ 'zh-CN': '匹配最适合您的学习内容和路径，综合考虑相关性、难度、质量等因素', en: 'Match the most suitable learning content and paths, considering relevance, difficulty, quality and more' }),
          },
          {
            step: '4',
            title: t({ 'zh-CN': '持续优化', en: 'Continuous Optimization' }),
            description: t({ 'zh-CN': '根据您的反馈和新的行为数据，不断优化推荐算法，提升推荐效果', en: 'Continuously optimize recommendation algorithms based on your feedback and new behavior data to improve results' }),
          },
        ],
      },
      cta: {
        title: t({ 'zh-CN': '获取个性化推荐', en: 'Get Personalized Recommendations' }),
        description: t({ 'zh-CN': '登录后即可享受专属于您的学习推荐', en: 'Log in to enjoy learning recommendations tailored just for you' }),
        button: t({ 'zh-CN': '立即体验', en: 'Try Now' }),
      },
    },

    // 社区交流
    community: {
      title: t({
        'zh-CN': '社区交流',
        en: 'Community',
      }),
      subtitle: t({
        'zh-CN': '连接全球学习者，共建知识生态',
        en: 'Connect Global Learners, Build Knowledge Ecosystem',
      }),
      description: t({
        'zh-CN': '加入充满活力的学习社区，与来自世界各地的学习者和专家互动交流。分享知识、提出问题、参与讨论，在协作中成长，在交流中进步',
        en: 'Join a vibrant learning community and interact with learners and experts from around the world. Share knowledge, ask questions, participate in discussions, grow through collaboration and progress through communication',
      }),
      communityFeatures: t({
        'zh-CN': '社区功能',
        en: 'Community Features',
      }),
      features: [
        {
          title: t({ 'zh-CN': '实时讨论', en: 'Real-time Discussion' }),
          description: t({ 'zh-CN': '在知识内容下方发表评论，与作者和其他学习者实时互动，深入探讨学习心得和疑问', en: 'Comment under knowledge content, interact in real-time with authors and other learners, deeply discuss learning insights and questions' }),
        },
        {
          title: t({ 'zh-CN': '学习小组', en: 'Study Groups' }),
          description: t({ 'zh-CN': '创建或加入学习小组，与志同道合的伙伴一起学习，互相监督，共同进步', en: 'Create or join study groups, learn with like-minded partners, supervise each other, and progress together' }),
        },
        {
          title: t({ 'zh-CN': '问答专区', en: 'Q&A Section' }),
          description: t({ 'zh-CN': '提出学习中遇到的问题，获得社区专家和热心用户的专业解答，快速解决疑惑', en: 'Ask questions encountered in learning, get professional answers from community experts and helpful users, quickly resolve doubts' }),
        },
        {
          title: t({ 'zh-CN': '成就系统', en: 'Achievement System' }),
          description: t({ 'zh-CN': '通过学习、分享、互动获得积分和徽章，解锁成就，展示您的学习成果和贡献', en: 'Earn points and badges through learning, sharing, interaction, unlock achievements, showcase your learning results and contributions' }),
        },
        {
          title: t({ 'zh-CN': '排行榜', en: 'Leaderboards' }),
          description: t({ 'zh-CN': '查看活跃贡献者、优质内容创作者排行，激励持续学习和分享', en: 'View active contributor and quality content creator rankings to motivate continuous learning and sharing' }),
        },
        {
          title: t({ 'zh-CN': '关注系统', en: 'Follow System' }),
          description: t({ 'zh-CN': '关注感兴趣的用户和话题，及时获取最新动态，建立自己的学习网络', en: 'Follow users and topics of interest, get latest updates timely, build your own learning network' }),
        },
      ],
      stats: {
        users: t({ 'zh-CN': '活跃用户', en: 'Active Users' }),
        discussions: t({ 'zh-CN': '讨论话题', en: 'Discussions' }),
        answers: t({ 'zh-CN': '问题解答', en: 'Answers' }),
        groups: t({ 'zh-CN': '学习小组', en: 'Study Groups' }),
      },
      benefits: {
        title: t({ 'zh-CN': '社区价值', en: 'Community Value' }),
        description: t({
          'zh-CN': '在EduChain社区，您将获得的不仅是知识，更是成长和连接',
          en: 'In the EduChain community, you gain not just knowledge, but growth and connections',
        }),
        items: [
          {
            title: t({ 'zh-CN': '知识共享', en: 'Knowledge Sharing' }),
            description: t({
              'zh-CN': '分享您的知识和经验，帮助他人成长，同时也能加深自己的理解。每一次分享都会获得区块链存证，保护您的原创权益',
              en: 'Share your knowledge and experience to help others grow while deepening your own understanding. Every share gets blockchain certification to protect your original rights',
            }),
          },
          {
            title: t({ 'zh-CN': '互助成长', en: 'Mutual Growth' }),
            description: t({
              'zh-CN': '在社区中提问、讨论、交流，获得来自全球学习者和专家的帮助。互相学习，共同进步，建立长期的学习伙伴关系',
              en: 'Ask questions, discuss, communicate in the community, get help from global learners and experts. Learn from each other, progress together, build long-term learning partnerships',
            }),
          },
          {
            title: t({ 'zh-CN': '职业发展', en: 'Career Development' }),
            description: t({
              'zh-CN': '展示您的专业能力，建立个人品牌，扩展职业网络。优秀的贡献者将获得平台认证，提升职业竞争力',
              en: 'Showcase your professional abilities, build personal brand, expand professional network. Outstanding contributors receive platform certification to enhance career competitiveness',
            }),
          },
        ],
      },
      cta: {
        title: t({ 'zh-CN': '加入学习社区', en: 'Join the Learning Community' }),
        description: t({ 'zh-CN': '与全球学习者一起成长，分享您的知识和经验', en: 'Grow with global learners, share your knowledge and experience' }),
        button: t({ 'zh-CN': '加入社区', en: 'Join Community' }),
      },
    },
  },
} satisfies Dictionary;


export default productContent;
