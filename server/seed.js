const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Artwork = require('./models/Artwork');
const Collection = require('./models/Collection');
const Exhibition = require('./models/Exhibition');
const BlogPost = require('./models/BlogPost');
const SiteSettings = require('./models/SiteSettings');

dotenv.config({ path: './.env' });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Admin.deleteMany({});
    await Artwork.deleteMany({});
    await Collection.deleteMany({});
    await Exhibition.deleteMany({});
    await BlogPost.deleteMany({});
    await SiteSettings.deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
    });
    console.log('Admin created');

    await Artwork.insertMany([
      {
        title: 'The Long Way Home',
        medium: 'Acrylic on canvas',
        dimensions: '36 x 48 in',
        year: '2024',
        category: 'Landscapes',
        description: 'A quiet evening in a hillside town, where the day slows down and the light turns everything golden. This piece is about belonging — to places, to memories, and to moments that stay with us.',
        image: '',
        thumbnails: [],
        featured: true,
        order: 1,
      },
      {
        title: 'Morning Light',
        medium: 'Watercolour',
        dimensions: '12 x 16 in',
        year: '2024',
        category: 'Everyday Life',
        description: 'Soft morning light filtering through a window, capturing the quiet beauty of an ordinary moment.',
        image: '',
        thumbnails: [],
        featured: false,
        order: 2,
      },
      {
        title: 'Still Waters',
        medium: 'Acrylic on canvas',
        dimensions: '30 x 40 in',
        year: '2023',
        category: 'Landscapes',
        description: 'The calm surface of a mountain lake reflecting the sky above, a moment of perfect stillness.',
        image: '',
        thumbnails: [],
        featured: false,
        order: 3,
      },
      {
        title: 'Bloom',
        medium: 'Gouache',
        dimensions: '18 x 24 in',
        year: '2024',
        category: 'Still Life',
        description: 'A celebration of flowers in full bloom, capturing the fleeting beauty of nature.',
        image: '',
        thumbnails: [],
        featured: false,
        order: 4,
      },
    ]);
    console.log('Artworks created');

    await Collection.insertMany([
      { name: 'Landscapes', description: 'Places that hold stories', image: '', artworkCount: 26, order: 1 },
      { name: 'People', description: 'Portraits of everyday life', image: '', artworkCount: 21, order: 2 },
      { name: 'Everyday Life', description: 'Moments worth remembering', image: '', artworkCount: 18, order: 3 },
      { name: 'Still Life', description: 'Beauty in the ordinary', image: '', artworkCount: 14, order: 4 },
    ]);
    console.log('Collections created');

    await Exhibition.insertMany([
      { year: '2024', title: 'Colours of Home', venue: 'Kala Art Gallery', location: 'New Delhi', order: 1 },
      { year: '2023', title: 'Between Here and There', venue: 'Art District', location: 'Mumbai', order: 2 },
      { year: '2022', title: 'Everyday Magic', venue: 'The Studio Room', location: 'Bengaluru', order: 3 },
      { year: '2021', title: 'Small Joys', venue: 'Aarohan Art Space', location: 'Kolkata', order: 4 },
    ]);
    console.log('Exhibitions created');

    await BlogPost.insertMany([
      {
        title: 'Finding Light in Everyday Places',
        excerpt: 'How I find inspiration in the most ordinary moments of daily life.',
        content: '',
        image: '',
        date: '2024-08-12',
        order: 1,
      },
      {
        title: 'My Painting Process',
        excerpt: 'A look behind the scenes at how each piece comes to life.',
        content: '',
        image: '',
        date: '2024-07-28',
        order: 2,
      },
      {
        title: 'A Day in Udaipur',
        excerpt: 'Sketches and thoughts from a week spent painting in the city of lakes.',
        content: '',
        image: '',
        date: '2024-06-14',
        order: 3,
      },
    ]);
    console.log('Blog posts created');

    await SiteSettings.create({
      artistName: 'Mira Sen',
      tagline: 'I paint the spaces between memory and imagination.',
      aboutText: "I'm Mira, a visual artist based in India, working primarily with acrylics and gouache. My work is inspired by travel, everyday moments, and the people around me. I try to capture the feeling of a place — not just how it looks, but how it feels.",
      quote: 'Art, for me, is a way to hold on to moments before they fade.',
      quoteAuthor: 'Mira Sen',
      exhibitionHeader: 'A few places where my work has found a home.',
      collectionsSubtitle: 'Different stories, different colours, same curiosity.',
      studioNotesSubtitle: 'Thoughts, sketches and moments from my journey.',
      contactMessage: "Interested in a commission, collaboration, or just want to say hello? I'd love to hear from you.",
      footerText: 'More art. Kinder days. Always.',
      socialLinks: {
        instagram: '',
        pinterest: '',
        youtube: '',
        email: '',
      },
    });
    console.log('Site settings created');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
