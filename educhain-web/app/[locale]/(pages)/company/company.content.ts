import { type Dictionary, t } from 'intlayer';

const companyContent = {
  key: 'company',
  content: {
    // 关于我们
    about: {
      title: t({
        'zh-CN': '关于我们',
        en: 'About Us',
      }),
      subtitle: t({
        'zh-CN': '用区块链技术重塑教育未来',
        en: 'Reshaping Education Future with Blockchain',
      }),
      description: t({
        'zh-CN': 'EduChain 是一个基于区块链技术的去中心化教育知识共享平台，致力于打破知识壁垒，让优质教育资源惠及全球每一位学习者。我们相信，技术创新能够推动教育公平，让知识的力量改变世界',
        en: 'EduChain is a decentralized educational knowledge sharing platform based on blockchain technology, committed to breaking knowledge barriers and making quality educational resources accessible to every learner worldwide. We believe technological innovation can promote educational equity and let the power of knowledge change the world',
      }),
      mission: {
        title: t({
          'zh-CN': '我们的使命',
          en: 'Our Mission',
        }),
        content: t({
          'zh-CN': 'EduChain 致力于构建一个去中心化的教育知识共享生态系统，让每一份知识都能被永久保存、公平分享，让每一位学习者都能获得优质的教育资源。',
          en: 'EduChain is committed to building a decentralized educational knowledge sharing ecosystem, where every piece of knowledge can be permanently preserved and fairly shared, and every learner can access quality educational resources.',
        }),
      },
      vision: {
        title: t({
          'zh-CN': '我们的愿景',
          en: 'Our Vision',
        }),
        content: t({
          'zh-CN': '成为全球领先的区块链教育平台，连接全球学习者与教育者，推动教育公平化和知识民主化。',
          en: 'To become the world\'s leading blockchain education platform, connecting global learners and educators, promoting educational equity and knowledge democratization.',
        }),
      },
      values: {
        title: t({
          'zh-CN': '核心价值观',
          en: 'Core Values',
        }),
        items: [
          {
            title: t({ 'zh-CN': '创新驱动', en: 'Innovation Driven' }),
            description: t({ 'zh-CN': '持续探索区块链、AI等前沿技术，将技术创新与教育场景深度融合，为教育赋能，推动教育模式变革', en: 'Continuously exploring cutting-edge technologies like blockchain and AI, deeply integrating technological innovation with educational scenarios to empower education and drive educational transformation' }),
          },
          {
            title: t({ 'zh-CN': '开放共享', en: 'Open Sharing' }),
            description: t({ 'zh-CN': '打破知识壁垒和地域限制，促进优质教育资源的自由流动和公平分享，让每个人都能平等获取知识', en: 'Breaking knowledge barriers and geographical restrictions, promoting free flow and fair sharing of quality educational resources, enabling equal access to knowledge for everyone' }),
          },
          {
            title: t({ 'zh-CN': '安全可信', en: 'Secure & Trustworthy' }),
            description: t({ 'zh-CN': '利用区块链技术实现内容存证和版权保护，建立可信的知识产权体系，保护创作者权益，维护平台公信力', en: 'Using blockchain technology for content certification and copyright protection, establishing a trustworthy intellectual property system, protecting creator rights, and maintaining platform credibility' }),
          },
          {
            title: t({ 'zh-CN': '全球视野', en: 'Global Vision' }),
            description: t({ 'zh-CN': '连接全球教育资源和学习者，支持多语言和跨文化交流，构建国际化的教育生态系统，服务全球用户', en: 'Connecting global educational resources and learners, supporting multilingual and cross-cultural communication, building an international education ecosystem to serve users worldwide' }),
          },
        ],
      },
      team: {
        title: t({
          'zh-CN': '核心团队',
          en: 'Core Team',
        }),
        members: [
          {
            name: t({ 'zh-CN': '张明', en: 'Ming Zhang' }),
            role: t({ 'zh-CN': '创始人 & CEO', en: 'Founder & CEO' }),
            bio: t({ 'zh-CN': '前阿里巴巴技术专家，10年教育科技经验', en: 'Former Alibaba tech expert, 10 years in EdTech' }),
          },
          {
            name: t({ 'zh-CN': '李华', en: 'Hua Li' }),
            role: t({ 'zh-CN': '技术总监', en: 'CTO' }),
            bio: t({ 'zh-CN': '区块链技术专家，曾主导多个大型项目', en: 'Blockchain expert, led multiple large-scale projects' }),
          },
          {
            name: t({ 'zh-CN': '王芳', en: 'Fang Wang' }),
            role: t({ 'zh-CN': '产品总监', en: 'CPO' }),
            bio: t({ 'zh-CN': '资深产品经理，专注用户体验设计', en: 'Senior PM, focused on UX design' }),
          },
          {
            name: t({ 'zh-CN': '陈强', en: 'Qiang Chen' }),
            role: t({ 'zh-CN': '运营总监', en: 'COO' }),
            bio: t({ 'zh-CN': '互联网运营专家，擅长社区建设', en: 'Internet operations expert, skilled in community building' }),
          },
        ],
      },
    },

    // 联系我们
    contact: {
      title: t({
        'zh-CN': '联系我们',
        en: 'Contact Us',
      }),
      description: t({
        'zh-CN': '有任何问题或建议？我们随时为您服务',
        en: 'Have any questions or suggestions? We\'re here to help',
      }),
      messageSent: t({
        'zh-CN': '消息已发送！',
        en: 'Message sent!',
      }),
      form: {
        name: t({ 'zh-CN': '您的姓名', en: 'Your Name' }),
        email: t({ 'zh-CN': '邮箱地址', en: 'Email Address' }),
        subject: t({ 'zh-CN': '主题', en: 'Subject' }),
        message: t({ 'zh-CN': '留言内容', en: 'Message' }),
        submit: t({ 'zh-CN': '发送消息', en: 'Send Message' }),
        namePlaceholder: t({ 'zh-CN': '请输入您的姓名', en: 'Enter your name' }),
        emailPlaceholder: t({ 'zh-CN': '请输入您的邮箱', en: 'Enter your email' }),
        subjectPlaceholder: t({ 'zh-CN': '请输入主题', en: 'Enter subject' }),
        messagePlaceholder: t({ 'zh-CN': '请输入您的留言内容...', en: 'Enter your message...' }),
      },
      subtitle: t({
        'zh-CN': '随时为您提供专业支持与服务',
        en: 'Professional Support and Service Anytime',
      }),
      info: {
        title: t({ 'zh-CN': '联系方式', en: 'Contact Information' }),
        items: [
          {
            title: t({ 'zh-CN': '邮箱', en: 'Email' }),
            content: 'ozemyn@icloud.com',
            description: t({ 'zh-CN': '我们会在24小时内回复您的邮件', en: 'We will reply to your email within 24 hours' }),
          },
          {
            title: t({ 'zh-CN': '电话', en: 'Phone' }),
            content: '400-123-4567',
            description: t({ 'zh-CN': '工作日 9:00-18:00 提供电话支持', en: 'Phone support available Mon-Fri 9:00-18:00' }),
          },
          {
            title: t({ 'zh-CN': '地址', en: 'Address' }),
            content: t({ 'zh-CN': '北京市海淀区中关村大街1号', en: '1 Zhongguancun Street, Haidian District, Beijing' }),
            description: t({ 'zh-CN': '欢迎预约到访，我们期待与您面对面交流', en: 'Welcome to visit by appointment, we look forward to meeting you' }),
          },
          {
            title: t({ 'zh-CN': '工作时间', en: 'Working Hours' }),
            content: t({ 'zh-CN': '周一至周五 9:00-18:00', en: 'Mon-Fri 9:00-18:00' }),
            description: t({ 'zh-CN': '节假日我们也会通过邮件回复您的咨询', en: 'We also reply to inquiries via email on holidays' }),
          },
        ],
      },
    },

    // 加入我们
    careers: {
      title: t({
        'zh-CN': '加入我们',
        en: 'Join Us',
      }),
      subtitle: t({
        'zh-CN': '与优秀的人一起，创造教育的未来',
        en: 'Create the Future of Education with Excellent People',
      }),
      description: t({
        'zh-CN': '在 EduChain，我们正在用区块链技术改变教育行业。如果您热爱技术、关注教育、追求创新，欢迎加入我们的团队。这里有充满激情的伙伴、前沿的技术挑战、广阔的成长空间，以及改变世界的机会',
        en: 'At EduChain, we are transforming the education industry with blockchain technology. If you love technology, care about education, and pursue innovation, welcome to join our team. Here you will find passionate partners, cutting-edge technical challenges, broad growth opportunities, and the chance to change the world',
      }),
      why: {
        title: t({ 'zh-CN': '为什么加入 EduChain？', en: 'Why Join EduChain?' }),
        items: [
          {
            title: t({ 'zh-CN': '快速成长', en: 'Rapid Growth' }),
            description: t({ 'zh-CN': '与行业顶尖人才共事，参与前沿技术项目，获得系统的培训和指导，在实战中快速提升专业能力和综合素质', en: 'Work with top industry talents, participate in cutting-edge technology projects, receive systematic training and guidance, rapidly improve professional abilities and comprehensive qualities in practice' }),
          },
          {
            title: t({ 'zh-CN': '创新文化', en: 'Innovation Culture' }),
            description: t({ 'zh-CN': '扁平化的组织结构，开放包容的工作氛围，鼓励创新思维和大胆尝试，每个人的想法都会被认真倾听和支持', en: 'Flat organizational structure, open and inclusive work atmosphere, encouraging innovative thinking and bold attempts, everyone\'s ideas are seriously listened to and supported' }),
          },
          {
            title: t({ 'zh-CN': '优厚福利', en: 'Great Benefits' }),
            description: t({ 'zh-CN': '具有竞争力的薪资待遇，股权激励计划，弹性工作制度，完善的五险一金，年度体检，团队建设活动，以及持续的学习发展机会', en: 'Competitive salary, equity incentive plan, flexible work system, comprehensive social insurance, annual health checkup, team building activities, and continuous learning and development opportunities' }),
          },
          {
            title: t({ 'zh-CN': '社会价值', en: 'Social Impact' }),
            description: t({ 'zh-CN': '参与推动教育公平和知识民主化的伟大事业，用技术让优质教育资源惠及更多人，创造真正有意义的社会价值', en: 'Participate in the great cause of promoting educational equity and knowledge democratization, use technology to make quality educational resources benefit more people, create truly meaningful social value' }),
          },
        ],
      },
      positions: {
        title: t({ 'zh-CN': '开放职位', en: 'Open Positions' }),
        jobs: [
          {
            title: t({ 'zh-CN': '高级前端工程师', en: 'Senior Frontend Engineer' }),
            department: t({ 'zh-CN': '技术部', en: 'Engineering' }),
            location: t({ 'zh-CN': '北京', en: 'Beijing' }),
            type: t({ 'zh-CN': '全职', en: 'Full-time' }),
          },
          {
            title: t({ 'zh-CN': '区块链开发工程师', en: 'Blockchain Developer' }),
            department: t({ 'zh-CN': '技术部', en: 'Engineering' }),
            location: t({ 'zh-CN': '北京/远程', en: 'Beijing/Remote' }),
            type: t({ 'zh-CN': '全职', en: 'Full-time' }),
          },
          {
            title: t({ 'zh-CN': '产品经理', en: 'Product Manager' }),
            department: t({ 'zh-CN': '产品部', en: 'Product' }),
            location: t({ 'zh-CN': '北京', en: 'Beijing' }),
            type: t({ 'zh-CN': '全职', en: 'Full-time' }),
          },
          {
            title: t({ 'zh-CN': '内容运营', en: 'Content Operations' }),
            department: t({ 'zh-CN': '运营部', en: 'Operations' }),
            location: t({ 'zh-CN': '北京/上海', en: 'Beijing/Shanghai' }),
            type: t({ 'zh-CN': '全职', en: 'Full-time' }),
          },
        ],
        apply: t({ 'zh-CN': '申请职位', en: 'Apply Now' }),
      },
    },

    // 合作伙伴
    partners: {
      title: t({
        'zh-CN': '合作伙伴',
        en: 'Partners',
      }),
      subtitle: t({
        'zh-CN': '携手共建开放的教育生态系统',
        en: 'Building an Open Education Ecosystem Together',
      }),
      description: t({
        'zh-CN': 'EduChain 相信开放合作的力量。我们与全球领先的教育机构、技术公司、内容创作者建立深度合作关系，共同打造一个开放、共享、可信的教育生态系统。如果您认同我们的愿景，欢迎成为我们的合作伙伴',
        en: 'EduChain believes in the power of open collaboration. We establish deep partnerships with leading educational institutions, technology companies, and content creators worldwide to build an open, shared, and trustworthy education ecosystem. If you share our vision, welcome to become our partner',
      }),
      types: {
        title: t({ 'zh-CN': '合作类型', en: 'Partnership Types' }),
        items: [
          {
            title: t({ 'zh-CN': '教育机构', en: 'Educational Institutions' }),
            description: t({ 'zh-CN': '与高校、培训机构、在线教育平台合作，共享优质教育资源，联合开发课程内容，推动教育创新和数字化转型', en: 'Partner with universities, training institutions, and online education platforms to share quality educational resources, jointly develop course content, and promote educational innovation and digital transformation' }),
          },
          {
            title: t({ 'zh-CN': '企业合作', en: 'Enterprise Partners' }),
            description: t({ 'zh-CN': '开展技术合作、内容合作、市场推广等多种形式的合作，实现资源互补、优势共享，共同拓展市场和服务用户', en: 'Conduct various forms of cooperation including technology, content, and marketing partnerships to achieve resource complementarity, advantage sharing, jointly expand markets and serve users' }),
          },
          {
            title: t({ 'zh-CN': '技术伙伴', en: 'Technology Partners' }),
            description: t({ 'zh-CN': '与区块链、云服务、AI等技术提供商深度合作，共同探索前沿技术在教育领域的应用，推动技术创新和产品升级', en: 'Deep cooperation with blockchain, cloud, AI and other technology providers to explore cutting-edge technology applications in education, promote technological innovation and product upgrades' }),
          },
          {
            title: t({ 'zh-CN': '内容创作者', en: 'Content Creators' }),
            description: t({ 'zh-CN': '邀请知名讲师、专家学者、优质创作者入驻平台，提供内容创作支持、版权保护、收益分成等全方位服务', en: 'Invite famous lecturers, experts, and quality creators to join the platform, providing comprehensive services including content creation support, copyright protection, and revenue sharing' }),
          },
        ],
      },
      featured: {
        title: t({ 'zh-CN': '合作伙伴展示', en: 'Featured Partners' }),
        partners: [
          { name: t({ 'zh-CN': '清华大学', en: 'Tsinghua University' }), type: t({ 'zh-CN': '教育机构', en: 'Education' }) },
          { name: t({ 'zh-CN': '北京大学', en: 'Peking University' }), type: t({ 'zh-CN': '教育机构', en: 'Education' }) },
          { name: t({ 'zh-CN': '阿里云', en: 'Alibaba Cloud' }), type: t({ 'zh-CN': '技术伙伴', en: 'Technology' }) },
          { name: t({ 'zh-CN': '腾讯云', en: 'Tencent Cloud' }), type: t({ 'zh-CN': '技术伙伴', en: 'Technology' }) },
          { name: t({ 'zh-CN': '华为云', en: 'Huawei Cloud' }), type: t({ 'zh-CN': '技术伙伴', en: 'Technology' }) },
          { name: t({ 'zh-CN': '网易有道', en: 'NetEase Youdao' }), type: t({ 'zh-CN': '内容合作', en: 'Content' }) },
        ],
      },
      cta: {
        title: t({ 'zh-CN': '成为合作伙伴', en: 'Become a Partner' }),
        description: t({ 'zh-CN': '如果您有兴趣与我们合作，请联系我们的商务团队', en: 'If you\'re interested in partnering with us, please contact our business team' }),
        button: t({ 'zh-CN': '联系商务', en: 'Contact Business' }),
        email: 'ozemyn@icloud.com',
      },
    },
  },
} satisfies Dictionary;



export default companyContent;
