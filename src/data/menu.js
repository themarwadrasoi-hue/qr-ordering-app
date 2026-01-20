export const categories = [
    { id: 'all', name: 'All' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'sandwich', name: 'Sandwich' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'maggie', name: 'Maggie' },
    { id: 'coffee_tea', name: 'Coffee & Tea' },
    { id: 'fries_sides', name: 'Fries & Sides' },
    { id: 'rolls', name: 'Rolls' },
    { id: 'noodles', name: 'Noodles' },
    { id: 'pakoda', name: 'Pakoda' },
    { id: 'chinese_cafe', name: 'Chinese Snacks' },
    { id: 'paneer_tikka_cafe', name: 'Paneer Tikka' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'rice', name: 'Rice' },
    { id: 'veg_starter', name: 'Veg Starter' },
    { id: 'veg_mains', name: 'Veg Main Course' },
    { id: 'roti', name: 'Roti' },
    { id: 'salad', name: 'Salad' },
    { id: 'non_veg_starter', name: 'Non Veg Starter' },
    { id: 'mains_chicken', name: 'Mains Chicken' },
    { id: 'mains_mutton', name: 'Mains Mutton' },
    { id: 'mains_egg_fish', name: 'Eggs & Fish' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'hut_specials', name: 'Hut Specials' },
    { id: 'hut_eggs', name: 'Hut Eggs' },
]

