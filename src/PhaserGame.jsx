import { useEffect, useState } from "react";
import Phaser from "phaser";
import { Socket } from "socket.io-client";
import { SocketProvider, useSocket } from "./context/Socket";

const PhaserGame = (props) => {
  const { socket } = useSocket();
  const finalName = localStorage.getItem("Final-Name");
  const finalImage = localStorage.getItem("Final-Image");
  let x = 200,
    y = 400;

  const [state, setState] = useState(false);

  useEffect(() => {
    if (socket) {
      console.log("Socket is connected", socket.connected);
    }
    socket.on("Incoming-call", (data) => {
      const { players, fromName, pos } = data;
      console.log("This is data from incoming call", fromName, pos.x, pos.y);
      console.log("This are the players", players);
      console.log("This is final name", finalName);
    });

    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      width: 895,
      height: 895,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
    };

    // Create a new Phaser game instance
    const game = new Phaser.Game(config);

    // Preload assets
    function preload() {
      this.load.image("tiles", "src/assets/arabic.png");
      this.load.tilemapTiledJSON("map", "src/assets/tiledMap.json");
      this.load.spritesheet("dude", finalImage, {
        frameWidth: 64,
        frameHeight: 64,
      });
    }

    function create() {
      const map = this.make.tilemap({
        key: "map",
        tileWidth: 32,
        tileHeight: 32,
      });
      const tileset = map.addTilesetImage("arabic", "tiles");
      const layer = map.createLayer("Background", tileset, 0, 0);
      const roomLayer = map.createLayer("Room", tileset, 0, 0);
      const curtainsLayer = map.createLayer("Curtains", tileset, 0, 0);
      const grassLayer = map.createLayer("grass", tileset, 0, 0);

      this.player = this.physics.add.sprite(x, y, "dude");
      console.log(this.player);
      this.playerText = this.add.text(this.player.x, this.player.y, finalName, {
        font: "15px arial",
        fill: "#000000",
      });

      this.physics.world.enable(this.playerText);
      this.player.setBounce(0.2);
      this.player.setScale(1.3);
      const setPosition = () => {
        console.log("position");
      };
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("dude", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("dude", { start: 1, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: "stop",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1,
      });

      this.cursors = this.input.keyboard.createCursorKeys();

      this.physics.add.collider(this.player, grassLayer);
      grassLayer.setCollisionBetween(11, 12);

      grassLayer.setCollisionBetween(8, 9);

      this.physics.add.collider(this.player, roomLayer);
      roomLayer.setCollisionBetween(10, 11);
      roomLayer.setCollisionBetween(80, 81);
      roomLayer.setCollisionBetween(0, 1);
      roomLayer.setCollisionBetween(78, 79);
      roomLayer.setCollisionBetween(62, 63);

      this.physics.add.collider(this.player, curtainsLayer);
      curtainsLayer.setCollisionBetween(14, 15);
      curtainsLayer.setCollisionBetween(8, 9);
      curtainsLayer.setCollisionBetween(4, 5);
      curtainsLayer.setCollisionBetween(11, 12);
    }

    function update() {
      socket.on("position-changed", (data) => {
        const { fromName, playerPosition } = data;
        console.log(
          "Position is changed of ",
          fromName,
          "at : ",
          playerPosition.x,
          playerPosition.y
        );
        this.player.setPosition(playerPosition.x, playerPosition.y);
      });
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      if (this.player && this.playerText) {
        this.playerText.setPosition(this.player.x - 18, this.player.y - 60);
      }
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-200);
        this.player.anims.play("up", true);
        socket.emit("player-moved", {
          finalName,
          x: this.player.x,
          y: this.player.y,
        });
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(200);
        this.player.anims.play("down", true);
        socket.emit("player-moved", {
          finalName,
          x: this.player.x,
          y: this.player.y,
        });
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
        this.player.anims.play("right", true);
        socket.emit("player-moved", {
          finalName,
          x: this.player.x,
          y: this.player.y,
        });
      } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200);
        this.player.anims.play("left", true);
        socket.emit("player-moved", {
          finalName,
          x: this.player.x,
          y: this.player.y,
        });
      } else {
        this.player.anims.play("stop", true);
      }
    }

    // Clean up the Phaser game when the component unmounts
    return () => {
      game.destroy(true);
    };
  }, [socket]);

  return <div id="game-container" />;
};

export default PhaserGame;
