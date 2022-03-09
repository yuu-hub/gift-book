// お気に入り機能

// ----------------------------
// GridItem コンポーネント
// ----------------------------
const GridItem = {
  props: {
    gift: {
      type: Object,
      required: true
    },
  },
  template:`
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
                class="fa-heart"
                :class="{ 'fa-regular': !isWish, 'fa-solid': isWish }"
                @click="$emit('toggle-wish', gift.id)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    `
};

// ----------------------------
// ルートVueインスタンス
// ----------------------------
new Vue({
  el: '#main',
  components: { GridItem },
  data() {
    return {
      wishes: [],
      data: [
        {
          id: 1,
          image: 'img/harada_rusk.png',
          title: 'グーテ・デ・ロワ 18袋',
          price: '1,620円',
          shop: 'ガトーフェスタハラダ'
        },
        {
          id: 2,
          image: 'img/imoyakinnjirou.jpg',
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
        },
      ],
    }
  },
  mounted() {
    // グリッド Masonry
    let $grid = $('.grid').imagesLoaded( function() {
      // init Masonry after all images have loaded
      $grid.masonry({
        // options...
        itemSelector: '.grid-item',
        gutter: 10
      });
    });
    
    // 保存済みのlocalStorageを読み込む
    let current = localStorage.getItem('wishes');
    if (current) {
      this.$set(this,'wishes', JSON.parse(current))
    }
  },
  computed: {
    // Wish登録されているかの真偽
    isWish() {
      return function(id) {
        let index = this.wishes.findIndex(function(value) {
          return value.id == id;
        })
        // 未登録ならfalse
        if (index === -1) {
          return false;
        } else {
          // 登録済みならtrue
          return true;
        }
      }
    }
  },
  methods: {
    onToggleWish(id) {
      // WishListに入る商品を抽出
      let index = this.data.findIndex(function(value) {
        return value.id == id;
      });
      let target = this.data[index];
      
      // 既に登録済みか判定
      index = this.wishes.findIndex(function(value) {
        return value.id == target.id;
      })
      
      // 未登録なら新規登録
      if (index === -1) {
        this.wishes.unshift(target)
      } else {
        // 登録済みなら削除
        this.wishes.splice(index, 1);
      }
      
      // localStorageに保存
      localStorage.setItem('wishes', JSON.stringify(this.wishes));
      
    }
  }
});
