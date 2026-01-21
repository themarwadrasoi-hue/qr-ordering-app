export const categories = [
    { id: 'all', name: 'All' },
    // Restaurant & Hut Categories
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'veg_mains', name: 'Veg Main Course' },
    { id: 'roti', name: 'Roti' },
    { id: 'quick_bite', name: 'Quick Bite' },
    { id: 'veg_starter', name: 'Veg Starter' },
    { id: 'non_veg_starter', name: 'Non Veg Starter' },
    { id: 'mains_chicken', name: 'Mains Chicken' },
    { id: 'mains_mutton', name: 'Mains Mutton' },
    { id: 'eggs', name: 'Eggs' },
    { id: 'cold_drink', name: 'Cold Drink' },
    { id: 'salad', name: 'Salad' },
    // Cafe Categories
    { id: 'burgers', name: 'Burgers' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'sandwich', name: 'Sandwich' },
    { id: 'coffee_tea', name: 'Coffee & Tea' },
    { id: 'fries_sides', name: 'Fries & Sides' },
    { id: 'rolls', name: 'Rolls' },
    { id: 'noodles', name: 'Noodles' },
    { id: 'pasta', name: 'Pasta' },
]

export const menuItems = [
    // ==========================================
    // RESTAURANT & HUT ITEMS (From Image)
    // ==========================================

    // --- BREAKFAST ---
    { id: 1, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Aloo Parantha + Curd + Pickel (2 Pcs)', desc: 'Stuffed potato parantha served with fresh curd and pickle.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 2, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Paneer Parantha + Curd + Pickel (2 Pcs)', desc: 'Stuffed paneer parantha served with fresh curd and pickle.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 3, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Plain Parantha + Curd + Pickel (2 Pcs)', desc: 'Plain layered parantha served with curd and pickle.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 4, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Pyaz Parantha + Curd + Pickel (2 Pcs)', desc: 'Stuffed onion parantha served with curd and pickle.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 5, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Gobhi Parantha + Curd + Pickel (2 Pcs)', desc: 'Stuffed cauliflower parantha served with curd and pickle.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 6, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Poha', desc: 'Flattened rice cooked with spices, onions, and peanuts.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 7, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Upma', desc: 'Savoury semolina porridge with veggies.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 8, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Omellete', desc: 'Double egg fluffy omelette with spices.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&w=500&q=60' },
    { id: 9, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Butter Bread', desc: 'Toasted bread with a generous spread of butter.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 10, menuType: ['restaurant', 'hut'], category: 'breakfast', title: 'Bread Jam', desc: 'Toasted bread with mixed fruit jam.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },

    // --- QUICK BITE ---
    { id: 11, menuType: ['restaurant', 'hut'], category: 'quick_bite', title: 'Peri Peri Maggie', desc: 'Spicy peri peri flavored noodles.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 12, menuType: ['restaurant', 'hut'], category: 'quick_bite', title: 'Masala Maggie', desc: 'Classic Indian masala flavored noodles.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 13, menuType: ['restaurant', 'hut'], category: 'quick_bite', title: 'Vegitable Maggie', desc: 'Maggie noodles loaded with fresh veggies.', price: 110, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 14, menuType: ['restaurant', 'hut'], category: 'quick_bite', title: 'Maggie With Cheese', desc: 'Noodles with melted creamy cheese.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 15, menuType: ['restaurant', 'hut'], category: 'quick_bite', title: 'Red Pasta', desc: 'Penne pasta in spicy red sauce.', price: 130, isAvailable: true, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=60' },
    { id: 16, menuType: ['restaurant', 'hut'], category: 'quick_bite', title: 'White Pasta', desc: 'Penne pasta in creamy white alfredo sauce.', price: 130, isAvailable: true, image: 'https://images.unsplash.com/photo-1645112481338-3c353986427a?auto=format&fit=crop&w=500&q=60' },

    // --- VEG STARTER ---
    { id: 17, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Crispy Corn', desc: 'Golden fried crispy sweet corn.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 18, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Chilli Potato', desc: 'Spicy and tangy fried potato fingers.', price: 170, isAvailable: true, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 19, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Honey Chilli Potato', desc: 'Sweet and spicy honey glazed potatoes.', price: 190, isAvailable: true, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 20, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Chilli Paneer', desc: 'Indo-chinese style spicy cottage cheese.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 21, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Paneer Tikka', desc: 'Marinated and grilled cottage cheese cubes.', price: 240, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 22, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Hakka Noodels', desc: 'Stir-fried chinese style noodles.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 23, menuType: ['restaurant', 'hut'], category: 'veg_starter', title: 'Veg Chowmine', desc: 'Classic stir-fried vegetable chowmein.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },

    // --- VEG MAINS ---
    { id: 24, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Dal Tadka', desc: 'Yellow lentils tempered with aromatic spices.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 25, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Mix Veg', desc: 'Seasonal assorted vegetable curry.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },
    { id: 26, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Kadi Pakoda', desc: 'Gram flour fritters in tangy yogurt gravy.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 27, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Aloo Chole', desc: 'Potato and chickpeas cooked in spicy gravy.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 28, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Besan Gatta', desc: 'Traditional Rajasthani gram flour dumplings curry.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 29, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Sev Tamatar', desc: 'Tangy tomato curry topped with crispy sev.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 30, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Sahi Paneer', desc: 'Rich and creamy cottage cheese curry.', price: 250, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 31, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Palak Paneer', desc: 'Cottage cheese in creamy spinach gravy.', price: 170, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 32, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Paneer Bhurji', desc: 'Spiced scrambled cottage cheese.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 33, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Paneer Tikka Masala', desc: 'Grilled paneer in a spicy thick gravy.', price: 230, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 34, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Matar Paneer', desc: 'Cottage cheese and green peas curry.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 35, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Kadhai Paneer', desc: 'Paneer with bell peppers in spicy wok gravy.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 36, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Jeera Aloo', desc: 'Potatoes tossed with cumin and spices.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 37, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Malai Kofta', desc: 'Vegetable dumplings in rich creamy gravy.', price: 210, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 38, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Dahi', desc: 'Fresh plain homemade yogurt.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 39, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Dahi Tadka', desc: 'Tempered yogurt with aromatic spices.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 40, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Veg Raita', desc: 'Chilled yogurt with mixed vegetables.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 41, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Bondi Raita', desc: 'Chilled yogurt with crispy boondi.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 42, menuType: ['restaurant', 'hut'], category: 'veg_mains', title: 'Chaach', desc: 'Refreshing spiced buttermilk.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },

    // --- ROTI ---
    { id: 43, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Tawa Roti Plain', desc: 'Simple handmade wheat bread.', price: 10, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 44, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Tawa Roti Butter', desc: 'Buttered handmade wheat bread.', price: 12, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 45, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Tandoori Roti Plain', desc: 'Clay oven baked wheat bread.', price: 15, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 46, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Tandoori Roti Butter', desc: 'Buttered clay oven baked bread.', price: 18, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 47, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Baati', desc: 'Traditional hard wheat flour ball bread.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 48, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Makke Ki Roti', desc: 'Winter special maize flour flatbread.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 49, menuType: ['restaurant', 'hut'], category: 'roti', title: 'Bajre Ki Roti', desc: 'Pearl millet healthy flatbread.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },

    // --- SALAD ---
    { id: 50, menuType: ['restaurant', 'hut'], category: 'salad', title: 'Green Salad', desc: 'Fresh cucumber, carrot, and tomato slices.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },

    // --- NON VEG STARTER ---
    { id: 51, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Grilled Chicken', desc: 'Succulent grilled marinated chicken.', price: 350, isAvailable: true, variants: { half: 350, full: 650 }, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=60' },
    { id: 52, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Grilled Fish', desc: 'Marinated fish grilled to perfection.', price: 300, isAvailable: true, variants: { half: 300, full: 550 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=60' },
    { id: 53, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Fish Fry', desc: 'Golden fried crispy fish slices.', price: 300, isAvailable: true, variants: { half: 300, full: 550 }, image: 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=500&q=60' },
    { id: 54, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Chicken Fry', desc: 'Classic deep-fried marinated chicken.', price: 350, isAvailable: true, variants: { half: 350, full: 650 }, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 55, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Chicken Fry Boneless', desc: 'Crispy fried boneless chicken chunks.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1562967960-f6551061c28c?auto=format&fit=crop&w=500&q=60' },

    // --- MAINS CHICKEN ---
    { id: 56, menuType: ['restaurant', 'hut'], category: 'mains_chicken', title: 'Chicken Curry', desc: 'Tender chicken in authentic house curry.', price: 380, isAvailable: true, variants: { half: 380, full: 700 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 57, menuType: ['restaurant', 'hut'], category: 'mains_chicken', title: 'Chicken Masala', desc: 'Chicken cooked in a rich spicy masala.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 58, menuType: ['restaurant', 'hut'], category: 'mains_chicken', title: 'Kadhai Chicken', desc: 'Chicken tossed with bell peppers in wok.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 59, menuType: ['restaurant', 'hut'], category: 'mains_chicken', title: 'Butter Chicken', desc: 'Tandoori chicken in creamy tomato butter sauce.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 60, menuType: ['restaurant', 'hut'], category: 'mains_chicken', title: 'Handi Chicken Special', desc: 'Slow cooked marinated chicken delicacy.', price: 700, isAvailable: true, variants: { half: 700, full: 1400 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },

    // --- MAINS MUTTON ---
    { id: 61, menuType: ['restaurant', 'hut'], category: 'mains_mutton', title: 'Mutton Curry', desc: 'Slow cooked tender mutton in spicy gravy.', price: 600, isAvailable: true, variants: { half: 600, full: 1150 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 62, menuType: ['restaurant', 'hut'], category: 'mains_mutton', title: 'Masala Mutton', desc: 'Mutton pieces in a thick spicy masala gravy.', price: 700, isAvailable: true, variants: { half: 700, full: 1350 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 63, menuType: ['restaurant', 'hut'], category: 'mains_mutton', title: 'Handi Mutton Special', desc: 'Premium slow cooked royal handi mutton.', price: 900, isAvailable: true, variants: { half: 900, full: 1750 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 64, menuType: ['restaurant', 'hut'], category: 'mains_mutton', title: 'Fish Curry', desc: 'Traditional fresh water fish curry.', price: 300, isAvailable: true, variants: { half: 300, full: 600 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=60' },

    // --- EGGS ---
    { id: 65, menuType: ['restaurant', 'hut'], category: 'eggs', title: 'Egg Curry', desc: 'Boiled eggs in aromatic house gravy.', price: 150, isAvailable: true, variants: { half: 150, full: 250 }, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 66, menuType: ['restaurant', 'hut'], category: 'eggs', title: 'Boiled Egg', desc: 'Flawlessly boiled egg (Single).', price: 30, isAvailable: true, image: 'https://images.unsplash.com/photo-1582722872445-44c56bb62991?auto=format&fit=crop&w=500&q=60' },
    { id: 67, menuType: ['restaurant', 'hut'], category: 'eggs', title: 'Egg Bhurji', desc: 'Spiced Indian style scrambled eggs.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 68, menuType: ['restaurant', 'hut'], category: 'eggs', title: 'Boiled Egg Bhurji', desc: 'Scrambled eggs prepared with boiled egg chunks.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 69, menuType: ['restaurant', 'hut'], category: 'eggs', title: 'Omelette (with Bread)', desc: 'Fluffy double egg omelette served with toasted bread.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&w=500&q=60' },
    { id: 70, menuType: ['restaurant', 'hut'], category: 'eggs', title: 'Extra Butter', desc: 'Generous serving of premium butter.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },

    // --- COLD DRINK ---
    { id: 71, menuType: ['restaurant', 'hut'], category: 'cold_drink', title: 'All Cold Drinks Variety', desc: 'Assorted chilled soft drinks.', price: 0, isAvailable: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60', note: 'MRP' },


    // ==========================================
    // CAFE ITEMS (Strictly for Cafe Tab)
    // ==========================================

    // --- CAFE - BURGERS ---
    { id: 101, menuType: ['cafe'], category: 'burgers', title: 'Plain Aloo Tikki Burger', desc: 'Crispy potato patty burger.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=60' },
    { id: 102, menuType: ['cafe'], category: 'burgers', title: 'Cheese Burger', desc: 'Veg burger with extra cheese slice.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60' },
    { id: 103, menuType: ['cafe'], category: 'burgers', title: 'Egg Burger', desc: 'Classic burger with a fried egg.', price: 110, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 104, menuType: ['cafe'], category: 'burgers', title: 'Double Tiki Burger', desc: 'Double patty burger for extra hunger.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=60' },

    // --- CAFE - SANDWICH ---
    { id: 105, menuType: ['cafe'], category: 'sandwich', title: 'Grilled Sandwich', desc: 'Veg grilled sandwich.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60' },
    { id: 106, menuType: ['cafe'], category: 'sandwich', title: 'Paneer Grilled Sandwich', desc: 'Grilled sandwich with spicy paneer.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60' },

    // --- CAFE - PIZZA ---
    { id: 107, menuType: ['cafe'], category: 'pizza', title: 'Margherita Pizza', desc: 'Classic cheese and tomato sauce.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=500&q=60' },
    { id: 108, menuType: ['cafe'], category: 'pizza', title: 'Farmhouse Pizza', desc: 'Topped with capsicum, onion, and corn.', price: 230, isAvailable: true, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60' },

    // --- CAFE - DRINKS/COFFEE ---
    { id: 109, menuType: ['cafe'], category: 'coffee_tea', title: 'Hot Coffee', desc: 'Classic milk coffee.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=500&q=60' },
    { id: 110, menuType: ['cafe'], category: 'coffee_tea', title: 'Cold Coffee', desc: 'Chilled blended coffee.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=60' },
]
