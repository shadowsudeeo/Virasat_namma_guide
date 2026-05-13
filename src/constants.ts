export interface Monument {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  district: string;
  dynasty: string;
  era: string;
  description: string;
  imageUrl: string;
  tag: string;
  isUNESCO?: boolean;
}

export const MONUMENTS: Monument[] = [
  {
    id: 'belur-chennakeshava',
    name: 'Belur Chennakeshava Temple',
    location: { lat: 13.1627, lng: 75.8596 },
    district: 'Hassan',
    dynasty: 'Hoysala',
    era: '1117 AD',
    description: 'The triumph of soapstone architecture. Commissioned by King Vishnuvardhana in 1117 CE, this marvel took 103 years to complete across three generations.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCILD3oReqtf7jfy3SJ6txI7AZdXFcNLUn8jWLEJfttR7pFp7gfdtqyOK-HnKNlmrQeyCmyGuktdiUjiJ1MtHZrxlwuL1R2uqWAQQIV8FqKct1dPNXujk9rw5BghUcTkqrll37pNmSnDNv5mK2diMhJ5WtibM5gQk_JBohsIID5N0Bm7b3kY9NXNnJ23f011ZhjMkGkuve8SMyMmslSsNG735rzEXWo-VQBb22OqDwVpee7qMwTop5p6L8jXlrWjdmFtMtgS9GtFsY',
    tag: 'Hoysala',
    isUNESCO: false
  },
  {
    id: 'hampi-stone-chariot',
    name: 'Hampi Stone Chariot',
    location: { lat: 15.3350, lng: 76.4600 },
    district: 'Vijayanagara',
    dynasty: 'Vijayanagara',
    era: '15th Century',
    description: 'Relics of a forgotten empire. A majestic monument at Vitthala Temple complex in Hampi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgKnwZXloMBucw4mMjAmM9xwyKTWGIHKPNF-JpP1qWob7K_yhqjnUS1tr97Y5kmuGDSb5sQck8Y8fsiKVtUql15gAkfgW-1v97w3wnJAihxFQwiadTQAyOw3kmBngqOFIswZ6Z062IBzOe-F9IpQsAEN-1u49OQlvBuRkVOl4D7EKk0Z93pxpl14Lz8iK6y20S7GMe2ZhvqZi-2mB1_qEnY-xhmU-WsFMB9f8yU4AnaX7NbPuA5X93zS_TGm84RhJfRyprwH8Gvu4',
    tag: 'Vijayanagara',
    isUNESCO: true
  },
  {
    id: 'pattadakal',
    name: 'Pattadakal Monument Group',
    location: { lat: 15.9482, lng: 75.8160 },
    district: 'Bagalkot',
    dynasty: 'Chalukya',
    era: '7th-8th Century',
    description: 'Sacred "City of Coronations". The peak of Early Chalukyan art featuring nine Hindu temples.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgQBTiycDYEv7eUMdknIfBd06yjlrcjhD_zmU4zLvgPuh1_XDHhQ3ZjgdLQ4JIbcg4HPnTa7YvvMA1VdpJUoRpPKt2qY3XOVoISfNcPD83vcVWROBAJib49fc4H7ky-6jIXTAQ55SxMUEtES9vgKrUlLwr8cI830PCioBRJxUJKt4YU-YZougrFvZdkfmimKHxzntVz-qEx-GkkOnRKIqYMzIGdvXsOLwkNcKGKWorST6hAMUdRZPc7owN1cS6LglHHe0KqQ_emBg',
    tag: 'Chalukya',
    isUNESCO: true
  },
  {
    id: 'badami-caves',
    name: 'Badami Cave Temples',
    location: { lat: 15.9181, lng: 75.6791 },
    district: 'Bagalkot',
    dynasty: 'Chalukya',
    era: '6th Century',
    description: 'Rock-cut heritage. Transition from rock-cut tradition to structural temple form.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxcmE_thYtLB0pNdHORZVCEL85dYK5BtpLjub9mrAeAyVANO4twh7uEjks2kj9rJUTfqH4nSooF2laDoZ8EY4Pb-g-WUm5hPGr36O7Fs3pLJhqJ-XpBtdHI4halgcW89UfHGomD0WZa9eSCQM5Rqjh2fZCZvUREND9aGmrN5QxrzpEJYbT7nk8pV991POM9dbi_eA65yEu1WDohfxy_TFEAdCj5LdUs5_26VoW50y6PIVhPv8FA2nIW7qSmjLbjVkAkQ2y9OiBePY',
    tag: 'Chalukya',
    isUNESCO: false
  },
  {
    id: 'mysore-palace',
    name: 'Mysore Palace',
    location: { lat: 12.3051, lng: 76.6551 },
    district: 'Mysore',
    dynasty: 'Wodeyar',
    era: '14th-20th Century',
    description: 'The grand exterior of Mysore Palace, showcasing Indo-Saracenic style.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzbcFKbe-lh6OstaTyFwQPe2gFKviYmQJiqlhstetvqCOkpGeVexqAws0tNiOIbvV4iOOBDGb_cL5SW5QRk-aq99DAqgx4Fv8ozKhPjT5q3rfUHrObRHxELXYkbW69keF3t-oHal5K2pNx1emcwJBbCpoyusi4P6oGXeozb-n9khWNDcUIIoa-roVGDi0cdK0iBdm_eb2cKDUvxnWu0h2PVzCbHlm9XhzroohEJfEjnPAY08reDV6LCX1O8DDZ4c3lg01_3VnY8SI',
    tag: 'Wodeyar',
    isUNESCO: false
  }
];

export const DYNASTIES = [
  { id: 'kadamba', name: 'Kadambas', period: '345 – 525 CE', description: 'The first indigenous kingdom to use Kannada in administration.' },
  { id: 'chalukya', name: 'Chalukyas', period: '543 – 753 CE', description: 'Architects of the majestic rock-cut and structural temples.' },
  { id: 'hoysala', name: 'Hoysalas', period: '1026 – 1343 CE', description: 'Masters of intricate soapstone carvings and star-shaped temples.' },
  { id: 'vijayanagara', name: 'Vijayanagara', period: '1336 – 1646 CE', description: 'A golden era of architecture, arts and global trade.' }
];
