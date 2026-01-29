// بيانات الروايات (غيرها حسب رواياتك الحقيقية)
const novels = [
  {
    id: 1,
    title: "الخيميائي",
    author: "باولو كويلو",
    price: 65,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d4679?w=400",
    description: "رواية ملهمة عن السعي وراء الحلم"
  },
  {
    id: 2,
    title: "1984",
    author: "جورج أورويل",
    price: 55,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    description: "رواية ديستوبية كلاسيكية"
  },
  {
    id: 3,
    title: "ألف ليلة وليلة",
    author: "ترجمة عربية",
    price: 120,
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    description: "قصص السندباد والعلاء الدين وغيرها"
  },
  // أضف المزيد هنا...
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// عرض الروايات
function displayNovels() {
  const container = document.getElementById('products-list');
  if (!container) return;

  container.innerHTML = '';

  novels.forEach(novel => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${novel.cover}" alt="${novel.title}">
      <div class="card-body">
        <h3>${novel.title}</h3>
        <p>${novel.author}</p>
        <div class="price">${novel.price} ج.م</div>
        <button class="btn" onclick="addToCart(${novel.id})">أضف إلى السلة</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// إضافة إلى السلة
function addToCart(id) {
  const novel = novels.find(n => n.id === id);
  if (!novel) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    alert('الرواية موجودة بالفعل في السلة!');
    return;
  }

  cart.push({ ...novel, quantity: 1 });
  saveCart();
  updateCartCount();
  alert('تم إضافة الرواية إلى السلة!');
}

// حفظ السلة
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = cart.length;
  }
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  displayNovels();
  updateCartCount();
});