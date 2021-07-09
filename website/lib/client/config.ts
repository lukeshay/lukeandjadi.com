const def = {
  date: 'August 20, 2022',
  email: 'contact@lukeandjadi.com',
  weddingLinks: [
    { href: '/', text: 'Home' },
    { href: '/#our-story', text: 'Our Story' },
    { href: '/#wedding-party', text: 'Wedding Party' },
    { href: '/#the-wedding', text: 'The Wedding' },
  ],
  guestLinks: [
    { href: '/#guest-accommodations', text: 'Guest Accommodations' },
    { href: '/#registries', text: 'Registries' },
    { href: '/rsvp', text: 'RSVP' },
  ],
  registries: [
    {
      href: 'https://www.amazon.com/wedding/share/lukeandjadi',
      text: 'Amazon',
    },
    { href: 'https://tgt.gifts/jadiandluke', text: 'Target' },
    {
      href: 'https://www.zola.com/registry/lukeandjadi',
      text: 'Zola Cash Funds',
    },
  ],
  weddingParty: {
    groomsmen: [
      {
        img: '/brady-shay.jpg',
        name: 'Brady Shay',
        role: 'Best Man',
        relation: 'Brother of the Groom',
      },
      {
        img: '/jonny-behounek.jpg',
        name: 'Jonny Behounek',
        role: 'Groomsman',
        relation: 'Brother-in-law of the Bride',
      },
      {
        img: '/tyler-krueger.jpg',
        name: 'Tyler Krueger',
        role: 'Groomsman',
        relation: 'Friend of the Groom',
      },
      {
        img: '/kaeden-sisler.jpg',
        name: 'Kaeden Sisler',
        role: 'Groomsman',
        relation: 'Brother-in-law of the Groom',
      },
      {
        img: '/nick-schiefelbein.jpg',
        name: 'Nick Schiefelbein',
        role: 'Groomsman',
        relation: 'Friend of the Couple',
      },
    ],
    bridesmaids: [
      {
        img: '/jaclyn-reding.jpg',
        name: 'Jaclyn Reding',
        role: 'Maid of Honor',
        relation: 'Sister of the Bride',
      },
      {
        img: '/jordan-behounek.jpg',
        name: 'Jordan Behounek',
        role: 'Bridesmaid',
        relation: 'Sister of the Bride',
      },
      {
        img: '/jenna-reding.jpg',
        name: 'Jenna Reding',
        role: 'Bridesmaid',
        relation: 'Sister of the Bride',
      },
      {
        img: '/kelsy-sisler.jpg',
        name: 'Kelsy Sisler',
        role: 'Bridesmaid',
        relation: 'Sister of the Groom',
      },
      {
        img: '/shayla-goche.jpg',
        name: 'Shayla Goche',
        role: 'Bridesmaid',
        relation: 'Friend of the Bride',
      },
    ],
    others: [
      {
        img: '/hayes-behounek.jpg',
        name: 'Hayes Behounek',
        role: 'Ring Bearer',
        relation: 'Nephew of the Bride',
      },
      {
        img: '/remi-behounek.jpg',
        name: 'Remi Behounek',
        role: 'Flower Girl',
        relation: 'Niece of the Bride',
      },
    ],
    parents: [
      {
        img: '/jeff-tami-reding.jpg',
        name: 'Jeff & Tami Reding',
        role: 'Parents',
        relation: 'Parents of the Bride',
      },
      {
        img: '/roby-natalie-shay.jpg',
        name: 'Roby & Natalie Shay',
        role: 'Parents',
        relation: 'Parents of the Groom',
      },
    ],
    grandparents: [
      {
        img: '/john-bertha-reding.jpg',
        name: 'John & Bertha Reding',
        role: 'Grandparents',
        relation: 'Grandparents of the Bride',
      },
      {
        img: '/lyle-dorothy-dahlgren.jpg',
        name: 'Lyle & Dorothy Dahlgren',
        role: 'Grandparents',
        relation: 'Grandparents of the Bride',
      },
      {
        img: '/jerry-dorothy-peters.jpg',
        name: 'Jerry & Dorothy Peters',
        role: 'Grandparents',
        relation: 'Grandparents of the Groom',
      },
      {
        img: '/kathi-kuhl.jpg',
        name: 'Kathi Kuhl',
        role: 'Grandparent',
        relation: 'Grandparent of the Groom',
      },
      {
        img: '/bob-shay.jpg',
        name: 'Bob Shay',
        role: 'Grandparent',
        relation: 'Grandparent of the Groom',
      },
    ],
    ushers: [
      {
        img: '/jackson-helmers.jpg',
        name: 'Jackson Helmers',
        role: 'Usher',
        relation: 'Friend of the Bride',
      },
      {
        img: '/nick-stein.jpg',
        name: 'Nick Stein',
        role: 'Usher',
        relation: 'Friend of the Bride',
      },
      {
        img: '/dustin-white.jpg',
        name: 'Dustin White',
        role: 'Usher',
        relation: 'Friend of the Bride',
      },
    ],
  },
  env: {
    recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  },
};

export default def;
