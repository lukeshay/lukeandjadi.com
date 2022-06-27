const config = {
    date: 'August 20, 2022',
    email: 'contact@lukeandjadi.com',
    env: {
        recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '',
    },
    guestLinks: [
        {
            href: '/#guest-accommodations',
            text: 'Guest Accommodations',
        },
        {
            href: '/#registries',
            text: 'Registries',
        },
        {
            href: '/rsvp',
            text: 'RSVP',
        },
    ],
    links: [
        {
            href: '/',
            text: 'Home',
        },
        {
            href: '/#our-story',
            text: 'Our Story',
        },
        {
            href: '/#the-wedding',
            text: 'The Wedding',
        },
        {
            href: '/#guest-accommodations',
            text: 'Guest Accommodations',
        },
        {
            href: '/#registries',
            text: 'Registries',
        },
        {
            href: '/#wedding-party',
            text: 'Wedding Party',
        },
        {
            href: '/rsvp',
            text: 'RSVP',
        },
    ],
    registries: [
        {
            href: 'https://www.target.com/gift-registry/gift-giver?registryId=c9b458a0-b4d7-11eb-9189-157cffde39cf&type=WEDDING',
            text: 'Target',
        },
        {
            href: 'https://www.amazon.com/wedding/share/lukeandjadi',
            text: 'Amazon',
        },
        {
            href: 'https://www.zola.com/registry/lukeandjadi',
            text: 'Zola Cash Funds',
        },
    ],
    restaurants: ['Iowa Taproom', 'The Republic on Grand', 'Beechwood Lounge', 'Coa Cantina', 'Bellhop'],
    weddingLinks: [
        {
            href: '/',
            text: 'Home',
        },
        {
            href: '/#our-story',
            text: 'Our Story',
        },
        {
            href: '/#wedding-party',
            text: 'Wedding Party',
        },
        {
            href: '/#the-wedding',
            text: 'The Wedding',
        },
    ],
    weddingParty: {
        bridesmaids: [
            {
                img: '/jaclyn-reding.jpg',
                name: 'Jaclyn Reding',
                relation: 'Sister of the Bride',
                role: 'Maid of Honor',
            },
            {
                img: '/jordan-behounek.jpg',
                name: 'Jordan Behounek',
                relation: 'Sister of the Bride',
                role: 'Bridesmaid',
            },
            {
                img: '/jenna-reding.jpg',
                name: 'Jenna Reding',
                relation: 'Sister of the Bride',
                role: 'Bridesmaid',
            },
            {
                img: '/shayla-goche.jpg',
                name: 'Shayla Goche',
                relation: 'Friend of the Bride',
                role: 'Bridesmaid',
            },
        ],
        grandparents: [
            {
                img: '/john-bertha-reding.jpg',
                name: 'John & Bertha Reding',
                relation: 'Grandparents of the Bride',
                role: 'Grandparents',
            },
            {
                img: '/lyle-dorothy-dahlgren.jpg',
                name: 'Lyle & Dorothy Dahlgren',
                relation: 'Grandparents of the Bride',
                role: 'Grandparents',
            },
            {
                img: '/jerry-dorothy-peters.jpg',
                name: 'Jerry & Dorothy Peters',
                relation: 'Grandparents of the Groom',
                role: 'Grandparents',
            },
            {
                img: '/kathi-kuhl.jpg',
                name: 'Kathi Kuhl',
                relation: 'Grandparent of the Groom',
                role: 'Grandparent',
            },
            {
                img: '/bob-shay.jpg',
                name: 'Bob Shay',
                relation: 'Grandparent of the Groom',
                role: 'Grandparent',
            },
        ],
        groomsmen: [
            {
                img: '/brady-shay.jpg',
                name: 'Brady Shay',
                relation: 'Brother of the Groom',
                role: 'Best Man',
            },
            {
                img: '/jonny-behounek.jpg',
                name: 'Jonny Behounek',
                relation: 'Brother-in-law of the Bride',
                role: 'Groomsman',
            },
            {
                img: '/tyler-krueger.jpg',
                name: 'Tyler Krueger',
                relation: 'Friend of the Groom',
                role: 'Groomsman',
            },
            {
                img: '/nick-schiefelbein.jpg',
                name: 'Nick Schiefelbein',
                relation: 'Friend of the Couple',
                role: 'Groomsman',
            },
        ],
        others: [
            {
                img: '/hayes-behounek.jpg',
                name: 'Hayes Behounek',
                relation: 'Nephew of the Bride',
                role: 'Ring Bearer',
            },
            {
                img: '/remi-behounek.jpg',
                name: 'Remi Behounek',
                relation: 'Niece of the Bride',
                role: 'Flower Girl',
            },
        ],
        parents: [
            {
                img: '/jeff-tami-reding.jpg',
                name: 'Jeff & Tami Reding',
                relation: 'Parents of the Bride',
                role: 'Parents',
            },
            {
                img: '/roby-natalie-shay.jpg',
                name: 'Roby & Natalie Shay',
                relation: 'Parents of the Groom',
                role: 'Parents',
            },
        ],
        ushers: [
            {
                img: '/jackson-helmers.jpg',
                name: 'Jackson Helmers',
                relation: 'Friend of the Bride',
                role: 'Usher',
            },
            {
                img: '/nick-stein.jpg',
                name: 'Nick Stein',
                relation: 'Friend of the Bride',
                role: 'Usher',
            },
            {
                img: '/dustin-white.jpg',
                name: 'Dustin White',
                relation: 'Friend of the Couple',
                role: 'Usher',
            },
        ],
    },
};

export default config;
