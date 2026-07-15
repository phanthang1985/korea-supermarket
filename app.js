const products = [
  {id:1,name:"Tinh chất hồng sâm Premium 6 năm",category:"Nhân sâm",price:1290000,old:1490000,badge:"Bán chạy",tone:"ruby",form:"BOX"},
  {id:2,name:"Cao hồng sâm cô đặc Gold Extract",category:"Nhân sâm",price:2150000,old:2390000,badge:"-10%",tone:"gold",form:"JAR"},
  {id:3,name:"Nước hồng sâm Daily Balance",category:"Nhân sâm",price:590000,badge:"Mới",tone:"green",form:"PACK"},
  {id:4,name:"Tinh chất đông trùng hạ thảo",category:"Đông trùng",price:1680000,old:1890000,badge:"Ưu đãi",tone:"amber",form:"BOX"},
  {id:5,name:"Cao linh chi Premium 2 hũ",category:"Linh chi",price:1150000,badge:"5.0 ★",tone:"ivory",form:"JAR"},
  {id:6,name:"Giftset An Khang – Hồng sâm",category:"Quà sức khỏe",price:2850000,badge:"Quà tặng",tone:"navy",form:"GIFT"},
  {id:7,name:"Hồng sâm lát tẩm mật ong",category:"Nhân sâm",price:990000,badge:"Yêu thích",tone:"rose",form:"PACK"},
  {id:8,name:"Viên linh chi & vitamin tổng hợp",category:"Linh chi",price:780000,badge:"Tiện dụng",tone:"forest",form:"BOX"}
];
const categories=["Tất cả","Nhân sâm","Đông trùng","Linh chi","Quà sức khỏe"];
let active="Tất cả", query="", cart=[];
const money=v=>new Intl.NumberFormat("vi-VN").format(v)+"đ";
const grid=document.querySelector("#productGrid"), filters=document.querySelector("#filterRow"), count=document.querySelector("#cartCount"), overlay=document.querySelector("#cartOverlay"), cartContent=document.querySelector("#cartContent");

function renderFilters(){filters.innerHTML=categories.map(c=>`<button class="${active===c?'active':''}" data-category="${c}">${c}</button>`).join("");}
function renderProducts(){const visible=products.filter(p=>(active==="Tất cả"||p.category===active)&&p.name.toLowerCase().includes(query.toLowerCase()));grid.innerHTML=visible.map(p=>`<article class="productCard"><div class="productVisual ${p.tone}"><span class="badge">${p.badge}</span><div class="package ${p.form.toLowerCase()}"><small>KOREA SUPERMARKET</small><b>${p.form}</b><em>PREMIUM KOREA</em></div><button class="heart" aria-label="Yêu thích ${p.name}">♡</button></div><div class="productInfo"><small>${p.category}</small><h3>${p.name}</h3><div class="rating">★★★★★ <span>(12)</span></div><div class="price"><b>${money(p.price)}</b>${p.old?`<del>${money(p.old)}</del>`:""}</div><button data-add="${p.id}">Thêm vào giỏ</button></div></article>`).join("");document.querySelector("#noResults").hidden=visible.length>0;}
function renderCart(){count.textContent=cart.length;if(!cart.length){cartContent.innerHTML='<div class="emptyCart">🛍️<b>Chưa có sản phẩm</b><p>Hãy khám phá các sản phẩm Hàn Quốc được tuyển chọn.</p></div>';return;}cartContent.innerHTML=`<div class="cartItems">${cart.map((id,i)=>{const p=products.find(x=>x.id===id);return `<div><span class="miniPack ${p.tone}">KS</span><p><b>${p.name}</b><small>${money(p.price)}</small></p><button data-remove="${i}" aria-label="Xóa sản phẩm">×</button></div>`}).join("")}<div class="cartTotal"><span>Tạm tính</span><b>${money(cart.reduce((s,id)=>s+products.find(p=>p.id===id).price,0))}</b></div></div>`;}
function openCart(){renderCart();overlay.hidden=false;document.body.style.overflow="hidden";}function closeCart(){overlay.hidden=true;document.body.style.overflow="";}
filters.addEventListener("click",e=>{if(e.target.dataset.category){active=e.target.dataset.category;renderFilters();renderProducts();}});
grid.addEventListener("click",e=>{const id=Number(e.target.dataset.add);if(id){cart.push(id);openCart();}});
cartContent.addEventListener("click",e=>{if(e.target.dataset.remove!==undefined){cart.splice(Number(e.target.dataset.remove),1);renderCart();}});
document.querySelectorAll("[data-filter]").forEach(el=>el.addEventListener("click",()=>{active=el.dataset.filter;renderFilters();renderProducts();}));
document.querySelector("#searchButton").addEventListener("click",()=>{query=document.querySelector("#searchInput").value.trim();const note=document.querySelector("#searchNote");note.hidden=!query;note.textContent=query?`Kết quả tìm kiếm cho “${query}”`:"";renderProducts();document.querySelector("#products").scrollIntoView({behavior:"smooth"});});
document.querySelector("#searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")document.querySelector("#searchButton").click();});
document.querySelector("#cartButton").addEventListener("click",openCart);document.querySelector("#closeCart").addEventListener("click",closeCart);document.querySelector("#continueShopping").addEventListener("click",()=>{closeCart();document.querySelector("#products").scrollIntoView({behavior:"smooth"});});overlay.addEventListener("click",e=>{if(e.target===overlay)closeCart();});
document.querySelector("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();e.target.reset();alert("Cảm ơn bạn đã đăng ký nhận tin từ Korea Supermarket!");});
renderFilters();renderProducts();renderCart();