export const menuItems = [
    // CAFE - BURGERS
    { id: 101, menuType: ['cafe', 'restaurant'], category: 'burgers', title: 'Plain aloo tikki burger', desc: 'Crispy potato patty burger.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=60' },
    { id: 102, menuType: ['cafe', 'restaurant'], category: 'burgers', title: 'cheese burger', desc: 'Veg burger with extra cheese slice.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60' },
    { id: 139, menuType: ['cafe', 'restaurant'], category: 'burgers', title: 'egg burger', desc: 'Classic burger with a fried egg.', price: 110, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 140, menuType: ['cafe', 'restaurant'], category: 'burgers', title: 'double tiki burger', desc: 'Double patty burger for extra hunger.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=60' },

    // CAFE - SANDWICH
    { id: 103, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'Grilled sandwich', desc: 'Veg grilled sandwich.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60' },
    { id: 104, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'cheese corn sandwich', desc: 'Sweet corn and melted cheese.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=500&q=60' },
    { id: 133, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'chese garlic bread', desc: 'Garlic bread with melted cheese.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=60' },
    { id: 134, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'periperi sandwich', desc: 'Spicy peri peri flavored sandwich.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60' },
    { id: 135, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'Plain Sandwich', desc: 'Simple veg sandwich.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60' },
    { id: 136, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'Paneer grilled sandwich', desc: 'Grilled sandwich with spicy paneer.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60' },
    { id: 137, menuType: ['cafe', 'restaurant'], category: 'sandwich', title: 'egg Sandwich', desc: 'Classic egg sandwich.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },

    // CAFE - PIZZA
    { id: 105, menuType: ['cafe', 'restaurant'], category: 'pizza', title: 'Margherita Pizza', desc: 'Classic cheese and tomato sauce.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=500&q=60' },
    { id: 106, menuType: ['cafe', 'restaurant'], category: 'pizza', title: 'Farmhouse Pizza', desc: 'Topped with capsicum, onion, and corn.', price: 230, isAvailable: true, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60' },

    // CAFE - PASTA
    { id: 107, menuType: ['cafe', 'restaurant'], category: 'pasta', title: 'White Pasta', desc: 'Penne in creamy alfredo sauce.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1645112481338-3c353986427a?auto=format&fit=crop&w=500&q=60' },
    { id: 108, menuType: ['cafe', 'restaurant'], category: 'pasta', title: 'Red Pasta', desc: 'Penne in spicy arabiata sauce.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=60' },

    // CAFE - MAGGIE
    { id: 109, menuType: ['cafe', 'restaurant'], category: 'maggie', title: 'Plain maggie', desc: 'Classic simple maggie.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 110, menuType: ['cafe', 'restaurant'], category: 'maggie', title: 'Peri peri maggie', desc: 'Spicy peri peri flavored noodles.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 130, menuType: ['cafe', 'restaurant'], category: 'maggie', title: 'Masala maggie', desc: 'Classic spicy masala maggie.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 131, menuType: ['cafe', 'restaurant'], category: 'maggie', title: 'Vegitable maggie', desc: 'Maggie with mixed vegetables.', price: 110, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },
    { id: 132, menuType: ['cafe', 'restaurant'], category: 'maggie', title: 'Maggie with cheese', desc: 'Cheese loaded noodles.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1612927653241-cd47b198f1f5?auto=format&fit=crop&w=500&q=60' },

    // CAFE - COFFEE & TEA
    { id: 111, menuType: ['cafe', 'restaurant'], category: 'coffee_tea', title: 'Coffee hot', desc: 'Classic milk coffee.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=500&q=60' },
    { id: 112, menuType: ['cafe', 'restaurant'], category: 'coffee_tea', title: 'Tea + Toast', desc: 'Masala tea with buttered toast.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=60' },
    { id: 113, menuType: ['cafe', 'restaurant'], category: 'coffee_tea', title: 'Cold coffee', desc: 'Chilled blended coffee.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=60' },
    { id: 123, menuType: ['cafe', 'restaurant'], category: 'coffee_tea', title: 'Lemon tea', desc: 'Refreshing lemon tea.', price: 30, isAvailable: true, image: 'https://images.unsplash.com/photo-1544787210-22ed1303837e?auto=format&fit=crop&w=500&q=60' },
    { id: 124, menuType: ['cafe', 'restaurant'], category: 'coffee_tea', title: 'Ginger honey tea', desc: 'Ginger and honey infused tea.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1544787210-22ed1303837e?auto=format&fit=crop&w=500&q=60' },

    // CAFE - FRIES & SIDES
    { id: 114, menuType: ['cafe', 'restaurant'], category: 'fries_sides', title: 'french fries', desc: 'Classic salted potato fries.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=60' },
    { id: 115, menuType: ['cafe', 'restaurant'], category: 'fries_sides', title: 'peri peri fries', desc: 'Fries with spicy peri peri seasoning.', price: 130, isAvailable: true, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=60' },
    { id: 138, menuType: ['cafe', 'restaurant'], category: 'fries_sides', title: 'cheese fries', desc: 'Fries topped with melted cheese sauce.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=500&q=60' },

    // CAFE - ROLLS
    { id: 141, menuType: ['cafe', 'restaurant'], category: 'rolls', title: 'chicken roll', desc: 'Spiced chicken wrapped in a flatbread.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60' },
    { id: 142, menuType: ['cafe', 'restaurant'], category: 'rolls', title: 'egg roll', desc: 'Egg omelette wrap.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c81?auto=format&fit=crop&w=500&q=60' },
    { id: 143, menuType: ['cafe', 'restaurant'], category: 'rolls', title: 'veg roll', desc: 'Mixed vegetable wrap.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60' },
    { id: 144, menuType: ['cafe', 'restaurant'], category: 'rolls', title: 'veg paneer roll', desc: 'Grilled paneer wrap with spice.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60' },
    { id: 145, menuType: ['cafe', 'restaurant'], category: 'rolls', title: 'cheese corn roll', desc: 'Melted cheese and corn wrap.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c81?auto=format&fit=crop&w=500&q=60' },
    { id: 116, menuType: ['cafe', 'restaurant'], category: 'rolls', title: 'spring roll', desc: 'Crispy fried vegetable rolls (2 Pcs).', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60' },

    // CAFE - NOODLES
    { id: 146, menuType: ['cafe', 'restaurant'], category: 'noodles', title: 'hakka noodels', desc: 'Classic hakka style noodles.', price: 130, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 147, menuType: ['cafe', 'restaurant'], category: 'noodles', title: 'veg chowmine', desc: 'Stir fried vegetable chowmine.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 148, menuType: ['cafe', 'restaurant'], category: 'noodles', title: 'shejwan noodel', desc: 'Spicy schezwan noodles.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 149, menuType: ['cafe', 'restaurant'], category: 'noodles', title: 'veg paneer noodels', desc: 'Noodles with fresh paneer cubes.', price: 170, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 150, menuType: ['cafe', 'restaurant'], category: 'noodles', title: 'egg noodels', desc: 'Noodles with scrambled eggs.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 151, menuType: ['cafe', 'restaurant'], category: 'noodles', title: 'chicken noodels', desc: 'Noodles with shredded chicken.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },

    // CAFE - PAKODA
    { id: 152, menuType: ['cafe', 'restaurant'], category: 'pakoda', title: 'paneer pakode', desc: 'Deep fried cottage cheese fritters.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=60' },
    { id: 153, menuType: ['cafe', 'restaurant'], category: 'pakoda', title: 'veg pakode', desc: 'Mixed vegetable deep fried fritters.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=60' },
    { id: 154, menuType: ['cafe', 'restaurant'], category: 'pakoda', title: 'egg pakode', desc: 'Deep fried egg fritters.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=60' },

    // CAFE - CHINESE
    { id: 117, menuType: ['cafe', 'restaurant'], category: 'chinese_cafe', title: 'Veg Manchurian', desc: 'Savoury veg balls in glaze.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff667d?auto=format&fit=crop&w=500&q=60' },
    { id: 118, menuType: ['cafe', 'restaurant'], category: 'chinese_cafe', title: 'Veg Chowmein', desc: 'Classic stir-fried noodles.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },
    { id: 119, menuType: ['cafe', 'restaurant'], category: 'chinese_cafe', title: 'Hakka Noodles', desc: 'Mildly spiced chinese noodles.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60' },

    // CAFE - SPECIALS
    { id: 120, menuType: ['cafe', 'restaurant'], category: 'paneer_tikka_cafe', title: 'Paneer Tikka', desc: 'Grilled marinated cottage cheese.', price: 230, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },

    // CAFE - DRINKS
    { id: 125, menuType: ['cafe', 'restaurant'], category: 'drinks', title: 'Coke', desc: '300ml chilled can/bottle.', price: 35, isAvailable: true, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=500&q=60' },
    { id: 126, menuType: ['cafe', 'restaurant'], category: 'drinks', title: 'Thumps up', desc: '300ml chilled can/bottle.', price: 35, isAvailable: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60' },
    { id: 127, menuType: ['cafe', 'restaurant'], category: 'drinks', title: 'Dew', desc: '300ml chilled can/bottle.', price: 35, isAvailable: true, image: 'https://images.unsplash.com/photo-1541491008689-b5d3c6615e8e?auto=format&fit=crop&w=500&q=60' },
    { id: 128, menuType: ['cafe', 'restaurant'], category: 'drinks', title: 'Sprite', desc: '300ml chilled can/bottle.', price: 35, isAvailable: true, image: 'https://images.unsplash.com/photo-1625772290748-39126cdd9fe9?auto=format&fit=crop&w=500&q=60' },
    { id: 129, menuType: ['cafe', 'restaurant'], category: 'drinks', title: 'Fanta', desc: '300ml chilled can/bottle.', price: 35, isAvailable: true, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=500&q=60' },
    { id: 122, menuType: ['cafe', 'restaurant'], category: 'drinks', title: 'Lassi', desc: 'Thick sweet curd drink.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60' },

    // NON-VEG STARTERS (Restaurant & Hut)
    { id: 53, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Grilled chicken', desc: 'Grilled aromatic chicken.', price: 350, isAvailable: true, variants: { half: 350, full: 650 }, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=60' },
    { id: 54, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Grilled Fish', desc: 'Grilled herb infused fish.', price: 300, isAvailable: true, variants: { half: 300, full: 550 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=60' },
    { id: 55, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Fish Fry', desc: 'Traditional fried fish.', price: 300, isAvailable: true, variants: { half: 300, full: 550 }, image: 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=500&q=60' },
    { id: 56, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Chicken Fry', desc: 'Classic fried chicken.', price: 350, isAvailable: true, variants: { half: 350, full: 650 }, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 57, menuType: ['restaurant', 'hut'], category: 'non_veg_starter', title: 'Chicken fry boneless', desc: 'Fried boneless chunks.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1562967960-f6551061c28c?auto=format&fit=crop&w=500&q=60' },

    // RESTAURANT - BREAKFAST
    { id: 1, menuType: 'restaurant', category: 'breakfast', title: 'Aloo Parantha 2 pics with curd and pickel', desc: 'Homestyle aloo parantha.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 194, menuType: 'restaurant', category: 'breakfast', title: 'Paneer Parantha 2 pics with curd and pickel', desc: 'Stuffed paneer parantha.', price: 150, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 195, menuType: 'restaurant', category: 'breakfast', title: 'Plain Parantha 2 pics with curd and pickel', desc: 'Simple plain parantha.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 196, menuType: 'restaurant', category: 'breakfast', title: 'Pyaz Parantha 2 pics with curd and pickel', desc: 'Stuffed onion parantha.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 197, menuType: 'restaurant', category: 'breakfast', title: 'Gobhi Parantha 2 pics with curd and pickel', desc: 'Stuffed cauliflower parantha.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132646522-6321262d1c6b?auto=format&fit=crop&w=500&q=60' },
    { id: 198, menuType: 'restaurant', category: 'breakfast', title: 'Poha', desc: 'Flattened rice with veggies and peanuts.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 199, menuType: 'restaurant', category: 'breakfast', title: 'Upma', desc: 'Savoury semolina porridge.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 200, menuType: 'restaurant', category: 'breakfast', title: 'Omellete', desc: 'Double egg fluffy omelette.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&w=500&q=60' },
    { id: 201, menuType: 'restaurant', category: 'breakfast', title: 'butter bread', desc: 'Toasted bread with butter.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 202, menuType: 'restaurant', category: 'breakfast', title: 'bread jam', desc: 'Toasted bread with fruit jam.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 11, menuType: 'restaurant', category: 'rice', title: 'Plain Rice', desc: 'Steamed basmati rice.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=60' },
    { id: 12, menuType: 'restaurant', category: 'rice', title: 'Shejwan Rice', desc: 'Spicy schezwan fried rice.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },
    { id: 38, menuType: 'restaurant', category: 'veg_starter', title: 'Crispy Corn', desc: 'Golden fried crispy corn.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1626082927389-d126d24f0c99?auto=format&fit=crop&w=500&q=60' },
    { id: 45, menuType: 'restaurant', category: 'roti', title: 'Tawa Roti Plain', desc: 'Simple handmade roti.', price: 10, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 52, menuType: 'restaurant', category: 'salad', title: 'Green Salad', desc: 'Fresh cucumber and tomato.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },
    // MAINS CHICKEN
    { id: 58, menuType: 'restaurant', category: 'mains_chicken', title: 'Chicken Curry', desc: 'Classic chicken curry.', price: 380, isAvailable: true, variants: { half: 380, full: 700 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 185, menuType: 'restaurant', category: 'mains_chicken', title: 'chicken masala', desc: 'Spicy chicken masala.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 186, menuType: 'restaurant', category: 'mains_chicken', title: 'kadhai chicken', desc: 'Chicken cooked in kadhai gravy.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 187, menuType: 'restaurant', category: 'mains_chicken', title: 'butter chicken', desc: 'Creamy tomato butter chicken.', price: 400, isAvailable: true, variants: { half: 400, full: 750 }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60' },
    { id: 62, menuType: ['restaurant', 'hut'], category: 'mains_chicken', title: 'Handi chicken Special', desc: 'Slow cooked handi chicken.', price: 700, isAvailable: true, variants: { half: 700, full: 1400 }, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=60' },

    // MAINS MUTTON
    { id: 63, menuType: 'restaurant', category: 'mains_mutton', title: 'Mutton Curry', desc: 'Classic mutton curry.', price: 600, isAvailable: true, variants: { half: 600, full: 1150 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 188, menuType: 'restaurant', category: 'mains_mutton', title: 'Masala mutton', desc: 'Spicy mutton masala.', price: 700, isAvailable: true, variants: { half: 700, full: 1350 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },
    { id: 65, menuType: ['restaurant', 'hut'], category: 'mains_mutton', title: 'Handi mutton Special', desc: 'Slow cooked mutton delicacy.', price: 900, isAvailable: true, variants: { half: 900, full: 1750 }, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=60' },

    // MAINS EGGS & FISH
    { id: 189, menuType: 'restaurant', category: 'mains_egg_fish', title: 'Fish Curry', desc: 'Traditional fish curry.', price: 300, isAvailable: true, variants: { half: 300, full: 600 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=60' },
    { id: 190, menuType: ['cafe', 'restaurant', 'hut'], category: 'mains_egg_fish', title: 'Egg Curry', desc: 'Spiced egg curry with aromatic gravy.', price: 150, isAvailable: true, variants: { half: 150, full: 280 }, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 191, menuType: 'restaurant', category: 'mains_egg_fish', title: 'Boiled Egg', desc: 'Plain boiled eggs (2 Pcs).', price: 30, isAvailable: true, image: 'https://images.unsplash.com/photo-1582722872445-44c56bb62991?auto=format&fit=crop&w=500&q=60' },
    { id: 192, menuType: 'restaurant', category: 'mains_egg_fish', title: 'Egg bhurji', desc: 'Spiced scrambled eggs.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 193, menuType: 'restaurant', category: 'mains_egg_fish', title: 'boiled Egg bhurji', desc: 'Scrambled boiled eggs with spices.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },

    // VEG MAIN COURSE
    { id: 155, menuType: 'restaurant', category: 'veg_mains', title: 'Dal Tadka', desc: 'Yellow dal with spicy tempering.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 156, menuType: 'restaurant', category: 'veg_mains', title: 'Dal fry', desc: 'Traditional fried dal.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 157, menuType: 'restaurant', category: 'veg_mains', title: 'mix veg', desc: 'Assorted seasonal vegetables.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },
    { id: 158, menuType: 'restaurant', category: 'veg_mains', title: 'chole paneer', desc: 'Chickpeas and cottage cheese curry.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 159, menuType: 'restaurant', category: 'veg_mains', title: 'allo chole', desc: 'Potato and chickpeas curry.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 160, menuType: 'restaurant', category: 'veg_mains', title: 'besan gatta', desc: 'Traditional Rajasthani gatta curry.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 161, menuType: 'restaurant', category: 'veg_mains', title: 'sev tamatar', desc: 'Tangy tomato curry with sev.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1582576163530-6d4497622602?auto=format&fit=crop&w=500&q=60' },
    { id: 162, menuType: 'restaurant', category: 'veg_mains', title: 'palak paneer', desc: 'Spinach and cottage cheese curry.', price: 140, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 163, menuType: 'restaurant', category: 'veg_mains', title: 'paneer bhurji', desc: 'Scrambled cottage cheese with spices.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 164, menuType: 'restaurant', category: 'veg_mains', title: 'paneer tika masala', desc: 'Grilled paneer in spicy gravy.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 165, menuType: 'restaurant', category: 'veg_mains', title: 'Matar paneer', desc: 'Green peas and cottage cheese curry.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 166, menuType: 'restaurant', category: 'veg_mains', title: 'Kadhai paneer', desc: 'Paneer cooked in a traditional wok.', price: 200, isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8ad883dc6d?auto=format&fit=crop&w=500&q=60' },
    { id: 167, menuType: 'restaurant', category: 'veg_mains', title: 'Dahi', desc: 'Fresh plain curd.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 168, menuType: 'restaurant', category: 'veg_mains', title: 'dahi tadka', desc: 'Curd with aromatic mustard tempering.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 169, menuType: 'restaurant', category: 'veg_mains', title: 'veg raita', desc: 'Chilled curd with mixed veggies.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 170, menuType: 'restaurant', category: 'veg_mains', title: 'bondi raita', desc: 'Chilled curd with boondi drops.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },
    { id: 171, menuType: 'restaurant', category: 'veg_mains', title: 'chaach', desc: 'Refreshing buttermilk with spices.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1502462041640-b3d78a8151d0?auto=format&fit=crop&w=500&q=60' },

    // SALAD
    { id: 52, menuType: 'restaurant', category: 'salad', title: 'green salad', desc: 'Fresh cucumber and tomato.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },

    // ROTI
    { id: 45, menuType: 'restaurant', category: 'roti', title: 'Tawa roti plain', desc: 'Simple handmade roti.', price: 10, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 172, menuType: 'restaurant', category: 'roti', title: 'Tawa roti butter', desc: 'Buttered handmade roti.', price: 12, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 173, menuType: 'restaurant', category: 'roti', title: 'Tandoori roti plain', desc: 'Clay oven baked bread.', price: 15, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 174, menuType: 'restaurant', category: 'roti', title: 'Tandoori roti butter', desc: 'Buttered clay oven bread.', price: 18, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 175, menuType: 'restaurant', category: 'roti', title: 'Baati', desc: 'Hard wheat flour bread ball.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 176, menuType: 'restaurant', category: 'roti', title: 'Makke ki roti', desc: 'Maize flour flatbread.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },
    { id: 177, menuType: 'restaurant', category: 'roti', title: 'Bajre ki roti', desc: 'Pearl millet flatbread.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa8024c1?auto=format&fit=crop&w=500&q=60' },

    // RICE
    { id: 11, menuType: 'restaurant', category: 'rice', title: 'plain rice', desc: 'Steamed basmati rice.', price: 50, isAvailable: true, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=60' },
    { id: 12, menuType: 'restaurant', category: 'rice', title: 'shejwan rice', desc: 'Spicy schezwan fried rice.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },
    { id: 178, menuType: 'restaurant', category: 'rice', title: 'jeera rice', desc: 'Cumin flavored basmati rice.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=60' },
    { id: 179, menuType: 'restaurant', category: 'rice', title: 'panner fried rice', desc: 'Fried rice with paneer chunks.', price: 120, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },
    { id: 180, menuType: 'restaurant', category: 'rice', title: 'fried rice', desc: 'Simple veg fried rice.', price: 100, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },
    { id: 181, menuType: 'restaurant', category: 'rice', title: 'chicken fried rice', desc: 'Fried rice with chicken bits.', price: 180, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },
    { id: 182, menuType: 'restaurant', category: 'rice', title: 'egg fried rice', desc: 'Fried rice with scrambled egg.', price: 160, isAvailable: true, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=60' },

    // DESERT
    { id: 183, menuType: 'restaurant', category: 'dessert', title: 'ice cream 1 Scope', desc: 'Single scoop of assorted flavors.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=500&q=60' },
    { id: 184, menuType: 'restaurant', category: 'dessert', title: 'gulab jamun 2 piece', desc: 'Soft cottage cheese dumplings in syrup.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=500&q=60' },

    // HUT SPECIALS
    { id: 203, menuType: 'hut', category: 'hut_specials', title: 'Water', desc: '1L Chilled mineral water.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=60' },
    { id: 204, menuType: 'hut', category: 'hut_specials', title: 'GLASS', desc: 'Disposable glass set.', price: 5, isAvailable: true, image: 'https://images.unsplash.com/photo-1574633911953-398f49a03529?auto=format&fit=crop&w=500&q=60' },
    { id: 205, menuType: 'hut', category: 'hut_specials', title: 'PAPAD', desc: 'Roasted plain papad.', price: 20, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 206, menuType: 'hut', category: 'hut_specials', title: 'MASALA PAPAD', desc: 'Papad topped with spicy veg mix.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 207, menuType: 'hut', category: 'hut_specials', title: 'PEANUT MASALA', desc: 'Tangy roasted peanuts with veggies.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=500&q=60' },
    { id: 208, menuType: 'hut', category: 'hut_specials', title: 'CHANA MASALA', desc: 'Spiced roasted chickpeas.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 209, menuType: 'hut', category: 'hut_specials', title: 'MATAR MASALA', desc: 'Spiced roasted peas.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 210, menuType: 'hut', category: 'hut_specials', title: 'DAAL MASALA', desc: 'Spiced roasted dal snacks.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60' },
    { id: 211, menuType: 'hut', category: 'hut_specials', title: 'NAMKEEN MASALA', desc: 'Mixed namkeen with onion and tomato.', price: 70, isAvailable: true, image: 'https://images.unsplash.com/photo-1601050638917-3f30f2424bf3?auto=format&fit=crop&w=500&q=60' },
    { id: 212, menuType: 'hut', category: 'hut_specials', title: 'GREEN SALAD', desc: 'Fresh cucumber, carrot and onion.', price: 60, isAvailable: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60' },

    // HUT EGGS
    { id: 213, menuType: 'hut', category: 'hut_eggs', title: 'BOILED EGG (2 piece Egg)', desc: 'Plain boiled eggs served with salt and pepper.', price: 30, isAvailable: true, image: 'https://images.unsplash.com/photo-1582722872445-44c56bb62991?auto=format&fit=crop&w=500&q=60' },
    { id: 214, menuType: 'hut', category: 'hut_eggs', title: 'EGG FRY (2 piece Egg)', desc: 'Lightly fried eggs with spices.', price: 40, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=60' },
    { id: 215, menuType: 'hut', category: 'hut_eggs', title: 'EGG BHURJI (2 piece Egg)', desc: 'Spiced scrambled eggs.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 216, menuType: 'hut', category: 'hut_eggs', title: 'BOILED EGG BHURJI (2 piece Egg)', desc: 'Scrambled boiled eggs with masala.', price: 80, isAvailable: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=60' },
    { id: 217, menuType: 'hut', category: 'hut_eggs', title: 'OMELLETE (2 piece Egg)', desc: 'Hot fluffy double egg omelette.', price: 90, isAvailable: true, image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&w=500&q=60' },
]
