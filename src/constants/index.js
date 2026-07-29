export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Work',
        href: '#work',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];



export const myProjects = [
    {
        title: 'Chronithm',
        subtitle: 'AI-Powered Developer Work Intelligence SaaS',
        problem: 'Developers waste significant time writing daily standups instead of coding.',
        solution: 'Automatically convert GitHub activity into structured, fluff-free reports.',
        engineering: [
            'Developed an event-driven webhook pipeline bypassing standard REST API rate limits.',
            'Secured public ingestion endpoint against spoofed payloads using HMAC SHA-256.',
            'Leveraged Gemini 2.5 Flash API with strict prompting to auto-generate standups.',
            'Engineered 0ms-latency client-side filtering engine using React derived state.'
        ],
        impact: 'Standups generated in seconds with zero redundant database queries.',
        architecture: 'Client → React → Express → Webhook → Gemini → MongoDB',
        links: {
            live: 'https://chronithm.vercel.app/',
        },
        texture: '/textures/project/project1.mp4', 
    },
    {
        title: 'CloudNest',
        subtitle: 'AI-Native Cloud File Management Platform',
        problem: 'Locating specific media files in large storage buckets is slow and un-semantic.',
        solution: 'An AI-native media pipeline powering a natural-language "Smart Search" for file retrieval.',
        engineering: [
            'Architected an integration with the Gemini API to auto-generate semantic captions on upload.',
            'Secured backend routes with Clerk Auth, enforcing cryptographic data isolation.',
            'Utilized Drizzle ORM to tie every database query strictly to verified user sessions.',
            'Integrated ImageKit CDN to compress image formats, significantly reducing load times.'
        ],
        impact: 'Optimized media delivery and enabled instantaneous natural language retrieval.',
        architecture: 'Next.js → Clerk → Drizzle ORM → PostgreSQL → ImageKit → Gemini',
        links: {
            live: 'https://cloud-nest-omega-sandy.vercel.app/',
            source: 'https://github.com/Itsmeinayath/CloudNest',
        },
        texture: '/textures/project/project2.mp4', 
    },
    {
        title: 'VisualDB',
        subtitle: 'Interactive SQL Execution Visualizer (Open Source)',
        problem: 'CS students memorize SQL syntax rather than understanding how database engines actually execute queries under the hood.',
        solution: 'A 100% client-side educational tool that parses SQL and visually animates the internal execution pipeline step-by-step.',
        engineering: [
            'Built a custom state machine utilizing node-sql-parser to generate Abstract Syntax Trees (AST) in the browser.',
            'Engineered an interactive animation loop using React derived state to visualize row scans, filters, and hash aggregations.',
            'Architected a strictly decoupled execution engine, allowing open-source contributors to easily build new UI modules.',
            'Successfully open-sourced the platform, actively managing PRs and community contributions from global developers.'
        ],
        impact: 'Actively used in university classrooms to teach database internals, with a growing open-source community.',
        architecture: 'Client → React 19 → Vite → node-sql-parser → AST Engine',
        links: {
            live: 'https://visualdb-sooty.vercel.app/',
            source: 'https://github.com/Itsmeinayath/visualdb',
        },
        texture: '/textures/project/project3.mp4', 
    },
    {
        title: 'Inverted Search Engine',
        subtitle: 'High-Performance CLI Text Retrieval System',
        problem: 'Standard linear search algorithms fail to scale when querying massive document datasets.',
        solution: 'An inverted index-based search system built entirely in C for blazing fast retrieval.',
        engineering: [
            'Indexed over 1,000,000 records using custom hash-table indexing.',
            'Optimized lookup performance using rigorous manual memory management techniques.',
            'Implemented multi-level data structures (linked lists + hash tables) to resolve collisions.',
            'Built optimized file I/O operations for persistent data storage across sessions.'
        ],
        impact: 'Reduced search latency to milliseconds over massive datasets.',
        architecture: 'CLI → C → Hash Tables → Linked Lists → File I/O',
        links: {
            source: 'https://github.com/itsmeinayath', 
        }
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};
