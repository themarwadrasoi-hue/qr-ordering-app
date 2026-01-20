export const categories = [
    { id: 'all', name: 'All' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'rice', name: 'Rice' },
    { id: 'cold_drink', name: 'Cold Drink' },
    { id: 'quick_bite', name: 'Quick Bite' },
    { id: 'veg_starter', name: 'Veg Starter' },
    { id: 'roti', name: 'Roti' },
    { id: 'salad', name: 'Salad' },
    { id: 'non_veg_starter', name: 'Non Veg Starter' },
    { id: 'mains_chicken', name: 'Mains Chicken' },
    { id: 'mains_mutton', name: 'Mains Mutton' },
]

export const menuItems = [
    // BREAKFAST
    { id: 1, menuType: 'cafe', category: 'breakfast', title: 'Aloo Parantha + Curd + Pickle (2 Pcs)', desc: 'Homestyle aloo parantha.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 2, menuType: 'cafe', category: 'breakfast', title: 'Paneer Parantha + Curd + Pickle (2 Pcs)', desc: 'Stuffed paneer parantha.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
    { id: 3, menuType: 'cafe', category: 'breakfast', title: 'Plain Parantha + Curd + Pickle (2 Pcs)', desc: 'Simple plain parantha.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 4, menuType: 'cafe', category: 'breakfast', title: 'Pyaz Parantha + Curd + Pickle (2 Pcs)', desc: 'Onion stuffed parantha.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 5, menuType: 'cafe', category: 'breakfast', title: 'Gobhi Parantha + Curd + Pickle (2 Pcs)', desc: 'Cauliflower stuffed parantha.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
    { id: 6, menuType: 'cafe', category: 'breakfast', title: 'Poha', desc: 'Flatted rice with spices.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=60' },
    { id: 7, menuType: 'cafe', category: 'breakfast', title: 'Upma', desc: 'Semolina savory porridge.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1625944525543-ef3c89694b8e?auto=format&fit=crop&w=500&q=60' },
    { id: 8, menuType: 'cafe', category: 'breakfast', title: 'Omellete', desc: 'Classic egg preparation.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 9, menuType: 'cafe', category: 'breakfast', title: 'Butter Bread', desc: 'Slices of bread with butter.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 10, menuType: 'cafe', category: 'breakfast', title: 'Bread Jam', desc: 'Slices of bread with jam.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },

    // RICE
    { id: 11, menuType: 'restaurant', category: 'rice', title: 'Plain Rice', desc: 'Steamed basmati rice.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=60' },
    { id: 12, menuType: 'restaurant', category: 'rice', title: 'Shejwan Rice', desc: 'Spicy schezwan fried rice.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },

    // COLD DRINK
    { id: 13, menuType: 'cafe', category: 'cold_drink', title: 'All Cold Drinks Variety', desc: 'Assorted beverages.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60' },

    // QUICK BITE
    { id: 14, menuType: 'restaurant', category: 'quick_bite', title: 'Dal Tadka', desc: 'Yellow lentils with tempering.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 15, menuType: 'restaurant', category: 'quick_bite', title: 'Dal Fry', desc: 'Fried lentils with spices.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 16, menuType: 'restaurant', category: 'quick_bite', title: 'Mix Veg', desc: 'Seasonal mixed vegetables.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },
    { id: 17, menuType: 'restaurant', category: 'quick_bite', title: 'Chole Paneer', desc: 'Chickpeas with paneer cubes.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=60' },
    { id: 18, menuType: 'restaurant', category: 'quick_bite', title: 'Allo Chole', desc: 'Potato and chickpea curry.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=60' },
    { id: 19, menuType: 'restaurant', category: 'quick_bite', title: 'Besan Gatta', desc: 'Traditional Rajasthani curry.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=60' },
    { id: 20, menuType: 'restaurant', category: 'quick_bite', title: 'Sev Tamatar', desc: 'Spicy tomato curry with sev.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 21, menuType: 'restaurant', category: 'quick_bite', title: 'Palak Paneer', desc: 'Spinach and paneer curry.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
    { id: 22, menuType: 'restaurant', category: 'quick_bite', title: 'Paneer Bhurji', desc: 'Scrambled paneer with spices.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
    { id: 23, menuType: 'restaurant', category: 'quick_bite', title: 'Paneer Tika Masala', desc: 'Grilled paneer in rich gravy.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 24, menuType: 'restaurant', category: 'quick_bite', title: 'Matar Paneer', desc: 'Peas and paneer curry.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
    { id: 25, menuType: 'restaurant', category: 'quick_bite', title: 'Kadhal Paneer', desc: 'Paneer with peppers in gravy.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60' },
    { id: 26, menuType: 'restaurant', category: 'quick_bite', title: 'Dahi', desc: 'Curd / Yogurt.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },
    { id: 27, menuType: 'restaurant', category: 'quick_bite', title: 'Dahi Tadka', desc: 'Tempered yogurt.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },
    { id: 28, menuType: 'restaurant', category: 'quick_bite', title: 'Veg Raita', desc: 'Yogurt with vegetables.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },
    { id: 29, menuType: 'restaurant', category: 'quick_bite', title: 'Boondi Raita', desc: 'Yogurt with boondi.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },
    { id: 30, menuType: 'restaurant', category: 'quick_bite', title: 'Chaach', desc: 'Buttermilk.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },

    // QUICK BITION (Second column - Quick Bite 2)
    { id: 31, menuType: 'cafe', category: 'quick_bite', title: 'Plain Maggie', desc: 'Classic maggie noodles.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 32, menuType: 'cafe', category: 'quick_bite', title: 'Peri Peri Maggie', desc: 'Spicy peri peri noodles.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 33, menuType: 'cafe', category: 'quick_bite', title: 'Masala Maggie', desc: 'Spicy masala noodles.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 34, menuType: 'cafe', category: 'quick_bite', title: 'Vegitable Maggie', desc: 'Noodles with vegetables.', price: 110, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 35, menuType: 'cafe', category: 'quick_bite', title: 'Maggie With Cheese', desc: 'Cheese loaded noodles.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 36, menuType: 'cafe', category: 'quick_bite', title: 'Red Pasta', desc: 'Pasta in red sauce.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=60' },
    { id: 37, menuType: 'cafe', category: 'quick_bite', title: 'White Pasta', desc: 'Pasta in white sauce.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1645112481338-3c353986427a?auto=format&fit=crop&w=500&q=60' },

    // VEG STARTER
    { id: 38, menuType: 'restaurant', category: 'veg_starter', title: 'Crispy Corn', desc: 'Golden fried crispy corn.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 39, menuType: 'cafe', category: 'veg_starter', title: 'Chilli Potato', desc: 'Spicy chilli potato fries.', price: 170, isAvailable: true, image: 'https://images.unsplash.com/photo-1610450954843-ea956363ae16?auto=format&fit=crop&w=500&q=60' },
    { id: 40, menuType: 'cafe', category: 'veg_starter', title: 'Honey Chilly Potato', desc: 'Sweet and spicy potato.', price: 190, isAvailable: true, image: 'https://images.unsplash.com/photo-1610450954843-ea956363ae16?auto=format&fit=crop&w=500&q=60' },
    { id: 41, menuType: 'restaurant', category: 'veg_starter', title: 'Chilly Paneer', desc: 'Spicy cottage cheese cubes.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=60' },
    { id: 42, menuType: 'restaurant', category: 'veg_starter', title: 'Paneer Tikka', desc: 'Marinated grilled paneer.', price: 240, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 43, menuType: 'cafe', category: 'veg_starter', title: 'Hakka Noddle', desc: 'Chinese style noodles.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 44, menuType: 'cafe', category: 'veg_starter', title: 'Veg Chowmine', desc: 'Stir fry vegetables chowmine.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },

    // ROTI
    { id: 45, menuType: 'restaurant', category: 'roti', title: 'Tawa Roti Plain', desc: 'Simple handmade roti.', price: 10, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 46, menuType: 'restaurant', category: 'roti', title: 'Tawa Roti Butter', desc: 'Buttered handmade roti.', price: 12, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 47, menuType: 'restaurant', category: 'roti', title: 'Tandoori Roti Plain', desc: 'Wheat flour clay oven roti.', price: 15, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 48, menuType: 'restaurant', category: 'roti', title: 'Tandoori Roti Butter', desc: 'Buttered clay oven roti.', price: 18, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 49, menuType: 'hut', category: 'roti', title: 'Baati', desc: 'Hard wheat flour balls.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 50, menuType: 'restaurant', category: 'roti', title: 'Makke Ki Roti', desc: 'Corn flour flatbread.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 51, menuType: 'restaurant', category: 'roti', title: 'Bajra Ki Roti', desc: 'Millet flour flatbread.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },

    // SALAD
    { id: 52, menuType: 'restaurant', category: 'salad', title: 'Green Salad', desc: 'Fresh cucumber and tomato.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },

    // NON VEG STARTER
    { id: 53, menuType: 'restaurant', category: 'non_veg_starter', title: 'Grilled Chicken', desc: 'Grilled aromatic chicken.', price: 350, isAvailable: true, variants: { half: 350, full: 650 }, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=60' },
    { id: 54, menuType: 'restaurant', category: 'non_veg_starter', title: 'Grilled Fish', desc: 'Grilled herb infused fish.', price: 300, isAvailable: true, variants: { half: 300, full: 550 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=60' },
    { id: 55, menuType: 'restaurant', category: 'non_veg_starter', title: 'Fish Fry', desc: 'Traditional fried fish.', price: 300, isAvailable: true, variants: { half: 300, full: 550 }, image: 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=500&q=60' },
    { id: 56, menuType: 'restaurant', category: 'non_veg_starter', title: 'Chicken Fry', desc: 'Classic fried chicken.', price: 350, isAvailable: true, variants: { half: 350, full: 650 }, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 57, menuType: 'restaurant', category: 'non_veg_starter', title: 'Chicken Fry Boneless', desc: 'Fried boneless chunks.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1562967960-f6551061c28c?auto=format&fit=crop&w=500&q=60' },

    // MAINS CHICKEN
    { id: 58, menuType: 'restaurant', category: 'mains_chicken', title: 'Chicken Curry', desc: 'Mildly spiced chicken curry.', price: 350, isAvailable: true, variants: { half: 350, full: 700 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 59, menuType: 'restaurant', category: 'mains_chicken', title: 'Chicken Masala', desc: 'Roasted chicken in masala.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=60' },
    { id: 60, menuType: 'restaurant', category: 'mains_chicken', title: 'Kadhai Chicken', desc: 'Chicken in kadhai gravy.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1605587784382-7c37f61e8881?auto=format&fit=crop&w=500&q=60' },
    { id: 61, menuType: 'restaurant', category: 'mains_chicken', title: 'Butter Chicken', desc: 'Rich and creamy chicken.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 62, menuType: 'hut', category: 'mains_chicken', title: 'Handi Chicken Special', desc: 'Chef special handi chicken.', price: 700, isAvailable: true, variants: { half: 700, full: 1400 }, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=60' },

    // MAINS MUTTON
    { id: 63, menuType: 'restaurant', category: 'mains_mutton', title: 'Mutton Curry', desc: 'Spiced mutton curry.', price: 600, isAvailable: true, variants: { half: 600, full: 1150 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 64, menuType: 'restaurant', category: 'mains_mutton', title: 'Masala Mutton', desc: 'Thick mutton masala gravy.', price: 700, isAvailable: true, variants: { half: 700, full: 1350 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 65, menuType: 'hut', category: 'mains_mutton', title: 'Handi Mutton Special', desc: 'Slow cooked mutton delicacy.', price: 900, isAvailable: true, variants: { half: 900, full: 1750 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 66, menuType: 'restaurant', category: 'mains_mutton', title: 'Fish Curry', desc: 'Coast style fish curry.', price: 300, isAvailable: true, variants: { half: 300, full: 600 }, image: 'https://images.unsplash.com/photo-1544973327-04c9cb2a3536?auto=format&fit=crop&w=500&q=60' },
    { id: 67, menuType: 'restaurant', category: 'mains_mutton', title: 'Egg Curry', desc: 'Boiled egg curry.', price: 120, isAvailable: true, variants: { half: 120, full: 200 }, image: 'https://images.unsplash.com/photo-1506828574167-a0063229b43d?auto=format&fit=crop&w=500&q=60' },
    { id: 68, menuType: 'restaurant', category: 'mains_mutton', title: 'Boiled Egg', desc: 'Simply boiled eggs.', price: 30, isAvailable: true, image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=500&q=60' },
    { id: 69, menuType: 'restaurant', category: 'mains_mutton', title: 'Egg Bhurji', desc: 'Indian style egg scramble.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1625206263548-e86638d011c7?auto=format&fit=crop&w=500&q=60' },
    { id: 70, menuType: 'restaurant', category: 'mains_mutton', title: 'Boiled Egg Bhurji', desc: 'Shredded boiled eggs bhurji.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1625206263548-e86638d011c7?auto=format&fit=crop&w=500&q=60' },
]
