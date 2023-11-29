import Phaser from "phaser";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.multiatlas(
      "cityscene", // key
      "assets/spritesheets/cityscene.json", // file
      "assets/spritesheets" // dir(path)
    );
  }

  create() {
    this.add.sprite(0, 0, "cityscene", "background.png");
    this.capguy = this.add.sprite(0, 400, "cityscene", "capguy/walk/0001.png");
    this.capguy.setScale(0.5, 0.5);

    // アニメーション用のフレームを作成
    const frameNames = this.anims.generateFrameNames("cityscene", {
      start: 1, // フレーム名の開始番号
      end: 8, // フレーム名の終了番号
      zeroPad: 4, // フレーム名のゼロ埋めの桁数
      prefix: "capguy/walk/", // アニメーション画像の共通パス
      suffix: ".png", // アニメーション画像の拡張子
    });

    // アニメーションの作成
    this.anims.create({
      key: "walk", // アニメーション名
      frames: frameNames, // フレーム名の配列
      frameRate: 10, // FPS
      repeat: -1, // 無限ループ
    });

    // アニメーションの再生
    this.capguy.anims.play("walk");

    // 9-slice objects
    this.add.nineslice(75, 50, "cityscene", "button.png", 100, 50);
    this.add.nineslice(250, 50, "cityscene", "button.png", 200, 50);
  }

  update() {
    // 常にループされて呼び出される処理
    this.capguy.x = 200;
    // ディレイもできるらしい
    this.time.delayedCall(10000, () => {
      this.capguy.x += 1;
      if (this.capguy.x > 800) {
        this.capguy.x = -50;
      }
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: MyGame,
};

const game = new Phaser.Game(config);
