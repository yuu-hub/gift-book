// グリッド
$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  gutter: 10
});

// お気に入り機能
const giftGoods = [
  {
    id: 1,
    image: 'img/harada_rusk.png',
    title: 'グーテ・デ・ロワ 18袋',
    price: '1,620円',
    shop: 'ガトーフェスタハラダ'
  },
  {
    id: 2,
    image: 'img/imoyakinnjirou.png',
    title: '芋けんぴ 小袋寄せ',
    price: '3,348円',
    shop: '芋屋金次郎'
  },
  {
    id: 3,
    image: 'img/yokohama_renga.png',
    title: '横濱煉瓦 12個入',
    price: '1,620円',
    shop: '横濱元町 霧笛楼'
  },
  {
    id: 4,
    image: 'img/kurumikko.png',
    title: 'クルミッ子 16個入',
    price: '2,333円',
    shop: '鎌倉紅谷'
  },
  {
    id: 5,
    image: 'img/siroebi_senbei.jpg',
    title: '白えび紅白寿せんべいセット',
    price: '2,592円',
    shop: '富山吟撰堂'
  },
  {
    id: 6,
    image: 'img/montblanc.png',
    title: '焼きモンブラン 10個入',
    price: '3,157円',
    shop: 'Gaspard ZinZin'
  },
  {
    id: 7,
    image: 'img/juuwari_soba.png',
    title: '国産十割そば 6食入',
    price: '4,300円',
    shop: '掌庵 蕎麦 石はら'
  },];

// WishListコンポーネント
const WishList = {
  props: {
    gift: {
      type: Object,
      required: true
    },
  },
  template:`
    <div class="grid">
      <div class="grid-item">
        <div class="card">
          <img
            class="goods-img"
            :src="gift.image"
            alt=""
          >
          <div class="card-body">
            <div class="card-text">
              <div class="text">
                <p class="goods_name">{{ gift.title }}</p>
                <p class="price">{{ gift.price }}</p>
                <p class="shop_name">{{ gift.shop }}</p>
              </div>
              <i
                class="fa-regular fa-heart"
                @click="$emit('toggle-wish', gift.id)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
}

// ルートVueインスタンス
new Vue({
  el: '#main',
  components: { WishList },
  data: { gifts: giftGoods },
  methods: {
    onToggleWish(id) {
      console.log(`クリックした商品のID：${id}`);
    }
  }
});
