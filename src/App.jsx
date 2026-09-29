import React, { useState, useEffect } from 'react';
import html2canvas from 'https://esm.sh/html2canvas';

// プレイリスト全437曲を網羅したプリセットリスト
const ADMIN_PRESET_SONGS = [
  { title: 'モニタリング / DECO*27', url: 'https://www.youtube.com/watch?v=F01Vp757h8w' },
  { title: 'テトリス / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=q6gW1N1A4y0' },
  { title: 'おべか / すりぃ', url: 'https://www.youtube.com/watch?v=gS6c3G2x3c8' },
  { title: 'main dishが足りてない / 宮守文学', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'アンテナ39 / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=yW8QkR8I1hM' },
  { title: 'ハオ / DECO*27', url: 'https://www.youtube.com/watch?v=68936xMh3y4' },
  { title: 'ユレ弧 / 原口沙輔', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ふぁんぶる！ / 藤原ハガネ', url: 'https://www.youtube.com/watch?v=1uT1N_q6X7w' },
  { title: '頭ン痛 / えいぷ', url: 'https://www.youtube.com/watch?v=3W21Y8l6C7k' },
  { title: 'パリィ / 宮守文学', url: 'https://www.youtube.com/watch?v=t5Z6x7y8Q1I' },
  { title: '㋰責任集合体 / マサラダ', url: 'https://www.youtube.com/watch?v=0k7Yq5Z3L2s' },
  { title: '嘘ミーム / ピノキオピー', url: 'https://www.youtube.com/watch?v=7Xw1Y8k3Z5s' },
  { title: 'メズマライザー / サツキ', url: 'https://www.youtube.com/watch?v=1Wv382LXqlw' },
  { title: 'あなたしか見えないの / r-906', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'Twinkle Zone -綺界-', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'メディカドール / STEAKA', url: 'https://www.youtube.com/watch?v=4Yv38k1Z7s9' },
  { title: 'SUPERHERO / めろくる', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '夜もすがら君想ふ (10th Anniv.) / TOKOTOKO（西沢さんP）', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ビノミ / MARETU', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'M@GICAL☆CURE! LOVE ♥ SHOT! / SAWTOWNE', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'のぼせもんHERO / チバニャン＆Giga', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'エスパーエスパー / ナユタン星人', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'イガク / 原口沙輔', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'JUMPIN\' OVER ! / r-906', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ラプラスショコラ / Kai', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'サイバーパンクデッドボーイ / マイキ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'Aじゃないか / ピノキオピー', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '嘘とぬいぐるみ / dixie flatline', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'Just Be Friends / dixie flatline', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ブリキノダンス / 日向電工', url: 'https://www.nicovideo.jp/watch/sm20296308' },
  { title: 'オーバーライド / 吉田夜世', url: 'https://www.youtube.com/watch?v=vV95oT60FkY' },
  { title: 'ウルトラトレーラー / マサラダ', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'はぐ / MIMI', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'のだ / 大漠波新', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '電気予報 / 稲葉曇', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ボルテッカー / DECO*27', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '混沌ブギ / jon-YAKITORY', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ボイドロイド / r-906', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '文化になっていく / カンザキイオリ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'リレイアウター / 稲葉曇', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'ちっちゃな私 / マサラダ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '人マニア / 原口沙輔', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'あいのうた / 大漠波新', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '寝起きヤシの木 / Yukopi', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ブーケガルニ / 煮ル果実', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '宇宙散歩 / DECO*27', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'デーモンロード / Kanaria', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'HERO / YOASOBI', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'ライアーダンサー / マサラダ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ロミオとシンデレラ / doriko', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'ももいろの鍵 / いよわ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ラビットホール / DECO*27', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'バカ通信 / isonosuke', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '甘噛みでおねがい / ピノキオピー', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'おちゃめ機能 / にす', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'Whisper Whisper Whisper / Azari', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'アメリ / 煮ル果実', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'king妃jack躍 / 宮守文学', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'ザムザ / てにをは', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ハルニ / 煮ル果実', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'くうになる / MIMI', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '一千光年 / いよわ', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'Catchy !? / r-906', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'やっちゃえ！フレッシュヤング / メドミア', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '新人類 / まらしぃ×じん×堀江晶太(kemu)', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '強風オールバック / Yukopi', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'マネキン / DECO*27', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '私は、私達は / Guiano', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '匿名M / ピノキオピー', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '命辛辛 / 煮ル果実', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '花に風 / 須田景凪 バルーン', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '神っぽいな (DECO*27\'s Miku Ver.) / DECO*27', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'デビルじゃないもん / DECO*27×ピノキオピー', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'Be My Guest / Azari', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '貴方だけが、幸せでありますように。 / アメリカ民謡研究会', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'ハナタバ / MIMI', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'サイバーサンダーサイダー / EZFG', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ラヴィ / すりぃ', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'カルチャ / ツミキ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '星界ちゃんと可不ちゃんのおつかい合騒曲 / 南ノ南', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '天使の翼。 / 只野 楓', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'おくすり飲んで寝よう / もちうつね', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'スコーピオンガールの貴重な捕食シーン / STEAKA', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'twilight / 八王子P', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'Who? / Azari', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'QUEEN / Kanaria', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'キッカイケッタイ / メドミア', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ドーピングダンス / STEAKA', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'バグ / かいりきベア', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'SWAG / どーぱみん', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '転生林檎 / ピノキオピー', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'Awake Now / 雄之助', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '月光 / はるまきごはん×キタニタツヤ', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '異星にいこうね / いよわ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'まにまに / r-906', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'TOKYO CITY / 大漠波新', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '絶対敵対メチャキライヤー / メドミア', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'Boi / ポリスピカデリー', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'shake it！ / emon-Tes.', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '撫でんな / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '黒塗り世界宛て書簡 / フロクロ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ヒアソビ / カメリア', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ド屑 / なきそ', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'トリコロージュ / 煮ル果実', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'バニー / すりぃ', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '魔法少女とチョコレゐト / ピノキオピー', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'カノン / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ツイッターランド / STEAKA', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'パラサイト / DECO*27', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'さよならプリンセス / Kai', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'Azari曲 / Azari', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'にっこり^^調査隊のテーマ / WONDERFUL★OPPORTUNITY!', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'サラマンダー / DECO*27', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'フクロウさん / すりぃ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'バーバヤーガ / 煮ル果実', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'CH4NGE / Giga', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ワールドワイドワンダー / TOKOTOKO（西沢さんP）', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'アニマル / DECO*27', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'Mr.シャーデンフロイデ / ひとしずく×やま△', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'GURU / じん', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'カメレオン / すりぃ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '孤独毒毒 / syudou', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ロウワー / ぬゆり', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'ショウタイム・ルーラー / カラスヤサボウ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ノウナイディスコ / r-906', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '炉心融解 / iroha(sasaki)', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'パメラ / 須田景凪 バルーン', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'Azari曲2 / Azari', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'シャンティ / wotaku', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '神っぽいな / ピノキオピー', url: 'https://www.youtube.com/watch?v=9M52wVn_74g' },
  { title: 'エゴロック / すりぃ', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'きゅうくらりん / いよわ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'マーシャル・マキシマイザー / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=jMKPYg0uhCI' },
  { title: 'snooze / wotaku', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'いっせーのーで / MIMI', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ねぇねぇねぇ。 / ピノキオピー', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'シンデレラ / DECO*27', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'フロムトーキョー / 夏代孝明', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'しっくおぶはうす！ / OZON Music', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'キャットラビング / 香椎モイミ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'アンプランド・アポトーシス / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'Azari曲3 / Azari', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'レイニーブーツ / 稲葉曇', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'アイロニーナ / 煮ル果実', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'フォニイ / ツミキ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ノンブレス・オブリージュ / ピノキオピー', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'シネマ / YOASOBI', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'アイディスマイル / とあ', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '花となれ / 雄之助', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'ヘッジホッグ / Noz.', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '自称、音楽愛好家 / 卯花ロク', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'ハツコイソウ / FLG4', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'レトロポリス / R Sound Design', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ヒロイン育成計画 / HoneyWorks', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'ヴァンパイア / DECO*27', url: 'https://www.youtube.com/watch?v=0YF8vecQWYs' },
  { title: 'ハイドレンジア / LonePi', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '限りなく灰色へ / すりぃ', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'キュートなカノジョ / syudou', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'エンヴィーベイビー / Kanaria', url: 'https://www.youtube.com/watch?v=5sI1Z8j3p8I' },
  { title: '深夜徘徊 / シャノン', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ドクトリーヌ / 煮ル果実', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '不埒な喝采 / ポリスピカデリー', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '浴槽とネオンテトラ / REISAI', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '1000年生きてる / いよわ', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '終焉逃避行 / 柊マグネタイト', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ラブカ？ / 柊キライ', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '臨界ダイバー / Umiro', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ネオネオン / DECO*27', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ラヴィット / ピノキオピー', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'Ready Steady / Giga', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'テレキャスタービーボーイ(long ver.) / すりぃ', url: 'https://www.youtube.com/watch?v=9QLT1Aw_45s' },
  { title: 'アンチジョーカー / マイキ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ダーリンダンス / かいりきベア', url: 'https://www.youtube.com/watch?v=flTcwT7K_X0' },
  { title: '雁首、揃えてご機嫌よう / 卯花ロク', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '愛されなくても君がいる / ピノキオピー', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ラグトレイン / 稲葉曇', url: 'https://www.nicovideo.jp/watch/sm37207600' },
  { title: 'アイ情劣等生 / かいりきベア', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'p.h. / SEVENTHLINKS', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ビーバー / すりぃ', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'ヒガン / john / TOOBOE', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'Henceforth / Orangestar', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '自堕楽 / こめだわら', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ボッカデラベリタ / 柊キライ', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '晴天を穿つ / 傘村トータ', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'About me / 蝶々P', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'グッバイ宣言 / Chinozo', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'potatoになっていく / Neru', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '三日月ステップ / r-906', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'え？あぁ、そう。 / 蝶々P', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'ダンスロボットダンス / ナユタン星人', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'Night and Step / higma', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '太陽系デスコ / ナユタン星人', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ヴィラン / てにをは', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '孤独の宗教 / syudou', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'bin / こめだわら', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'エイリアンエイリアン / ナユタン星人', url: 'https://www.nicovideo.jp/watch/sm28576299' },
  { title: 'エバ / 柊キライ', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '鎖の少女-Re Alive- / のぼる↑', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ジャンキーナイトタウンオーケストラ / すりぃ', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '春嵐 / john / TOOBOE', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '幽霊東京 / YOASOBI', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'ルマ / かいりきベア', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'IMAWANOKIWA / いよわ', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ねむるまち / くじら', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'Gimme×Gimme / 八王子P×Giga', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'くらべられっ子 / ツユ', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'アルティメットセンパイ / ピノキオピー', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'いーあるふぁんくらぶ / みきとP', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '失楽ペトリ / ナナホシ管弦楽団', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'アサガオの散る頃に / ツユ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '真生活 / 案山子', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'フィクションブルー / YOASOBI', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'トラフィック・ジャム / 煮ル果実', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ジェヘナ / wotaku', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '絶え間なく藍色 / 獅子志司', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'シャボン / 栗山夕璃', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'アンドロイドガール / DECO*27', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ラストリゾート / YOASOBI', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'コールボーイ / syudou', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'すーぱーぬこになれんかった / まふまふ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'スクランブル交際 / DECO*27', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'あわよくばきみの眷属になりたいな / ヤマモトガク／Peg', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '夜撫でるメノウ / YOASOBI', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '夜行性ハイズ / DECO*27', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '内臓ありますか / ピノキオピー', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '乙女解剖 / DECO*27', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'カンケイナイトファンキー / ナナホシ管弦楽団', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ビターチョコデコレーション / syudou', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'Heart Beats / emon-Tes.', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'バイオレンストリガー / 八王子P', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'クレイジー・ビート / TENKOMORI', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '撥条少女時計 / 音戯箱', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '独りんぼエンヴィー / koyori/電ポルP', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '愛言葉Ⅲ / DECO*27', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'Yellow / kz-livetune', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'サンドリヨン / Dios/シグナルP', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '閻魔さまのいうとおり / ピノキオピー', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ぼかろころしあむ / DIVELA', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ベノム / かいりきベア', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'シャリューゲ / *Luna', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '少女レイ / みきとP', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '死んでしまったのだろうか / Guiano', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '劣等上等 / Giga', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '透明アンサー / じん', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '抜錨 / ナナホシ管弦楽団', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ハングリーニコル / 煮ル果実', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'METEOR / DIVELA', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'Reunion / *Luna', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ガランド / Picon', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '悪魔の踊り方 / キタニタツヤ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'スーパーヒーロー / Guiano', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'SNOBBISM / Neru', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ヨヒラ / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'flos / R Sound Design', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'ロストアンブレラ / 稲葉曇', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ロキ / みきとP', url: 'https://www.youtube.com/watch?v=VUIEju4jiic' },
  { title: 'Corruption / 大沼パセリ', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'メルティランドナイトメア / はるまきごはん', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'おばけのウケねらい / ピノキオピー', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'マシュマリー / MIMI', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'カトラリー / 神山羊', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'イドラのサーカス / Neru', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ロストワンの号哭 / Neru', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ハウトゥー世界征服 / Neru', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '臨界ダイバー（メガテラゼロ Cover） / メガテラゼロ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ライムライト / 栗山夕璃', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'い〜やい〜やい〜や / Neru', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'プロトディスコ / ぬゆり', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '天才ロック / カラスヤサボウ', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'ポジティブ☆ダンスタイム / キノシタ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ダーリン / MARETU', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '病名は愛だった / Neru', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ローリンガール / wowaka', url: 'https://www.nicovideo.jp/watch/sm9714351' },
  { title: '裏表ラバーズ / wowaka', url: 'https://www.nicovideo.jp/watch/sm8082467' },
  { title: '大江戸ジュリアナイト / Mitchie M', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '快晴 / Orangestar', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'quiet room / 神山羊', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'うみなおし / MARETU', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'アンノウン・マザーグース / wowaka', url: 'https://www.nicovideo.jp/watch/sm31790141' },
  { title: '阿吽のビーツ / 羽生まゐご', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'キミノヨゾラ哨戒班 / Orangestar', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '命に嫌われている。 / カンザキイオリ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '命ばっかり / ぬゆり', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ヒバナ / DECO*27', url: 'https://www.youtube.com/watch?v=jJzw1h5CR-I' },
  { title: 'パラノイヤ / カラスヤサボウ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '砂の惑星 / 米津玄師 (ハチ)', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'あの娘シークレット / Eve', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'アップルドットコム / ピノキオピー', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ホワイトハッピー / MARETU', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '嗚呼、素晴らしきニャン生 / Nem', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'はやくそれになりたい！ / キノシタ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ミルククラウン・オン・ソーネチカ / ユジー', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '夜明けと蛍 / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'ウミユリ海底譚 / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '透明エレジー / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'ぼくらはみんな意味不明 / ピノキオピー', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'フィクサー / ぬゆり', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '雨とペトラ / 須田景凪 バルーン', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'レトロマニア狂想曲 / ぽりふぉ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '右に曲ガール / はるふり', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'DAYBREAK FRONTLINE / Orangestar', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'アルカリレットウセイ / かいりきベア', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '妄想感傷代償連盟 / DECO*27', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '乱躁滅裂ガール / れるりり', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'シャルル / 須田景凪 バルーン', url: 'https://www.nicovideo.jp/watch/sm29822304' },
  { title: 'チェチェ・チェック・ワンツー！ / 和田たけあき(くらげP)', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'キライ・キライ・ジガヒダイ！ / 和田たけあき(くらげP)', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '難聴系男子が倒せない / LamazeP', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '39みゅーじっく！ / みきとP', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '脱法ロック / Neru', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '気まぐれメルシィ / 八王子P', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'Miku / Anamanaguchi', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'シェイクイット！ / googoo888', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'すきなことだけでいいです / ピノキオピー', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '踊れオーケストラ / YASUHIRO(康寛)', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '虎視眈々 / 梅とら', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'Baby Maniacs / 八王子P', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'エレクトリック・ラブ / 八王子P', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'KiLLER LADY / 八王子P', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '花瓶に触れた / 須田景凪 バルーン', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'チュルリラ・チュルリラ・ダッダッダ！ / 和田たけあき(くらげP)', url: 'https://www.nicovideo.jp/watch/sm28290635' },
  { title: 'マインドブランド / MARETU', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '脳内革命ガール / MARETU', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'コインロッカーベイビー / MARETU', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ゴーストルール / DECO*27', url: 'https://www.youtube.com/watch?v=4qK1h-9mE9o' },
  { title: '僕がモンスターになった日 / れるりり', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'R.I.P.ゴシップの海 / cosMo＠暴走P', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'モンキービジネス / 青屋夏生', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'わたしのアール / 和田たけあき(くらげP)', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '始発とカフカ / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '祭りだヘイカモン / ピノキオピー', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '２次元ドリームフィーバー / googoo888', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '東京サマーセッション / HoneyWorks', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'アイラ / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'Hand in Hand / kz-livetune', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'メリュー / ヨルシカ / n-buna', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '愛及屋烏 / 須田景凪 バルーン', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'きょうもハレバレ / ふわりP', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'うちゅーの☆ふぁんたじー / ふわりP', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'シュガーバイン / dixie flatline', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'ラブレター・フロム・メランコリー / カラスヤサボウ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '頓珍漢の宴 / ピノキオピー', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '空奏列車 / Orangestar', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'サリシノハラ / みきとP', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'アスノヨゾラ哨戒班 / Orangestar', url: 'https://www.nicovideo.jp/watch/sm24276234' },
  { title: 'カンタレラ / WhiteFlame', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '厨病激発ボーイ / れるりり', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '白い雪のプリンセスは / のぼる↑', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '月光潤色ガール / れるりり', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '千本桜 / 白組・WhiteFlame', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '古書屋敷殺人事件 / てにをは', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ぼうけんのしょがきえました！ / WONDERFUL★OPPORTUNITY!', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '天ノ弱 / 164', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'テトロドトキサイザ2号 / ね', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'Happy Halloween / Junky', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'ECHO / Crusher', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'おこちゃま戦争 / Reol', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ヒビカセ / Reol', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'バレリーコ / みきとP', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'エンゼルフィッシュ / moti Motti', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'チルドレンレコード / じん', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: '金曜日のおはよう / HoneyWorks', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '恋愛裁判 / 40meterP', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'すろぉもぉしょん / ピノキオピー', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'しわ / buzzG', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '夜もすがら君想ふ / TOKOTOKO（西沢さんP）', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '＋♂ / Reol', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ray / BUMP OF CHICKEN', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'LUVORATORRRRRY! / Reol', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '言ノ葉カルマ / れるりり', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'DECORATOR / kz-livetune', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'スキスキ絶頂症 / koyori/電ポルP', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '神のまにまに / れるりり', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'リモコン / Reol', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '好き！雪！本気マジック / Mitchie M', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'モザイクロール / DECO*27', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '弱虫モンブラン / DECO*27', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: '腐れ外道とチョコレゐト / ピノキオピー', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'マッシュルームマザー / ピノキオピー', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ありふれたせかいせいふく / ピノキオピー', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'オレンジ / Y2322', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'リモコン / WONDERFUL★OPPORTUNITY!', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'しんでしまうとはなさけない！ / WONDERFUL★OPPORTUNITY!', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '猪突猛進ガール / れるりり', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ドーナツホール / ハチ', url: 'https://www.youtube.com/watch?v=qnYoeyjovhs' },
  { title: '少女A / 椎名もた(siinamota)', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: '結ンデ開イテ羅刹ト骸 / ハチ', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'clock lock works / ハチ', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'WORLD\'S END UMBRELLA / ハチ', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'ワンダーランドと羊の歌 / ハチ', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'リンネ / ハチ', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'マトリョシカ / ハチ', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'パンダヒーロー / ハチ', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '脳漿炸裂ガール / れるりり', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '妄想税 / DECO*27', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '世界寿命と最後の一日 / スズム', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'サマータイムレコード / じん', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'アウターサイエンス / じん', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'しかばねの踊り / Kikuo', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '聖槍爆裂ボーイ / れるりり', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '夕景イエスタデイ / じん', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ビバハピ / Mitchie M', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'cLick cRack / Reol', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '一触即発☆禅ガール / れるりり', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'ロスタイムメモリー / じん', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '夜咄ディセイブ / じん', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'ヤンキーボーイ・ヤンキーガール / BestVocaloidPV', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'ヘッドフォンアクター / じん', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'コノハの世界事情 / じん', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: '空想フォレスト / じん', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: '如月アテンション / じん', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'カゲロウデイズ / じん', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: '純情スカート / 40meterP', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: 'えれくとりっく・えんじぇぅ / reddevils500a', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '放課後ストライド / Lulu Yukimura Sama', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: '幸福な死を / Kikuo', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'てんしょう しょうてんしょう / Kikuo', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'アザレアの亡霊 / a “a” a', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: '告白予行練習 / HoneyWorks', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'Weekender Girl / kz(livetune) × 八王子P', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'メランコリック / Junky', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'Tell Your World / kz-livetune', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ハロ／ハワユ / Nanou', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '二息歩行 / DECO*27', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: 'シリョクケンサ / 40meterP', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'からくりピエロ / 40meterP', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
  { title: 'キリトリセン / 40meterP', url: 'https://www.youtube.com/watch?v=7Xy8K3W1Z7s' },
  { title: 'タイムマシン / 40meterP', url: 'https://www.youtube.com/watch?v=8Xy8K3W1Z7s' },
  { title: 'トリノコシティ / 40meterP', url: 'https://www.youtube.com/watch?v=9Xy8K3W1Z7s' },
  { title: 'サイバーサンダーサイダー(English/Romaji) / ikuy398', url: 'https://www.youtube.com/watch?v=0Xy8K3W1Z7s' },
  { title: 'Mr.Music / reddevils500c', url: 'https://www.youtube.com/watch?v=1Xy8K3W1Z7s' },
  { title: 'ハッピーシンセサイザ / ifcat110', url: 'https://www.youtube.com/watch?v=2Xy8K3W1Z7s' },
  { title: 'ブラック★ロックシューター / eitovl08313909268', url: 'https://www.youtube.com/watch?v=3Xy8K3W1Z7s' },
  { title: '深海少女 / ゆうゆ', url: 'https://www.youtube.com/watch?v=4Xy8K3W1Z7s' },
  { title: '炉心融解 / Kuro', url: 'https://www.youtube.com/watch?v=5Xy8K3W1Z7s' },
  { title: 'Fire◎Flower / halyosy', url: 'https://www.youtube.com/watch?v=6Xy8K3W1Z7s' },
];

const STAFF_PIN_CODE = '8839';

const getCleanYouTubeUrl = (url) => {
  if (!url) return '';
  try {
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
    }
    if (url.includes('youtube.com')) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
    }
    return url;
  } catch (e) {
    return url;
  }
};

const createEmptyBoard = () => {
  return Array(25).fill(null).map((_, index) => ({
    id: index,
    title: '',
    url: '',
    isFree: index === 12,
    isOpen: index === 12,
  }));
};

export default function BingoApp() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isEditMode, setIsEditMode] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [selectedCell, setSelectedCell] = useState(null);
  
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBingoAchieved, setIsBingoAchieved] = useState(false);
  const [isTicketClaimed, setIsTicketClaimed] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');

    if (dataParam) {
      try {
        const indices = dataParam.split(',').map(n => parseInt(n, 10));
        const newBoard = createEmptyBoard().map((cell, index) => {
          if (cell.isFree) return cell;
          const presetIndex = indices[index];
          const song = (presetIndex !== undefined && ADMIN_PRESET_SONGS[presetIndex]) ? ADMIN_PRESET_SONGS[presetIndex] : { title: '', url: '' };
          return { ...cell, title: song.title, url: song.url };
        });
        setBoard(newBoard);
        setIsEditMode(false);
        setIsReadOnly(true);
      } catch (e) {
        console.error('共有データの読み込みに失敗しました', e);
      }
    } else {
      const savedBoard = localStorage.getItem('vocaOvaBingoBoard');
      const savedMode = localStorage.getItem('vocaOvaBingoMode');
      const savedClaimed = localStorage.getItem('vocaOvaBingoClaimed');
      if (savedBoard) setBoard(JSON.parse(savedBoard));
      if (savedMode) setIsEditMode(JSON.parse(savedMode));
      if (savedClaimed) setIsTicketClaimed(JSON.parse(savedClaimed));
    }
  }, []);

  useEffect(() => {
    if (!isReadOnly) {
      localStorage.setItem('vocaOvaBingoBoard', JSON.stringify(board));
      localStorage.setItem('vocaOvaBingoMode', JSON.stringify(isEditMode));
      localStorage.setItem('vocaOvaBingoClaimed', JSON.stringify(isTicketClaimed));
    }
  }, [board, isEditMode, isTicketClaimed, isReadOnly]);

  const handleSaveCell = () => {
    if (selectedCell === null || isReadOnly) return;
    setBoard(board.map((cell, i) => i === selectedCell ? { ...cell, title: inputTitle || 'お気に入り曲', url: inputUrl } : cell));
    setInputTitle('');
    setInputUrl('');
    setSelectedCell(null);
  };

  const handleAdminAutoFill = () => {
    if (isReadOnly) return;
    const emptyCount = board.filter(cell => !cell.isFree && !cell.url).length;
    if (emptyCount === 0) return window.alert('すべてのマスが埋まっています！');
    const shuffledPreset = [...ADMIN_PRESET_SONGS].sort(() => Math.random() - 0.5);
    let songIndex = 0;
    const newBoard = board.map(cell => {
      if (!cell.isFree && !cell.url && songIndex < shuffledPreset.length) {
        const song = shuffledPreset[songIndex];
        songIndex++;
        return { ...cell, title: song.title, url: song.url };
      }
      return cell;
    });
    setBoard(newBoard);
  };

  const checkBingo = (currentBoard) => {
    const lines = [
      [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
      [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
      [0,6,12,18,24], [4,8,12,16,20]
    ];
    for (let line of lines) {
      if (line.every(index => currentBoard[index].isOpen)) return true;
    }
    return false;
  };

  const handleCellClick = (index) => {
    const cell = board[index];
    if (cell.isFree) return;

    if (isReadOnly) {
      if (cell.url) {
        const targetUrl = cell.url.includes('youtube.com') || cell.url.includes('youtu.be') 
          ? getCleanYouTubeUrl(cell.url) 
          : cell.url;
        window.open(targetUrl, '_blank');
      }
      return;
    }

    if (isEditMode) {
      setSelectedCell(index);
      setInputTitle(cell.title);
      setInputUrl(cell.url);
    } else {
      if (!cell.isOpen) {
        if (window.confirm('この曲が流れましたか？（マスを開けます）')) {
          const newBoard = board.map((c, i) => i === index ? { ...c, isOpen: true } : c);
          setBoard(newBoard);
          if (!isBingoAchieved && checkBingo(newBoard)) {
            setTimeout(() => setIsBingoAchieved(true), 300);
          }
        }
      } else {
        if (window.confirm('マスの開放を取り消しますか？')) {
          setBoard(board.map((c, i) => i === index ? { ...c, isOpen: false } : c));
        }
      }
    }
  };

  const handleConfirmParticipation = async () => {
    const emptyCount = board.filter(cell => !cell.isFree && !cell.url).length;
    if (emptyCount > 0) {
      window.alert(`まだ ${emptyCount} マス空いています！すべてのマスを埋めてください。`);
      return;
    }

    const urls = board.filter(cell => !cell.isFree).map(cell => cell.url.trim());
    const uniqueUrls = new Set(urls);
    if (uniqueUrls.size !== urls.length) {
      window.alert('⚠️ 同じ曲（URL）が重複しているマスがあります！\n別の曲に設定し直してください。');
      return;
    }

    if (!window.confirm('盤面を確定しますか？\n確定後はURLの変更ができなくなります。')) return;

    setIsEditMode(false);
    setSelectedCell(null);

    const indices = board.map(cell => {
      if (cell.isFree) return -1;
      const foundIdx = ADMIN_PRESET_SONGS.findIndex(s => s.url === cell.url);
      return foundIdx !== -1 ? foundIdx : 999;
    });

    const dataString = indices.join(',');
    const generatedShareableUrl = `${window.location.origin}${window.location.pathname}?data=${dataString}`;
    setShareUrl(generatedShareableUrl);

    const element = document.getElementById('bingo-board-capture');
    if (element) {
      try {
        const canvas = await html2canvas(element, { useCORS: true, backgroundColor: '#ffffff', scale: 2 });
        setGeneratedImage(canvas.toDataURL('image/png'));
        setShowShareModal(true);
      } catch (err) {
        console.error('画像生成に失敗しました', err);
        window.alert('画像の生成に失敗しました。シェア画面へ進みます。');
        setShowShareModal(true);
      }
    }
  };

  const handleClaimTicket = () => {
    const input = window.prompt('【スタッフ専用】\n引き換え用の4桁のPINコードを入力してください');
    if (input === STAFF_PIN_CODE) {
      setIsTicketClaimed(true);
      window.alert('ドリンクチケットを引き換えました！');
    } else if (input !== null) {
      window.alert('PINコードが間違っています。');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#333333', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      <h1 style={{ color: '#00bfff', marginBottom: '5px', fontWeight: '900' }}>ボカオバ ビンゴ</h1>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
        {isReadOnly ? '【閲覧モード】他の参加者の予想カードです（タップで動画へ）' : (isEditMode ? '【セットアップモード】楽曲を予想しよう！' : '【プレイモード】曲が流れたらマスをタップ！')}
      </p>

      <div id="bingo-board-capture" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', width: '100%', maxWidth: '520px', marginBottom: '30px', padding: '10px', backgroundColor: '#ffffff' }}>
        {board.map((cell, index) => (
          <div 
            key={index} onClick={() => handleCellClick(index)}
            style={{
              aspectRatio: '1', borderRadius: '8px',
              border: `2px solid ${cell.isOpen ? '#ff4500' : (selectedCell === index ? '#00bfff' : '#dddddd')}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden',
              boxShadow: cell.isOpen ? '0 0 8px rgba(255, 69, 0, 0.5)' : (selectedCell === index ? '0 0 8px rgba(0, 191, 255, 0.5)' : 'none'),
              backgroundColor: cell.isFree ? '#e0f7fa' : (cell.title ? '#0f172a' : '#f8fafc'),
              padding: '6px', boxSizing: 'border-box'
            }}
          >
            {cell.isOpen && !cell.isFree && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.6)', zIndex: 2 }} />
            )}
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              {cell.isFree && <div style={{ fontWeight: 'bold', color: '#00bfff', fontSize: '14px' }}>FREE</div>}
              {!cell.isFree && !cell.title && <div style={{ fontSize: '11px', color: '#94a3b8' }}>未設定</div>}
              {!cell.isFree && cell.title && (
                <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: 'bold', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', wordBreak: 'break-all' }}>
                  {cell.title}
                </div>
              )}
              {cell.isOpen && !cell.isFree && <div style={{ fontSize: '42px', color: '#ff2a2a', textShadow: '0 0 5px #fff', position: 'absolute', zIndex: 3 }}>〇</div>}
            </div>
          </div>
        ))}
      </div>

      {isBingoAchieved && !isReadOnly && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '20px', backgroundColor: '#fff3e0', border: '2px solid #ff9800', borderRadius: '10px', marginBottom: '30px', textAlign: 'center', boxSizing: 'border-box' }}>
          <h2 style={{ color: '#ff4500', margin: '0 0 10px 0' }}>🎉 BINGO達成!! 🎉</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>おめでとうございます！バーカウンターでこの画面をスタッフに見せてください。</p>
          {isTicketClaimed ? (
             <div style={{ padding: '15px', backgroundColor: '#eeeeee', color: '#999', borderRadius: '5px', fontWeight: 'bold', fontSize: '18px' }}>
               🎟️ 引き換え済み
             </div>
          ) : (
            <button onClick={handleClaimTicket} style={{ width: '100%', padding: '15px', backgroundColor: '#ff9800', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(255, 152, 0, 0.4)' }}>
              🎁 ドリチケを受け取る（スタッフ操作）
            </button>
          )}
        </div>
      )}

      {isEditMode && selectedCell !== null && !board[selectedCell].isFree && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '15px', backgroundColor: '#e0f7fa', border: '1px solid #b2ebf2', borderRadius: '10px', marginBottom: '20px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#00838f' }}>マス {selectedCell + 1} の楽曲を設定</div>
          <input 
            type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="曲名（例: メルト / ryo）"
            style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          <input 
            type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} placeholder="YouTubeまたはニコニコ動画のURL"
            style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          <button onClick={handleSaveCell} style={{ width: '100%', padding: '10px', backgroundColor: '#00bfff', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>このマスに保存</button>
        </div>
      )}

      {isEditMode && (
        <div style={{ width: '100%', maxWidth: '520px', padding: '15px', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '10px', marginBottom: '30px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#f57f17' }}>⚡ 運営のおまかせ入力</div>
          <button onClick={handleAdminAutoFill} style={{ width: '100%', padding: '12px', backgroundColor: '#ffb300', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>おまかせで空きマスを埋める！</button>
        </div>
      )}

      {!isReadOnly && (
        isEditMode ? (
          <button onClick={handleConfirmParticipation} style={{ width: '100%', maxWidth: '520px', padding: '15px', backgroundColor: '#00bfff', color: '#ffffff', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 191, 255, 0.4)' }}>
            参加確定してXでシェア
          </button>
        ) : (
          <button onClick={() => { if(window.confirm('編集モードに戻しますか？')) setIsEditMode(true); }} style={{ marginTop: '20px', padding: '10px', background: '#eeeeee', color: '#666', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>編集モードに戻る</button>
        )
      )}

      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', maxWidth: '400px', width: '100%', textAlign: 'center', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#00bfff' }}>盤面完成！</h3>
            <p style={{ fontSize: '13px', color: '#333', marginBottom: '15px' }}>画像を保存し、Xに投稿しよう！</p>
            {generatedImage && (
              <img src={generatedImage} alt="BINGO Board" style={{ width: '100%', borderRadius: '10px', marginBottom: '15px', border: '1px solid #ccc' }} />
            )}
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('私のボカオバ予想ビンゴ！\nイベントでかかる曲を当ててドリチケをもらうぞ💪\n')}&url=${encodeURIComponent(shareUrl)}&hashtags=ボカオバ,ボカオバビンゴ,ボカオバリクエスト`} 
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', backgroundColor: '#000', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '25px', fontWeight: 'bold', marginBottom: '15px' }}
            >
              𝕏 カードをポスト
            </a>
            <button onClick={() => setShowShareModal(false)} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer' }}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}